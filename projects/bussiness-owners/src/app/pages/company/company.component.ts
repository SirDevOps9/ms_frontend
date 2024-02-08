import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.httpservice';
import { CompanyListResponse } from '../../models/company/companylist.response';
import { LogService, RouterService } from 'shared-lib';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  companies: CompanyListResponse;
  constructor(
    private companyService: CompanyService,
    private routerService: RouterService,
    private logService: LogService
  ) {}
  navigateToAdd(): void {
    this.routerService.navigateTo('company/add');
  }

  ngOnInit() {
    this.companyService.getAll().subscribe((res) => {
      this.companies = res.response;
      this.logService.log(this.companies);
    });
    // this.logService.log( this.companies);
  }
}
