import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CustomerCategoryDto, VendorCategoryDto } from '../../../models';

@Component({
  selector: 'app-customer-category-list',
  templateUrl: './customer-category-list.component.html',
  styleUrl: './customer-category-list.component.scss'
})
export class CustomerCategoryListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private accountService: AccountService,
    private generalSettingService: GeneralSettingService,
    private routerService : RouterService
  ) {}

  tableData : CustomerCategoryDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
 
  ngOnInit() {

     this.initFinancialCalendarData();

  }

  routeToAdd() {
    this.routerService.navigateTo('add-customer-category')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`edit-customer-category/${id}`)
  }

  initFinancialCalendarData() {
    this.generalSettingService.getcustomerCategory('', new PageInfo());

    this.generalSettingService.customerCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getcustomerCategory('', new PageInfo());

    this.generalSettingService.customerCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.generalSettingService.getcustomerCategory(event.target.value, new PageInfo());

    this.generalSettingService.customerCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deleteCustomerCategory(id);
  }

 
}
