import { z } from "zod";

export const SessionListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  mentorId: z.string().optional(),
  studentId: z.string().optional(),
  status: z
    .enum(["REQUESTED", "CONFIRMED", "COMPLETED", "CANCELED", "NO_SHOW"])
    .optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
});

export const SessionCreateSchema = z.object({
  mentorId: z.string().min(1),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  price: z.coerce.number().positive().optional(),
  currency: z.enum(["KZT", "USD", "EUR", "RUB"]).optional(),
  meetUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

export const SessionIdParamsSchema = z.object({ id: z.string().min(1) });

export const SessionUpdateStatusSchema = z.object({
  status: z.enum([
    "REQUESTED",
    "CONFIRMED",
    "COMPLETED",
    "CANCELED",
    "NO_SHOW",
  ]),
  meetUrl: z.string().url().optional(),
  notes: z.string().optional(),
});

export const ReviewCreateSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().optional(),
});

export type SessionListQuery = z.output<typeof SessionListQuerySchema>;
export type SessionCreateBody = z.output<typeof SessionCreateSchema>;
export type SessionIdParams = z.output<typeof SessionIdParamsSchema>;
export type SessionUpdateStatusBody = z.output<
  typeof SessionUpdateStatusSchema
>;
export type ReviewCreateBody = z.output<typeof ReviewCreateSchema>;
