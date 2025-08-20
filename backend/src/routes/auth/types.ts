export interface LoginBody { login: string; password: string; }
export interface RegisterBody extends LoginBody {
  email?: string;
  name?: string;
  avatarUrl?: string;
  timezone?: string;
}
export interface RefreshBody { refreshToken: string; }

export interface AuthUser {
  id: string; login: string;
  email?: string | null; name?: string | null; avatarUrl?: string | null;
  createdAt: Date; updatedAt: Date;
}
export interface AuthResult {
  accessToken: string; refreshToken: string; user: AuthUser;
}