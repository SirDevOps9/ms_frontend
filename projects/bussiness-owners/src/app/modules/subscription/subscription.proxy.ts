import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  AddDomainSpaceDto,
  ResponseSubdomainDto,
  SubscriptionDto,
  TenantLicenseDto,
} from './models';
import { Injectable } from '@angular/core';
import { subscriptionDetailsDto } from './models/subscriptionDetailsDto';
import { ResponseSubdomainListDto } from './models/responseSubdomainListDto';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionProxy {
  constructor(private baseService: HttpService) {}

  getAllMySubdomains(): Observable<ResponseSubdomainListDto[]> {
    return this.baseService.get<ResponseSubdomainListDto[]>(`Subdomain/GetMyDomains`);
  }

  addSubdomain(subdomain: AddDomainSpaceDto): Observable<ResponseSubdomainListDto> {
    return this.baseService.post<AddDomainSpaceDto>(`Subdomain/Add`, subdomain);
  }
  getUserSubscriptionsDetail(id: string): Observable<subscriptionDetailsDto[]> {
    return this.baseService.get<subscriptionDetailsDto[]>(
      `Subscription/GetUserSubscriptionsDetail?subdomainId=${id}`
    );
  }

  checkSubdomain(subdomain: string): Observable<boolean> {
    return this.baseService.get(`Subdomain/IsSubdomainExist?subdomainName=${subdomain}`);
  }

  getSubdomainById(subdomain: string): Observable<ResponseSubdomainDto> {
    return this.baseService.get<ResponseSubdomainDto>(
      `Subdomain/GetSubdomainById?subdomain=${subdomain}`
    );
  }

  getTenantLicense(subdomain: string): Observable<TenantLicenseDto[]> {
    return this.baseService.get<TenantLicenseDto[]>(
      `Subdomain/GetSubdomainLicenses?subdomainId=${subdomain}`
    );
  }
  getWorkFlows(
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<any>> {
    let query = `Workflows?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<any>>(query);
  }
  addWorkflow(name: {name:string}): Observable<{name:string}> {
    return this.baseService.post<{name:string}>(`Workflows`, name);
  }
  editWorkflow(name: {name:string}): Observable<boolean> {
    return this.baseService.put<boolean>(`Workflows`, name);
  }


  getWorkFlowByID(id: number): Observable<any> {
    return this.baseService.get(`Workflows/${id}`);
  }

}
