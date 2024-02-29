import { Component, OnInit } from '@angular/core';
import { LogService, RouterService } from 'shared-lib';
import { PlanService } from '../../services/plan.httpservice';
import { ResponsePlanDto } from '../../models/plan/responseplandto';

@Component({
  selector: 'app-Plan',
  templateUrl: './Plan.component.html',
  styleUrls: ['./Plan.component.css'],
})
export class PlanComponent implements OnInit {
  plansList: ResponsePlanDto[];
  constructor(
    private routerService: RouterService,
    private logService: LogService,
    private planService: PlanService
  ) {}

  ngOnInit() {
    this.planService.getAll().subscribe((res) => {
      this.plansList = res.response;
      this.logService.log(this.plansList, 'Plan list');
    });
  }

  navigateToManageCompany(planId: number) {
    this.logService.log(planId, 'sending id');
    this.routerService.navigateTo('company/' + planId);
  }

  navigateToManageUser() {
    this.routerService.navigateTo('users');
  }
}
