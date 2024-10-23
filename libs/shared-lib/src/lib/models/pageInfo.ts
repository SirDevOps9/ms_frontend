// export interface PageInfo {
//   offset: number;
//   pageSize: number;
// }

import { SortBy } from "./sort-by";



export class PageInfo {
  constructor(
    pageNumber: number = 1,
    pageSize: number = 25,
    first: number = 0,
    sortBy: SortBy = SortBy.Descending,
    sortColumn: string | undefined = undefined
  ) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.first = first;
    this.sortBy = sortBy;
    this.sortColumn = sortColumn;
  }
  pageNumber: number;
  pageSize: number;
  first: number;
  sortBy: SortBy;
  sortColumn: string | undefined;
  get toQuery(): string {
    let query = `PageNumber=${this.pageNumber}&PageSize=${this.pageSize}&SortBy=${this.sortBy}`;
    if (this.sortColumn) query += `&SortColumn=${this.sortColumn}`;
    return query;
  }
}
