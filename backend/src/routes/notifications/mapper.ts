export type NotificationItem = {
  id: string;
  userId: string;
  type: string;
  payload: any | null;
  readAt: Date | null;
  createdAt: Date;
};

export const toNotificationItem = (n: any): NotificationItem => ({
  id: n.id,
  userId: n.userId,
  type: n.type,
  payload: n.payload ?? null,
  readAt: n.readAt ?? null,
  createdAt: n.createdAt,
});
