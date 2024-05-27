import { Component, OnInit } from '@angular/core';
import { LanguageService, RouterService } from 'shared-lib';
import { SubscriptionService } from '../../subscription.service';
import { subscriptionDetailsDto } from '../../models/subscriptionDetailsDto';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-manage-apps',
  templateUrl: './manage-apps.component.html',
  styleUrls: ['./manage-apps.component.scss'],
  providers: [RouterService],
})
export class ManageAppsComponent implements OnInit {
  appList: subscriptionDetailsDto[] = [];
  cardList: boolean = false;
  appInStore: number;

  ngOnInit() {
    this.langService.getTranslation('AppStore.ManageAppsTitle').subscribe((title) => this.titleService.setTitle(title));

    this.initializeSubdomainData();
  }

  initializeSubdomainData() {
    this.subscriptionService.getSubscriptionDetails(this.SupdomainId);
    this.subscriptionService.SubscriptionDetails.subscribe((List) => {
      this.appList = List;
      this.appInStore = this.appList.length;
    });
  }
  card() {
    this.cardList = true;
  }
  row() {
    this.cardList = false;
  }
  toggelview() {
    if (this.cardList == true) {
      this.cardList = false;
    } else {
      this.cardList = true;
    }
  }

  getAppDeps(_t37: any) {}
  renew(arg0: any) {
    // throw new Error('Method not implemented.');
  }
  routeToDetails(id: any) {
    this.routerService.navigateTo('/app-store/app-detail/' + id);
  }

  get SupdomainId(): string {
    return this.routerService.currentId;
  }

  constructor(
    private routerService: RouterService,
    private subscriptionService: SubscriptionService,
    private titleService: Title,
    private langService: LanguageService
  ) {}
}
