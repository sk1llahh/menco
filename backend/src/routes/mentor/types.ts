export type Currency = 'KZT' | 'USD' | 'EUR' | 'RUB';

export interface MentorProfileUpsertBody {
  title?: string;
  about?: string;
  ratePerHour?: number;
  currency?: Currency;
  skills?: string[];
}

export interface AvailabilityCreateBody {
  startsAt: string;
  endsAt: string;
}

export type SessionStatus =
  | 'REQUESTED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELED'
  | 'NO_SHOW';

export interface SessionCreateBody {
  mentorId: string;
  studentId?: string;
  startsAt: string;
  endsAt: string;
  price?: number;
  currency?: Currency;
}
