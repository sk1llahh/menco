import { PageResult, PaginationQuery } from "@/interfaces/pagination";

export interface ChallengeCreateBody {
  title: string;
  description?: string | null;
  category?: string | null;
  level?: string | null;
  isPremium?: boolean;
}
export type ChallengeUpdateBody = Partial<ChallengeCreateBody>

export interface ChallengeListQuery extends PaginationQuery {
  category?: string;
  level?: string;
  isPremium?: boolean;
}

export interface ChallengeVM {
  id: string;
  title: string;
  description?: string | null;
  category?: string | null;
  level?: string | null;
  isPremium: boolean;
  createdById?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ChallengeListResult = PageResult<ChallengeVM>;

export type TaskType = "TEXT" | "QUIZ" | "CHECKLIST" | "VIDEO";

export interface TaskCreateBody {
  challengeId: string;
  order: number;
  type?: TaskType;
  title: string;
  content: unknown;
  isRequired?: boolean;
}

export interface TaskUpdateBody extends Partial<Omit<TaskCreateBody, "challengeId" | "order">> {
  order?: number;
}

export interface EnrollBody { challengeId: string; }

export type ProgressStatus = "PENDING" | "COMPLETED" | "SKIPPED";
export interface ProgressSetBody {
  taskId: string;
  status: ProgressStatus;
  notes?: string | null;
}
