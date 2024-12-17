import { Component } from '@angular/core';
import { PageInfoResult, PageInfo, RouterService, SharedEnums } from 'shared-lib';
import { Router } from '@angular/router';
import { SalesInvoiceListView } from '../../../models/sales-invoice-dto';
import { TransactionService } from '../../../transaction.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SequenceService } from 'apps-shared-lib';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrl: './sales-invoice.component.scss',
})
export class SalesInvoiceComponent {
  tableData: SalesInvoiceListView[] = [];
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  exportData: any[];
  exportColumns: any[];
  hasHelpPage: Boolean = false;
  servicePage: number;
  filteredColumns: string[] = [];
  SortByAll: SortTableEXport;
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText: 'salesInvoice.code' },
    { name: 'invoiceDate', headerText: 'salesInvoice.invoiceDate' },
    { name: 'warehouseName', headerText: 'salesInvoice.warehouse' },
    { name: 'customerCode', headerText: 'salesInvoice.customerCode' },
    { name: 'customerName', headerText: 'salesInvoice.customerName' },
    { name: 'paymentTermName', headerText: 'salesInvoice.paymentTerms' },
    { name: 'customerCreditLimit', headerText: 'salesInvoice.creditLimit' },
    { name: 'invoiceJournalCode', headerText: 'salesInvoice.relatedJournal' },
    { name: 'createdOn', headerText: 'salesInvoice.createdStockout' },
    { name: 'totalQuantity', headerText: 'salesInvoice.totalQuantity' },
    { name: 'noOfItems', headerText: 'salesInvoice.numberOfItems' },
    { name: 'totalNetAmount', headerText: 'salesInvoice.total' },
    { name: 'totalDiscount', headerText: 'salesInvoice.disAmount' },
    { name: 'totalAfterDiscount', headerText: 'salesInvoice.totalAfterDiscount' },
    { name: 'grandTotal', headerText: 'salesInvoice.totalAfterVat' },
  ];
  ngOnInit(): void {
    this.inGetData();
    const state = history.state;
    this.hasHelpPage = JSON.parse(state?.hashelppage || 'false');
    this.servicePage = state.servicePage;
  }
  exportClick() {
    this.exportBankData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportBankData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    const filteredColumns = this.columns.filter((col) => this.filteredColumns.includes(col.name));

    this.transaction_services.exportSalseInvoiceList(searchTerm, sortBy, sortColumn);
    this.transaction_services.exportSalesInvoiceObs.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, filteredColumns);
    });
  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }
  onFilterColumn(e: string[]) {
    this.filteredColumns = e;
  }

  inGetData() {
    this.transaction_services.getSalseInvoice('', new PageInfo());
    this.transaction_services.salesInvoiceObs.subscribe((res: any) => {
      this.tableData = res.result;
    });
    this.transaction_services.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.transaction_services.getSalseInvoice('', pageInfo);
  }

  onSearchChange() {
    this.transaction_services.getSalseInvoice(this.searchTerm, new PageInfo());
  }

  onVeiw(data: any) {
    this.routerService.navigateTo(`transactions/sales-invoice/view/${data}`);
  }

  onDelete(id: number) {
    this.transaction_services.deleteSalesInvoiceListItem(id);
    this.inGetData()
  }
 

  navigateHelpPageComponent() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['/erp/home-help-page/help-page', this.servicePage])
      ),
      '_blank'
    );
  }
  onAdd() {
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.SalesInvoice,
      '/transactions/sales-invoice/add'
    );
  }

  constructor(
    private routerService: RouterService,
    private router: Router,
    private sequenceService: SequenceService,
    private sharedEnums: SharedEnums,
    private transaction_services: TransactionService,
    private exportService: ExportService
  ) {}
}
