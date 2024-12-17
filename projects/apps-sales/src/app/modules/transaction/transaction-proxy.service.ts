import { Injectable } from '@angular/core';
import { ReturnInvoiceListView } from './models/return-Invoice-dto';
import { Observable } from 'rxjs';
import { AddSalesInvoice, LatestItem, SalesInvoiceListView } from './models';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';

import {
  AddSalesReturnDto,
  customerDto,
  ReturnSalesInvoiceObj,
  SalesInvoiceLookup,
} from './models/return-sales-dto';
import { updateReturnSalesInvice } from './models';
import { SalesInvoiceView } from './models/salesInvoice-view';

@Injectable({
  providedIn: 'root',
})
export class TransactionProxyService {

  constructor(private  httpService : HttpService) { }

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

  getLatestItemsList(  warehouseId : number ,searchTerm?:string): Observable<LatestItem[]> {

    let query = `Inventory/SharedSalesLatestItemsLookup?WarehouseId=${warehouseId}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<LatestItem[]>(query);
  }

  getCurrencyRate(fromCurrency : number ,toCurrency : number ) : Observable<any>{
    return this.httpService.get(`CurrencyConversion/rate?FromCurrencyId=${fromCurrency}&ToCurrencyId=${toCurrency}`)
  }


  LatestVendor(searchTerm: string | undefined) {
    let query = `Customer/LatestCustomerWithCurrencyLookup`;
    if (searchTerm) {
      query += `?searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get(query);
  }

  getItemsForAdvancedSearch(
    WarehouseId : number ,
    quieries: string,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<LatestItem>> {
    let query = `Inventory/SharedSalesItemsLookup?WarehouseId=${WarehouseId}&${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    if (quieries) {
      query += `&${quieries ? quieries : ''}`;
    }
    return this.httpService.get<PaginationVm<LatestItem>>(query);
  }

  addSalesInvoice(obj : AddSalesInvoice) {
    return this.httpService.post('SalesInvoice' , obj)
  }



  PostInvoice(id:number){
    return this.httpService.post(`SalesInvoice/${id}/Post`, null);

  }

  getItemPricePolicy(PricePolicyId?:number ,ItemId?:number , UOMId?:string , ItemVariantId? : number ) {
    return this.httpService.get(`PricePolicy/GetItemPricePolicy?PricePolicyId=${PricePolicyId}&ItemId=${ItemId}&UOMId=${UOMId}&ItemVariantId=${ItemVariantId}` , true);

  }

  getPricePolicyLookup(): Observable<{ id: number;
    name: string;
    code: string}[]> {
    return this.httpService.get(`PricePolicy/DropDown`);
  }

  getSalesManLookup() : Observable<{ id: number;
    name: string;
   }[]> {
      return this.httpService.get(`SalesMan/GetAllSalesManList`);

  }


  GetItemByBarcodePurchase(barcode: string): Observable<any> {
    return this.httpService.get(`SalesInvoice/GetSalesItemByBarcode?Barcode=${barcode}`);
  }


  getSalseInvoiceList(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<SalesInvoiceListView[]>> {
      let query = `SalesInvoice?${pageInfo.toQuery}`;
      if (searchTerm) {
        query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
      }
      return this.httpService.get<PaginationVm<SalesInvoiceListView[]>>(query);
    }






  deleteSalseInvoice(id:number): Observable<boolean> {
    return this.httpService.delete<boolean>(`SalesInvoice/${id}`);
  }





  exportSalseInvoiceList(SearchTerm?: string, SortBy?: number, SortColumn?: string): Observable<SalesInvoiceListView[]> {
      let query = `SalesInvoice/Export?`;
      const params: string[] = [];
      if (SearchTerm) params.push(`SearchTerm=${encodeURIComponent(SearchTerm)}`);
      if (SortBy !== undefined) params.push(`SortBy=${SortBy}`);
      if (SortColumn) params.push(`SortColumn=${SortColumn}`);
      query += params.join('&');
      return this.httpService.get<SalesInvoiceListView[]>(query);
    }

  getSalseInvoiceById(id:number) : Observable<SalesInvoiceView>{
    return this.httpService.get<SalesInvoiceView>(`SalesInvoice/GetInvoiceViewById/${id}`);
  }




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
  getReturnSalesInvoiceIdData(id: number) {
    return this.httpService.get(`ReturnInvoice/${id}/GetViewById`);
  }

  // get by id

  // delete
  deleteSalesReturnLine(id: number): Observable<boolean> {
    return this.httpService.delete<boolean>(`ReturnSalesInvoice/${id}DeleteSalesInvoiceLine`);
  }
  deleteReturnSalesInvoice(id:number): Observable<boolean> {
    return this.httpService.delete<boolean>(`ReturnSalesInvoice/${id}`);
  }


  // delete
}
