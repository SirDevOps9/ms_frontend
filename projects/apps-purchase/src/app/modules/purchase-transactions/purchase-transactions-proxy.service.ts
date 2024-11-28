import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { ItemDto } from './models/itemDto';
import { CurrencyRateDto } from './models/currencyRateDto';

@Injectable({
  providedIn: 'root'
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
  GetAllVendor(
      searchTerm: string,
      pageInfo: PageInfo
    ): Observable<PaginationVm<any>> {
      let query = `Vendor/VendorWithCurrencyLookup?${pageInfo.toQuery}`;
      if (searchTerm) {
        query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
      }
      return this.httpService.get<PaginationVm<any>>(query);
    }
    GetLatestItems(
      searchTerm: string,
    ): Observable<ItemDto> {
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
}
