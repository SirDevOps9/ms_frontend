import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ReturnInvoiceListView } from '../../../models/return-Invoice-dto';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
import { TransactionService } from '../../../transaction.service';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';

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
    { name: 'customerCode', headerText:('salesInvoice.customerCode') },
    { name: 'customerName', headerText:('salesInvoice.customerName') },
    { name: 'warehouseName', headerText:('salesInvoice.warehouse') },
    { name: 'invoiceJournalCode', headerText:('salesInvoice.relatedJournal') },

  ]

  ngOnInit() {
    this.initItemDefinitionData();
  }


  navigateHelpPageComponent() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['/erp/home-help-page/help-page', this.servicePage])
      ),
      '_blank'
    );
  }


  initItemDefinitionData() {
    this.transaction_service.getReturnSalesInvoiceList('', new PageInfo());
    this.transaction_service.returnsalseInvoiceListObs$.subscribe({
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
    this.transaction_service.returnsalseInvoiceListObs$.subscribe({
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
    this.transaction_service.exportReturnSalseInvoiceListObs$.subscribe((res) => {
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

  onAdd(){
      this.routerService.navigateTo(`transaction/sales-invoice/add`);
  }

  constructor( private routerService: RouterService, private router: Router,
    private transaction_service:TransactionService,
    private exportService:ExportService,

  ){

  }

}
