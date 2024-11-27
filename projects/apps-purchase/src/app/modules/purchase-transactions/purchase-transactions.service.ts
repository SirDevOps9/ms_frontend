import { inject, Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { BehaviorSubject } from 'rxjs';
import { LanguageService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { IinvoiceDto } from './model/purchase-invoice';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { LatestItem } from './models';
import { AddPurchaseInvoiceDto } from './models/addPurchaseInvoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public vendorDataSource = new BehaviorSubject<any>([]);
  public warehouseLookup = new BehaviorSubject<{ id: number; code: string; name: string }[]>([]);
  public lastestItem = new BehaviorSubject<LatestItem[]>([]);
  public itemsDataSourceForAdvanced = new BehaviorSubject<LatestItem[]>([]);
  public sendPurchaseInvoice = new BehaviorSubject<AddPurchaseInvoiceDto>({} as AddPurchaseInvoiceDto);

  constructor(private TransactionsProxy: PurchaseTransactionsProxyService ,     private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,) {}
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

  addPurchaseInvoice(obj : AddPurchaseInvoiceDto) {
    this.TransactionsProxy.addPurchaseInvoice(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('purchasing.success'),
        this.languageService.transalte('purchasing.addInvoice')
      );
     this.sendPurchaseInvoice.next(res);

    });
  }

  

  
}
