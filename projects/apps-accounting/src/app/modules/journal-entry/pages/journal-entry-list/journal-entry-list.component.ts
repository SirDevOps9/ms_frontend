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
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

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
  active: boolean = false;
  currentPageInfo: PageInfoResult;
  exportColumns: lookupDto[];
  exportData: JournalEntryDto[];
  searchTerm: string;
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'journalCode', headerText: 'Journal.journalCode' },
      { name: 'refrenceNumber', headerText: 'Journal.referenceNumber' },
      { name: 'createdOn', headerText: 'Journal.CreatedOn' },
      { name: 'type', headerText: 'Journal.type' },
      { name: 'status', headerText: 'Journal.status' },
      { name: 'isRepeated', headerText: 'Journal.isRepeated' },
      { name: 'isReversed', headerText: 'Journal.isReversed' },
      { name: 'totalDebitAmount', headerText: 'Journal.totalDebitAmount' },
      { name: 'totalCreditAmount', headerText: 'Journal.totalCreditAmount' },
      { name: 'sourceName', headerText: 'Journal.sourceName' },
      { name: 'sourceCode', headerText: 'Journal.sourceCode' },
  ]
  constructor(
    private routerService: RouterService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums,
    private loaderService: LoaderService,
    private router: Router,
    private exportService:ExportService
  ) {
    this.searchColumnsControl = new FormControl([]);
  }

  ngOnInit() {
    this.initJournalEntryData();

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
  exportClick() {
    this.exportJournalEntriesData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportJournalEntriesData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.journalEntryService.exportJournalEntriesData(searchTerm , sortBy , sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

    this.journalEntryService.exportsJournalEntriesDataSourceObservable.subscribe((res) => {
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
