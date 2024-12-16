import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService, PageInfo, PageInfoResult, PaginationVm } from 'shared-lib';
import { TransactionProxyService } from './transaction-proxy.service';
import { SalesInvoiceListView } from './models/sales-invoice-dto';
import { ReturnInvoiceListView } from './models/return-Invoice-dto';import { TransactionProxyService } from './transaction-proxy.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AddSalesInvoice, LatestItem, SalesInvoiceListView } from './models';
import { AddPurchaseInvoiceDto } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models/addPurchaseInvoice';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { SalesInvoiceView } from './models/salesInvoice-view';

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
  public sendSalesManLookup = new BehaviorSubject<{ id: number;
    name: string;
    }[]>([]);
    private salesInvoice = new BehaviorSubject<SalesInvoiceListView[]>([]);
    public salesInvoiceObs =this.salesInvoice.asObservable()
    private exportSalesInvoice = new BehaviorSubject<SalesInvoiceListView[]>([]);
    public exportSalesInvoiceObs =this.exportSalesInvoice.asObservable()


    public salesInvoiceView = new BehaviorSubject<SalesInvoiceView>({} as SalesInvoiceView);
    public salesInvoiceViewObs =this.salesInvoiceView.asObservable()


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

  getSalseInvoice(SearchTerm: string, pageInfo: PageInfo){
    this.TransactionsProxy.getSalseInvoiceList(SearchTerm, pageInfo).subscribe((res:any)=>{
       this.salesInvoice.next(res)
       this.currentPageInfo.next(res.pageInfoResult);
    })
  }

  getSalseInvoiceById(id:number){
    this.TransactionsProxy.getSalseInvoiceById(id).subscribe((res)=>{
       this.salesInvoiceView.next(res)
    })
  }

  async deleteCustomerCategory(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.TransactionsProxy.deleteSalseInvoice(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteCustomerCategory.success'),
            this.languageService.transalte('deleteCustomerCategory.delete')
          );
          let data = this.salesInvoice.getValue();
          const updatedDate = data.filter((elem) => elem.id!== id);
          this.salesInvoice.next(updatedDate);
          return res;
        },
        error: (err) => {},
      });
    }
  }


    exportSalseInvoiceList(SearchTerm: string ,SortBy?: number, SortColumn?: string) {
      this.TransactionsProxy.exportSalseInvoiceList(SearchTerm,SortBy,SortColumn).subscribe({
        next: (res: any) => {
          this.exportSalesInvoice.next(res);
        },
      });
    }



  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public salseInvoiceList = new BehaviorSubject<SalesInvoiceListView[]>([]);
  salseInvoiceListObs$ = this.salseInvoiceList.asObservable();

  public exportSalseInvoiceList = new BehaviorSubject<SalesInvoiceListView[]>([]);
  exportSalseInvoiceListObs$ = this.exportSalseInvoiceList.asObservable();


  public returnSalesInvoiceList =  new BehaviorSubject<ReturnInvoiceListView[]>([]);
  returnsalseInvoiceListObs$ = this.returnSalesInvoiceList.asObservable();
  public exportReturnSalseInvoiceList = new BehaviorSubject<ReturnInvoiceListView[]>([]);
  exportReturnSalseInvoiceListObs$ = this.exportReturnSalseInvoiceList.asObservable();

  constructor(private transactionsProxy :TransactionProxyService) { }

  getSalesInvoiceList(quieries: string, pageInfo: PageInfo) {
    this.transactionsProxy.getSalesInvoiceList(quieries, pageInfo).subscribe(
      (response) => {
        this.salseInvoiceList.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      },
      (erorr) => {}
    );
  }

  exportSalesInvoiceList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.transactionsProxy.exportSalesInvoiceList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportSalseInvoiceList.next(res);
      },
    });
  }

  getReturnSalesInvoiceList(quieries: string, pageInfo: PageInfo) {
    this.transactionsProxy.getReturnSalesInvoiceList(quieries, pageInfo).subscribe(
      (response) => {
        this.returnSalesInvoiceList.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      },
      (erorr) => {}
    );
  }

  exportRetuenSalesInvoiceList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.transactionsProxy.exportReturnSalesInvoiceList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportReturnSalseInvoiceList.next(res);
      },
    });
  }

}
