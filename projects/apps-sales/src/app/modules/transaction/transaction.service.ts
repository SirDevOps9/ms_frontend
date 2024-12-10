import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService, PageInfo, PageInfoResult, PaginationVm } from 'shared-lib';
import { TransactionProxyService } from './transaction-proxy.service';
import { SalesInvoiceListView } from './models/sales-invoice-dto';
import { ReturnInvoiceListView } from './models/return-Invoice-dto';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {
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
