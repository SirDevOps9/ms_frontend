import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { PlanProxy } from './plan.proxy';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubdomainDetailsComponent } from './components/subdomain-details/subdomain-details.component';
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private subscriptionDataSource = new BehaviorSubject<SubscriptionDto[]>([]);
  public subscriptions = this.subscriptionDataSource.asObservable();

  private plansDataSource = new BehaviorSubject<ResponsePlanDto[]>([]);
  public plans = this.plansDataSource.asObservable();

  private subdomainDetailsDataSource  = new BehaviorSubject<ResponsePlanDto[]>([]);
  public subdomainDetails = this.subdomainDetailsDataSource.asObservable();

  constructor(private planProxy: PlanProxy) {}

  loadSubscription() {
    this.planProxy.getAllSubscriptions().subscribe((response) => {
      this.subscriptionDataSource.next(response);
    });
  }

  loadPlans() {
    this.planProxy.getAllPlans().subscribe((response) => {
      this.plansDataSource.next(response);
    });
  }
  opensubdomainDetails(ref: DynamicDialogRef, dialog: DialogService ,Id:any) {
    ref = dialog.open(SubdomainDetailsComponent, {
      width: '600px',
      height: '600px',
      data: { Id: Id }
    });
  }
  loadSubdomainDetails(id:number){
    this.planProxy.getSubdomainDetails(id).subscribe((response) => {
      this.subdomainDetailsDataSource.next(response);
    });
  }
}
