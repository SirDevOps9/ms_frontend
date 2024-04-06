import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormsService, RouterService } from 'shared-lib';
import { SubscriptionDto } from '../../models';
import { PlanService } from '../../plan.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './my-plans.component.html',
  styleUrls: ['./my-plans.component.scss'],
})
export class MyPlansComponent implements OnInit {
  plansList: SubscriptionDto[];

  ref: DynamicDialogRef;

  ngOnInit() {
    this.titleService.setTitle('My plans');
    this.loadSubscriptions();
  }

  openSubdomainModal() {
    this.planService.openSubdomainModal(this.ref, this.dialog);
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

  constructor(
    private routerService: RouterService,
    private planService: PlanService,
    private titleService: Title,
    private dialog: DialogService
  ) {}
}
