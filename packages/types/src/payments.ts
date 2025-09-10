import { z } from "zod";

export const PaymentListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  userId: z.string().optional(),
  status: z.enum(["PENDING", "SUCCEEDED", "FAILED", "REFUNDED"]).optional(),
  purpose: z.string().optional(), // "SUBSCRIPTION" | "SESSION" | "CHALLENGE"
});

export const PaymentIdParamsSchema = z.object({ id: z.string().min(1) });

export const PaymentCreateSchema = z.object({
  amount: z.coerce.number().positive(),
  currency: z.enum(["KZT", "USD", "EUR", "RUB"]).default("KZT"),
  purpose: z.string().min(1),
  sessionId: z.string().optional(),
  subscriptionId: z.string().optional(),
  meta: z.record(z.any()).optional(),
});

export const PaymentUpdateStatusSchema = z.object({
  status: z.enum(["PENDING", "SUCCEEDED", "FAILED", "REFUNDED"]),
  meta: z.record(z.any()).optional(),
});

export type PaymentListQuery = z.output<typeof PaymentListQuerySchema>;
export type PaymentIdParams = z.output<typeof PaymentIdParamsSchema>;
export type PaymentCreateBody = z.output<typeof PaymentCreateSchema>;
export type PaymentUpdateStatusBody = z.output<
  typeof PaymentUpdateStatusSchema
>;
