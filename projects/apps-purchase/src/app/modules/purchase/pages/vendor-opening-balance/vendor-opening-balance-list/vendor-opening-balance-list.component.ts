import { Component, OnInit } from '@angular/core';
import { VendorOpeningBalanceListDto } from '../../../models';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { PurchaseService } from '../../../purchase.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-vendor-opening-balance-list',
  templateUrl: './vendor-opening-balance-list.component.html',
  styleUrls: ['./vendor-opening-balance-list.component.scss']

})
export class VendorOpeningBalanceListComponent implements OnInit {

  tableData : VendorOpeningBalanceListDto[];

  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  
  exportColumns: lookupDto[];
  exportData: VendorOpeningBalanceListDto[];
  constructor(
    private purchaseService: PurchaseService,
    private routerService : RouterService,
    private title: Title,
    private langService: LanguageService) {
      this.title.setTitle(this.langService.transalte('VendorOpeningBalance.vendorOpeningBalance'));
     }

  ngOnInit() {
    this.subscribes();
    this.initCustomerOpeningBalanceData();
  }

 
  initCustomerOpeningBalanceData() {
    this.purchaseService.getAllVendorOpeningBalance('', new PageInfo());
  }

  subscribes() {
     this.purchaseService.vendorOpeningBalanceDataSourceObservable.subscribe({
       next: (res) => {
         this.tableData = res;
       },
     });

     this.purchaseService.currentPageInfo.subscribe((currentPageInfo) => {
       this.currentPageInfo = currentPageInfo;
     });
  }

  onPageChange(pageInfo: PageInfo) {
    this.purchaseService.getAllVendorOpeningBalance('', pageInfo);
  }

  onSearchChange(event: any) {
    this.purchaseService.getAllVendorOpeningBalance(event, new PageInfo());

  }

  routeToAdd() {
    this.routerService.navigateTo(
      'masterdata/vendor-opening-balance/add-vendor-opening-balance'
    );
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(
      `masterdata/vendor-opening-balance/edit-vendor-opening-balance/${id}`
    );
  }

  onDelete(id: number) {
    this.purchaseService.deletevendorOpeningBalance(id);
  }

  view(id: number) {
    this.routerService.navigateTo(
      `masterdata/vendor-opening-balance/view-vendor-opening-balance/${id}`
    );  }

}
