import { z } from "zod";

export const ProgressListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  userId: z.string().optional(),
  taskId: z.string().optional(),
  status: z.enum(["PENDING", "COMPLETED", "SKIPPED"]).optional(),
});

export const ProgressUpdateSchema = z.object({
  status: z.enum(["PENDING", "COMPLETED", "SKIPPED"]),
  notes: z.string().optional(),
});

export const ProgressIdParamsSchema = z.object({ id: z.string().min(1) });

export type ProgressListQuery = z.output<typeof ProgressListQuerySchema>;
export type ProgressUpdateBody = z.output<typeof ProgressUpdateSchema>;
export type ProgressIdParams = z.output<typeof ProgressIdParamsSchema>;
