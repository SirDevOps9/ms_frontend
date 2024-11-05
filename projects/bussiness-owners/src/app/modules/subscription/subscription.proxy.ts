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
  // #################
  // workflows
  getWorkFlows(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<any>> {
    let query = `Workflows?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<any>>(query);
  }
  // workflowsVariables
  getWorkFlowsVariables(workflowId : number ,searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<any>> {
    let query = `Workflows/${workflowId}/Variables?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<any>>(query);
  }
  // status dropdown

  getStatusDropDown(
    workflowId: number,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<
      {
        id: number;
        name: string;
      }[]
  > {
    let query = `Workflows/${workflowId}/States/DropDown?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<  {
      id: number;
      name: string;
    }[]>(query);
  }
  // add
  addWorkflow(name: { name: string }): Observable<{ name: string }> {
    return this.baseService.post<{ name: string }>(`Workflows`, name);
  }

  // edit
  editWorkflow(name: { name: string }): Observable<boolean> {
    return this.baseService.put<boolean>(`Workflows`, name);
  }
  deleteWorkflow(id: number) {
    return this.baseService.delete(`Workflows/${id}`);
  }
  // delete actions
  deleteActions(id: number) {
    return this.baseService.delete(`Workflows/DeleteAction/${id}`);
  }
  // DeleteState
  deleteState(id: number) {
    return this.baseService.delete(`Workflows/DeleteState/${id}`);
  }
  // geit by id
  getWorkFlowByID(id: number): Observable<any> {
    return this.baseService.get(`Workflows/${id}`);
  }
  // get Work Flow States Actions
  getWorkFlowStatesActionsByID(stateId: number): Observable<any> {
    return this.baseService.get(`Workflows/States/${stateId}/Actions`);
  }
  
  //  status view
  statusListViews(workflowId: number): Observable<PaginationVm<{ id: number; name: string }[]>> {
    return this.baseService.get<PaginationVm<{ id: number; name: string }[]>>(
      `Workflows/${workflowId}/States`
    );
  }
  // adding status
  addStatus(workflowId: number, name: { name: string }): Observable<{ name: string }> {
    return this.baseService.post<{ name: string }>(`Workflows/${workflowId}/States`, name);
  }
  // edit status
  EditStatus(obj: { id: number; name: string }): Observable<{ id: number; name: string }> {
    return this.baseService.put<{ id: number; name: string }>(`Workflows/EditState`, obj);
  }
  // actionList
  getWorkflowStatusActions(
    stateId: number,
    searchTerm?: string,
    pageInfo?: PageInfo
  ): Observable<PaginationVm<any>> {
    let query = `Workflows/States/${stateId}/Actions?${pageInfo?.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<any>>(query);
  }


    // Add Actions 
    addActions(stateId : number ,obj :any){
      return this.baseService.post(`Workflows/States/${stateId}/Actions`,obj)
    }
      // edit Actions
  editActions(obj :any): Observable<any> {
    return this.baseService.put<any>(`Workflows/EditAction`, obj);
  }
  // #################
}
