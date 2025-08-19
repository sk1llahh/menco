export type IntString = number | `${number}`;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationQuery {
  page?: IntString;
  limit?: IntString;
  q?: string;
}

export interface PageMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  offset: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PageResult<T> {
  items: T[];
  meta: PageMeta;
}