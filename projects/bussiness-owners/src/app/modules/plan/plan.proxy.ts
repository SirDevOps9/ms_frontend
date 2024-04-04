import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';
import { DomainSpaceDto } from './models/domainspacedto';

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

  addSubdomain(subdomain: DomainSpaceDto): Observable<boolean> {
    return this.baseService.post<DomainSpaceDto>(
      `Subscription/Addsubdomain`,
      subdomain
    );
  }

}
