export type ChallengeCard = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
  isPremium: boolean;
  createdById: string | null;
  createdAt: Date;
};

export const toChallengeCard = (c: any): ChallengeCard => ({
  id: c.id,
  title: c.title,
  description: c.description ?? null,
  category: c.category ?? null,
  level: c.level ?? null,
  isPremium: c.isPremium,
  createdById: c.createdById ?? null,
  createdAt: c.createdAt,
});

export type TaskItem = {
  id: string;
  order: number;
  type: "TEXT" | "QUIZ" | "CHECKLIST" | "VIDEO";
  title: string;
  content: any;
  isRequired: boolean;
};
export const toTaskItem = (t: any): TaskItem => ({
  id: t.id,
  order: t.order,
  type: t.type,
  title: t.title,
  content: t.content,
  isRequired: t.isRequired,
});
