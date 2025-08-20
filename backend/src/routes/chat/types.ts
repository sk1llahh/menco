import { PageResult, PaginationQuery } from "@/interfaces/pagination";

export type ChatType = "DIRECT" | "GROUP";

export interface ChatCreateBody {
  type?: ChatType;
  title?: string | null;
  memberIds: string[];
  challengeId?: string | null;
}

export interface MessageCreateBody {
  chatId: string;
  type?: "TEXT" | "IMAGE" | "FILE" | "SYSTEM";
  content: string;
  meta?: unknown;
}

export interface ChatListQuery extends PaginationQuery {
  type?: ChatType;
}

export interface ChatVM {
  id: string;
  type: ChatType;
  title?: string | null;
  createdById?: string | null;
  challengeId?: string | null;
  createdAt: Date;
}

export type ChatListResult = PageResult<ChatVM>;