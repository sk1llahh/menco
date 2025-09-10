export type MentorCard = {
  userId: string;
  name: string | null;
  title: string | null;
  about: string | null;
  ratePerHour: number | null;
  currency: "KZT" | "USD" | "EUR" | "RUB" | null;
  ratingAvg: number;
  ratingCount: number;
  isVerified: boolean;
  skills: string[];
};

export const toMentorCard = (row: any): MentorCard => ({
  userId: row.userId,
  name: row.user?.name ?? null,
  title: row.title ?? null,
  about: row.about ?? null,
  ratePerHour: row.ratePerHour ? Number(row.ratePerHour) : null,
  currency: row.currency ?? null,
  ratingAvg: row.ratingAvg,
  ratingCount: row.ratingCount,
  isVerified: row.isVerified,
  skills: row.skills?.map((s: any) => s.skill.name) ?? [],
});
