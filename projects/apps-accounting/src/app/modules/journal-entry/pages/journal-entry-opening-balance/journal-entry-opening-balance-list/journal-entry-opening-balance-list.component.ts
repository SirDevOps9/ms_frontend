import { Component, OnInit, ViewChild } from '@angular/core';
import { PageInfoResult, RouterService, LoaderService, PageInfo, lookupDto } from 'shared-lib';
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
  SortBy?: number;
  SortColumn?: string;
  selectedEntries: JournalEntryDto[];
  tableData: JournalEntryDto[];
  exportData: JournalEntryDto[];
  cols: any[] = [];
  active: boolean = false;
  currentPageInfo: PageInfoResult;

  constructor(
    private routerService: RouterService,

    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums
  ) {}

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

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportClick() {
    this.journalEntryService.exportsEmployeesList(this.searchTerm, this.SortBy, this.SortColumn);

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
