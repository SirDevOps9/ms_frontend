import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormConfig, FormTypes, LanguageService, PageInfo, PageInfoResult, RouterService, SharedFormComponent, SharedLibModule } from 'shared-lib';
import { LicenceInfo } from '../../models';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { ActivatedRoute } from '@angular/router';

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
  dataList : LicenceInfo[]

  active: boolean = false;
  currentPageInfo: PageInfoResult = {}
  id = this.route.snapshot.params['id']

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private bussinessOwnerService : BussinessOwnerService,
    private route : ActivatedRoute
  
  ) {}

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );

    this.getLicenseInfo(new PageInfo)

    
  }

  getLicenseInfo(pageInfo : PageInfo) {
    this.bussinessOwnerService.getLicenseInfoById(pageInfo , this.id ).subscribe(res=>{
      this.currentPageInfo = res.pageInfoResult;
      this.dataList = res.result;
      console.log(res)
     })
  }


  onPageChange(pageInfo: PageInfo) {

  }

}
