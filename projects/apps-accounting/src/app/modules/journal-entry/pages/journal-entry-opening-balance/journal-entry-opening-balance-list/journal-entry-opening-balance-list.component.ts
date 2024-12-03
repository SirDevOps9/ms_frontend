import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  PageInfoResult,
  RouterService,
  LanguageService,
  LoaderService,
  PageInfo,
  lookupDto,
} from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { JournalEntryDto, SharedJournalEnums } from '../../../models';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-journal-entry-opening-balance-list',
  templateUrl: './journal-entry-opening-balance-list.component.html',
  styleUrl: './journal-entry-opening-balance-list.component.scss',
})
export class JournalEntryOpeningBalanceListComponent implements OnInit {
  journalEntries: JournalEntryDto[];
  @ViewChild('myTab') myTab: any | undefined;
  searchTerm: string;
  exportColumns: lookupDto[];
  SortByAll:SortTableEXport
  selectedEntries: JournalEntryDto[];
  tableData: JournalEntryDto[];
  exportData: JournalEntryDto[];
  active: boolean = false;
  currentPageInfo: PageInfoResult;
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'journalCode', headerText: 'Journal.journalCode' },
    { name: 'refrenceNumber', headerText: 'Journal.referenceNumber' },
    { name: 'createdOn', headerText: 'Journal.CreatedOn'},
    { name: 'type', headerText: 'Journal.type' },
    { name: 'status', headerText: 'Journal.status' },
    { name: 'totalDebitAmount', headerText: 'Journal.totalDebitAmount' },
    { name: 'totalCreditAmount', headerText: 'Journal.totalCreditAmount' },
  ]
  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums,
    private loaderService: LoaderService,
    private exportService:ExportService

  ) {
  }

  ngOnInit() {
    this.initJournalEntryData();

  }

  exportClick() {
    this.exportGLOpeningBalanceData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportGLOpeningBalanceData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.journalEntryService.exportsEmployeesList(searchTerm , sortBy , sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

    this.journalEntryService.journalEntriesObs.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, filteredColumns);
    });

  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }

  onFilterColumn(e: string[]) {
    console.log('new new', e);
    this.filteredColumns = e;
    e.forEach(selectedColumn => {
      const columnExists = this.columns.some(column => column.name === selectedColumn);
      if (columnExists) {
      } else {
      }
    });
  }

  initJournalEntryData() {
    this.journalEntryService.getAllJournalEntriesPaginatedOpeningBalance('', new PageInfo());

    this.journalEntryService.journalEntriesObs.subscribe({
      next: (data) => {
        this.tableData = data;
      },
    });

    this.journalEntryService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }


  routeToAdd() {
    this.routerService.navigateTo(`/transcations/journal-entry-opening-balance/add`);
  }

  viewJournal(id: number) {
    this.routerService.navigateTo(`/transcations/journal-entry-opening-balance/view/${id}`);
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(`transcations/journal-entry-opening-balance/edit/${id}`);
  }
  onSearchChange(event: any) {
    this.journalEntryService.getAllJournalEntriesPaginatedOpeningBalance(event, new PageInfo());
    this.journalEntryService.journalEntriesObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.journalEntryService.getAllJournalEntriesPaginatedOpeningBalance('', pageInfo);
    this.journalEntryService.journalEntriesObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
}
