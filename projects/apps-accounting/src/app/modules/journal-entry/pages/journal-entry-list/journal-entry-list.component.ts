import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  LanguageService,
  LoaderService,
  lookupDto,
  PageInfo,
  PageInfoResult,
  RouterService,
} from 'shared-lib';
import { JournalEntryService } from '../../journal-entry.service';
import { JournalEntryDto, SharedJournalEnums } from '../../models';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  currentPageInfo: PageInfoResult;
  exportColumns: lookupDto[];
  exportData: JournalEntryDto[];
  constructor(
    private routerService: RouterService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums,
    private loaderService: LoaderService,
    private router: Router
  ) {
    this.searchColumnsControl = new FormControl([]);
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

  initJournalEntryData() {
    this.journalEntryService.getAllJournalEntriesPaginated('', new PageInfo());

    this.journalEntryService.journalEntries.subscribe({
      next: (data) => {
        this.tableData = data;
      },
    });

    this.journalEntryService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  routeToAdd() {
    this.router.navigate(['/transcations/journalentry/add']);
  }

  viewJournal(id: number) {
    this.routerService.navigateTo(`/transcations/journalentry/view/${id}`);
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(`transcations/journalentry/edit/${id}`);
  }
  onSearchChange(event: any) {
    this.journalEntryService.getAllJournalEntriesPaginated(event, new PageInfo());
    this.journalEntryService.journalEntries.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.journalEntryService.getAllJournalEntriesPaginated('', pageInfo);
    this.journalEntryService.journalEntries.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportJournalEntriesData(searchTerm: string) {
    this.journalEntryService.exportJournalEntriesData(searchTerm);
    this.journalEntryService.exportsJournalEntriesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  routeToPaymentInView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/finance/transcations/paymentin/view/${id}`])
    );
    window.open(url, '_blank');
  }

  routeToPaymentOutView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/finance/transcations/paymentout/view/${id}`])
    );
    window.open(url, '_blank');
  }

  filtered_columns: any[] = [];
  selected_filtered_columns: any[] = [];
  searchColumnsControl: FormControl;

  fillFilterDropdown(dropdown: any) {
    this.filtered_columns = dropdown.columns;
  }
}
