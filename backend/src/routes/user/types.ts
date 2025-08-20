import { PageResult, PaginationQuery } from "@/interfaces/pagination";

export type UserMode = "LEARNER" | "MENTOR" | "BOTH";
export type UserStatus = "ACTIVE" | "BLOCKED";

export interface SafeUser {
  id: string;
  login: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  timezone?: string | null;
  locale?: string | null;
  mode: UserMode;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface UsersListQuery extends PaginationQuery {
  q?: string;
  status?: UserStatus;
  mode?: UserMode;
}
export type UsersListResult = PageResult<SafeUser>;

export interface UpdateMeBody {
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  timezone?: string | null;
  locale?: string | null;
}
export interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}
export interface SetUserStatusBody { status: UserStatus; }
export interface SetUserModeBody { mode: UserMode; }

export interface CreateUserBody {
  login: string;
  password: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  timezone?: string | null;
  locale?: string | null;
  mode?: UserMode;
  status?: UserStatus;
}
