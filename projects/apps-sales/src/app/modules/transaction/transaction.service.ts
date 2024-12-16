import { Injectable } from '@angular/core';
import { TransactionProxyService } from './transaction-proxy.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AddSalesInvoice, LatestItem } from './models';
import { AddPurchaseInvoiceDto } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models/addPurchaseInvoice';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private _transactionProxyService: TransactionProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService
  ) {}

  // customer dropdown
  CustomerList = new BehaviorSubject<customerDto[]>([]);

  warehouseLookup = new BehaviorSubject<any>([]);
  salesInvoiceLookup = new BehaviorSubject<SalesInvoiceLookup[]>([]);
  salesInvoiceToReturnById = new BehaviorSubject<ReturnSalesInvoiceObj>(
    {} as ReturnSalesInvoiceObj
  );
  sendSalesReturnInvoice = new BehaviorSubject<AddSalesReturnDto>({} as AddSalesReturnDto);
  updateSalesReturnInvoice = new BehaviorSubject<updateReturnSalesInvice>(
    {} as updateReturnSalesInvice
  );

  ReturnSalesInvoiceIdData = new BehaviorSubject<IreturnInvoiceById>({} as IreturnInvoiceById);

  // customer dropdown
  getCustomerList(searchTerm: string) {
    this._transactionProxyService.getCustomerList(searchTerm).subscribe({
      next: (res) => {
        this.CustomerList.next(res);
      },
    });
  }
  // customer dropdown
  // get Sales Invoice Lookup
  getSalesInvoiceLookup(searchTerm?: string, customerId?: string, SortColumn?: number) {
    this._transactionProxyService
      .getSalesInvoiceLookup(searchTerm, customerId, SortColumn)
      .subscribe({
        next: (res) => {
          this.salesInvoiceLookup.next(res);
        },
      });
  }
  // get Sales Invoice Lookup

  // shared warehouse dropdown
  getSharedWarehousesLookup(quieries: string) {
    this._transactionProxyService.getSharedWarehousesLookup(quieries).subscribe((response) => {
      this.warehouseLookup.next(response);
    });
  }
  // shared warehouse dropdown
  // Get Sales Invoice To Return By Id
  GetSalesInvoiceToReturnById(id: number) {
    this._transactionProxyService.GetSalesInvoiceToReturnById(id).subscribe((response) => {
      this.salesInvoiceToReturnById.next(response);
    });
  }
  // Get Sales Invoice To Return By Id
  // add sales return invoice

  addSalesReturnInvoice(obj: AddSalesReturnDto) {
    this._transactionProxyService.addSalesReturnInvoice(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('salesReturnInvoice.success'),
          this.languageService.transalte('salesReturnInvoice.salesReturninvoiceAddedSuccessfully')
        );
        this.sendSalesReturnInvoice.next(res);
      },
      error: (error: any) => {
        this.toasterService.showError(
          this.languageService.transalte('salesReturnInvoice.error'),
          this.languageService.transalte(error.message || 'An unexpected error occurred')
        );
      },
    });
  }

  // add sales return invoice
  // edit sales return invoice

  editSalesReturnInvoice(obj: updateReturnSalesInvice) {
    this._transactionProxyService.editSalesReturnInvoice(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('salesReturnInvoice.success'),
          this.languageService.transalte('salesReturnInvoice.salesReturninvoiceUpdatedSuccessfully')
        );
        this.updateSalesReturnInvoice.next(res);
      },
      error: (error: any) => {
        this.toasterService.showError(
          this.languageService.transalte('salesReturnInvoice.error'),
          this.languageService.transalte(error.message || 'An unexpected error occurred')
        );
      },
    });
  }

  // add sales return invoice

  // post sales return invoice
  postSalesReturnInvoice(id: number) {
    this._transactionProxyService.postSalesReturnInvoice(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('salesReturnInvoice.Success'),
          this.languageService.transalte('salesReturnInvoice.salesReturninvoicePostedSuccessfully')
        );

        this.router.navigateTo('transaction/sales-return-invoice');
      },
      error: (error: any) => {
        this.toasterService.showError(
          this.languageService.transalte('salesReturnInvoice.error'),
          this.languageService.transalte(error.message)
        );
      },
    });
  }
  // post sales return invoice

  // update

  getReturnSalesInvoiceId(id: number) {
    this._transactionProxyService.getReturnSalesInvoiceId(id).subscribe((response: any) => {
      this.ReturnSalesInvoiceIdData.next(response);
    });
  }

  // delete
  deleteSalesReturnLine(id: number) {
    return this._transactionProxyService.deleteSalesReturnLine(id).pipe(
      map((res) => {
        return res;
      })
    );
  }
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
  public sendSalesManLookup = new BehaviorSubject<{ id: number;
    name: string;
    }[]>([]);

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
  getSalesManLookup()  {
    this.TransactionsProxy.getSalesManLookup().subscribe((res) => {
      this.sendSalesManLookup.next(res);
    });
  }


  GetItemByBarcodePurchase(barcode: string) {
    return this.TransactionsProxy.GetItemByBarcodePurchase(barcode).pipe(
      map((res) => {
        return res;
      })
    );
  }



}
