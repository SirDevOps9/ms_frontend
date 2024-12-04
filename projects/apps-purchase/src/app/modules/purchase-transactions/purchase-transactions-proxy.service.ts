import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IinvoiceDto, viewInvoiceObj } from './model/purchase-invoice';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { ItemDto } from './models/itemDto';
import { CurrencyRateDto } from './models/currencyRateDto';
import { LatestItem } from './models';
import { AddPurchaseInvoiceDto } from './models/addPurchaseInvoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsProxyService {
  constructor(private httpService: HttpService) {}
  LatestVendor(searchTerm: string | undefined) {
    let query = `Vendor/LatestVendorWithCurrencyLookup`;
    if (searchTerm) {
      query += `?searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get(query);
  }
  LatestWarehouses(searchTerm: string | undefined) {
    let query = `Inventory/SharedWarehousesLookup`;
    if (searchTerm) {
      query += `?searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get(query);
  }
  GetAllVendor(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<any>> {
    let query = `Vendor/VendorWithCurrencyLookup?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<any>>(query);
  }
  GetLatestItems(searchTerm: string): Observable<ItemDto> {
    let query = `Inventory/SharedLatestItemsLookup`;
    if (searchTerm) {
      query += `?searchTerm=${encodeURIComponent(searchTerm)}`;
    }

    return this.httpService.get<ItemDto>(query);
  }
  GetItems(
    quieries: string,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<ItemDto>> {
    let query = `Inventory/SharedItemsLookup?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    if (quieries) {
      query += `&${quieries ? quieries : ''}`;
    }
    return this.httpService.get<PaginationVm<ItemDto>>(query);
  }
  getAccountCurrencyRate(currentCurrency: number, accountCurrency: number) {
    return this.httpService.get<CurrencyRateDto>(
      `CurrencyConversion/rate?FromCurrencyId=${currentCurrency}&ToCurrencyId=${accountCurrency}`
    );
  }
  getInvoiceById(id: number) {
    return this.httpService.get(`Invoice/GetById/${id}`);
  }
  EditInvoice(obj: any) {
    return this.httpService.put(`Invoice`, obj);
  }
  deleteRowInvoice(id: number) {
    return this.httpService.delete(`Invoice/DeleteLine/${id}`);
  }
  getSharedWarehousesLookup(
    searchTerm: string
  ): Observable<{ id: number; code: string; name: string }[]> {
    let query = `Inventory/SharedWarehousesLookup?`;
    if (searchTerm) {
      query += `SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<{ id: number; code: string; name: string }[]>(query);
  }

  getLatestItemsList(searchTerm?: string): Observable<LatestItem[]> {
    let query = `Inventory/SharedLatestItemsLookup?`;
    if (searchTerm) {
      query += `SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<LatestItem[]>(query);
  }
  getItemsForAdvancedSearch(
    quieries: string,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<LatestItem>> {
    let query = `Inventory/SharedItemsLookup?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    if (quieries) {
      query += `&${quieries ? quieries : ''}`;
    }
    return this.httpService.get<PaginationVm<LatestItem>>(query);
  }

  addPurchaseInvoice(obj: AddPurchaseInvoiceDto) {
    return this.httpService.post('Invoice', obj);
  }

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
  // delete from list of purchase
  deleteInvoiceLine(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`Invoice/${id}`);
  }

  getCurrencyRate(fromCurrency: number, toCurrency: number): Observable<any> {
    return this.httpService.get(
      `CurrencyConversion/rate?FromCurrencyId=${fromCurrency}&ToCurrencyId=${toCurrency}`
    );
  }

  // Get Invoice View By Id
  GetInvoiceViewById(id: number): Observable<viewInvoiceObj> {
    const url = `Invoice/GetInvoiceViewById/${id}`;
    return this.httpService.get<viewInvoiceObj>(url);
  }
  PostInvoice(id: number) {
    return this.httpService.post(`Invoice/${id}/Post`, null);
  }
  //  barcode

  GetItemByBarcodePurchase(barcode: string): Observable<any> {
    return this.httpService.get(`Invoice/GetItemByBarcode?Barcode=${barcode}`);
  }
}
