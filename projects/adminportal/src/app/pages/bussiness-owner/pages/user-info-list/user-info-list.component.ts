import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SharedFormComponent, FormConfig, FormTypes, PageInfo, RouterService, LanguageService, SharedLibModule, PageInfoResult } from 'shared-lib';
import { userData } from '../../models';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrl: './user-info-list.component.scss',
  standalone : true,
  imports: [CommonModule, SharedLibModule],

})
export class UserInfoListComponent implements OnInit {
  @ViewChild('myTab') myTab: any | undefined;
  @ViewChild('form') form: SharedFormComponent;
  dataList: userData[];

  
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
  currentPageInfo: PageInfoResult = {}
  id = this.route.snapshot.params['id']

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private bussinessOwnerService: BussinessOwnerService,
    private route : ActivatedRoute

  
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );
    this.getUsersInfo(new PageInfo)
  }
  getUsersInfo(pageInfo : PageInfo ) {
    this.bussinessOwnerService.getUsersInfo(pageInfo , this.id ).subscribe(res=>{
     this.currentPageInfo = res.pageInfoResult;
     this.dataList = res.result;
    })
   }

  onPageChange(pageInfo: PageInfo) {
    this.getUsersInfo(pageInfo)
  }
  onEditOwner() {
    this.routerService.navigateTo(`/bussiness-owners/manage`);
  }
}
