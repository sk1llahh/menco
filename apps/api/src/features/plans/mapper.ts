export type PlanItem = {
  id: string;
  name: string;
  price: number;
  currency: "KZT" | "USD" | "EUR" | "RUB";
  interval: "MONTH" | "YEAR";
  features: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export const toPlanItem = (p: any): PlanItem => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  currency: p.currency,
  interval: p.interval,
  features: p.features ?? null,
  createdAt: p.createdAt,
  updatedAt: p.updatedAt,
});
