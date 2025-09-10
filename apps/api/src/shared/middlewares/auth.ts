import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "@/shared/utils/jwt";

export function authGuard(
  req: Request & { user?: { userId: string; login: string } },
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
    req.user = { userId: payload.userId, login: payload.login };
    next();
  } catch {
    return res
      .status(401)
      .json({ success: false, error: { message: "Invalid token" } });
  }
}
