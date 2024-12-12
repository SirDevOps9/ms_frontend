import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSalesInvoice, LatestItem } from './models';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AddPurchaseInvoiceDto } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models/addPurchaseInvoice';

@Injectable({
  providedIn: 'root'
})
export class TransactionProxyService {

  constructor(private httpService : HttpService) { }

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

  getSharedWarehousesLookup(
    searchTerm: string
  ): Observable<{ id: number; code: string; name: string }[]> {
    let query = `Inventory/SharedWarehousesLookup?`;
    if (searchTerm) {
      query += `SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<{ id: number; code: string; name: string }[]>(query);
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

  getPricePolicyLookup() {
    return this.httpService.get(`PricePolicy/DropDown`);
  }

  
}
