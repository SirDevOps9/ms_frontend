import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { ResponseCompanyDto } from '../../models';
import { CompanyService } from '../../company.service';
@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrl: './companies-list.component.css',
  providers: [RouterService],
})
export class CompaniesListComponent implements OnInit {
  companies: ResponseCompanyDto[];
  @ViewChild('dt') dt: any | undefined;
  selectedCompanies: ResponseCompanyDto[];

  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private companyService: CompanyService
  ) {}

  navigateToAdd(): void {
    this.routerService.navigateTo('company/add/' + this.subscriptionId);
  }

  ngOnInit() {
    this.titleService.setTitle('Companies');
    this.initCompanyData();
  }

  initCompanyData() {
    this.companyService.loadCompanies(this.subscriptionId);
    this.companyService.companies.subscribe((companyList) => {
      this.companies = companyList;
    });
  }
  toggle(id: number, isActive: boolean) {
    if (!isActive) this.companyService.activate(id);
    else this.companyService.deactivate(id);
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  changed(e: any, id: number) {
    if (e.checked === false) {
      this.companyService.deactivate(id);
    } else {
      this.companyService.activate(id);
    }
  }

  get subscriptionId(): string {
    return this.routerService.currentId;
  }
}
