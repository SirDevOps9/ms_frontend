import { Component, inject, OnInit } from '@angular/core';
import { RouterService, PageInfoResult, PageInfo, SharedEnums } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { PurchaseReturnInvoice } from '../../../models';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SequenceService } from 'apps-shared-lib';

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
  SortByAll?: SortTableEXport;

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
    // this.routerService.navigateTo('/transaction/return-purchase/add');
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.PurchaseReturnInvoice,
      '/transaction/return-purchase-invoice/add'
    );
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transaction/return-purchase-invoice/edit/${id}`);
  }
  onView(id: any) {
    this.routerService.navigateTo(`/transaction/return-purchase-invoice/view/${id}`);
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

  // #############Export section #################
  exportClick() {
    this.exportTableData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportTableData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.transactionsService.exportInvoiceReturnListData(searchTerm, sortBy, sortColumn);
    const columns = [
      { name: 'code', headerText: 'purchaseReturn.code' },
      { name: 'returnInvoiceDate', headerText: 'purchaseReturn.returnInvoiceDate' },
      { name: 'vendorCode', headerText: 'purchaseReturn.vendorCode' },
      { name: 'vendorName', headerText: 'purchaseReturn.vendorName' },
      { name: 'warehouseName', headerText: 'purchaseReturn.warehouseName' },
      { name: 'invoiceJournalCode', headerText: 'purchaseReturn.invoiceJournalCode' },
      { name: 'stockOutCode', headerText: 'purchaseReturn.stockOutCode' },
      { name: 'totalNetAmount', headerText: 'purchaseReturn.totalNetAmount' },
      { name: 'vatAmount', headerText: 'purchaseReturn.vatAmount' },
      { name: 'grandTotal', headerText: 'purchaseReturn.grandTotal' },
    ];
    this.transactionsService.exportInvoiceReturnData.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
    });
  }

  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }
  // #############Export section #################

  constructor(
    private routerService: RouterService,
    private transactionsService: PurchaseTransactionsService,
    private exportService: ExportService,
    private sequenceService: SequenceService,
    public sharedEnums: SharedEnums
  ) {}
}
