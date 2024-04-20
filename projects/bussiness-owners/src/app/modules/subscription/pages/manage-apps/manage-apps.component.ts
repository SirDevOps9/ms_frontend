import { Component, OnInit } from '@angular/core';
import { RouterService } from 'shared-lib';
import { SubscriptionService } from '../../subscription.service';
import { subscriptionDetailsDto } from '../../models/subscriptionDetailsDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-apps',
  templateUrl: './manage-apps.component.html',
  styleUrls: ['./manage-apps.component.scss']
})
export class ManageAppsComponent implements OnInit {


 appList :subscriptionDetailsDto[] = [];
 cardList:boolean=false;
  id: string;

  //get SupdomainId(): string {
 //   return this.routerService.currentId;
 // }
 
  ngOnInit() {
     this.id =this.route.snapshot.paramMap.get('id')?? '';
    this.initializeSubdomainData();
   
  }

  initializeSubdomainData() {
    this.subscriptionService.GetSubscriptionDetails( parseInt(this.id));
    this.subscriptionService.SubscriptionDetails.subscribe((List) => {
      this.appList = List;
    });
  }
  card(){
    this.cardList=true
  }
  row(){
    this.cardList=false

  }
  getAppDeps(_t37: any) {
    throw new Error('Method not implemented.');
    }
    Renew(arg0: any) {
    throw new Error('Method not implemented.');
    }
    routeToDetails(arg0: any) {
    throw new Error('Method not implemented.');
    }
  constructor( private routerService: RouterService
    ,private subscriptionService: SubscriptionService  ,
   private route: ActivatedRoute) { }

}
