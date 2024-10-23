import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguageService, lookupDto, RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { CompanyDto, Sharedcompanyenums } from '../../models';
import { CompanyService } from '../../company.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ExportCompanyDto } from '../../models/export-company-dto';
import { mappedData } from '../../models/mappedCompany';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'projects/bussiness-owners/src/app/models';
@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.scss',
  providers: [RouterService],
})
export class CompaniesListComponent implements OnInit {
  [x: string]: any;
  companies: CompanyDto[];
  @ViewChild('myTab') myTab: any | undefined;
  selectedCompanies: any = [];
  tableData: CompanyDto[];
  mappedTableData: CompanyDto[];
  cols: any[] = [];
  active: boolean = false;
  ref: DynamicDialogRef;
  exportColumns: lookupDto[];
  exportTableData: ExportCompanyDto[];
  exportData: ExportCompanyDto[];
  selectedLanguage: any 

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private languageService: LanguageService,
    private companyService: CompanyService,
    private dialog: DialogService,
    public Sharedcompanyenums: Sharedcompanyenums,
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService
  ) {}

  newCompany() {
    this.companyService.openNewCompanyModal(this.subdomainId, this.ref, this.dialog);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log(id ,"jjjjjjjjjjjjjjjj");
      this.breadcrumbService.setId(id); // Set the ID in the service
    });
    this.subscribe()
    this.titleService.setTitle(this.languageService.transalte('Company.CompanyList'));
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
        header: 'taxId',
      },
      {
        field: 'Commercial ID',
        header: 'commercialId',
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
    this.myTab.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  initCompanyData() {
    this.companyService.loadCompanies('', this.subdomainId);

    this.companyService.companies.subscribe({
      next: (companyList) => {
        this.tableData = companyList;
        this.mappedTableData = companyList
      //  this.mappedTableData = this.convertChildren( companyList)
         
      },
    });
  }

  convertChildren(data : any) {
  let mappedData = data.forEach((elem : any)=>{

  const { parentId,id, subdomainId , countryCode ,mobileNumberCode , subdomainName  , countryName,...filteredData } = elem.data;
  elem.data = filteredData
  if(elem.children)this.convertChildren(elem.children)

 })  
 console.log(this.tableData)
 return mappedData
}

  search(event: any) {
    this.companyService.loadCompanies(event.target.value, this.subdomainId);
    this.companyService.companies.subscribe({
      next: (companyList) => {
        this.tableData = companyList;
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

  exportCompaniesData(searchTerm: string) {
    this.companyService.exportCompaniesData(searchTerm, this.subdomainId);
    this.companyService.exportsCompaniesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
  subscribe(){
    this.languageService.language$.subscribe((lang) => {
      this.selectedLanguage = lang
    });
  }
}
