import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { SalesService } from '../../../sales.service';
import { CustomerCategoryDto } from '../../../models';

@Component({
  selector: 'app-customer-category-list',
  templateUrl: './customer-category-list.component.html',
  styleUrl: './customer-category-list.component.scss'
})
export class CustomerCategoryListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string;
  constructor(
    public authService: AuthService,
    private routerService : RouterService,
    private salesService : SalesService
  ) {}
 
  tableData : CustomerCategoryDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: CustomerCategoryDto[];
  ngOnInit() {

     this.initFinancialCalendarData();
     this.salesService.addCustomerCategoryDataObservable.subscribe(res=>{
      if(res) {
        this.initFinancialCalendarData();

      }
     })

  }

  routeToAdd() {
    this.routerService.navigateTo('masterdata/customer-category/add-customer-category')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`masterdata/customer-category/edit-customer-category/${id}`)
  }

  initFinancialCalendarData() {
    this.salesService.getcustomerCategory('', new PageInfo());

    this.salesService.customerCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.salesService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.salesService.getcustomerCategory('', pageInfo);

    this.salesService.customerCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.salesService.getcustomerCategory(event, new PageInfo());

    this.salesService.customerCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.salesService.deleteCustomerCategory(id);
  }

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportCustomerCategoriesData() {
    this.salesService.exportCustomerCategoriesData(this.searchTerm ,this.SortBy,this.SortColumn);
    this.salesService.exportsCustomerCateogiesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}
