export interface ApiErrorShape {
  message: string,
  code?: string | number,
  details?: unknown
}

export interface ApiResponse<T> {
  success: boolean,
  data?: T,
  error?: ApiErrorShape
}
