import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { IinvoiceDto } from './model/purchase-invoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsProxyService {
  httpService = inject(HttpService);

  constructor() {}

  // list of purchase inv

  getInvoiceList(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<IinvoiceDto>> {
    let query = `Invoice?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<PaginationVm<IinvoiceDto>>(query);
  }

  // export invoice data

  exportInvoiceListData(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<IinvoiceDto[]> {
    let query = `Invoice/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<IinvoiceDto[]>(query);
  }
}
