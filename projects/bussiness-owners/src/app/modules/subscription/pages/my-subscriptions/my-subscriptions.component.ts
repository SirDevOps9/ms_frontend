import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterService } from 'shared-lib';
import { SubscriptionDto } from '../../models';
import { SubscriptionService } from '../../subscription.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ResponseSubdomainListDto } from '../../models/responseSubdomainListDto';

@Component({
  templateUrl: './my-subscriptions.component.html',
  styleUrls: ['./my-subscriptions.component.scss'],
})
export class MySubscriptionsComponent implements OnInit {
  List: SubscriptionDto[];
  subdomainList: ResponseSubdomainListDto[];
  // subdomain:boolean =false ;
  ref: DynamicDialogRef;
  domainName: string = '@microtec.Com.sa';

  ngOnInit() {
    this.titleService.setTitle('My Subscriptions');
    this.loadMySubdomains();
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

  loadMySubdomains() {
    this.subscriptionService.loadSubdomains();
    this.subscriptionService.subdomains.subscribe((subdomains) => {
      this.subdomainList = subdomains;
      // if(this.subdomainList.length > 0){
      //   this.subdomain = true;
      // }else{
      //   this.subdomain=false;
      // }
    });
  }
  constructor(
    private routerService: RouterService,
    private subscriptionService: SubscriptionService,
    private titleService: Title,
    private dialog: DialogService
  ) {}
}
