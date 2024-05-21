import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {
  SharedFormComponent,
  FormConfig,
  FormTypes,
  PageInfo,
  RouterService,
  LanguageService,
  SharedLibModule,
  PageInfoResult,
} from 'shared-lib';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { AppsInfo } from '../../models';

@Component({
  selector: 'app-app-info-list',
  templateUrl: './app-info-list.component.html',
  styleUrl: './app-info-list.component.scss',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
})
export class AppInfoListComponent implements OnInit {
  @ViewChild('myTab') myTab: any | undefined;
  @ViewChild('form') form: SharedFormComponent;

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

  dataList: AppsInfo[];

  active: boolean = false;
  currentPageInfo: PageInfoResult = {};
  id = this.route.snapshot.params['id'];

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private bussinessOwnerService: BussinessOwnerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );

    this.getAppsInfo(new PageInfo());
  }
  getAppsInfo(pageInfo: PageInfo) {
    this.bussinessOwnerService
      .getAppsInfo(pageInfo, this.id)
      .subscribe((res) => {
        this.currentPageInfo = res.pageInfoResult;
        this.dataList = res.result;
      });
  }

  onPageChange(pageInfo: PageInfo) {}
  onEditOwner() {
    //    this.routerService.navigateTo(`/bussiness-owners/manage`);
  }
}
