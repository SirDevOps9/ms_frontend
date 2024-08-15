import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import {
  PageInfo,
  RouterService,
  LanguageService,
  FormConfig,
  FormTypes,
  SharedFormComponent,
  SharedLibModule,
  PaginationVm,
  PageInfoResult,
} from 'shared-lib';
import { BussinessOwnerService } from '../../bussiness-owner.service';
import { Observable } from 'rxjs';
import { auditTime, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { BussinessOwner } from '../../models';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';

@Component({
  selector: 'app-bussiness-owners-list',
  standalone: true,
  imports: [CommonModule, SharedLibModule],
  templateUrl: './bussiness-owners-list.component.html',
  styleUrl: './bussiness-owners-list.component.scss',
})
export class BussinessOwnersListComponent implements OnInit , AfterViewInit {
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
  fields: FormConfig[] = [
    {
      key: 'SearchTerm',
      placeholder: 'Search...',
      type: FormTypes.text,
      class: 'col-md-4',
    },
  ];
  active: boolean = false;
  currentPageInfo: PageInfoResult = {};
  dataList: BussinessOwner[];

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private bussinessOwnerService: BussinessOwnerService,

  ) {}
  ngAfterViewInit(): void {
    this.form.form.get('SearchTerm')?.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(res=>{
    this.bussinessOwnerData(new PageInfo() , SearchFunc(this.form.form.value))
    })
  }

 
  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('JournalEntry.JournalEntryList')
    );
    this.bussinessOwnerData(new PageInfo())

  
   
  }

  bussinessOwnerData(pageInfo: PageInfo , search? : string) {
    this.bussinessOwnerService
    .getBussinessOwnerList( pageInfo , search)
    .subscribe((res) => {
      this.currentPageInfo = res.pageInfoResult;
      this.dataList = res.result;
    });
  }


  onPageChange(pageInfo: PageInfo) {
    this.bussinessOwnerData(pageInfo)

  }
  onEditOwner(id: string) {
    this.routerService.navigateTo(`/bussiness-owners/manage/${id}`);
  }


}
