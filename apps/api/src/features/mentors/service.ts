import type {
  ApplicationCreateBody,
  ApplicationUpdateBody,
  AvailabilityIdParams,
  AvailabilityListQuery,
  AvailabilityUpsertBody,
  MentorSearchQuery,
  MentorUpdateBody,
  PageResult,
} from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import { type MentorCard, toMentorCard } from "./mapper";

const search = async (
  q: MentorSearchQuery
): Promise<PageResult<MentorCard>> => {
  const where: any = {};
  if (q.minRating) where.ratingAvg = { gte: q.minRating };
  if (q.maxRate) where.ratePerHour = { lte: q.maxRate as any };
  if (q.skill) where.skills = { some: { skill: { slug: q.skill } } };

  const or: any[] = [];
  if (q.q) {
    or.push({ title: { contains: q.q, mode: "insensitive" } });
    or.push({ about: { contains: q.q, mode: "insensitive" } });
    or.push({ user: { name: { contains: q.q, mode: "insensitive" } } });
    or.push({
      skills: {
        some: { skill: { name: { contains: q.q, mode: "insensitive" } } },
      },
    });
  }
  if (or.length) where.OR = or;

  return paginate<MentorCard>(
    () => prisma.mentorProfile.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.mentorProfile.findMany({
        where,
        include: {
          user: { select: { name: true } },
          skills: { include: { skill: true } },
        },
        orderBy: [{ ratingAvg: "desc" }, { ratingCount: "desc" }],
        skip: offset,
        take: limit,
      });
      return rows.map(toMentorCard);
    },
    { page: q.page, limit: q.limit }
  );
};

const upsertMe = async (userId: string, body: MentorUpdateBody) => {
  const data: any = body;
  const mp = await prisma.mentorProfile.upsert({
    where: { userId },
    update: data,
    create: { userId, ...data },
    include: {
      user: { select: { name: true } },
      skills: { include: { skill: true } },
    },
  });
  return toMentorCard(mp);
};

const availabilityList = async (userId: string, q: AvailabilityListQuery) => {
  const where = { mentorProfile: { userId } };
  return paginate(
    () => prisma.availabilitySlot.count({ where }),
    async (offset, limit) => {
      return prisma.availabilitySlot.findMany({
        where,
        orderBy: { startsAt: "asc" },
        skip: offset,
        take: limit,
      });
    },
    { page: q.page, limit: q.limit }
  );
};

const availabilityCreate = async (
  userId: string,
  body: AvailabilityUpsertBody
) => {
  const mp = await prisma.mentorProfile.findUnique({ where: { userId } });
  if (!mp) throw error("Mentor profile not found", 404);
  return prisma.availabilitySlot.create({
    data: {
      mentorProfileId: mp.id,
      startsAt: new Date(body.startsAt),
      endsAt: new Date(body.endsAt),
    },
  });
};

const availabilityDelete = async (
  userId: string,
  params: AvailabilityIdParams
) => {
  const slot = await prisma.availabilitySlot.findUnique({
    where: { id: params.id },
    include: { mentorProfile: true },
  });
  if (!slot || slot.mentorProfile.userId !== userId)
    throw error("Slot not found", 404);
  await prisma.availabilitySlot.delete({ where: { id: params.id } });
  return { ok: true as const };
};

const apply = async (userId: string, body: ApplicationCreateBody) => {
  const exists = await prisma.mentorApplication.findFirst({
    where: { userId, status: "PENDING" },
  });
  if (exists) throw error("Application already pending", 409);

  return prisma.mentorApplication.create({
    data: { userId, message: body.message ?? null, status: "PENDING" },
  });
};

const setApplicationStatus = async (
  appId: string,
  body: ApplicationUpdateBody
) => {
  return prisma.mentorApplication.update({
    where: { id: appId },
    data: { status: body.status, reviewedAt: new Date() },
  });
};

export default {
  search,
  upsertMe,
  availabilityList,
  availabilityCreate,
  availabilityDelete,
  apply,
  setApplicationStatus,
};
