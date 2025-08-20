import { PageResult, PaginationQuery } from "@/interfaces/pagination";

export interface MentorProfileUpsertBody {
  title?: string | null;
  about?: string | null;
  ratePerHour?: number | null;
  currency?: "KZT" | "USD" | "EUR" | "RUB";
  skills?: string[];
}

export interface MentorApplicationBody {
  message?: string | null;
}

export interface MentorRequestBody {
  mentorId: string;
  message?: string | null;
}

export interface MentorCardVM {
  id: string;
  userId: string;
  title?: string | null;
  about?: string | null;
  ratePerHour?: number | null;
  currency?: string | null;
  ratingAvg: number;
  ratingCount: number;
  isVerified: boolean;
}

export interface MentorListQuery extends PaginationQuery {
  q?: string;
  minRate?: number;
  maxRate?: number;
}

export type MentorListResult = PageResult<MentorCardVM>;