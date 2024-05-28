import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EnvironmentService, RouterService } from 'shared-lib';
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
  subdomainList: ResponseSubdomainListDto[] = [];
  subdomain: boolean = false;
  emptySubdomain: boolean = false;
  showSection: boolean = false;
  ref: DynamicDialogRef;
  domainName: string = '.microtecdev.com';

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
    this.routerService.navigateTo('manage-apps/' + subdomainId);
  }
  navigateToErp(subdomainName: any) {
    let subdomainUrl = this.environmentService.erpLogin?.replace('*', subdomainName);
    window.open(subdomainUrl, '_blank');
  }

  loadMySubdomains() {
    this.subscriptionService.loadSubdomains();
    this.subscriptionService.subdomains.subscribe((subdomains) => {
      if (subdomains) {
        this.subdomainList = subdomains;

        if (this.subdomainList.length > 0) {
          this.showSection = false;
          this.subdomain = true;
        } else {
          this.subdomain = false;
          this.showSection = true;
        }
      }
    });
  }

  constructor(
    private routerService: RouterService,
    private subscriptionService: SubscriptionService,
    private titleService: Title,
    private dialog: DialogService,
    private environmentService: EnvironmentService
  ) {}
}
