import prisma from "@/prisma";
import {error} from "@/utils/errors";
import { parsePagination, paginate } from "@/utils/pagination";
import { MentorCardVM, MentorProfileUpsertBody, MentorListQuery, MentorApplicationBody, MentorRequestBody } from "./types";

const toCard = (p: any): MentorCardVM => ({
  id: p.id, userId: p.userId, title: p.title, about: p.about,
  ratePerHour: p.ratePerHour ? Number(p.ratePerHour) : null,
  currency: p.currency, ratingAvg: p.ratingAvg, ratingCount: p.ratingCount, isVerified: p.isVerified
});

const upsertProfile = async (userId: string, body: MentorProfileUpsertBody): Promise<MentorCardVM> => {
  const profile = await prisma.mentorProfile.upsert({
    where: { userId },
    create: {
      userId, title: body.title ?? null, about: body.about ?? null,
      ratePerHour: body.ratePerHour ?? null, currency: (body.currency ?? "KZT") as any,
    },
    update: {
      title: body.title ?? undefined, about: body.about ?? undefined,
      ratePerHour: body.ratePerHour ?? undefined, currency: (body.currency as any) ?? undefined,
    },
  });

  if (Array.isArray(body.skills)) {
    const skills = await prisma.skill.findMany({ where: { slug: { in: body.skills } } });
    await prisma.mentorSkill.deleteMany({ where: { mentorProfileId: profile.id } });
    if (skills.length) {
      await prisma.mentorSkill.createMany({ data: skills.map(s => ({ mentorProfileId: profile.id, skillId: s.id })) });
    }
  }
  return toCard(profile);
};

const list = async (query: MentorListQuery) => {
  const { page, limit } = parsePagination(query);
  const where: any = {};
  if (query.q?.trim()) where.OR = [{ title: { contains: query.q, mode: "insensitive" } }, { about: { contains: query.q, mode: "insensitive" } }];
  if (query.minRate || query.maxRate) {
    where.ratePerHour = {};
    if (query.minRate) where.ratePerHour.gte = query.minRate;
    if (query.maxRate) where.ratePerHour.lte = query.maxRate;
  }

  return paginate<MentorCardVM>(
    () => prisma.mentorProfile.count({ where }),
    async (offset, take) => (await prisma.mentorProfile.findMany({ where, skip: offset, take, orderBy: { ratingAvg: "desc" } })).map(toCard),
    { page, limit }
  );
};

const apply = async (userId: string, body: MentorApplicationBody) => {
  const app = await prisma.mentorApplication.create({ data: { userId, message: body.message ?? null } });
  return app;
};

const requestMentor = async (studentId: string, body: MentorRequestBody) => {
  if (studentId === body.mentorId) throw error('Cannot request yourself');
  const req = await prisma.mentorshipRequest.upsert({
    where: { studentId_mentorId: { studentId, mentorId: body.mentorId } },
    create: { studentId, mentorId: body.mentorId, message: body.message ?? null },
    update: { message: body.message ?? undefined, status: "PENDING" as any },
  });
  return req;
};

export default { upsertProfile, list, apply, requestMentor };