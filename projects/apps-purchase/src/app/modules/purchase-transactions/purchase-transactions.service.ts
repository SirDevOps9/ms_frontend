import { Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { LatestItem } from './models';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public vendorDataSource = new BehaviorSubject<any>([]);
  public warehouseLookup = new BehaviorSubject<{ id: number; code: string; name: string }[]>([]);
  public lastestItem = new BehaviorSubject<LatestItem[]>([]);
  public itemsDataSourceForAdvanced = new BehaviorSubject<LatestItem[]>([]);

  constructor(private TransactionsProxy: PurchaseTransactionsProxyService) {}
  latestVendor(searchTerm?: string | undefined) {
    return this.TransactionsProxy.LatestVendor(searchTerm).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAllVendor(quieries: string, pageInfo: PageInfo) {
    this.TransactionsProxy.GetAllVendor(quieries, pageInfo).subscribe((response) => {
      this.vendorDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }
  getSharedWarehousesLookup(quieries: string) {
    this.TransactionsProxy.getSharedWarehousesLookup(quieries).subscribe((response) => {
      this.warehouseLookup.next(response);
    });
  }
  getLatestItemsList(searchTerm?: string) {
    this.TransactionsProxy.getLatestItemsList(searchTerm).subscribe((response) => {
      this.lastestItem.next(response);
    });
  }

  getItemsForAdvancedSearch(quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.TransactionsProxy.getItemsForAdvancedSearch(quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSourceForAdvanced.next(res.result);
      this.currentPageInfo.next(res.pageInfoResult);
    });
  }

  

  
}
