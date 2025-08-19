export type PayPurpose = "SUBSCRIPTION" | "SESSION" | "CHALLENGE";
export type PayCurrency = "KZT" | "USD" | "EUR" | "RUB";

export interface PaymentSessionCreateBody {
  purpose: PayPurpose;
  amount: number;
  currency?: PayCurrency;
  sessionId?: string;
  subscriptionId?: string;
}
