import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { SalesInvoiceListView } from './models/sales-invoice-dto';
import { ReturnInvoiceListView } from './models/return-Invoice-dto';


@Injectable({
  providedIn: 'root'
})
export class TransactionProxyService {

  constructor(private httpService: HttpService) { }

  getSalesInvoiceList(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<SalesInvoiceListView>> {
    let query = `SalesInvoice?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<SalesInvoiceListView>>(query);
  }

  exportSalesInvoiceList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<SalesInvoiceListView[]> {
    let query = `SalesInvoice/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<SalesInvoiceListView[]>(query);
  }

  getReturnSalesInvoiceList(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<ReturnInvoiceListView>> {
    let query = `ReturnSalesInvoice?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<ReturnInvoiceListView>>(query);
  }

  exportReturnSalesInvoiceList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<ReturnInvoiceListView[]> {
    let query = `ReturnSalesInvoice/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<ReturnInvoiceListView[]>(query);
  }
}
