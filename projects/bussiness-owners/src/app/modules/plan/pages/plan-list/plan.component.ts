import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';
import { ResponsePlanDto } from '../../models';
import { Title } from '@angular/platform-browser';
import { PlanService } from '../../plan.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  plansList: ResponsePlanDto[];
  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private planService: PlanService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Plans');
    this.loadPlans();
  }

  navigateToManageCompany(planId: number) {
    this.routerService.navigateTo('company/' + planId);
  }

  navigateToManageUser(subdomainId: number) {
    this.routerService.navigateTo('users/' + subdomainId);
  }
  loadPlans() {
    this.planService.loadPlans();
    this.planService.plans.subscribe((plansList) => {
      this.plansList = plansList;
    });
  }
}
