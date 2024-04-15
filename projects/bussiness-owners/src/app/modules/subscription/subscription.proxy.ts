import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { DomainSpaceDto, ResponsePlanDto, SubscriptionDto } from './models';
import { Injectable } from '@angular/core';

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

  checkSubdomain(subdomain: string): Observable<boolean> {
    return this.baseService.get(`Subdomain/IsSubdomainExist?subdomainName=${subdomain}`);
  }


}
