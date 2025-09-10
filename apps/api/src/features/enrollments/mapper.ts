export type EnrollmentItem = {
  id: string;
  userId: string;
  challengeId: string;
  startedAt: Date;
  completedAt: Date | null;
  isActive: boolean;
};

export const toEnrollmentItem = (e: any): EnrollmentItem => ({
  id: e.id,
  userId: e.userId,
  challengeId: e.challengeId,
  startedAt: e.startedAt,
  completedAt: e.completedAt,
  isActive: e.isActive,
});
