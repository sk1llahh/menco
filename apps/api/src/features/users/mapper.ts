import type { UserItem } from "@repo/types";

export const toUserItem = (u: any): UserItem => ({
  id: u.id,
  login: u.login,
  email: u.email ?? null,
  name: u.name ?? null,
  avatarUrl: u.avatarUrl ?? null,
  mode: u.mode,
  status: u.status,
  createdAt: u.createdAt,
});
