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
    let query = `PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`;
    return query;
  }
}
