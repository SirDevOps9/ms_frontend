import { Observable } from 'rxjs';
import { APIResponse, HttpService } from 'shared-lib';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';
import { AddSubdomainDto } from './models/addsubdomaindto';

@Injectable({
  providedIn: 'root',
})
export class PlanProxy {
  constructor(private baseService: HttpService) {}

  getAllPlans(): Observable<APIResponse<ResponsePlanDto[]>> {
    return this.baseService.get<APIResponse<ResponsePlanDto[]>>(`plan`);
  }

  getAllSubscriptions(): Observable<APIResponse<SubscriptionDto[]>> {
    return this.baseService.get<APIResponse<SubscriptionDto[]>>(`Subscription`);
  }

  addSubdomain(subdomain: AddSubdomainDto): Observable<boolean> {
    return this.baseService.post<APIResponse<AddSubdomainDto>>(
      `Subscription/Addsubdomain`,
      subdomain
    );
  }
}
