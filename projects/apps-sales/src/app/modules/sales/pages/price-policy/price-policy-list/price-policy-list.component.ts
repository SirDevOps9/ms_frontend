import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../../sales.service';
import { lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { PricelistDto } from '../../../models';

@Component({
  selector: 'app-price-policy-list',
  templateUrl: './price-policy-list.component.html',
  styleUrls: ['./price-policy-list.component.scss']
})
export class PricePolicyListComponent implements OnInit {
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
    this.salesService.getAllPricePolicy('', new PageInfo());
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
    this.salesService.getAllPricePolicy('', pageInfo);
  }

  onSearchChange(event: any) {
    this.salesService.getAllPricePolicy(event, new PageInfo());
  }

  routeToAdd() {
    this.routerService.navigateTo(
      'masterdata/price-policy/add'
    );
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(
      `masterdata/pricelist/edit/${id}`
    );
  }


  onDelete(id: number) {
    this.salesService.deletePricePolicy(id);
  }
  

  view(id: number) {
    this.routerService.navigateTo(
      `masterdata/pricelist/view/${id}`
    );  }

    export(searchTerm: string) {
      this.salesService.exportPricePolicy(searchTerm);
      this.salesService.exportsPriceListObservable.subscribe((res) => {
        this.exportData = res;
      });
    }

}
