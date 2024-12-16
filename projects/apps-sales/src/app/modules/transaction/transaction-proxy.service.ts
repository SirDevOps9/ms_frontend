import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import {
  AddSalesReturnDto,
  customerDto,
  ReturnSalesInvoiceObj,
  SalesInvoiceLookup,
} from './models/return-sales-dto';
import { updateReturnSalesInvice } from './models';

@Injectable({
  providedIn: 'root',
})
export class TransactionProxyService {
  constructor(private httpService: HttpService) {}

  // get customer list dropdown
  getCustomerList(searchTerm: string): Observable<customerDto[]> {
    let query = `Customer/LatestCustomerWithCurrencyLookup?`;
    if (searchTerm) {
      query += `SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<customerDto[]>(query);
  }
  // get customer list dropdown

  // get Sales Invoice Lookup
  getSalesInvoiceLookup(
    searchTerm?: string,
    customerId?: string,
    SortColumn?: number
  ): Observable<SalesInvoiceLookup[]> {
    const queryParams = [];

    if (searchTerm) {
      queryParams.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    }
    if (customerId) {
      queryParams.push(`CustomerId=${encodeURIComponent(customerId)}`);
    }
    if (SortColumn !== undefined) {
      queryParams.push(`SortColumn=${SortColumn}`);
    }

    const query = `SalesInvoice/SalesInvoiceLookup${
      queryParams.length ? '?' + queryParams.join('&') : ''
    }`;

    return this.httpService.get<SalesInvoiceLookup[]>(query);
  }
  // get Sales Invoice Lookup

  // shared warehouse dropdown
  getSharedWarehousesLookup(
    searchTerm: string
  ): Observable<{ id: number; code: string; name: string }[]> {
    let query = `Inventory/SharedWarehousesLookup?`;
    if (searchTerm) {
      query += `SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<{ id: number; code: string; name: string }[]>(query);
  }
  // shared warehouse dropdown
  // Get Sales Invoice To Return By Id
  GetSalesInvoiceToReturnById(id: number): Observable<ReturnSalesInvoiceObj> {
    let query = `SalesInvoice/${id}/GetSalesInvoiceToReturnById`;
    return this.httpService.get<ReturnSalesInvoiceObj>(query);
  }
  // Get Sales Invoice To Return By Id

  // add
  addSalesReturnInvoice(obj: AddSalesReturnDto) {
    return this.httpService.post('ReturnSalesInvoice', obj);
  }
// edit
  editSalesReturnInvoice(obj: updateReturnSalesInvice) {
    return this.httpService.put('ReturnSalesInvoice', obj);
  }
  // post
  postSalesReturnInvoice(id: number) {
    return this.httpService.post(`ReturnSalesInvoice/${id}/Post`, null);
  }
  // get by id 
  getReturnSalesInvoiceId(id: number) {
    return this.httpService.get(`ReturnSalesInvoice/${id}`);
  }
  deleteSalesReturnLine(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`ReturnSalesInvoice/${id}DeleteSalesInvoiceLine
`);
  }
}
