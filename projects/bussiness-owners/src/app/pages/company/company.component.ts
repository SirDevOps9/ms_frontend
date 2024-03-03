import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../services/company.httpservice';
import {
  LanguageService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { ResponseCompanyDto } from '../../models/company/responsecompanydto';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [RouterService],
})
export class CompanyComponent implements OnInit {
  companies: ResponseCompanyDto[];
  @ViewChild('dt') dt: any | undefined;
  selectedCompanies!: ResponseCompanyDto[] | null;
  planId: number;

  constructor(
    private companyService: CompanyService,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private logService: LogService,
    private titleService: Title
  ) {}

  navigateToAdd(): void {
    this.routerService.navigateTo('company/add/' + this.planId);
  }

  ngOnInit() {
    this.titleService.setTitle('Companies');
    this.planId = this.routerService.currentId;
    this.companyService.getAll(this.planId).subscribe((res) => {
      this.companies = res.response.reverse();
    });
  }

  toggle(id: number, isActive: boolean) {
    if (!isActive) this.activate(id);
    else this.deactivate(id);
  }

  async activate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.companyService.activateCompany(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'Company.CompanyActivatedSuccessfully'
            )
          );

          let indexToChange = this.companies.find((item) => item.id === id);
          indexToChange!.isActive = true;
        },
      });
    } else {
      this.companies.forEach((element: any) => {
        if (element.id == id) {
          console.log(element.isActive);
          element.isActive = false;
        }
      });
    }
  }
  async deactivate(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      'ConfirmButtonTexttochangstatus'
    );
    if (confirmed) {
      this.companyService.deactivateCompany(id).subscribe({
        next: () => {
          this.toasterService.showSuccess(
            this.languageService.transalte('Company.Success'),
            this.languageService.transalte(
              'Company.CompanyDeactivatedSuccessfully'
            )
          );
          let indexToChange = this.companies.find((item) => item.id === id);
          indexToChange!.isActive = false;
        },
      });
    } else {
      this.companies.forEach((element: any) => {
        if (element.id == id) {
          console.log(element.isActive);
          element.isActive = true;
        }
      });
    }
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  changed(e: any, id: number) {
    if (e.checked === false) {
      this.deactivate(id);
    } else {
      this.activate(id);
    }
  }
}
