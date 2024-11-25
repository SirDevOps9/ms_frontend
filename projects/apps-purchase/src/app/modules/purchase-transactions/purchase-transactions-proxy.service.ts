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

  getInvoiceList(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<IinvoiceDto>> {
    let query = `Invoice
?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<PaginationVm<IinvoiceDto>>(query);
  }
}
