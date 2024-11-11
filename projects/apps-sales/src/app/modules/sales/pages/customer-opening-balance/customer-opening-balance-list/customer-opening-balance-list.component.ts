import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { SalesService } from '../../../sales.service';
import { GetAllCustomerOpeningBalanceDto } from '../../../models/get-all-customer-opening-balance-dto';

@Component({
  selector: 'app-customer-opening-balance-list',
  templateUrl: './customer-opening-balance-list.component.html',
  styleUrls: ['./customer-opening-balance-list.component.scss'],
})
export class CustomerOpeningBalanceListComponent implements OnInit {
  tableData: GetAllCustomerOpeningBalanceDto[];

  currentPageInfo: PageInfoResult = {};
  searchTerm: string;

  exportColumns: lookupDto[];
  exportData: GetAllCustomerOpeningBalanceDto[];

  constructor(
    private salesService: SalesService,
    private routerService: RouterService
  ) {
  }

  ngOnInit() {

    this.subscribes();
    this.initCustomerOpeningBalanceData();

  }

  initCustomerOpeningBalanceData() {
    this.salesService.getAllCustomerOpeningBalance('', new PageInfo());
  }
  subscribes() {
    this.salesService.customerOpeningBalanceDataSource.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.salesService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.salesService.getAllCustomerOpeningBalance('', pageInfo);
  }

  onSearchChange(event: any) {
    this.salesService.getAllCustomerOpeningBalance(event, new PageInfo());
  }

  routeToAdd() {
    this.routerService.navigateTo(
      'masterdata/customer-opening-balance/add'
    );
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(
      `masterdata/customer-opening-balance/edit/${id}`
    );
  }


  onDelete(id: number) {
    this.salesService.deleteCustomerOpeningBalanceHeader(id);
  }
  

  view(id: number) {
    this.routerService.navigateTo(
      `masterdata/customer-opening-balance/view/${id}`
    );  }
}
