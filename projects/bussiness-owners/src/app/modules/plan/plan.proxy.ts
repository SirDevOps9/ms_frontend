import { Observable } from 'rxjs';
import { APIResponse, BaseService } from 'shared-lib';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlanProxy {

  constructor(private baseService: BaseService) {}

  getAll(): Observable<APIResponse<ResponsePlanDto[]>> {
    return this.baseService.get<APIResponse<ResponsePlanDto[]>>(`plan`);
  }

  getAllSubscriptions(): Observable<APIResponse<SubscriptionDto[]>> {
    return this.baseService.get<APIResponse<SubscriptionDto[]>>(`Subscription`);
  }
}
