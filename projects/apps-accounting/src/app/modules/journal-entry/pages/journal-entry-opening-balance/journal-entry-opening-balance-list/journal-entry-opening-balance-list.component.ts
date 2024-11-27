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

  selectedEntries: JournalEntryDto[];
  tableData: JournalEntryDto[];
  exportData: JournalEntryDto[];

  active: boolean = false;
  currentPageInfo: PageInfoResult;

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

  exportClick(e?: Event) {
    this.exportGLOpeningBalanceData(this.searchTerm);
  }

  exportGLOpeningBalanceData(searchTerm: string) {
    this.journalEntryService.exportsEmployeesList(searchTerm);
    const columns = [
      { name: 'journalCode', headerText: 'Journal.journalCode' },
      { name: 'refrenceNumber', headerText: 'Journal.referenceNumber' },
      { name: 'createdOn', headerText: 'Journal.CreatedOn'},
      { name: 'type', headerText: 'Journal.type' },
      { name: 'status', headerText: 'Journal.status' },
      { name: 'totalDebitAmount', headerText: 'Journal.totalDebitAmount' },
      { name: 'totalCreditAmount', headerText: 'Journal.totalCreditAmount' },

    ];

    this.journalEntryService.journalEntriesObs.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
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
