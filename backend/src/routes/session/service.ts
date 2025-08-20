import dayjs from "dayjs";
import prisma from "@/prisma";
import {error} from "@/utils/errors.ts";
import { parsePagination, paginate } from "@/utils/pagination";
import { SessionCreateBody, SessionListQuery, SessionUpdateStatusBody, ReviewCreateBody } from "./types";

const create = async (studentId: string, body: SessionCreateBody) => {
  if (studentId === body.mentorId) throw error('Cannot book yourself', 400);
  const startsAt = dayjs(body.startsAt).toDate();
  const endsAt = dayjs(body.endsAt).toDate();
  if (!(startsAt < endsAt)) throw error('Invalid time range', 400);

  const overlap = await prisma.mentorSession.findFirst({
    where: {
      mentorId: body.mentorId,
      OR: [
        { startsAt: { lt: endsAt }, endsAt: { gt: startsAt } },
      ],
      status: { in: ["REQUESTED", "CONFIRMED"] as any },
    },
  });
  if (overlap) throw error('Slot not available');

  const s = await prisma.mentorSession.create({
    data: {
      mentorId: body.mentorId, studentId,
      startsAt, endsAt,
      status: "REQUESTED",
      price: body.price ?? null, currency: (body.currency ?? "KZT") as any,
      meetUrl: body.meetUrl ?? null, notes: body.notes ?? null,
    },
  });
  return s;
};

const list = async (userId: string, query: SessionListQuery) => {
  const { page, limit } = parsePagination(query);
  const where: any = {};
  if (query.role === "mentor") where.mentorId = userId;
  else if (query.role === "student") where.studentId = userId;
  else where.OR = [{ mentorId: userId }, { studentId: userId }];

  if (query.status) where.status = query.status as any;

  return paginate(
    () => prisma.mentorSession.count({ where }),
    (offset, take) => prisma.mentorSession.findMany({ where, skip: offset, take, orderBy: { startsAt: "desc" } }),
    { page, limit }
  );
};

const setStatus = async (userId: string, id: string, body: SessionUpdateStatusBody) => {
  const s = await prisma.mentorSession.findUnique({ where: { id } });
  if (!s) throw error('Session not found', 404);
  if (![s.mentorId, s.studentId].includes(userId)) throw error('Forbidden', 403);

  const u = await prisma.mentorSession.update({ where: { id }, data: { status: body.status as any } });
  return u;
};

const review = async (userId: string, body: ReviewCreateBody) => {
  const s = await prisma.mentorSession.findUnique({ where: { id: body.sessionId } });
  if (!s) throw error('Session not found', 404);
  if (s.studentId !== userId) throw error('Only student can review', 403);
  if (s.status !== "COMPLETED") throw error('Session not completed');

  const r = await prisma.sessionReview.create({
    data: { sessionId: body.sessionId, authorId: userId, rating: body.rating, comment: body.comment ?? null },
  });
  return r;
};

export default { create, list, setStatus, review };