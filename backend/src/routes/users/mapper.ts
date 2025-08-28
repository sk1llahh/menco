export type UserItem = {
  id: string;
  login: string;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
  mode: 'LEARNER' | 'MENTOR' | 'BOTH';
  status: 'ACTIVE' | 'BLOCKED';
  createdAt: Date;
};

export const toUserItem = (u: any): UserItem => ({
  id: u.id,
  login: u.login,
  email: u.email ?? null,
  name: u.name ?? null,
  avatarUrl: u.avatarUrl ?? null,
  mode: u.mode,
  status: u.status,
  createdAt: u.createdAt,
});
