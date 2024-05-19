import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PageInfo, RouterService, LanguageService, SharedLibModule } from 'shared-lib';
import { Validators } from '@angular/forms';
import { of } from 'rxjs';
import {
  JournalEntryDto,
  SharedJournalEnums,
} from 'projects/apps-accounting/src/app/modules/journal-entry/models';
import { SharedFormComponent } from 'shared-lib';
import { FormConfig, FormTypes } from 'shared-lib';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';

@Component({
  selector: 'app-edit-bussiness-owner',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
  templateUrl: './edit-bussiness-owner.component.html',
  styleUrl: './edit-bussiness-owner.component.scss',
})
export class EditBussinessOwnerComponent implements OnInit, AfterViewInit {
  @ViewChild('myTab') myTab: any | undefined;
  @ViewChild('form') form: SharedFormComponent;

  selectedEntries: JournalEntryDto[];

  fields: FormConfig[] = [
    {
      key: 'isActive',
      disabled: false,
      placeholder: 'status',
      class: 'col-md-12 d-flex justify-content-end',
      type: FormTypes.switch,
      firstValue: true,
    },
    {
      key: 'code',
      disabled: false,
      placeholder: 'Bo Code',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Code',
    },
    {
      key: 'name',
      disabled: false,
      placeholder: 'Bo Name',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Name',
    },

    {
      key: 'email',
      disabled: false,
      placeholder: 'Bo Email',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Email',
    },
    {
      key: 'CountryNameEn',
      disabled: false,
      placeholder: 'Bo Country',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Country',
    },
    {
      key: 'mobileNumber',
      disabled: false,
      placeholder: 'Bo Mobile',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Mobile',
    },
  ];

  tableData = {
    Id: 'c65162b4-6b2b-4ef9-b317-f2b545f66b19',
    code: 'BO123',
    name: 'John Doe',
    email: 'john.doe@example.com',
    CountryNameEn: 'United States',
    CountryNameAr: null,
    mobileNumber: '+1234567890',
    isActive: false,
    Subdomains: [
      {
        SubdomainName: 'subdomain1.example.com',
        SubdomainId: 'ef24cf4a-d2ac-4d2b-a409-1b3fdde21710',
        IsActive: true,
      },
      {
        SubdomainName: 'subdomain2.example.com',
        SubdomainId: '3d786630-8e4a-4f4c-af46-9b01611f3f94',
        IsActive: false,
      },
    ],
  };
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
  active: boolean = false;
  currentPageInfo: PageInfo = new PageInfo();

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    public sharedJouralEnum: SharedJournalEnums
  ) {}
  ngAfterViewInit(): void {
    this.sendFormValues(this.tableData);
  }

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('JournalEntry.JournalEntryList'));
    this.initJournalEntryData(this.currentPageInfo);
  }
  initJournalEntryData(page: PageInfo) {
    // this.journalEntryService.getAllJournalEntriesPaginated(page).subscribe({
    //   next: (journalList: any) => {
    //     // this.tableData = journalList.result;
    //   },
    // });
  }

  sendFormValues(data: {}) {
    this.form.form.patchValue({
      ...data,
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.initJournalEntryData(pageInfo);
  }
  onEditOwner() {
    this.routerService.navigateTo(`/bussiness-owners/manage`);
  }

  viewDomainInfo(domain: any) {
    this.routerService.navigateTo(`//bussiness-owners/domain-space-info`);
  }

  onManageOwner(domain: any) {
    console.log(domain);
  }
}
