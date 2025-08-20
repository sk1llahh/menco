import {PageResult, PaginationQuery} from "@/interfaces/pagination";

export interface QnaQuestionCreateBody {
  title: string;
  body: string;
  isAnonymous?: boolean;
  targetUserId?: string | null;
  challengeId?: string | null;
}

export interface QnaAnswerCreateBody {
  questionId: string;
  body: string;
}

export interface QnaListQuery extends PaginationQuery {
  targetUserId?: string;
  challengeId?: string;
}

export interface QnaQuestionVM {
  id: string;
  title: string;
  body: string;
  isAnonymous: boolean;
  authorId?: string | null;
  targetUserId?: string | null;
  challengeId?: string | null;
  createdAt: Date;
}

export type QnaListResult = PageResult<QnaQuestionVM>;
