export type SessionItem = {
  id: string;
  mentorId: string;
  studentId: string;
  startsAt: Date;
  endsAt: Date;
  status: "REQUESTED" | "CONFIRMED" | "COMPLETED" | "CANCELED" | "NO_SHOW";
  price: number | null;
  currency: "KZT" | "USD" | "EUR" | "RUB" | null;
  meetUrl: string | null;
  notes: string | null;
  createdAt: Date;
};

export const toSessionItem = (s: any): SessionItem => ({
  id: s.id,
  mentorId: s.mentorId,
  studentId: s.studentId,
  startsAt: s.startsAt,
  endsAt: s.endsAt,
  status: s.status,
  price: s.price ? Number(s.price) : null,
  currency: s.currency ?? null,
  meetUrl: s.meetUrl ?? null,
  notes: s.notes ?? null,
  createdAt: s.createdAt,
});

export type ReviewItem = {
  id: string;
  sessionId: string;
  authorId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
};

export const toReviewItem = (r: any): ReviewItem => ({
  id: r.id,
  sessionId: r.sessionId,
  authorId: r.authorId,
  rating: r.rating,
  comment: r.comment ?? null,
  createdAt: r.createdAt,
});
