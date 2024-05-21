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
  appInStore:number

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
      this.appInStore=this.appList.length
    });
  }
  card() {
    this.cardList = true
  }
  row() {
    this.cardList = false

  }
  toggelview(){
    if(this.cardList == true){
      this.cardList = false;
    }else{
      this.cardList = true;

    }
  }
 
  getAppDeps(_t37: any) {
    //throw new Error('Method not implemented.');
  }
  Renew(arg0: any) {
    // throw new Error('Method not implemented.');
  }
  routeToDetails(id: any) {
    this.routerService.navigateTo('/app-store/app-detail/'+id);
  }
  constructor(private routerService: RouterService
    , private subscriptionService: SubscriptionService,
    private route: ActivatedRoute) { }

}
