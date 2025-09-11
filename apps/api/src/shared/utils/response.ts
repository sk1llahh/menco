import type { ApiResponse } from "@repo/types";
import type { Response } from "express";

export function ok<T>(res: Response, data: T, status = 200): void {
  if (res.headersSent) return;
  const body: ApiResponse<T> = { success: true, data } as ApiResponse<T>;
  res.status(status).json(body);
}

export function fail(
  res: Response,
  error: unknown,
  fallbackStatus = 400
): void {
  if (res.headersSent) return;

  const anyErr = error as any;
  const status = numberOr(anyErr?.status ?? anyErr?.statusCode, fallbackStatus);

  const message =
    typeof error === "string" ? error : (anyErr?.message ?? "Bad request");

  const payload = {
    success: false as const,
    error: {
      message,
      code: anyErr?.code ?? status,
      details: anyErr?.details,
    },
  };

  res.status(status).json(payload);
}

const numberOr = (v: unknown, or: number): number => {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : or;
};
