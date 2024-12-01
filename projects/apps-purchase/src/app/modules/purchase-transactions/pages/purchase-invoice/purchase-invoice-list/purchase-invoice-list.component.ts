import { Component, inject, OnInit } from '@angular/core';
import { SequenceService } from 'apps-shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { RouterService, PageInfoResult, PageInfo } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { IinvoiceDto } from '../../../models/purchase-invoice';

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

    this.transactionsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  // data to list
  initPurchaseData() {
    this.transactionsService.getInvoiceList('', new PageInfo());
  }

  // pagination
  onPageChange(pageInfo: PageInfo) {
    this.transactionsService.getInvoiceList('', pageInfo);
  }

  onAdd() {
    this.routerService.navigateTo('/transaction/purchase-invoice/add');
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transaction/purchase-invoice/edit/${id}`);
  }
  onView(id: any) {
    this.routerService.navigateTo(`/transaction/purchase-invoice/view/${id}`);
  }

  onSearchChange() {
    this.transactionsService.getInvoiceList(this.searchTerm, new PageInfo());
  }

  // on Delete
  onDelete(id: number) {
    this.transactionsService.deleteInvoiceLine(id);
  }

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  // on export data
  exportClick() {
    this.transactionsService.exportInvoiceListData(this.searchTerm, this.SortBy, this.SortColumn);
    this.transactionsService.exportInvoiceData.subscribe((res) => {
      this.exportData = res;
    });
  }
}
