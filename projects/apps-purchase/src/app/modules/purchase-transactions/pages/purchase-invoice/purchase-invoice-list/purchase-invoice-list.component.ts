import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SequenceService } from 'apps-shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { StockInDto } from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsProxyService } from 'projects/apps-inventory/src/app/modules/transactions/transactions-proxy.service';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { IinvoiceDto } from '../../../model/purchase-invoice';

@Component({
  selector: 'app-purchase-invoice-list',
  templateUrl: './purchase-invoice-list.component.html',
  styleUrl: './purchase-invoice-list.component.scss',
})
export class PurchaseInvoiceListComponent implements OnInit {
  // services injections
  routerService = inject(RouterService);
  authService = inject(AuthService);
  transactionsService = inject(PurchaseTransactionsService);
  sharedFinanceEnums = inject(SharedStock);
  sequenceService = inject(SequenceService);
  // services injections

  // sorting and exporting
  SortBy?: number;
  SortColumn?: string;
  tableData: IinvoiceDto[];
  exportData: any[];
  exportColumns: any[];
  exportSelectedCols: string[] = [];
  // sorting and exporting

  // other genera properties
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  // other genera properties

  ngOnInit() {
    this.initPurchaseData();
    this.subscribes();
  }
  subscribes() {
    this.transactionsService.invoicePurchaseList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  // data to list
  initPurchaseData() {
    this.transactionsService.getInvoiceList('', new PageInfo());
  }

  // pagination
  onPageChange(pageInfo: PageInfo) {
    // this.transactionsService.getAllStockIn('', pageInfo);
  }

  onAdd() {
    this.routerService.navigateTo('/transaction/purchase-invoice/Add-purchase-invoice');
  }
  onVeiw(data: any) {}

  onEdit(id: any) {
    this.routerService.navigateTo(`/transaction/purchase-invoice/Edit-purchase-invoice/${id}`);
  }

  onSearchChange() {
    // this.transactionsService.getAllStockIn(this.searchTerm, new PageInfo());
  }

  // on Delete
  onDelete(id: number) {}

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  // on export data
  exportClick() {
    // this.transactionsService.exportStockInList(this.searchTerm, this.SortBy, this.SortColumn);
    // this.transactionsService.exportStockInListDataSourceObservable.subscribe((res) => {
    //   this.exportData = res;
    // });
  }
}
