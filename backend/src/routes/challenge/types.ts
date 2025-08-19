export type TaskType = 'TEXT' | 'QUIZ' | 'CHECKLIST' | 'VIDEO';

export interface ChallengeCreateBody {
  title: string;
  description?: string;
  category?: string;
  level?: string;
  isPremium?: boolean;
}

export interface TaskCreateBody {
  order: number;
  type: TaskType;
  title: string;
  content: any;
  isRequired?: boolean;
}
