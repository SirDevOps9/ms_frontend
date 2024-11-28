import { inject, Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { IinvoiceDto } from './model/purchase-invoice';
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
  public warehouseLookup = new BehaviorSubject<any >([]);
  public lastestItem = new BehaviorSubject<LatestItem[]>([]);
  public itemsDataSourceForAdvanced = new BehaviorSubject<LatestItem[]>([]);
  public sendPurchaseInvoice = new BehaviorSubject<AddPurchaseInvoiceDto>({} as AddPurchaseInvoiceDto);
  public sendcurrency = new BehaviorSubject<{rate : number}>({} as {rate : number});

  
    // list of purchase inv and export
    invoicePurchaseList = new BehaviorSubject<IinvoiceDto[]>([]);
    exportInvoiceData = new BehaviorSubject<IinvoiceDto[]>([]);
    // list of purchase inv



  constructor(private TransactionsProxy: PurchaseTransactionsProxyService ,     private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,) {}


  
    // paging

  
    // list of purchase inv
    getInvoiceList(searchTerm: string, pageInfo: PageInfo) {
      this.TransactionsProxy.getInvoiceList(searchTerm, pageInfo).subscribe({
        next: (res) => {
          this.invoicePurchaseList.next(res.result);
          this.currentPageInfo.next(res.pageInfoResult);
        },
      });
    }
    // list of purchase inv
    // export  purchase inv
  
    exportInvoiceListData(searchTerm?: string, SortBy?: number, SortColumn?: string) {
      this.TransactionsProxy.exportInvoiceListData(searchTerm, SortBy, SortColumn).subscribe({
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
        this.TransactionsProxy.deleteInvoiceLine(id).subscribe({
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
        this.languageService.transalte('purchase.success'),
        this.languageService.transalte('purchase.addInvoice')
      );
      this.router.navigateTo('/transaction/purchase-invoice')
     this.sendPurchaseInvoice.next(res);
    });
  }

  getCurrencyRate(fromCurrency : number ,toCurrency : number ){
    this.TransactionsProxy.getCurrencyRate(fromCurrency , toCurrency).subscribe(res=>{
      this.sendcurrency.next(res)
    })
  }

}
