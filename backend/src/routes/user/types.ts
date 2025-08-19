import {PaginationQuery} from "@/interfaces/pagination";

export interface SafeUser {
  id: string;
  login: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserUpdate {
  name?: string,
  avatarUrl?: string,
  bio?: string,
  timezone?: string,
  locale?: string
}

export interface UsersListQuery extends PaginationQuery {
  q?: string;
}
