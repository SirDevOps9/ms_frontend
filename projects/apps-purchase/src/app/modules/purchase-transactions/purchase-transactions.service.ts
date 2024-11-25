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

  // list of purchase inv
  invoicePurchaseList = new BehaviorSubject<IinvoiceDto[]>([]);
  invoicePurchaseList$ = this.invoicePurchaseList.asObservable();
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
}
