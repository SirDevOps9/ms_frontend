// export interface PageInfo {
//   offset: number;
//   pageSize: number;
// }

export class PageInfo {
  constructor(offset: number = 1, pageSize: number = 10) {
    this.pageSize = pageSize;
    this.offset = offset;
  }
  offset: number;
  pageSize: number;

  get toQuery(): string {
    let query = `Filter.PageInfo.Offset=${this.offset}&Filter.PageInfo.PageSize=${this.pageSize}`;
    return query;
  }
}
