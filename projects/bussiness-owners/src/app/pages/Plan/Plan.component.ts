import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  LanguageService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';

@Component({
  selector: 'app-Plan',
  templateUrl: './Plan.component.html',
  styleUrls: ['./Plan.component.css'],
})
export class PlanComponent implements OnInit {
  plansList: any[];
  constructor(
    private routerService: RouterService,
    private router: Router,

    private toasterService: ToasterService,
    private languageService: LanguageService,
    private logService: LogService
  ) {}

  ngOnInit() {
    this.plansList = [
      { id: 14, name: 'plane 1' ,subdomain:"subdomain1"},
      { id: 2, name: 'plane 2' ,subdomain:"subdomain2"},
      { id: 3, name: 'plane 3',subdomain:"subdomain3" },
    ];
  }

  navigateToManageCompany() {
    const staticPlanId = '14';
    this.routerService.navigateTo('company/' + staticPlanId);
    //this.routerService.queryParams(staticPlanId);
    //this.router.navigate(['company'], { queryParams: { planId: staticPlanId } });
  }

  navigateToManageUser() {
    this.routerService.navigateTo('users');
  }
}
