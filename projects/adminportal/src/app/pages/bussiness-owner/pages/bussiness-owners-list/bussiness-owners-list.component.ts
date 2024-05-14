import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
import { SharedJournalEnums } from 'projects/apps-accounting/src/app/modules/journal-entry/models';

import {
  PageInfo,
  RouterService,
  LanguageService,
  FormConfig,
  FormTypes,
  SharedFormComponent,
  SharedLibModule,
} from 'shared-lib';

@Component({
  selector: 'app-bussiness-owners-list',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
  templateUrl: './bussiness-owners-list.component.html',
  styleUrl: './bussiness-owners-list.component.scss',
})
export class BussinessOwnersListComponent implements OnInit {
  @ViewChild('myTab') myTab: any | undefined;
  @ViewChild('form') form: SharedFormComponent;
  tableData = [
    {
      code: '101',
      name: 'John Doe',
      email: 'john@example.com',
      country: 'USA',
      mobileNumber: '+1 123 456 7890',
    },
    {
      code: '102',
      name: 'Alice Smith',
      email: 'alice@example.com',
      country: 'Canada',
      mobileNumber: '+1 234 567 8901',
    },
    {
      code: '103',
      name: 'Mohammed Khan',
      email: 'mohammed@example.com',
      country: 'India',
      mobileNumber: '+91 98765 43210',
    },
    {
      code: '104',
      name: 'Sophie Brown',
      email: 'sophie@example.com',
      country: 'UK',
      mobileNumber: '+44 1234 567890',
    },
    {
      code: '105',
      name: 'Chen Wei',
      email: 'chen@example.com',
      country: 'China',
      mobileNumber: '+86 10 1234 5678',
    },
  ];
  cols: any[] = [
    {
      field: 'Id',
      header: 'Id',
    },
    {
      field: 'Journal Code',
      header: 'code',
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
      header: 'country',
    },
    {
      field: 'Document Code',
      header: 'mobileNumber',
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
  fields: FormConfig[] = [
    {
      key: 'feesAmount',
      placeholder: 'Search...',
      type: FormTypes.text,
      class: 'col-md-4',
    },
  ];
  active: boolean = false;
  currentPageInfo: PageInfo = new PageInfo();

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );
    this.initJournalEntryData(this.currentPageInfo);
  }

  patchFormValues(data: any) {}
  initJournalEntryData(page: PageInfo) {
    this.journalEntryService.getAllJournalEntriesPaginated(page).subscribe({
      next: (journalList: any) => {
        // this.tableData = journalList.result;
      },
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.initJournalEntryData(pageInfo);
  }
  onEditOwner() {
    this.routerService.navigateTo(`/bussiness-owners/manage`);
  }
}
