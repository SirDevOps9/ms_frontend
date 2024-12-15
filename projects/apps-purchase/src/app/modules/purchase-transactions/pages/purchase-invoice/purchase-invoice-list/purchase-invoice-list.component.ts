import { Component, inject, OnInit } from '@angular/core';
import { SequenceService } from 'apps-shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { RouterService, PageInfoResult, PageInfo, SharedEnums } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { IinvoiceDto } from '../../../models/purchase-invoice';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-purchase-invoice-list',
  templateUrl: './purchase-invoice-list.component.html',
  styleUrl: './purchase-invoice-list.component.scss',
})
export class PurchaseInvoiceListComponent implements OnInit {
  // sorting and exporting
  SortBy?: number;
  SortColumn?: string;
  tableData: IinvoiceDto[];
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
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.PurchaseInvoice,
      '/transactions/purchase-invoice/add'
    );
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transactions/purchase-invoice/edit/${id}`);
  }
  onView(id: any) {
    this.routerService.navigateTo(`/transactions/purchase-invoice/view/${id}`);
  }

  onSearchChange() {
    this.transactionsService.getInvoiceList(this.searchTerm, new PageInfo());
  }

  // on Delete
  onDelete(id: number) {
    this.transactionsService.deleteInvoiceLine(id);
  }

  // #############Export section #################
  exportClick() {
    this.exportTableData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportTableData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.transactionsService.exportInvoiceListData(searchTerm, sortBy, sortColumn);
    const columns = [
      { name: 'code', headerText: 'purchase.invoiceCode' },
      { name: 'invoiceDate', headerText: 'purchase.invoiceDate' },
      { name: 'vendorCode', headerText: 'purchase.vendorCode' },
      { name: 'vendorName', headerText: 'purchase.vendorName' },
      { name: 'currencyName', headerText: 'purchase.currencyName' },
      { name: 'currencyRate', headerText: 'purchase.currencyRate' },
      { name: 'reference', headerText: 'purchase.reference' },
      { name: 'paymentTermName', headerText: 'purchase.paymentTermName' },
      { name: 'warehouseName', headerText: 'purchase.warehouseName' },
      { name: 'invoiceJournalCode', headerText: 'purchase.invoiceJournalCode' },
      { name: 'stockInCode', headerText: 'purchase.stockInCode' },
      { name: 'totalNetAmount', headerText: 'purchase.totalNetAmount' },
      { name: 'totalDiscount', headerText: 'purchase.totalDiscount' },
      { name: 'totalAfterDiscount', headerText: 'purchase.totalAfterDiscount' },
      { name: 'vatAmount', headerText: 'purchase.vatAmount' },
      { name: 'totalAfterVatAmount', headerText: 'purchase.totalAfterVatAmount' },
      { name: 'id', headerText: 'purchase.actions' },
    ];
    this.transactionsService.exportInvoiceData.subscribe((res) => {
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
    private sharedEnums: SharedEnums
  ) {}
}
