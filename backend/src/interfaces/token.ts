export interface AccessPayload {
  userId: string;
  login: string;
  iat?: number;
  exp?: number;
}
