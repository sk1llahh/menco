import { z } from "zod";

export const ChallengeListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
  category: z.string().optional(),
  isPremium: z.enum(["true", "false"]).optional(),
});

export const ChallengeCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  category: z.string().optional(),
  level: z.string().optional(),
  isPremium: z.boolean().default(false),
});

export const ChallengeIdParamsSchema = z.object({ id: z.string().min(1) });

export const TaskListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
});

export const TaskCreateSchema = z.object({
  order: z.coerce.number().int().min(1),
  type: z.enum(["TEXT", "QUIZ", "CHECKLIST", "VIDEO"]).default("TEXT"),
  title: z.string().min(1),
  content: z.any(),
  isRequired: z.boolean().default(true),
});
export const TaskIdParamsSchema = z.object({ id: z.string().min(1) });

export type ChallengeListQuery = z.output<typeof ChallengeListQuerySchema>;
export type ChallengeCreateBody = z.output<typeof ChallengeCreateSchema>;
export type ChallengeIdParams = z.output<typeof ChallengeIdParamsSchema>;
export type TaskListQuery = z.output<typeof TaskListQuerySchema>;
export type TaskCreateBody = z.output<typeof TaskCreateSchema>;
export type TaskIdParams = z.output<typeof TaskIdParamsSchema>;
