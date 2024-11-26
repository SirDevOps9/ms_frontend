import { inject, Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { BehaviorSubject } from 'rxjs';
import { LanguageService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { IinvoiceDto } from './model/purchase-invoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsService {
  purchaseProxy = inject(PurchaseTransactionsProxyService);
  toasterService = inject(ToasterService);
  languageService = inject(LanguageService);

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
  // delete invoice
  async deleteInvoiceLine(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.purchaseProxy.deleteInvoiceLine(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('purchase.success'),
            this.languageService.transalte('purchase.delete')
          );
          let data = this.invoicePurchaseList.getValue();
          const updatedInvoice = data.filter((elem: any) => elem.id !== id);
          this.invoicePurchaseList.next(updatedInvoice);

          return res;
        },
        error: (err) => {},
      });
    }
  }
}
