import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  PageInfo,
  RouterService,
  LanguageService,
  SharedLibModule,
  PaginationVm,
  PageInfoResult,
} from 'shared-lib';
import { Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { JournalEntryDto, SharedJournalEnums } from 'projects/apps-accounting/src/app/modules/journal-entry/models';
import { SharedFormComponent } from 'shared-lib';
import { FormConfig, FormTypes } from 'shared-lib';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
import { BussinessOwner, Subdomain, bussinesOwnerDetails } from '../../models';
import { BussinessOwnerService } from '../../bussiness-owner.service';

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
 
  dataList : Subdomain[]
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
      key: 'id',
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
      key: 'countryNameEn',
      disabled: false,
      placeholder: 'Bo Country',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Country',
    },
    {
      key: 'phone',
      disabled: false,
      placeholder: 'Bo Mobile',
      type: FormTypes.text,
      class: 'col-md-4',
      label: 'Bo Mobile',
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
  active: boolean = false;
  id = this.route.snapshot.params['id']




  constructor(
    private routerService: RouterService,

    public sharedJouralEnum: SharedJournalEnums,
    public route : ActivatedRoute,
    private bussinessOwnerService : BussinessOwnerService
    
  ) {}
  ngAfterViewInit(): void {


   this.getBussinesOwnerById()

  }

  getBussinesOwnerById() {
    this.bussinessOwnerService.getBussinessGetBusinessOwnerById(this.id ).subscribe((res)=>{
      this.dataList = res.subdomains;
      this.sendFormValues(res)
      this.form.form.disable()
    })
  }

  sendFormValues(data : bussinesOwnerDetails) {

    this.form.form.patchValue({
      ...data
    })

  }

  ngOnInit() {
  
  }
  


  onPageChange(pageInfo: PageInfo) {
    // this.bussinessOwnerListDetails$ = this.bussinessOwnerService.getBussinessGetBusinessOwnerById(this.id , this.currentPageInfo )

  }
  onEditOwner() {
    this.routerService.navigateTo(`/bussiness-owners/manage`);
  }

  viewDomainInfo(id:string) {
    this.routerService.navigateTo(`/bussiness-owners/domain-space-info/${id}`)
  }

  viewCompaniesDetails(id : string) {
    this.routerService.navigateTo(`/bussiness-owners/companies-details-info/${id}`)
  }
  viewLicenseDetails(id : string) {
    this.routerService.navigateTo(`/bussiness-owners/licence-info/${id}`)
  }
  viewUserDetails(id : string) {
    this.routerService.navigateTo(`/bussiness-owners/user-info/${id}`)
  }
  viewAppsDetails(id : string) {
    this.routerService.navigateTo(`/bussiness-owners/apps-info/${id}`)
  }

  onManageOwner(domain: any) {
    console.log(domain);
  }
}
