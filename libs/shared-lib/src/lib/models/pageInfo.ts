// export interface PageInfo {
//   offset: number;
//   pageSize: number;
// }

export class PageInfo {
  constructor(pageNumber: number = 1, pageSize: number = 10) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }
  pageNumber: number;
  pageSize: number;

  get toQuery(): string {
    let query = `PageInfo.PageNumber=${this.pageNumber}&PageInfo.PageSize=${this.pageSize}`;
    return query;
  }
}
