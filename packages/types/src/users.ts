import { z } from "zod";
import { UserModeSchema, UserStatusSchema } from "./common";

export const UsersListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  q: z.string().optional(),
  mode: UserModeSchema.optional(),
  status: UserStatusSchema.optional(),
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

// Shared shape for user items (as exposed by API)
export type UserItem = {
  id: string;
  login: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  mode: "LEARNER" | "MENTOR" | "BOTH";
  status: "ACTIVE" | "BLOCKED";
  createdAt: Date;
};
