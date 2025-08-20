import prisma from "@/prisma";
import {error} from "@/utils/errors";
import {parsePagination, paginate} from "@/utils/pagination";
import {QnaQuestionVM, QnaListQuery, QnaListResult, QnaQuestionCreateBody, QnaAnswerCreateBody} from "./types";

const toVM = (q: any): QnaQuestionVM => ({
  id: q.id, title: q.title, body: q.body, isAnonymous: q.isAnonymous,
  authorId: q.authorId, targetUserId: q.targetUserId, challengeId: q.challengeId,
  createdAt: q.createdAt,
});

const list = async (query: QnaListQuery): Promise<QnaListResult> => {
  const {page, limit} = parsePagination(query);
  const where: any = {};
  if (query.targetUserId) where.targetUserId = query.targetUserId;
  if (query.challengeId) where.challengeId = query.challengeId;

  return paginate<QnaQuestionVM>(
    () => prisma.qnaQuestion.count({where}),
    async (offset, take) => (await prisma.qnaQuestion.findMany({
      where,
      skip: offset,
      take,
      orderBy: {createdAt: "desc"}
    })).map(toVM),
    {page, limit}
  );
};

const ask = async (userId: string, body: QnaQuestionCreateBody) => {
  const q = await prisma.qnaQuestion.create({
    data: {
      authorId: body.isAnonymous ? null : userId,
      targetUserId: body.targetUserId ?? null,
      challengeId: body.challengeId ?? null,
      title: body.title, body: body.body, isAnonymous: body.isAnonymous ?? false,
    },
  });
  return toVM(q);
};

const answer = async (userId: string, body: QnaAnswerCreateBody) => {
  const q = await prisma.qnaQuestion.findUnique({where: {id: body.questionId}});
  if (!q) throw error('Question not found', 404);
  const a = await prisma.qnaAnswer.create({data: {questionId: q.id, authorId: userId, body: body.body}});
  return a;
};

export default {list, ask, answer};