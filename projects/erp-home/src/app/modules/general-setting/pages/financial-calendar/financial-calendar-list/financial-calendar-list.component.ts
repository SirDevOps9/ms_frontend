import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, PageInfo } from 'shared-lib';

import { GeneralSettingService } from '../../../general-setting.service';
import {  financialCalendar } from '../../../models';
import { AuthService } from 'microtec-auth-lib';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';

@Component({
  selector: 'app-financial-calendar-list',
  templateUrl: './financial-calendar-list.component.html',
  styleUrl: './financial-calendar-list.component.scss'
})
export class FinancialCalendarListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private accountService: AccountService,
    private generalSettingService: GeneralSettingService,
    private routerService : RouterService
  ) {}

  tableData : financialCalendar[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
 
  ngOnInit() {

     this.initFinancialCalendarData();

  }

  routeToAdd() {
    this.routerService.navigateTo('add-financial-calendar')
  }
  routeToEdit(id : number) {
    this.routerService.navigateTo(`edit-financial-calendar/${id}`)
  }

  initFinancialCalendarData() {
    this.generalSettingService.getfinancialCalendar('', new PageInfo());

    this.generalSettingService.financialCalendarDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

 
  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getfinancialCalendar('', pageInfo);

    this.generalSettingService.financialCalendarDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }



  onSearchChange(event : any) {
    this.generalSettingService.getfinancialCalendar(event.target.value, new PageInfo());

    this.generalSettingService.financialCalendarDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    // this.accountService.deleteTax(id);
  }

 
}
