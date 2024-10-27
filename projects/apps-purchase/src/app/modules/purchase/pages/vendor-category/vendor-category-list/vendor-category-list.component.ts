import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { PurchaseService } from '../../../purchase.service';
import { VendorCategoryDto } from '../../../models';

@Component({
  selector: 'app-vendor-category-list',
  templateUrl: './vendor-category-list.component.html',
  styleUrl: './vendor-category-list.component.scss',
})
export class VendorCategoryListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string;
  constructor(
    public authService: AuthService,
    private purchaseService: PurchaseService,
    private routerService: RouterService
  ) {}

  tableData: VendorCategoryDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  exportColumns: lookupDto[];
  exportData: VendorCategoryDto[];

  ngOnInit() {
    this.initFinancialCalendarData();

    this.purchaseService.addVendorCategoryDataObservable.subscribe((res) => {
      if (res) {
        this.initFinancialCalendarData();
      }
    });
  }

  routeToAdd() {
    this.routerService.navigateTo('/masterdata/vendor-category/add-vendor-category');
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(`/masterdata/vendor-category/edit-vendor-category/${id}`);
  }

  initFinancialCalendarData() {
    this.purchaseService.getVendorCategory('', new PageInfo());

    this.purchaseService.vendorCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.purchaseService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.purchaseService.getVendorCategory('', pageInfo);

    this.purchaseService.vendorCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange(event: any) {
    this.purchaseService.getVendorCategory(event, new PageInfo());

    this.purchaseService.vendorCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.purchaseService.deleteVendorCategory(id);
  }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportVendorCategoriesData() {
    this.purchaseService.exportVendorCategoriesData(this.searchTerm, this.SortBy, this.SortColumn);
    this.purchaseService.exportsVendorCateogiesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}
