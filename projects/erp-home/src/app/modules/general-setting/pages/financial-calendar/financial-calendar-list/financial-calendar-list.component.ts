import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, PageInfo, lookupDto, LanguageService } from 'shared-lib';

import { GeneralSettingService } from '../../../general-setting.service';
import { financialCalendar } from '../../../models';
import { AuthService } from 'microtec-auth-lib';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { Title } from '@angular/platform-browser';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-financial-calendar-list',
  templateUrl: './financial-calendar-list.component.html',
  styleUrl: './financial-calendar-list.component.scss',
})
export class FinancialCalendarListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private generalSettingService: GeneralSettingService,
    private routerService: RouterService,
    private exportService:ExportService
  ) {}

  tableData: financialCalendar[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  SortByAll:SortTableEXport
  exportColumns: lookupDto[];
  exportData: financialCalendar[];
  mappedExportData: financialCalendar[];

  ngOnInit() {
    this.initFinancialCalendarData();
  }

  routeToAdd() {
    this.routerService.navigateTo('masterdata/financial-calendar/add-financial-calendar');
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(
      `masterdata/financial-calendar/edit-financial-calendar/${id}`
    );
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

  exportClick() {
    this.exportcurrencyData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportcurrencyData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.generalSettingService.exportFinancialCalendarData(searchTerm , sortBy , sortColumn);
    const columns = [
      { name: 'code', headerText:('financialCalendar.code') },
      { name: 'name', headerText:('financialCalendar.name') },
      { name: 'fromDate', headerText:('financialCalendar.fromDate') },
      { name: 'toDate', headerText:('financialCalendar.toDate') },
      { name: 'status', headerText:('financialCalendar.status') },

    ];
    this.generalSettingService.exportsFinancialCalendarDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
      this.mappedExportData = res.map((elem: any) => {
        const { createdOn, ...args } = elem;
        return { ...args, codeNumber : elem.code };
      });
    });
  }

  exportClickBySort(e:{SortBy: number; SortColumn: string}){
    this.SortByAll={
     SortBy: e.SortBy,
     SortColumn:e.SortColumn
    }
 }
  onDelete(id: number) {
    this.generalSettingService.deleteFinancialYear(id);
  }
}
