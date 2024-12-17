import { Injectable } from '@angular/core';
import { ReturnInvoiceListView } from './models/return-Invoice-dto';
import { TransactionProxyService } from './transaction-proxy.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AddSalesInvoice, AddSalesReturnDto, customerDto, IreturnInvoiceById, LatestItem, ReturnSalesInvoiceObj, SalesInvoiceListView, SalesInvoiceLookup, updateReturnSalesInvice } from './models';
import { AddPurchaseInvoiceDto } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models/addPurchaseInvoice';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { SalesInvoiceView } from './models/salesInvoice-view';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {


  // customer dropdown
  CustomerList = new BehaviorSubject<customerDto[]>([]);
  warehouseLookup = new BehaviorSubject<any>([]);
  salesInvoiceLookup = new BehaviorSubject<SalesInvoiceLookup[]>([]);
  salesInvoiceToReturnById = new BehaviorSubject<ReturnSalesInvoiceObj>({} as ReturnSalesInvoiceObj);
  sendSalesReturnInvoice = new BehaviorSubject<AddSalesReturnDto>({} as AddSalesReturnDto);
  updateSalesReturnInvoice = new BehaviorSubject<updateReturnSalesInvice>({} as updateReturnSalesInvice);

  ReturnSalesInvoiceIdData = new BehaviorSubject<IreturnInvoiceById>({} as IreturnInvoiceById);


  public lastestItem = new BehaviorSubject<LatestItem[]>([]);
  public sendcurrency = new BehaviorSubject<{rate : number}>({} as {rate : number});
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

  getLatestItemsList(warehouseId : number ,searchTerm?: string ) {
    this._transactionProxyService.getLatestItemsList( warehouseId , searchTerm ).subscribe((response) => {
      this.lastestItem.next(response);
    });
  }


  getCurrencyRate(fromCurrency : number ,toCurrency : number ){
    this._transactionProxyService.getCurrencyRate(fromCurrency , toCurrency).subscribe(res=>{
      this.sendcurrency.next(res)
    })
  }



  latestVendor(searchTerm: string | undefined){
    return  this._transactionProxyService.LatestVendor(searchTerm).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getItemsForAdvancedSearch(warehouseId : number , quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this._transactionProxyService.getItemsForAdvancedSearch(warehouseId , quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSourceForAdvanced.next(res.result);
      this.currentPageInfo.next(res.pageInfoResult);
    });
  }


  addSalesInvoice(obj : AddSalesInvoice) {
    this._transactionProxyService.addSalesInvoice(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('salesInvoice.success'),
        this.languageService.transalte('salesInvoice.salesInvoiceSuccess')
      );
     this.sendSalesInvoice.next(res);
    });
  }

  postInvoice(id: number) {
    this.loaderService.show();

    this._transactionProxyService.PostInvoice(id).subscribe({
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
    this._transactionProxyService.getItemPricePolicy(PricePolicyId , ItemId, UOMId, ItemVariantId).subscribe((res) => {
      this.sendPricePolicy.next(res);
    });
  }

  getPricePolicyLookup()  {
    this._transactionProxyService.getPricePolicyLookup().subscribe((res) => {
      this.sendPricePolicyLookup.next(res);
    });
  }
  getSalesManLookup()  {
    this._transactionProxyService.getSalesManLookup().subscribe((res) => {
      this.sendSalesManLookup.next(res);
    });
  }


  GetItemByBarcodePurchase(barcode: string) {
    return this._transactionProxyService.GetItemByBarcodePurchase(barcode).pipe(
      map((res) => {
        return res;
      })
    );
  }



  getSalseInvoiceById(id:number){
    this._transactionProxyService.getSalseInvoiceById(id).subscribe((res)=>{
       this.salesInvoiceView.next(res)
    })
  }




    exportSalseInvoiceList(SearchTerm: string ,SortBy?: number, SortColumn?: string) {
      this._transactionProxyService.exportSalseInvoiceList(SearchTerm,SortBy,SortColumn).subscribe({
        next: (res: any) => {
          this.exportSalesInvoice.next(res);
        },
      });
    }

  getSalseInvoice(SearchTerm: string, pageInfo: PageInfo){
    this._transactionProxyService.getSalseInvoiceList(SearchTerm, pageInfo).subscribe((res:any)=>{
       this.salesInvoice.next(res)
       this.currentPageInfo.next(res.pageInfoResult);
    })
  }



  async deleteSalesInvoiceListItem(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this._transactionProxyService.deleteSalseInvoice(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('salesInvoice.success'),
            this.languageService.transalte('salesInvoice.delete')
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


    exportSalseInvoiceListData(SearchTerm: string ,SortBy?: number, SortColumn?: string) {
      this.TransactionsProxy.exportSalseInvoiceList(SearchTerm,SortBy,SortColumn).subscribe({
        next: (res: any) => {
          this.exportSalesInvoice.next(res);
        },
      });
    }

  getSalesInvoiceList(quieries: string, pageInfo: PageInfo) {
    this.TransactionsProxy.getSalesInvoiceList(quieries, pageInfo).subscribe(
      (response) => {
        this.salseInvoiceList.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      },
      (erorr) => {}
    );
  }

  exportSalesInvoiceList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.TransactionsProxy.exportSalesInvoiceList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportSalseInvoiceList.next(res);
      },
    });
  }

  getReturnSalesInvoiceList(quieries: string, pageInfo: PageInfo) {
    this.TransactionsProxy.getReturnSalesInvoiceList(quieries, pageInfo).subscribe(
      (response) => {
        this.returnSalesInvoiceList.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
      },
      (erorr) => {}
    );
  }

  exportRetuenSalesInvoiceList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.TransactionsProxy.exportReturnSalesInvoiceList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportReturnSalseInvoiceList.next(res);
      },
    });
  }


  async deleteRetuenSalesInvoiceListItem(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.TransactionsProxy.deleteReturnSalesInvoice(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('salesInvoice.success'),
            this.languageService.transalte('salesInvoice.delete')
          );
          let data = this.returnSalesInvoiceList.getValue();
          const updatedDate = data.filter((elem) => elem.id!== id);
          this.returnSalesInvoiceList.next(updatedDate);
          return res;
        },
        error: (err) => {},
      });
    }
  }





  constructor(
    private _transactionProxyService: TransactionProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private loaderService: LoaderService,
  ) {}


}
