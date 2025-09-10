export type AuthUser = {
  id: string;
  login: string;
  email?: string | null;
  name?: string | null;
  avatarUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResult = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export const toAuthUser = (u: any): AuthUser => ({
  id: u.id,
  login: u.login,
  email: u.email ?? null,
  name: u.name ?? null,
  avatarUrl: u.avatarUrl ?? null,
  createdAt: u.createdAt,
  updatedAt: u.updatedAt,
});
