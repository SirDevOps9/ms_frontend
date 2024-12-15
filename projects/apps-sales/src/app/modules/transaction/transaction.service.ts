import { Injectable } from '@angular/core';
import { TransactionProxyService } from './transaction-proxy.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AddSalesInvoice, LatestItem } from './models';
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
  public sendSalesInvoice = new BehaviorSubject<AddPurchaseInvoiceDto>({} as AddPurchaseInvoiceDto);
  public sendPricePolicy = new BehaviorSubject({} as any);
  public sendPricePolicyLookup = new BehaviorSubject<{ id: number;
    name: string;
    code: string}[]>([]);

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
 

  addSalesInvoice(obj : AddSalesInvoice) {
    this.TransactionsProxy.addSalesInvoice(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('salesInvoice.success'),
        this.languageService.transalte('salesInvoice.salesInvoiceSuccess') 
      ); 
     this.sendSalesInvoice.next(res);
    });
  }

  postInvoice(id: number) {
    this.loaderService.show();

    this.TransactionsProxy.PostInvoice(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('salesInvoice.Success'),
          this.languageService.transalte('salesInvoice.salesInvoiceSuccessPosted')
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

  getItemPricePolicy(PricePolicyId?:number ,ItemId?:number , UOMId?:string , ItemVariantId? : number ) {
    this.TransactionsProxy.getItemPricePolicy(PricePolicyId , ItemId, UOMId, ItemVariantId).subscribe((res) => {
      this.sendPricePolicy.next(res);
    });
  }

  getPricePolicyLookup()  {
    this.TransactionsProxy.getPricePolicyLookup().subscribe((res) => {
      this.sendPricePolicyLookup.next(res);
    });
  }




}
