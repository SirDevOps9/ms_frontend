import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { SubscriptionService } from '../../subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    private titleService: Title,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit() {
    console.log("title");
    
    this.titleService.setTitle('dsdsfs ');
  }

  navigateToManageCompany(planId: number) {
    this.routerService.navigateTo('company/' + planId);
  }

  navigateToManageUser(subdomainId: number) {
    this.routerService.navigateTo('users/' + subdomainId);
  }

}
