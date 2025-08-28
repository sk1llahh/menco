import { z } from 'zod';

export const UsersListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
  mode: z.enum(['LEARNER', 'MENTOR', 'BOTH']).optional(),
  status: z.enum(['ACTIVE', 'BLOCKED']).optional(),
});

export const UserIdParamsSchema = z.object({ id: z.string().min(1) });

export const UserUpdateSchema = z.object({
  name: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  bio: z.string().optional(),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});

export type UsersListQuery = z.output<typeof UsersListQuerySchema>;
export type UserIdParams = z.output<typeof UserIdParamsSchema>;
export type UserUpdateBody = z.output<typeof UserUpdateSchema>;
