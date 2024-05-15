import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService, RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { CompanyDto } from '../../models';
import { CompanyService } from '../../company.service';
import { TreeNode } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss',
  providers: [RouterService],
})
export class CompaniesListComponent implements OnInit {
  companies: CompanyDto[];
  @ViewChild('myTab') myTab: any | undefined;
  selectedCompanies: CompanyDto[];
  tableData:CompanyDto[];
  cols: any[] = [];
  active: boolean = false;
  ref: DynamicDialogRef;

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private companyService: CompanyService,
    private dialog: DialogService
  ) { }

  newCompany() {
    this.companyService.openNewCompanyModal(
      this.subdomainId,
      this.ref,
      this.dialog
    );
  }

  ngOnInit() {
    this.titleService.setTitle(
      this.languageService.transalte('Company.CompanyList')
    );
    this.initCompanyData();

    this.cols = [
      {
        field: 'Code',
        header: 'code',
      },
      {
        field: 'Companies Name',
        header: 'name',
      },
      {
        field: 'Companies Type',
        header: 'companyType',
      },
      {
        field: 'Tax ID',
        header: 'ID',
      },
      {
        field: 'Commercial ID',
        header: 'CommercialID',
      },
      {
        field: 'Phone',
        header: 'mobileNumber',
      },
      {
        field: 'status',
        header: 'status',
      },
      {
        field: 'Actions',
        header: 'Actions',
      },
    ];
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.myTab.filterGlobal(
      ($event.target as HTMLInputElement).value,
      stringVal
    );
  }

  initCompanyData() {
    this.companyService.loadCompanies(this.subdomainId);

    this.companyService.companies.subscribe({
      next: (companyList) => {
        this.tableData = companyList;
        console.log('this.tableData', this.tableData);
      },
    });

    
  }
  
  toggle(id: string, isActive: boolean) {
    if (!isActive) this.companyService.activate(id);
    else this.companyService.deactivate(id);
  }

  changed(e: any, id: string) {
    if (e.checked === false) {
      this.companyService.deactivate(id);
    } else {
      this.companyService.activate(id);
    }
  }

  get subdomainId(): string {
    return this.routerService.currentId;
  }
  routeToEdit(id: string) {
    this.routerService.navigateTo(`/company/edit/${id}/address`);
  }
}
