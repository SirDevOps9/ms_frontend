import { Component, OnInit } from "@angular/core";
import { PlanService } from "../../services/plan.httpservice";
import { Title } from "@angular/platform-browser";
import { RouterService } from "shared-lib";
import { ResponsePlanDto } from "../../models/plan/responseplandto";
import { SubscriptionDto } from "../../models/subscription/subscriptionDto";
import { SubscriptionService } from "../../services/subscription.httpservice";

@Component({
    templateUrl: './my-plans.component.html',
    styleUrls: ['./../Plan/Plan.component.scss'],
})
export class MyPlansComponent implements OnInit {

    plansList: SubscriptionDto[];
    constructor(
      private routerService: RouterService,
      private service: SubscriptionService,
      private titleService: Title
    ) {}
  
    ngOnInit() {
      this.titleService.setTitle('My plans');
      this.service.getAll().subscribe((res) => {
        this.plansList = res.response;
      });
    }
  
    navigateToManageCompany(planId: string) {
      this.routerService.navigateTo('company/' + planId);
    }
  
    navigateToManageUser(subdomainId: string) {
      this.routerService.navigateTo('users/' + subdomainId);
    }
  
}