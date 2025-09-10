import type { NextFunction, Request, Response } from "express";
import { fail } from "@/shared/utils/response";

export function notFound(_req: Request, res: Response): void {
  fail(res, "Route not found", 404);
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  fail(res, err, 500);
}
