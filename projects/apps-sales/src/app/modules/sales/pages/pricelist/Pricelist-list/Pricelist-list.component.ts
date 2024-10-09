import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../sales.service';
import { lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { PricelistDto } from '../../../models';

@Component({
  selector: 'app-Pricelist-list',
  templateUrl: './Pricelist-list.component.html',
  styleUrls: ['./Pricelist-list.component.scss']
})
export class PricelistListComponent implements OnInit {
  tableData: PricelistDto[];

  currentPageInfo: PageInfoResult = {};
  searchTerm: string;

  exportColumns: lookupDto[];
  exportData: PricelistDto[];

  constructor(
    private salesService: SalesService,
    private routerService: RouterService
  ) {
  }

  ngOnInit() {

    this.subscribes();
    this.initPriceListData();

  }

  initPriceListData() {
    this.salesService.getAllPriceList('', new PageInfo());
  }

  subscribes() {
    this.salesService.priceListDataSourceeObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.salesService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.salesService.getAllPriceList('', pageInfo);
  }

  onSearchChange(event: any) {
    this.salesService.getAllPriceList(event, new PageInfo());
  }

  routeToAdd() {
    this.routerService.navigateTo(
      'masterdata/pricelist/add'
    );
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(
      `masterdata/pricelist/edit/${id}`
    );
  }


  onDelete(id: number) {
    this.salesService.deleteCustomerOpeningBalanceHeader(id);
  }
  

  view(id: number) {
    this.routerService.navigateTo(
      `masterdata/pricelist/view/${id}`
    );  }

    export(searchTerm: string) {
      this.salesService.exportPriceList(searchTerm);
      this.salesService.exportsPriceListObservable.subscribe((res) => {
        this.exportData = res;
      });
    }

}
