import { PaginationQuery } from "@/interfaces/pagination";

export interface NotificationsListQuery extends PaginationQuery {
  unread?: "true" | "false";
}