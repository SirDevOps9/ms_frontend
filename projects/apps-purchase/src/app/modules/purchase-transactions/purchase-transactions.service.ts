import { Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, ToasterService } from 'shared-lib';
import { ItemDto } from 'projects/apps-sales/src/app/modules/sales/models';
import { CurrencyRateDto } from 'projects/apps-finance/src/app/modules/finance/models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseTransactionsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public vendorDataSource = new BehaviorSubject<any>([]);
  public latestItemsDataSource = new BehaviorSubject<ItemDto[]>([]);
  public itemsPageInfo = new BehaviorSubject<PageInfoResult>({});
  public itemsDataSource = new BehaviorSubject<ItemDto[]>([]);
  public accountCurrencyRateDataSource = new BehaviorSubject<CurrencyRateDto>({ rate: 0 });
  public InvoiceByIdDataSource = new BehaviorSubject<any[]>([]);

  constructor(  
      private TransactionsProxy: PurchaseTransactionsProxyService,
      private toasterService: ToasterService,
      private languageService: LanguageService,
      private loaderService: LoaderService,

  ) { }
  latestVendor(searchTerm: string | undefined){
    return  this.TransactionsProxy.LatestVendor(searchTerm).pipe(
      map((res) => {
        return res;
      })
    );
   
  }
  LatestWarehouses(searchTerm: string | undefined){
    return  this.TransactionsProxy.LatestWarehouses(searchTerm).pipe(
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
  getLatestItems( searchTerm: string,) {
    this.TransactionsProxy.GetLatestItems( searchTerm).subscribe((res:any) => {
      this.latestItemsDataSource.next(res);
    });
  }
  getItems(quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.TransactionsProxy.GetItems(quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSource.next(res.result);
      this.itemsPageInfo.next(res.pageInfoResult);
    });
  }
  getAccountCurrencyRate(currentCurrency: number, accountCurrency: number) {
    this.TransactionsProxy.getAccountCurrencyRate(currentCurrency, accountCurrency).subscribe(
      (response) => {
        this.accountCurrencyRateDataSource.next(response);
      }
    );
  }
  getInvoiceById(id: number) {
    this.TransactionsProxy.getInvoiceById(id).subscribe((response: any) => {
      this.InvoiceByIdDataSource.next(response);
    });
  }
  editInvoice(obj: any) {
    this.TransactionsProxy.EditInvoice(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('messages.success'),
          this.languageService.transalte('messages.successfully')
        );
      },
      error: (err: any) => {
        this.toasterService.showError(
          this.languageService.transalte('messages.error'),
          this.languageService.transalte('messages.noItemSelected')
        );
        this.loaderService.hide();
      },
    });
  }
}
