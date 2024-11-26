import { inject, Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { BehaviorSubject } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { IinvoiceDto } from './model/purchase-invoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsService {
  purchaseProxy = inject(PurchaseTransactionsProxyService);
  // paging
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  // list of purchase inv and export
  invoicePurchaseList = new BehaviorSubject<IinvoiceDto[]>([]);
  exportInvoiceData = new BehaviorSubject<IinvoiceDto[]>([]);
  // list of purchase inv

  // list of purchase inv
  getInvoiceList(searchTerm: string, pageInfo: PageInfo) {
    this.purchaseProxy.getInvoiceList(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.invoicePurchaseList.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }
  // list of purchase inv
  // export  purchase inv

  exportInvoiceListData(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.purchaseProxy.exportInvoiceListData(searchTerm, SortBy, SortColumn).subscribe({
      next: (res) => {
        this.exportInvoiceData.next(res);
      },
    });
  }
  // export  purchase inv
}
