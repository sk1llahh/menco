import { z } from "zod";

export const NotificationListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  unreadOnly: z.enum(["true", "false"]).optional(),
});

export const NotificationIdParamsSchema = z.object({ id: z.string().min(1) });

export type NotificationListQuery = z.output<
  typeof NotificationListQuerySchema
>;
export type NotificationIdParams = z.output<typeof NotificationIdParamsSchema>;
