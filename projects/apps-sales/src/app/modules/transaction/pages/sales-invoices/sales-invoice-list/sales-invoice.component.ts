import { Component } from '@angular/core';
import {
  PageInfoResult,
  PageInfo,
  RouterService,
} from 'shared-lib';
import {  Router } from '@angular/router';
import { SalesInvoiceListView } from '../../../models/sales-invoice-dto';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrl: './sales-invoice.component.scss'
})
export class SalesInvoiceComponent {
  tableData: SalesInvoiceListView[] = [
    {
      invoiceCode: "INV001",
      invoiceDate: "2024-12-04",
      dueDate: "2024-12-11",
      salesman: "John Doe",
      customerCode: "CUST123",
      customerName: "Jane Smith",
      warehouse: "Main Warehouse",
      paymentTerms: "Net 30",
      creditLimit: 5000,
      relatedJournal: "Journal001",
      createdStockOut: true,
      totalQty: 100,
      numberOfItems: 5,
      totalAmount: 1500,
      discountAmount: 100,
      totalAfterDiscount: 1400,
      vatAmount: 70,
      totalAfterVat: 1470
    },
    {
      invoiceCode: "INV002",
      invoiceDate: "2024-12-01",
      dueDate: "2024-12-08",
      salesman: "Alice Brown",
      customerCode: "CUST456",
      customerName: "Bob Johnson",
      warehouse: "Secondary Warehouse",
      paymentTerms: "Net 15",
      creditLimit: 7000,
      relatedJournal: "Journal002",
      createdStockOut: false,
      totalQty: 50,
      numberOfItems: 3,
      totalAmount: 800,
      discountAmount: 50,
      totalAfterDiscount: 750,
      vatAmount: 37.5,
      totalAfterVat: 787.5
    }
  ];

  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  exportData: any[];
  exportColumns: any[];
  hasHelpPage: Boolean = false;
  servicePage: number;
  onPageChange(pageInfo: PageInfo) {
  }
  onSearchChange() {
  }
  exportClick() {
  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {

  }
  onFilterColumn(e: string[]) {
  }
  navigateHelpPageComponent() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['/erp/home-help-page/help-page', this.servicePage])
      ),
      '_blank'
    );
  }
  onAdd(){
      this.routerService.navigateTo(`transaction/sales-invoice/add`);
  }

  constructor( private routerService: RouterService, private router: Router,){

  }
}
