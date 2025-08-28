import jwt from "jsonwebtoken";
import { CONFIG } from "./config";

export interface AccessPayload {
  userId: string;
  login: string;
  iat?: number;
  exp?: number;
}

export function signAccessToken(payload: AccessPayload): string {
  return jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: CONFIG.ACCESS_TTL });
}

export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, CONFIG.JWT_SECRET) as AccessPayload;
}
