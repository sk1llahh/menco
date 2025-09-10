import { z } from "zod";

export const SubscriptionListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  userId: z.string().optional(),
  isActive: z.enum(["true", "false"]).optional(),
});

export const SubscriptionIdParamsSchema = z.object({ id: z.string().min(1) });

export const SubscriptionCreateSchema = z.object({
  planId: z.string().min(1),
});

export const SubscriptionCancelSchema = z.object({
  reason: z.string().optional(),
});

export type SubscriptionListQuery = z.output<
  typeof SubscriptionListQuerySchema
>;
export type SubscriptionIdParams = z.output<typeof SubscriptionIdParamsSchema>;
export type SubscriptionCreateBody = z.output<typeof SubscriptionCreateSchema>;
export type SubscriptionCancelBody = z.output<typeof SubscriptionCancelSchema>;
