import { Injectable } from '@angular/core';
import { TransactionProxyService } from './transaction-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import {
  AddSalesReturnDto,
  customerDto,
  ReturnSalesInvoiceObj,
  SalesInvoiceLookup,
} from './models/return-sales-dto';
import {
  LanguageService,
  LoaderService,
  PageInfo,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { updateReturnSalesInvice, IreturnInvoiceById } from './models';

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
}
