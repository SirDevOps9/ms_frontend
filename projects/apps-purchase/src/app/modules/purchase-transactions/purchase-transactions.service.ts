import { inject, Injectable } from '@angular/core';
import { PurchaseTransactionsProxyService } from './purchase-transactions-proxy.service';
import { IinvoiceDto, viewInvoiceObj } from './models/purchase-invoice';
import { BehaviorSubject, map } from 'rxjs';
import {
  LanguageService,
  LoaderService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { ItemDto } from './models/itemDto';
import { CurrencyRateDto } from './models/currencyRateDto';
import { LatestItem, PurchaseReturnInvoice, viewInvoiceReturnObj } from './models';
import { AddPurchaseInvoiceDto } from './models/addPurchaseInvoice';

@Injectable({
  providedIn: 'root',
})
export class PurchaseTransactionsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public savedDataId = new BehaviorSubject<number>(0);
  public vendorDataSource = new BehaviorSubject<any>([]);
  public latestItemsDataSource = new BehaviorSubject<ItemDto[]>([]);
  public itemsPageInfo = new BehaviorSubject<PageInfoResult>({});
  public itemsDataSource = new BehaviorSubject<ItemDto[]>([]);
  public accountCurrencyRateDataSource = new BehaviorSubject<CurrencyRateDto>({ rate: 0 });
  public InvoiceByIdDataSource = new BehaviorSubject<any[]>([]);
  public warehouseLookup = new BehaviorSubject<any>([]);
  public lastestItem = new BehaviorSubject<LatestItem[]>([]);
  public itemsDataSourceForAdvanced = new BehaviorSubject<LatestItem[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public sendPurchaseInvoice = new BehaviorSubject<AddPurchaseInvoiceDto>(
    {} as AddPurchaseInvoiceDto
  );
  public sendcurrency = new BehaviorSubject<{ rate: number }>({} as { rate: number });
  // list of purchase inv and export
  invoicePurchaseList = new BehaviorSubject<IinvoiceDto[]>([]);
  viewInvoiceDataByID = new BehaviorSubject<viewInvoiceObj>({} as viewInvoiceObj);
  exportInvoiceData = new BehaviorSubject<IinvoiceDto[]>([]);

  invoiceData = new BehaviorSubject<any>([]);
  returnInvoiceData = new BehaviorSubject<any>([]);
  returnItemsInvoiceData = new BehaviorSubject<any>([]);
  // list of purchase inv
  // ################ purchase return ###############

  exportInvoiceReturnData = new BehaviorSubject<IinvoiceDto[]>([]);
  invoicePurchaseReturnList = new BehaviorSubject<PurchaseReturnInvoice[]>([]);

  viewInvoiceReturnDataByID = new BehaviorSubject<viewInvoiceReturnObj>({} as viewInvoiceReturnObj);
  constructor(
    private TransactionsProxy: PurchaseTransactionsProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private loaderService: LoaderService,
    private router: RouterService
  ) {}
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

  latestVendor(searchTerm: string | undefined) {
    return this.TransactionsProxy.LatestVendor(searchTerm).pipe(
      map((res) => {
        return res;
      })
    );
  }

  LatestWarehouses(searchTerm: string | undefined) {
    return this.TransactionsProxy.LatestWarehouses(searchTerm).pipe(
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
  getLatestItems(searchTerm: string) {
    this.TransactionsProxy.GetLatestItems(searchTerm).subscribe((res: any) => {
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
        this.getInvoiceById(obj.id)
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
  deleteRowInvoice(id: number) {
    return this.TransactionsProxy.deleteRowInvoice(id).pipe(
      map((res) => {
        return res;
      })
    );
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
    this.TransactionsProxy.getItemsForAdvancedSearch(quieries, searchTerm, pageInfo).subscribe(
      (res) => {
        this.itemsDataSourceForAdvanced.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      }
    );
  }

  addPurchaseInvoice(obj: AddPurchaseInvoiceDto) {
    this.TransactionsProxy.addPurchaseInvoice(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('purchase.success'),
        this.languageService.transalte('purchase.addInvoice') 
      ); 
     this.sendPurchaseInvoice.next(res);
    });
  }

  getCurrencyRate(fromCurrency: number, toCurrency: number) {
    this.TransactionsProxy.getCurrencyRate(fromCurrency, toCurrency).subscribe((res) => {
      this.sendcurrency.next(res);
    });
  }

  // Get Invoice View By Id
  GetInvoiceViewById(id: number) {
    this.TransactionsProxy.GetInvoiceViewById(id).subscribe((res) => {
      this.viewInvoiceDataByID.next(res);
    });
  }

  // ##############################purchase return ################
  // list
  getReturnInvoiceList(searchTerm: string, pageInfo: PageInfo) {
    this.TransactionsProxy.getReturnInvoiceList(searchTerm, pageInfo).subscribe({
      next: (res) => {
        this.invoicePurchaseReturnList.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      },
    });
  }

  // export
  exportInvoiceReturnListData(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.TransactionsProxy.exportInvoiceReturnListData(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportInvoiceReturnData.next(res);
      },
    });
  }
  // view
  GetInvoiceReturnViewById(id: number) {
    this.TransactionsProxy.GetInvoiceReturnViewById(id).subscribe((res) => {
      this.viewInvoiceReturnDataByID.next(res);
    });
  }
  // delete
  // delete invoice
  async deleteInvoiceReturnLine(id: number) {
    const confirmed = await this.toasterService.showConfirm('purchase.success');
    if (confirmed) {
      this.TransactionsProxy.deleteInvoiceReturnLine(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('purchase.success'),
            this.languageService.transalte('purchase.delete')
          );
          let data = this.invoicePurchaseReturnList.getValue();
          const updatedInvoice = data.filter((elem: any) => elem.id !== id);
          this.invoicePurchaseReturnList.next(updatedInvoice);

          return res;
        },
        error: (err) => {},
      });
    }
  }
  ///////////////
  invoiceLookup(searchTerm?: string, vendorId?: number, SortColumn?: string) {
    this.TransactionsProxy.InvoiceLookup(searchTerm, vendorId, SortColumn).subscribe({
      next: (res) => {
        this.invoiceData.next(res);
      },
    });
  }
  getReturnInvoiceById(id: number) {
    this.TransactionsProxy.getReturnInvoiceById(id).subscribe((response: any) => {
      this.returnInvoiceData.next(response);
    });
  }
  addReturnInvoice(obj: any) {
    this.TransactionsProxy.addReturnInvoice(obj).subscribe((res) => {
      this.toasterService.showSuccess(
        this.languageService.transalte('purchase.success'),
        this.languageService.transalte('purchase.addInvoice')
      );
      this.savedDataId.next(res);

    });
  }
  deleteRowReturnInvoice(id: number) {
    return this.TransactionsProxy.deleteRowReturnInvoice(id).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getReturnInvoiceByIdToEdit(id: number) {
    this.TransactionsProxy.getReturnInvoiceByIdToEdit(id).subscribe((response: any) => {
      this.returnItemsInvoiceData.next(response);
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
  GetItemByBarcodePurchase(barcode: string) {
    return this.TransactionsProxy.GetItemByBarcodePurchase(barcode).pipe(
      map((res) => {
        return res;
      })
    );
  }
  editReturnInvoice(obj: any) {
    this.loaderService.show();

    this.TransactionsProxy.EditReturnInvoice(obj).subscribe({
      next: (res: any) => {
        this.loaderService.hide();

        this.toasterService.showSuccess(
          this.languageService.transalte('messages.success'),
          this.languageService.transalte('messages.successfully')
        );
       this.getReturnInvoiceByIdToEdit(res)
      },
      error: (err: any) => {
        this.toasterService.showError(
          this.languageService.transalte('messages.error'),
          err.message
        );
        this.loaderService.hide();
      },
    });
  }
  postReturnInvoice(id: number) {
    this.loaderService.show();

    this.TransactionsProxy.PostReturnInvoice(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('messages.Success'),
          this.languageService.transalte('messages.purchaseinvoicePostedSuccessfully')
        );
        this.loaderService.hide();

        this.router.navigateTo('transaction/return-purchase-invoice');
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
