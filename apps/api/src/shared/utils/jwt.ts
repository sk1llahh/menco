import jwt from "jsonwebtoken";
import { CONFIG } from "@/shared/utils/config";
import type { JwtAccessPayload } from "@repo/types";

export function signAccessToken(payload: JwtAccessPayload): string {
  return jwt.sign(payload, CONFIG.JWT_SECRET, {
    expiresIn: CONFIG.ACCESS_TTL as any,
  });
}

export function verifyAccessToken(token: string): JwtAccessPayload {
  return jwt.verify(token, CONFIG.JWT_SECRET) as JwtAccessPayload;
}
