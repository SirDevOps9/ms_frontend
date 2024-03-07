import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterService } from 'shared-lib';
import { SubscriptionDto } from '../../models';
import { PlanProxy } from '../../plan.proxy';

@Component({
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss'],
})
export class MyPlansComponent implements OnInit {
  plansList: SubscriptionDto[];
  constructor(
    private routerService: RouterService,
    private planProxy: PlanProxy,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('My plans');
    this.planProxy.getAllSubscriptions().subscribe((res) => {
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
