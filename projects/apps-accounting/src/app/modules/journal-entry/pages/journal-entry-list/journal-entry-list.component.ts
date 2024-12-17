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
import { JournalEntryDto, LookupDto, SharedJournalEnums } from '../../models';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';
import { HttpParams } from '@angular/common/http';

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
  SortByAll: SortTableEXport;
  filteredColumns: string[] = [];
  filterForm: FormGroup;
  filterTypes: LookupDto[] = [];
  filterStatus: LookupDto[] = [];
  filterSourceType: LookupDto[] = [];
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
  ];
  constructor(
    private routerService: RouterService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums,
    private loaderService: LoaderService,
    private router: Router,
    private exportService: ExportService
  ) {
    this.searchColumnsControl = new FormControl([]);
  }

  ngOnInit() {
    this.initJournalEntryData();
    this.getLookup();
    this.lookupSubscriptions();
    this.initiateFilterForm();
  }

  initiateFilterForm() {
    this.filterForm = new FormGroup({
      range: new FormControl([]),
      type: new FormControl([]),
      status: new FormControl([]),
      sourceDocument: new FormControl([]),
    });
  }

  filter() {
    const filter = {
      FromDate: this.filterForm.get('range')!.value?.[0]
        ? new Date(this.filterForm.get('range')!.value[0]).toISOString().slice(0, 10)
        : '',
      ToDate: this.filterForm.get('range')!.value?.[1]
        ? new Date(this.filterForm.get('range')!.value[1]).toISOString().slice(0, 10)
        : '',
      Type: this.filterForm.get('type')!.value ?? '',
      Status: this.filterForm.get('status')!.value ?? '',
      SourceDocument: this.filterForm.get('sourceDocument')!.value ?? '',
    };
    this.journalEntryService.getAllJournalEntriesPaginated('', new PageInfo(), filter);
  }

  selectDate(event: any) {
    this.filterForm.get('fromDate')!.setValue(event[0]);
    this.filterForm.get('toDate')!.setValue(event[1]);
  }

  lookupSubscriptions() {
    this.journalEntryService.journalEntryStatus.subscribe((status) => {
      this.filterStatus = status;
    });

    this.journalEntryService.journalEntryTypes.subscribe((types) => {
      this.filterTypes = types;
    });

    this.journalEntryService.journalEntryDocumentsTypes.subscribe((types) => {
      this.filterSourceType = types;
    });
  }

  getLookup() {
    this.journalEntryService.getJournalEntryStatus();
    this.journalEntryService.getJournalEntryType();
    this.journalEntryService.getJournalEntryDocumentType();
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
    this.exportJournalEntriesData(
      this.searchTerm,
      this.SortByAll?.SortBy,
      this.SortByAll?.SortColumn
    );
  }

  exportJournalEntriesData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.journalEntryService.exportJournalEntriesData(searchTerm, sortBy, sortColumn);
    const filteredColumns = this.columns.filter((col) => this.filteredColumns.includes(col.name));

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
    this.filteredColumns = e;
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
