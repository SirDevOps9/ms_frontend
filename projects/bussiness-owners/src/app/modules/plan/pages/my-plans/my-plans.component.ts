import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterService } from 'shared-lib';
import { SubscriptionDto } from '../../models';
import { PlanService } from '../../plan.service';

@Component({
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss'],
})
export class MyPlansComponent implements OnInit {
  plansList: SubscriptionDto[];

  constructor(
    private routerService: RouterService,
    private planService: PlanService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('My plans');
    this.loadSubscriptions();
  }

  navigateToManageCompany(planId: string) {
    this.routerService.navigateTo('company/' + planId);
  }

  navigateToManageUser(subdomainId: string) {
    this.routerService.navigateTo('users/' + subdomainId);
  }

  loadSubscriptions() {
    this.planService.loadSubscription();
    this.planService.subscriptions.subscribe((plansList) => {
      this.plansList = plansList;
    });
  }
}
