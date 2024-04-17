import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {  RouterService } from 'shared-lib';
import { SubscriptionDto } from '../../models';
import {  SubscriptionService } from '../../subscription.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss'],
})
export class MySubscriptionsComponent implements OnInit {
  List: SubscriptionDto[];

  ref: DynamicDialogRef;

  ngOnInit() {
    this.titleService.setTitle('My subscriptions');
    this.loadSubscriptions();

  }

  openSubdomainModal() {
    this.subscriptionService.openSubdomainModal(this.ref, this.dialog);
  }

  navigateToManageCompany(subdomainId: string) {
    this.routerService.navigateTo('company/' + subdomainId);
  }

  navigateToManageUser(subdomainId: string) {
    this.routerService.navigateTo('users/' + subdomainId);
  }
  navigateToManageApp(subdomainId: any) {
    this.routerService.navigateTo('Manage-Apps/' + subdomainId);
      }

  loadSubscriptions() {
    this.subscriptionService.loadSubscription();
    this.subscriptionService.subscriptions.subscribe((List) => {
      this.List = List;
    });
  }
  constructor(
    private routerService: RouterService,
    private subscriptionService: SubscriptionService,
    private titleService: Title,
    private dialog: DialogService
  ) {}
}
