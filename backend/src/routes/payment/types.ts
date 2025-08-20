import {PageResult, PaginationQuery} from "@/interfaces/pagination";

export type PaymentStatus = "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
export type Currency = "KZT" | "USD" | "EUR" | "RUB";

export interface PaymentCreateBody {
  amount: number;
  currency?: Currency;
  purpose: string;
  sessionId?: string | null;
  subscriptionId?: string | null;
  meta?: unknown;
}

export interface PaymentsListQuery extends PaginationQuery {
  status?: PaymentStatus;
  purpose?: string;
}