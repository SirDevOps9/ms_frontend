import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { PlanProxy } from './plan.proxy';
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private subscriptionDataSource = new BehaviorSubject<SubscriptionDto[]>([]);
  public subscriptions = this.subscriptionDataSource.asObservable();

  private plansDataSource = new BehaviorSubject<ResponsePlanDto[]>([]);
  public plans = this.plansDataSource.asObservable();

  constructor(private planProxy: PlanProxy) {}

  loadSubscription() {
    this.planProxy.getAllSubscriptions().subscribe((response) => {
      this.subscriptionDataSource.next(response.response);
    });
  }

  loadPlans() {
    this.planProxy.getAllPlans().subscribe((response) => {
      this.plansDataSource.next(response.response);
    });
  }
}
