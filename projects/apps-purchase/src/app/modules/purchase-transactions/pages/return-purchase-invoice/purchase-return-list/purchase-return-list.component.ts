import { Component, inject, OnInit } from '@angular/core';
import { RouterService, PageInfoResult, PageInfo } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { PurchaseReturnInvoice } from '../../../models';

@Component({
  selector: 'app-purchase-return-list',
  templateUrl: './purchase-return-list.component.html',
  styleUrl: './purchase-return-list.component.scss',
})
export class PurchaseReturnListComponent implements OnInit {
  // sorting and exporting
  SortBy?: number;
  SortColumn?: string;
  tableData: PurchaseReturnInvoice[];
  exportData: any[];
  exportColumns: any[];
  exportSelectedCols: string[] = [];
  // sorting and exporting

  // other genera properties
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  // other genera properties

  ngOnInit() {
    this.initPurchaseReturnData();
    this.subscribes();
  }
  subscribes() {
    this.transactionsService.invoicePurchaseReturnList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.transactionsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  // data to list
  initPurchaseReturnData() {
    this.transactionsService.getReturnInvoiceList('', new PageInfo());
  }

  // pagination
  onPageChange(pageInfo: PageInfo) {
    this.transactionsService.getReturnInvoiceList('', pageInfo);
  }

  onAdd() {
    this.routerService.navigateTo('/transaction/return-purchase/add');
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transaction/return-purchase/edit/${id}`);
  }
  onView(id: any) {
    this.routerService.navigateTo(`/transaction/return-purchase/view/${id}`);
  }

  onSearchChange() {
    this.transactionsService.getReturnInvoiceList(this.searchTerm, new PageInfo());
  }

  // on Delete
  onDelete(id: number) {
    this.transactionsService.deleteInvoiceReturnLine(id);
  }

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  // on export data
  exportClick() {
    this.transactionsService.exportInvoiceReturnListData(
      this.searchTerm,
      this.SortBy,
      this.SortColumn
    );
    this.transactionsService.exportInvoiceReturnData.subscribe((res) => {
      this.exportData = res;
    });
  }
  constructor(
    private routerService: RouterService,
    private transactionsService: PurchaseTransactionsService
  ) {}
}
