import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { SalesService } from '../../../sales.service';
import { GetAllCustomerOpeningBalanceDto } from '../../../models/get-all-customer-opening-balance-dto';

@Component({
  selector: 'app-customer-opening-balance-list',
  templateUrl: './customer-opening-balance-list.component.html',
  styleUrls: ['./customer-opening-balance-list.component.css'],
})
export class CustomerOpeningBalanceListComponent implements OnInit {
  tableData: GetAllCustomerOpeningBalanceDto[];

  currentPageInfo: PageInfoResult = {};
  searchTerm: string;

  exportColumns: lookupDto[];
  exportData: GetAllCustomerOpeningBalanceDto[];

  constructor(
    private salesService: SalesService,
    private routerService: RouterService,
    private title: Title,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.subscribes();
    this.initCustomerOpeningBalanceData();
    this.title.setTitle(this.langService.transalte('payment-in.payment-in'));
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
    this.salesService.getAllCustomerOpeningBalance(event.target.value, new PageInfo());
  }

  routeToAdd() {
    //todo
    this.routerService.navigateTo('masterdata/customer-opening-balance/add-customer-opening-balance');
  }

  routeToEdit(id: number) {
    //todo
  }

  onDelete(id: number) {
    //todo
  }

  view(id: number) {
    //todo
  }
}
