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
  cols: any[] = [];
  active: boolean = false;
  currentPageInfo: PageInfoResult;

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    this.initJournalEntryData();
    this.cols = [
      {
        field: 'Id',
        header: 'Id',
      },
      {
        field: 'Journal Code',
        header: 'JournalCode',
      },
      {
        field: 'Reference',
        header: 'RefrenceNumber',
      },
      {
        field: 'Date',
        header: 'JournalDate',
      },
      {
        field: 'Type',
        header: 'Type',
      },
      {
        field: 'Document Name',
        header: 'SourceName',
      },
      {
        field: 'Document Code',
        header: 'SourceCode',
      },
      {
        field: 'Repeated',
        header: 'IsRepeated',
      },
      {
        field: 'Reversed',
        header: 'IsReversed',
      },
      {
        field: 'Status',
        header: 'Status',
      },
      {
        field: 'Debit',
        header: 'TotalDebitAmount',
      },
      {
        field: 'Credit',
        header: 'TotalCreditAmount',
      },
      {
        field: 'Returned',
        header: '',
      },
      {
        field: 'Actions',
        header: 'Actions',
      },
    ];
  }

  exportClick(e?: Event) {
    this.exportGLOpeningBalanceData(this.searchTerm);
  }

  exportGLOpeningBalanceData(searchTerm: string) {
    this.journalEntryService.exportsEmployeesList(searchTerm);

     this.journalEntryService.journalEntriesObs.subscribe((res) => {
      this.exportData = res;
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
