import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { RouterService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CustomerCategoryDto } from '../../../models';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private accountService: AccountService,
    private generalSettingService: GeneralSettingService,
    private routerService : RouterService
  ) {}

  tableData : any[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
 
  ngOnInit() {

     this.initFinancialCalendarData();

  }

  routeToAdd() {
    this.routerService.navigateTo('add-customer-definitions')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`edit-customer-definitions/${id}`)
  }


  initFinancialCalendarData() {
    this.generalSettingService.getcustomerDefinition('', new PageInfo());

    this.generalSettingService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getcustomerDefinition('', pageInfo);

    this.generalSettingService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.generalSettingService.getcustomerDefinition(event.target.value, new PageInfo());

    this.generalSettingService.customerDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log('onSearchChange',this.tableData)

      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deleteCustomerDefinition(id);
  }

  onColumnsChange(e:any) {

  }

 
}
