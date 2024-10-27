import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { RouterService, PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { SalesService } from '../../../sales.service';
import { CustomerDefinitionDto } from '../../../models/customerDefinitionDto';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss',
})
export class CustomerListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string;
  constructor(
    public authService: AuthService,

    private salesService: SalesService,
    private routerService: RouterService
  ) {}

  tableData: any[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: CustomerDefinitionDto[];
  ngOnInit() {
    this.initFinancialCalendarData();
  }

  routeToAdd() {
    this.routerService.navigateTo('masterdata/customer-definitions/add-customer-definitions');
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(
      `masterdata/customer-definitions/edit-customer-definitions/${id}`
    );
  }

  initFinancialCalendarData() {
    this.salesService.getcustomerDefinition('', new PageInfo());

    this.salesService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.salesService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.salesService.getcustomerDefinition('', pageInfo);

    this.salesService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange(event: any) {
    this.salesService.getcustomerDefinition(event, new PageInfo());

    this.salesService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log('onSearchChange', this.tableData);
      },
    });
  }

  onDelete(id: number) {
    this.salesService.deleteCustomerDefinition(id);
  }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportCustomersData() {
    this.salesService.exportCustomersData(this.searchTerm, this.SortBy, this.SortColumn);
    this.salesService.exportsCustomersDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}
