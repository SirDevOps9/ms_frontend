import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo, PageInfoResult, RouterService, SharedEnums } from 'shared-lib';
import { ReturnInvoiceListView } from '../../../models/return-Invoice-dto';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
import { TransactionService } from '../../../transaction.service';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SequenceService } from 'apps-shared-lib';

@Component({
  selector: 'app-list-sales-return-invoice',
  templateUrl: './list-sales-return-invoice.component.html',
  styleUrl: './list-sales-return-invoice.component.scss'
})
export class ListSalesReturnInvoiceComponent {

  tableData: ReturnInvoiceListView[] = [];


  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  exportData: any[];
  exportColumns: any[];
  hasHelpPage: Boolean = false;
  servicePage: number;
  SortBy?: number;
  SortColumn?: string;
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText:('salesInvoice.code') },
    { name: 'returnInvoiceDate', headerText:('salesInvoice.invoiceDate') },
    { name: 'customerCode', headerText:('salesInvoice.customerCode') },
    { name: 'customerName', headerText:('salesInvoice.customerName') },
    { name: 'warehouseName', headerText:('salesInvoice.warehouse') },
    { name: 'invoiceJournalCode', headerText:('salesInvoice.relatedJournal') },
    { name: 'createdOn', headerText:('salesInvoice.createdStockout') },
    { name: 'totaOfQuantity', headerText:('salesInvoice.totalQuantity') },
    { name: 'noOfItems', headerText:('salesInvoice.numberOfItems') },
    { name: 'totalNetAmount', headerText:('salesInvoice.total') },
    { name: 'totalVatAmount', headerText:('salesInvoice.vatAmount') },
    { name: 'grandTotal', headerText:('salesInvoice.totalAfterVat') },


  ]

  ngOnInit() {
    this.inGetData();
  }


  navigateHelpPageComponent() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['/erp/home-help-page/help-page', this.servicePage])
      ),
      '_blank'
    );
  }


  inGetData() {
    this.transaction_service.getReturnSalesInvoiceList('', new PageInfo());
    this.transaction_service.returnSalesInvoiceListDataObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
    this.transaction_service.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.transaction_service.getSalesInvoiceList('', pageInfo);
  }
  onSearchChange(event: any) {
    this.transaction_service.getReturnSalesInvoiceList(event, new PageInfo());
    this.transaction_service.returnSalesInvoiceListDataObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  exportClick() {
    this.exportRetuenSalesInvoiceList(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportRetuenSalesInvoiceList(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.transaction_service.exportRetuenSalesInvoiceList(searchTerm, sortBy, sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));
    this.transaction_service.expoerReturnSalesInvoiceListDataObs$.subscribe((res) => {
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


  onAdd() {
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.SalesInvoice,
      '/transactions/sales-return-invoice/add'
    );
  }
  onDelete(id: number) {
    this.transaction_service.deleteRetuenSalesInvoiceListItem(id);
    this.inGetData()
  }
  onVeiw(data: number) {
    this.routerService.navigateTo(`transactions/sales-return-invoice/view/${data}`);
  }

  constructor( private routerService: RouterService, private router: Router,
    private transaction_service:TransactionService,
    private exportService:ExportService, private sequenceService: SequenceService,
        private sharedEnums: SharedEnums,

  ){

  }

}
