import { z } from "zod";

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.output<typeof PaginationQuerySchema>;

export type PaginationParams = { page: number; limit: number };

export type PageMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  offset: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PageResult<T> = { items: T[]; meta: PageMeta };
