export interface PaginationVm<T> {
  pageInfoResult: PageInfoResult;
  orderBy: string;
  orderByDesc: boolean;
  result: T[];
}

export interface PageInfoResult {
  currentPage?: number;
  pageSize?: number;
  totalItems?: number;
}
