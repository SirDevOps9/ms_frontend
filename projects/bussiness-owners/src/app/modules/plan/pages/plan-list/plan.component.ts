import { Component, OnInit } from '@angular/core';
import { LogService, RouterService } from 'shared-lib';
import { ResponsePlanDto } from '../../models';
import { Title } from '@angular/platform-browser';
import { PlanProxy } from '../../plan.proxy';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  plansList: ResponsePlanDto[];
  constructor(
    private routerService: RouterService,
    private logService: LogService,
    private planProxy: PlanProxy,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Plans');
    this.planProxy.getAll().subscribe((res) => {
      this.plansList = res.response;
      this.logService.log(this.plansList, 'Plan list');
    });
  }

  navigateToManageCompany(planId: number) {
    this.routerService.navigateTo('company/' + planId);
  }

  navigateToManageUser(subdomainId: number) {
    this.routerService.navigateTo('users/' + subdomainId);
  }
}
