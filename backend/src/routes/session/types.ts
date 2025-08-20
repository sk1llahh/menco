import { PageResult, PaginationQuery } from "@/interfaces/pagination";

export type SessionStatus = "REQUESTED" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "NO_SHOW";
export type Currency = "KZT" | "USD" | "EUR" | "RUB";

export interface SessionCreateBody {
  mentorId: string;
  startsAt: string | Date;
  endsAt: string | Date;
  price?: number | null;
  currency?: Currency;
  meetUrl?: string | null;
  notes?: string | null;
}

export interface SessionListQuery extends PaginationQuery {
  role?: "mentor" | "student";
  status?: SessionStatus;
}

export interface SessionUpdateStatusBody {
  status: SessionStatus;
}

export interface ReviewCreateBody {
  sessionId: string;
  rating: number;
  comment?: string | null;
}