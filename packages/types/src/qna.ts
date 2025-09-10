import { z } from "zod";

export const QnaListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(), // поиск по title/body
  targetUserId: z.string().optional(), // вопросы конкретному ментору
  challengeId: z.string().optional(), // вопросы по челленджу
  authorId: z.string().optional(),
  onlyAnonymous: z.enum(["true", "false"]).optional(),
});

export const QnaIdParamsSchema = z.object({ id: z.string().min(1) });

export const QnaCreateSchema = z.object({
  title: z.string().min(3),
  body: z.string().min(1),
  isAnonymous: z.boolean().default(false),
  targetUserId: z.string().optional(),
  challengeId: z.string().optional(),
});

export const QnaUpdateSchema = z.object({
  title: z.string().min(3).optional(),
  body: z.string().min(1).optional(),
  isAnonymous: z.boolean().optional(),
  targetUserId: z.string().optional().nullable(),
  challengeId: z.string().optional().nullable(),
});

export const AnswerListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export const AnswerIdParamsSchema = z.object({ id: z.string().min(1) });

export const AnswerCreateSchema = z.object({
  body: z.string().min(1),
});

export const AnswerUpdateSchema = z.object({
  body: z.string().min(1),
});

export type QnaListQuery = z.output<typeof QnaListQuerySchema>;
export type QnaIdParams = z.output<typeof QnaIdParamsSchema>;
export type QnaCreateBody = z.output<typeof QnaCreateSchema>;
export type QnaUpdateBody = z.output<typeof QnaUpdateSchema>;

export type AnswerListQuery = z.output<typeof AnswerListQuerySchema>;
export type AnswerIdParams = z.output<typeof AnswerIdParamsSchema>;
export type AnswerCreateBody = z.output<typeof AnswerCreateSchema>;
export type AnswerUpdateBody = z.output<typeof AnswerUpdateSchema>;
