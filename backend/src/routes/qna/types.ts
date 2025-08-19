export interface QuestionCreateBody {
  title: string;
  body: string;
  isAnonymous?: boolean;
  targetUserId?: string;
  challengeId?: string;
}

export interface AnswerCreateBody {
  body: string;
}
