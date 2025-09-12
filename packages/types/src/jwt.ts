export interface JwtAccessPayload {
  userId: string;
  login: string;
  iat?: number;
  exp?: number;
}