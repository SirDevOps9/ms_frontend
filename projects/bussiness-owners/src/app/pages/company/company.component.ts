import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.httpservice';
import {
  LanguageService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { ResponseCompanyDto } from '../../models/company/responsecompanydto';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  // styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companies: ResponseCompanyDto[];
id: any;

  constructor(
    private companyService: CompanyService,
    private routerService: RouterService,
    private router: Router,
    private route: ActivatedRoute,

    private toasterService: ToasterService,
    private languageService: LanguageService,
    private logService: LogService
  ) {}

  navigateToAdd(): void {
    this.routerService.navigateTo('company/add');
  }

  ngOnInit() {


    this.id =this.routerService.getRouteParams('id');
    //this.id = +this.route.snapshot.queryParams['id'];
    this.logService.log(this.id,"recived id");

    this.companyService.getAll().subscribe((res) => {
      this.companies = res.response.reverse();
      this.logService.log(this.companies);
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
    }
  }
}
