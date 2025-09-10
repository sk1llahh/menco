import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import {
  type SessionItem,
  toSessionItem,
  toReviewItem,
  type ReviewItem,
} from "./mapper";
import type {
  ReviewCreateBody,
  SessionCreateBody,
  SessionListQuery,
  SessionUpdateStatusBody,
} from "@repo/types";

// LIST
const list = async (q: SessionListQuery): Promise<PageResult<SessionItem>> => {
  const where: any = {};
  if (q.mentorId) where.mentorId = q.mentorId;
  if (q.studentId) where.studentId = q.studentId;
  if (q.status) where.status = q.status;
  if (q.dateFrom || q.dateTo) {
    where.startsAt = {};
    if (q.dateFrom) where.startsAt.gte = new Date(q.dateFrom);
    if (q.dateTo) where.startsAt.lte = new Date(q.dateTo);
  }

  return paginate<SessionItem>(
    () => prisma.mentorSession.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.mentorSession.findMany({
        where,
        orderBy: [{ startsAt: "desc" }, { createdAt: "desc" }],
        skip: offset,
        take: limit,
      });
      return rows.map(toSessionItem);
    },
    { page: q.page, limit: q.limit }
  );
};

// CREATE (student -> mentor)
const create = async (studentId: string, body: SessionCreateBody) => {
  if (body.mentorId === studentId) throw error("You cannot book yourself", 400);
  const s = await prisma.mentorSession.create({
    data: {
      mentorId: body.mentorId,
      studentId,
      startsAt: new Date(body.startsAt),
      endsAt: new Date(body.endsAt),
      price: body.price as any,
      currency: body.currency ?? "KZT",
      meetUrl: body.meetUrl,
      notes: body.notes,
      status: "REQUESTED",
    },
  });
  return toSessionItem(s);
};

// UPDATE STATUS (mentor only or student cancel)
const updateStatus = async (
  id: string,
  actorId: string,
  body: SessionUpdateStatusBody
) => {
  const s = await prisma.mentorSession.findUnique({ where: { id } });
  if (!s) throw error("Session not found", 404);

  // базовые правила (упростим):
  // CONFIRM/CANCEL может ментор; COMPLETED/NO_SHOW — после даты; CANCELED — любой участник
  const isMentor = s.mentorId === actorId;
  const isStudent = s.studentId === actorId;

  if (body.status === "CONFIRMED" && !isMentor) throw error("Forbidden", 403);
  if (body.status === "CANCELED" && !(isMentor || isStudent))
    throw error("Forbidden", 403);
  if (
    (body.status === "COMPLETED" || body.status === "NO_SHOW") &&
    new Date() < s.endsAt
  ) {
    throw error("Too early to complete/no_show", 400);
  }

  const upd = await prisma.mentorSession.update({
    where: { id },
    data: {
      status: body.status,
      meetUrl: body.meetUrl ?? undefined,
      notes: body.notes ?? undefined,
    },
  });
  return toSessionItem(upd);
};

// REVIEWS (student leaves one per session)
const addReview = async (
  sessionId: string,
  authorId: string,
  body: ReviewCreateBody
): Promise<ReviewItem> => {
  const s = await prisma.mentorSession.findUnique({ where: { id: sessionId } });
  if (!s) throw error("Session not found", 404);
  if (s.studentId !== authorId) throw error("Only student can review", 403);
  if (s.status !== "COMPLETED") throw error("Session must be completed", 400);

  const exists = await prisma.sessionReview.findUnique({
    where: { sessionId },
  });
  if (exists) throw error("Review already exists", 409);

  const r = await prisma.sessionReview.create({
    data: { sessionId, authorId, rating: body.rating, comment: body.comment },
  });

  // апдейт агрегатов у ментора (упрощенно)
  const reviews = await prisma.sessionReview.findMany({
    where: { session: { mentorId: s.mentorId } },
    select: { rating: true },
  });
  const ratingCount = reviews.length;
  const ratingAvg =
    ratingCount === 0
      ? 0
      : reviews.reduce(
          (acc: number, v: { rating: number }) => acc + v.rating,
          0
        ) / ratingCount;

  await prisma.mentorProfile.updateMany({
    where: { userId: s.mentorId },
    data: { ratingAvg, ratingCount },
  });

  return toReviewItem(r);
};

export default { list, create, updateStatus, addReview };
