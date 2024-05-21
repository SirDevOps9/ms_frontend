import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FormConfig, FormTypes, LanguageService, PageInfo, PageInfoResult, RouterService, SharedFormComponent, SharedLibModule } from 'shared-lib';
import { CompanyInfo, SharedBussinessOwnerEnums } from '../../models';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-companies-details-info',
  templateUrl: './companies-details-info.component.html',
  styleUrl: './companies-details-info.component.scss',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
})
export class CompaniesDetailsInfoComponent implements OnInit {
  @ViewChild('myTab') myTab: any | undefined;
  @ViewChild('form') form: SharedFormComponent;
 dataList : CompanyInfo[]
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
    private bussinessOwnerService : BussinessOwnerService,
    private route : ActivatedRoute,
    public SharedBussinessOwnerEnums : SharedBussinessOwnerEnums
  
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );
  this.getCompanyInfo(new PageInfo)
  }

  getCompanyInfo(pageInfo : PageInfo ) {
   this.bussinessOwnerService.getCompanyInfoById(pageInfo , this.id ).subscribe(res=>{
    this.currentPageInfo = res.pageInfoResult;
    this.dataList = res.result;
   })
  }

  
  onPageChange(pageInfo: PageInfo) {
   this.getCompanyInfo(pageInfo)
  }

}
