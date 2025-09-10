export type QnaQuestionItem = {
  id: string;
  title: string;
  body: string;
  isAnonymous: boolean;
  authorId: string | null;
  targetUserId: string | null;
  challengeId: string | null;
  createdAt: Date;
};

export const toQnaQuestionItem = (q: any): QnaQuestionItem => ({
  id: q.id,
  title: q.title,
  body: q.body,
  isAnonymous: q.isAnonymous,
  authorId: q.authorId ?? null,
  targetUserId: q.targetUserId ?? null,
  challengeId: q.challengeId ?? null,
  createdAt: q.createdAt,
});

export type QnaAnswerItem = {
  id: string;
  questionId: string;
  authorId: string | null;
  body: string;
  createdAt: Date;
};

export const toQnaAnswerItem = (a: any): QnaAnswerItem => ({
  id: a.id,
  questionId: a.questionId,
  authorId: a.authorId ?? null,
  body: a.body,
  createdAt: a.createdAt,
});
