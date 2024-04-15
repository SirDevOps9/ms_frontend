import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';
import { ResponsePlanDto } from '../../models';
import { Title } from '@angular/platform-browser';
import { SubscriptionService } from '../../subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  plansList: ResponsePlanDto[];
  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Subscriptions');
  }

  navigateToManageCompany(planId: number) {
    this.routerService.navigateTo('company/' + planId);
  }

  navigateToManageUser(subdomainId: number) {
    this.routerService.navigateTo('users/' + subdomainId);
  }

}
