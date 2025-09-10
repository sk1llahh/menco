import type { PageResult } from "@repo/types";
import prisma from "@/prisma";
import { error } from "@/shared/utils/errors";
import { paginate } from "@/shared/utils/pagination";
import {
  type QnaQuestionItem,
  type QnaAnswerItem,
  toQnaQuestionItem,
  toQnaAnswerItem,
} from "./mapper";
import type {
  AnswerCreateBody,
  AnswerListQuery,
  AnswerUpdateBody,
  QnaCreateBody,
  QnaListQuery,
  QnaUpdateBody,
} from "@repo/types";

// QUESTIONS
const list = async (q: QnaListQuery): Promise<PageResult<QnaQuestionItem>> => {
  const where: any = {};
  const or: any[] = [];
  if (q.q) {
    or.push({ title: { contains: q.q, mode: "insensitive" } });
    or.push({ body: { contains: q.q, mode: "insensitive" } });
  }
  if (or.length) where.OR = or;
  if (q.targetUserId) where.targetUserId = q.targetUserId;
  if (q.challengeId) where.challengeId = q.challengeId;
  if (q.authorId) where.authorId = q.authorId;
  if (q.onlyAnonymous) where.isAnonymous = q.onlyAnonymous === "true";

  return paginate<QnaQuestionItem>(
    () => prisma.qnaQuestion.count({ where }),
    async (offset, limit) => {
      const rows = await prisma.qnaQuestion.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toQnaQuestionItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const get = async (id: string) => {
  const row = await prisma.qnaQuestion.findUnique({ where: { id } });
  if (!row) throw error("Question not found", 404);
  return toQnaQuestionItem(row);
};

const create = async (userId: string, body: QnaCreateBody) => {
  const data: any = {
    title: body.title,
    body: body.body,
    isAnonymous: body.isAnonymous ?? false,
    authorId: body.isAnonymous ? null : userId,
    targetUserId: body.targetUserId ?? null,
    challengeId: body.challengeId ?? null,
  };
  const row = await prisma.qnaQuestion.create({ data });
  return toQnaQuestionItem(row);
};

const update = async (id: string, userId: string, body: QnaUpdateBody) => {
  const q = await prisma.qnaQuestion.findUnique({ where: { id } });
  if (!q) throw error("Question not found", 404);
  // редактировать может только автор (если не аноним, и это он)
  if (q.authorId && q.authorId !== userId) throw error("Forbidden", 403);

  const row = await prisma.qnaQuestion.update({
    where: { id },
    data: {
      title: body.title ?? undefined,
      body: body.body ?? undefined,
      isAnonymous: body.isAnonymous ?? undefined,
      targetUserId: body.targetUserId ?? undefined,
      challengeId: body.challengeId ?? undefined,
    },
  });
  return toQnaQuestionItem(row);
};

const remove = async (id: string, userId: string) => {
  const q = await prisma.qnaQuestion.findUnique({ where: { id } });
  if (!q) throw error("Question not found", 404);
  if (q.authorId && q.authorId !== userId) throw error("Forbidden", 403);

  await prisma.qnaAnswer.deleteMany({ where: { questionId: id } });
  await prisma.qnaQuestion.delete({ where: { id } });
  return { ok: true as const };
};

// ANSWERS
const answers = async (
  questionId: string,
  q: AnswerListQuery
): Promise<PageResult<QnaAnswerItem>> => {
  return paginate<QnaAnswerItem>(
    () => prisma.qnaAnswer.count({ where: { questionId } }),
    async (offset, limit) => {
      const rows = await prisma.qnaAnswer.findMany({
        where: { questionId },
        orderBy: { createdAt: "asc" },
        skip: offset,
        take: limit,
      });
      return rows.map(toQnaAnswerItem);
    },
    { page: q.page, limit: q.limit }
  );
};

const addAnswer = async (
  questionId: string,
  userId: string,
  body: AnswerCreateBody
) => {
  const q = await prisma.qnaQuestion.findUnique({ where: { id: questionId } });
  if (!q) throw error("Question not found", 404);

  const row = await prisma.qnaAnswer.create({
    data: { questionId, authorId: userId, body: body.body },
  });
  return toQnaAnswerItem(row);
};

const updateAnswer = async (
  id: string,
  userId: string,
  body: AnswerUpdateBody
) => {
  const a = await prisma.qnaAnswer.findUnique({ where: { id } });
  if (!a) throw error("Answer not found", 404);
  if (a.authorId !== userId) throw error("Forbidden", 403);

  const row = await prisma.qnaAnswer.update({
    where: { id },
    data: { body: body.body },
  });
  return toQnaAnswerItem(row);
};

const removeAnswer = async (id: string, userId: string) => {
  const a = await prisma.qnaAnswer.findUnique({ where: { id } });
  if (!a) throw error("Answer not found", 404);
  if (a.authorId !== userId) throw error("Forbidden", 403);
  await prisma.qnaAnswer.delete({ where: { id } });
  return { ok: true as const };
};

export default {
  list,
  get,
  create,
  update,
  remove,
  answers,
  addAnswer,
  updateAnswer,
  removeAnswer,
};
