import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormConfig, FormTypes, LanguageService, PageInfo, RouterService, SharedFormComponent, SharedLibModule } from 'shared-lib';

@Component({
  selector: 'app-licence-info-list',
  templateUrl: './licence-info-list.component.html',
  styleUrl: './licence-info-list.component.scss',
  standalone : true,
  imports: [CommonModule, SharedLibModule],
})
export class LicenceInfoListComponent implements OnInit {
  @ViewChild('myTab') myTab: any | undefined;
  @ViewChild('form') form: SharedFormComponent;
  tableData = [
    {
      code: '101',
      name: 'John Doe',
      email: 'john@example.com',
      country: 'USA',
      mobileNumber: '+1 123 456 7890',
      mob : 'erdf',
      mob2 : 'wsdf',
      mob3 : 'sadfdsf'
    },
    {
      code: '102',
      name: 'Alice Smith',
      email: 'alice@example.com',
      country: 'Canada',
      mobileNumber: '+1 234 567 8901',
      mob : 'erdf',
      mob2 : 'wsdf',
      mob3 : 'sadfdsf'
    },
    {
      code: '103',
      name: 'Mohammed Khan',
      email: 'mohammed@example.com',
      country: 'India',
      mobileNumber: '+91 98765 43210',
      mob : 'erdf',
      mob2 : 'wsdf',
      mob3 : 'sadfdsf'
    },
    {
      code: '104',
      name: 'Sophie Brown',
      email: 'sophie@example.com',
      country: 'UK',
      mobileNumber: '+44 1234 567890',
      mob : 'erdf',
      mob2 : 'wsdf',
      mob3 : 'sadfdsf'
    },
    {
      code: '105',
      name: 'Chen Wei',
      email: 'chen@example.com',
      country: 'China',
      mobileNumber: '+86 10 1234 5678',
      mob : 'erdf',
      mob2 : 'wsdf',
      mob3 : 'sadfdsf'
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
  
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );
    this.initJournalEntryData(this.currentPageInfo);
  }

  patchFormValues(data: any) {}
  initJournalEntryData(page: PageInfo) {
    // this.journalEntryService.getAllJournalEntriesPaginated(page).subscribe({
    //   next: (journalList: any) => {
    //     // this.tableData = journalList.result;
    //   },
    // });
  }
  onPageChange(pageInfo: PageInfo) {
    this.initJournalEntryData(pageInfo);
  }
  onEditOwner() {
    this.routerService.navigateTo(`/bussiness-owners/manage`);
  }
}
