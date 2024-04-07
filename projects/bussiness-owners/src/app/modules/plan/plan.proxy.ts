import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';
import { subdomainDetailsDto } from './models/subdomainDetailsDto';

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
  getSubdomainDetails(id:number): Observable<subdomainDetailsDto> {
    return this.baseService.get<subdomainDetailsDto>(`Subdomain/GetsubdomainDetail?subdomainId=${id}`);
  }
}
