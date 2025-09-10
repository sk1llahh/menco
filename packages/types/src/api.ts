export type ApiResponse<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: { message: string; code?: string | number; details?: unknown };
    };

export type HealthResponse = ApiResponse<{ ok: true; ts: string }>;
