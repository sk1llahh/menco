import { z } from "zod";

export const MentorSearchQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(), 
  minRating: z.coerce.number().min(0).max(5).optional(),
  maxRate: z.coerce.number().positive().optional(),
  skill: z.string().optional(),
});

export const MentorUpdateSchema = z.object({
  title: z.string().optional(),
  about: z.string().optional(),
  ratePerHour: z.coerce.number().positive().optional(),
  currency: z.enum(["KZT", "USD", "EUR", "RUB"]).optional(),
});

export const AvailabilityUpsertSchema = z.object({
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
});
export const AvailabilityIdParamsSchema = z.object({ id: z.string().min(1) });
export const AvailabilityListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(50),
});

export const ApplicationCreateSchema = z.object({
  message: z.string().optional(),
});
export const ApplicationUpdateSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "REJECTED", "CANCELED"]),
});

export type MentorSearchQuery = z.output<typeof MentorSearchQuerySchema>;
export type MentorUpdateBody = z.output<typeof MentorUpdateSchema>;
export type AvailabilityUpsertBody = z.output<typeof AvailabilityUpsertSchema>;
export type AvailabilityIdParams = z.output<typeof AvailabilityIdParamsSchema>;
export type AvailabilityListQuery = z.output<
  typeof AvailabilityListQuerySchema
>;
export type ApplicationCreateBody = z.output<typeof ApplicationCreateSchema>;
export type ApplicationUpdateBody = z.output<typeof ApplicationUpdateSchema>;
