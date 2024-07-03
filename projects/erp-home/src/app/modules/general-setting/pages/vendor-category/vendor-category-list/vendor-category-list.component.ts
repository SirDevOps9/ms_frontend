import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { VendorCategoryDto, financialCalendar } from '../../../models';

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
    private generalSettingService: GeneralSettingService,
    private routerService : RouterService
  ) {}

  tableData : VendorCategoryDto[];

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
    this.generalSettingService.getVendorCategory('', new PageInfo());

    this.generalSettingService.vendorCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getVendorCategory('', new PageInfo());

    this.generalSettingService.vendorCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.generalSettingService.getVendorCategory(event.target.value, new PageInfo());

    this.generalSettingService.vendorCategoryDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deleteVendorCategory(id);
  }

 
}
