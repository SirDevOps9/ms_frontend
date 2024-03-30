import { Observable } from 'rxjs';
import { APIResponse, HttpService } from 'shared-lib';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlanProxy {
  constructor(private baseService: HttpService) {}

  getAllPlans(): Observable<ResponsePlanDto[]> {
    return this.baseService.get<ResponsePlanDto[]>(`plan`);
  }

  getAllSubscriptions(): Observable<SubscriptionDto[]> {
    return this.baseService.get<SubscriptionDto[]>(`Subscription`);
  }
}
