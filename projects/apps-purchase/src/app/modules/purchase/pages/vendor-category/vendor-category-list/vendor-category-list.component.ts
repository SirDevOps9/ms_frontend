import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { PurchaseService } from '../../../purchase.service';
import { VendorCategoryDto } from '../../../models';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';


@Component({
  selector: 'app-vendor-category-list',
  templateUrl: './vendor-category-list.component.html',
  styleUrl: './vendor-category-list.component.scss'
})
export class VendorCategoryListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private accountService: AccountService,
    private purchaseService: PurchaseService,
    private routerService : RouterService,
    private exportService:ExportService
  ) {}

  tableData : VendorCategoryDto[];
  SortByAll:SortTableEXport
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  exportColumns: lookupDto[];
  exportData: VendorCategoryDto[];

  ngOnInit() {

     this.initFinancialCalendarData();

     this.purchaseService.addVendorCategoryDataObservable.subscribe(res=>{
      if(res) {
        this.initFinancialCalendarData();

      }
     })

  }

  routeToAdd() {
    this.routerService.navigateTo('/masterdata/vendor-category/add-vendor-category')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`/masterdata/vendor-category/edit-vendor-category/${id}`)
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



  onSearchChange(event : any) {
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
  exportClick() {
    this.exportVendorCategoriesData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportVendorCategoriesData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.purchaseService.exportVendorCategoriesData(searchTerm , sortBy , sortColumn);
    const columns = [
      { name: 'code', headerText:('vendorCategory.categoryCode') },
      { name: 'name', headerText:('vendorCategory.categoryName') },
      { name: 'payableAccountName', headerText:('vendorCategory.payableGlAccount') },
      { name: 'purchaseAccountName', headerText:('vendorCategory.purchaseGlAccount') },
      { name: 'purchaseReturnAccountName', headerText:('vendorCategory.purchaseReturnGlAccount') },
      { name: 'discountAccountName', headerText:('vendorCategory.discountGlAccount') },
      { name: 'pricePolicyName', headerText:('vendorCategory.priceList') },
      { name: 'paymentTermName', headerText:('vendorCategory.paymentTerms') },
      { name: 'marketType', headerText:('vendorCategory.marketType') },

    ];
    this.purchaseService.exportsVendorCateogiesDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
    });
  }

  exportClickBySort(e:{SortBy: number; SortColumn: string}){
    this.SortByAll={
     SortBy: e.SortBy,
     SortColumn:e.SortColumn
    }
 }
}
