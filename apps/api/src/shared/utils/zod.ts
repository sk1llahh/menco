import dayjs from "dayjs";
import { z } from "zod";

export const idParamSchema = z.object({
  id: z.string().min(1),
});

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const isoDateSchema = z
  .union([z.string(), z.date()])
  .transform((v) => (typeof v === "string" ? dayjs(v).toDate() : v));
