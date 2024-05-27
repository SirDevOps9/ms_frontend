import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LanguageService, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../journal-entry.service';
import { JournalEntryDto, SharedJournalEnums } from '../../models';

@Component({
  selector: 'app-journal-entry-list',
  templateUrl: './journal-entry-list.component.html',
  styleUrl: './journal-entry-list.component.scss',
})
export class JournalEntryListComponent implements OnInit {
  journalEntries: JournalEntryDto[];
  @ViewChild('myTab') myTab: any | undefined;
  selectedEntries: JournalEntryDto[];
  tableData: JournalEntryDto[];
  cols: any[] = [];
  active: boolean = false;
  currentPageInfo: PageInfoResult = {};

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('JournalEntry.JournalEntryList'));
    this.initJournalEntryData(new PageInfo());
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
        header: 'CreatedOn',
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

  initJournalEntryData(page: PageInfo) {
    this.journalEntryService.getAllJournalEntriesPaginated(page);

    this.journalEntryService.journalEntries.subscribe({
      next: (data) => {
        this.tableData = data;
        //console.log('data', this.journalEntries);
      },
    });

    this.journalEntryService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.initJournalEntryData(pageInfo);
  }

  routeToAdd() {
    this.routerService.navigateTo(`/journalentry/add`);
  }

  viewJournal(id : number) {
    this.routerService.navigateTo(`/journalentry/view/${id}`);

  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }
}
