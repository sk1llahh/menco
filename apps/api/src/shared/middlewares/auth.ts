import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "@/shared/utils/jwt";
import { CONFIG } from "@/shared/utils/config";

export function authGuard(
  req: Request & { user?: { userId: string; login: string; isAdmin?: boolean } },
  res: Response,
  next: NextFunction
) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ success: false, error: { message: "Unauthorized" } });
  try {
    const payload = verifyAccessToken(h.split(" ")[1]);
    const isAdmin = CONFIG.ADMIN_LOGINS.includes(payload.login);
    req.user = { userId: payload.userId, login: payload.login, isAdmin };
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, error: { message: "Invalid token" } });
  }
}

export function requireAdmin(
  req: Request & { user?: { userId: string; login: string; isAdmin?: boolean } },
  res: Response,
  next: NextFunction
) {
  const h = req.headers.authorization;
  if (!h?.startsWith("Bearer "))
    return res
      .status(401)
      .json({ success: false, error: { message: "Unauthorized" } });
  try {
    const payload = verifyAccessToken(h.split(" ")[1]);
    const isAdmin = CONFIG.ADMIN_LOGINS.includes(payload.login);
    if (!isAdmin) {
      return res
        .status(403)
        .json({ success: false, error: { message: "Forbidden" } });
    }
    req.user = { userId: payload.userId, login: payload.login, isAdmin };
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, error: { message: "Invalid token" } });
  }
}
