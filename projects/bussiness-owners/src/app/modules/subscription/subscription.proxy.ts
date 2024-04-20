import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import {  AddDomainSpaceDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';
import { subscriptionDetailsDto } from './models/subscriptionDetailsDto';
import { ResponseSubdomainListDto } from './models/responseSubdomainListDto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionProxy {
  constructor(private baseService: HttpService) {}

  getAllSubscriptions(): Observable<SubscriptionDto[]> {
    return this.baseService.get<SubscriptionDto[]>(`Subscription`);
  }
  getAllMySubdomains(): Observable<ResponseSubdomainListDto[]>{
    return this.baseService.get<ResponseSubdomainListDto[]>(`Subdomain/GetMyDomains`);
  }

  addSubdomain(subdomain: AddDomainSpaceDto): Observable<boolean> {
    return this.baseService.post<AddDomainSpaceDto>(`Subdomain/Add`, subdomain);
  }
  GetUserSubscriptionsDetail(id:number): Observable<subscriptionDetailsDto[]>{
    return this.baseService.get<subscriptionDetailsDto[]>(`Subscription/GetUserSubscriptionsDetail?subdomainId=${id}`);
  }

  checkSubdomain(subdomain: string): Observable<boolean> {
    return this.baseService.get(`Subdomain/IsSubdomainExist?subdomainName=${subdomain}`);
  }


}
