export type PaymentItem = {
  id: string;
  userId: string;
  amount: number;
  currency: "KZT" | "USD" | "EUR" | "RUB";
  status: "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED";
  purpose: string;
  sessionId: string | null;
  subscriptionId: string | null;
  meta: any | null;
  createdAt: Date;
};

export const toPaymentItem = (p: any): PaymentItem => ({
  id: p.id,
  userId: p.userId,
  amount: Number(p.amount),
  currency: p.currency,
  status: p.status,
  purpose: p.purpose,
  sessionId: p.sessionId ?? null,
  subscriptionId: p.subscriptionId ?? null,
  meta: p.meta ?? null,
  createdAt: p.createdAt,
});
