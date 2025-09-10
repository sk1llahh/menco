import { z } from "zod";

export const EnrollmentListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  userId: z.string().optional(),
  challengeId: z.string().optional(),
  isActive: z.enum(["true", "false"]).optional(),
});

export const EnrollmentCreateSchema = z.object({
  challengeId: z.string().min(1),
});

export const EnrollmentIdParamsSchema = z.object({ id: z.string().min(1) });

export type EnrollmentListQuery = z.output<typeof EnrollmentListQuerySchema>;
export type EnrollmentCreateBody = z.output<typeof EnrollmentCreateSchema>;
export type EnrollmentIdParams = z.output<typeof EnrollmentIdParamsSchema>;
