// export interface PageInfo {
//   offset: number;
//   pageSize: number;
// }

export class PageInfo {
  constructor(pageNumber: number = 1, pageSize: number = 10 , first : number = 0) {
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.first = first;
  }
  pageNumber: number;
  pageSize: number;
  first : number;
  get toQuery(): string {
    let query = `PageNumber=${this.pageNumber}&PageSize=${this.pageSize}`;
    return query;
  }
}
