export type SubscriptionItem = {
  id: string;
  userId: string;
  planId: string;
  isActive: boolean;
  currentPeriodEnd: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export const toSubscriptionItem = (s: any): SubscriptionItem => ({
  id: s.id,
  userId: s.userId,
  planId: s.planId,
  isActive: s.isActive,
  currentPeriodEnd: s.currentPeriodEnd,
  createdAt: s.createdAt,
  updatedAt: s.updatedAt,
});
