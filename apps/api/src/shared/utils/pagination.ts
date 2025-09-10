import type {
  PageMeta,
  PageResult,
  PaginationParams,
  PaginationQuery,
} from "@repo/types";

const DEFAULT_PAGE = 1 as const;
const DEFAULT_LIMIT = 20 as const;
const MAX_LIMIT = 100 as const;

export function parsePagination(
  query?: PaginationQuery | null
): PaginationParams {
  const p = Number(query?.page ?? DEFAULT_PAGE);
  const l = Number(query?.limit ?? DEFAULT_LIMIT);
  const page = Number.isFinite(p) && p >= 1 ? Math.floor(p) : DEFAULT_PAGE;
  const limit = Number.isFinite(l)
    ? Math.min(Math.max(1, Math.floor(l)), MAX_LIMIT)
    : DEFAULT_LIMIT;
  return { page, limit };
}

export function buildMeta(
  totalItems: number,
  { page, limit }: PaginationParams
): PageMeta {
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));
  const safePage = Math.min(page, totalPages);
  const offset = (safePage - 1) * limit;
  return {
    page: safePage,
    limit,
    totalItems,
    totalPages,
    offset,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };
}

export async function paginate<T>(
  totalCountFn: () => Promise<number>,
  pageFetchFn: (offset: number, limit: number) => Promise<T[]>,
  params: PaginationParams
): Promise<PageResult<T>> {
  const meta = buildMeta(await totalCountFn(), params);
  const items =
    meta.totalItems === 0 ? [] : await pageFetchFn(meta.offset, meta.limit);
  return { items, meta };
}
