import { Component, OnInit } from '@angular/core';
import { VendorOpeningBalanceListDto } from '../../../models';
import { lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { PurchaseService } from '../../../purchase.service';

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
    private routerService : RouterService) { }

  ngOnInit() {
  }

  routeToAdd() {
    this.routerService.navigateTo('/masterdata/vendor-definitions/add-vendor-definitions')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`/masterdata/vendor-definitions/edit-vendor-definitions/${id}`)
  }
  onPageChange(pageInfo: PageInfo) {
    // this.purchaseService.getVendorDefinition('', pageInfo);

    // this.purchaseService.vendorDefinitionDataSourceObservable.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //   },
    // });
  }

  onSearchChange() {
    // this.purchaseService.getVendorDefinition(event, new PageInfo());

    // this.purchaseService.vendorDefinitionDataSourceObservable.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //   },
    // });
  }

  getExportData(e?: Event) {
    // this.purchaseService.exportVendorsData(searchTerm);
    // this.purchaseService.exportsVendorsDataSourceObservable.subscribe((res) => {
    //   this.exportData = res;
    // });
  }
  onEdit(data: any) {
    //this.routerService.navigateTo(`/masterdata/paymentterm/edit-payment-term/${data.id}`);
  }
  onDelete(data: any) {
   // this.routerService.navigateTo(`/masterdata/paymentterm/edit-payment-term/${data.id}`);
  }

}
