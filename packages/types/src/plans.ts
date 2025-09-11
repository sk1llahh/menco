import { z } from "zod";

export const PlanListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  currency: z.enum(["KZT", "USD", "EUR", "RUB"]).optional(),
  interval: z.enum(["MONTH", "YEAR"]).optional(),
  q: z.string().optional(),
});

export const PlanIdParamsSchema = z.object({ id: z.string().min(1) });

export const PlanCreateSchema = z.object({
  name: z.string().min(2),
  price: z.coerce.number().nonnegative(),
  currency: z.enum(["KZT", "USD", "EUR", "RUB"]).default("KZT"),
  interval: z.enum(["MONTH", "YEAR"]).default("MONTH"),
  features: z.string().optional(),
});

export const PlanUpdateSchema = PlanCreateSchema.partial();

export type PlanListQuery = z.output<typeof PlanListQuerySchema>;
export type PlanIdParams = z.output<typeof PlanIdParamsSchema>;
export type PlanCreateBody = z.output<typeof PlanCreateSchema>;
export type PlanUpdateBody = z.output<typeof PlanUpdateSchema>;
