import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { DomainSpaceDto, ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';
import { subscriptionDetailsDto } from './models/subscriptionDetailsDto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionProxy {
  constructor(private baseService: HttpService) {}

  getAllSubscriptions(): Observable<SubscriptionDto[]> {
    return this.baseService.get<SubscriptionDto[]>(`Subscription`);
  }

  addSubdomain(subdomain: DomainSpaceDto): Observable<boolean> {
    return this.baseService.post<DomainSpaceDto>(`Subdomain/Add`, subdomain);
  }
  GetUserSubscriptionsDetail(id:number): Observable<subscriptionDetailsDto[]>{
    return this.baseService.get<subscriptionDetailsDto[]>(`Subscription/GetUserSubscriptionsDetail?subdomainId=${id}`);
  }

  checkSubdomain(subdomain: string): Observable<boolean> {
    return this.baseService.get(`Subdomain/IsSubdomainExist?subdomainName=${subdomain}`);
  }


}
