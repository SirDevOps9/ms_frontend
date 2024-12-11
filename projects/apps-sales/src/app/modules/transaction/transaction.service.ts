import { Injectable } from '@angular/core';
import { TransactionProxyService } from './transaction-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import { LatestItem } from './models';
import { AddPurchaseInvoiceDto } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models/addPurchaseInvoice';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public lastestItem = new BehaviorSubject<LatestItem[]>([]);
  public sendcurrency = new BehaviorSubject<{rate : number}>({} as {rate : number});
  public warehouseLookup = new BehaviorSubject<any >([]);
  public itemsDataSourceForAdvanced = new BehaviorSubject<LatestItem[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public sendPurchaseInvoice = new BehaviorSubject<AddPurchaseInvoiceDto>({} as AddPurchaseInvoiceDto);

  constructor(private TransactionsProxy : TransactionProxyService ,    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private router: RouterService,) { }

  getLatestItemsList(warehouseId : number ,searchTerm?: string ) {
    this.TransactionsProxy.getLatestItemsList( warehouseId , searchTerm ).subscribe((response) => {
      this.lastestItem.next(response);
    });
  }


  getCurrencyRate(fromCurrency : number ,toCurrency : number ){
    this.TransactionsProxy.getCurrencyRate(fromCurrency , toCurrency).subscribe(res=>{
      this.sendcurrency.next(res)
    })
  }

  getSharedWarehousesLookup(quieries: string) {
    this.TransactionsProxy.getSharedWarehousesLookup(quieries).subscribe((response) => {
      this.warehouseLookup.next(response);
    });
  }

  
  latestVendor(searchTerm: string | undefined){
    return  this.TransactionsProxy.LatestVendor(searchTerm).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getItemsForAdvancedSearch(warehouseId : number , quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.TransactionsProxy.getItemsForAdvancedSearch(warehouseId , quieries, searchTerm, pageInfo).subscribe((res) => {
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
     this.sendPurchaseInvoice.next(res);
    });
  }

  postInvoice(id: number) {
    this.loaderService.show();

    this.TransactionsProxy.PostInvoice(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('messages.Success'),
          this.languageService.transalte('messages.purchaseinvoicePostedSuccessfully')
        );
        this.loaderService.hide();

        this.router.navigateTo('transaction/purchase-invoice');
      },
      error: (error: any) => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('messages.Error'),
          this.languageService.transalte(error.message)
        );
      },
    });
  }




}
