import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PageInfoResult,
  MenuModule,
  RouterService,
  PageInfo,
  lookupDto,
  LanguageService,
} from 'shared-lib';

import { GeneralSettingService } from '../../../general-setting.service';
import { financialCalendar } from '../../../models';
import { AuthService } from 'microtec-auth-lib';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-financial-calendar-list',
  templateUrl: './financial-calendar-list.component.html',
  styleUrl: './financial-calendar-list.component.scss',
})
export class FinancialCalendarListComponent implements OnInit {
  tableData: financialCalendar[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: financialCalendar[];
  SortBy?: number;
  SortColumn?: string;
  constructor(
    public authService: AuthService,
    private generalSettingService: GeneralSettingService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.initFinancialCalendarData();
  }

  routeToAdd() {
    this.routerService.navigateTo('masterdata/financial-calendar/add-financial-calendar');
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(`masterdata/financial-calendar/edit-financial-calendar/${id}`);
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

  onSearchChange(event: any) {
    this.generalSettingService.getfinancialCalendar(event, new PageInfo());

    this.generalSettingService.financialCalendarDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportClick() {
    this.generalSettingService.exportFinancialCalendarData(
      this.searchTerm,
      this.SortBy,
      this.SortColumn
    );
    this.generalSettingService.exportsFinancialCalendarDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
  onDelete(id: number) {
    // this.accountService.deleteTax(id);
  }
}
