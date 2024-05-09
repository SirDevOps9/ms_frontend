import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';
import { SubscriptionService } from '../../subscription.service';
import { subscriptionDetailsDto } from '../../models/subscriptionDetailsDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-apps',
  templateUrl: './manage-apps.component.html',
  styleUrls: ['./manage-apps.component.scss'],
  providers: [RouterService]
})
export class ManageAppsComponent implements OnInit {


  appList: subscriptionDetailsDto[] = [];
  cardList: boolean = false;

  get SupdomainId(): string {
    console.log("Parent Id", this.routerService.currentId);

    return this.routerService.currentId;
  }

  ngOnInit() {
    this.SupdomainId;
    // this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.initializeSubdomainData();

  }

  initializeSubdomainData() {
    this.subscriptionService.getSubscriptionDetails(this.SupdomainId);
    this.subscriptionService.SubscriptionDetails.subscribe((List) => {
      this.appList = List;
    });
  }
  card() {
    this.cardList = true
  }
  row() {
    this.cardList = false

  }
  getAppDeps(_t37: any) {
    //throw new Error('Method not implemented.');
  }
  Renew(arg0: any) {
    // throw new Error('Method not implemented.');
  }
  routeToDetails(arg0: any) {
    // throw new Error('Method not implemented.');
  }
  constructor(private routerService: RouterService
    , private subscriptionService: SubscriptionService,
    private route: ActivatedRoute) { }

}
