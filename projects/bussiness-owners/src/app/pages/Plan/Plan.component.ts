import { Component, OnInit } from '@angular/core';
import { LogService, RouterService } from 'shared-lib';
import { PlanService } from '../../services/plan.httpservice';
import { ResponsePlanDto } from '../../models/plan/responseplandto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Plan',
  templateUrl: './Plan.component.html',
  styleUrls: ['./Plan.component.scss'],
})
export class PlanComponent implements OnInit {
  plansList: ResponsePlanDto[];
  constructor(
    private routerService: RouterService,
    private logService: LogService,
    private planService: PlanService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Plans');
    this.planService.getAll().subscribe((res) => {
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
