import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import {
  ActionDto,
  addAction,
  AddDomainSpaceDto,
  Addworkflow,
  ResponseSubdomainDto,
  statusDto,
  SubscriptionDto,
  TenantLicenseDto,
  usersDto,
  variablesDto,
  workflowDto,
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
  getWorkFlows(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<workflowDto>> {
    let query = `Workflows?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<workflowDto>>(query);
  }
  // workflowsVariables
  getWorkFlowsVariables(
    workflowId: number,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<variablesDto>> {
    let query = `Workflows/${workflowId}/Variables?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<variablesDto>>(query);
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
    return this.baseService.get<
      {
        id: number;
        name: string;
      }[]
    >(query);
  }
  lookupForVariables() {
    let query = `Lookup?lookups=VariableType`;
    return this.baseService.get(query);
  }
  // add
  addWorkflow(name: Addworkflow): Observable<Addworkflow> {
    return this.baseService.post<Addworkflow>(`Workflows`, name);
  }

  // edit
  editWorkflow(name: Addworkflow): Observable<Addworkflow> {
    return this.baseService.put<Addworkflow>(`Workflows`, name);
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
  // delete user

  deleteUser(id: number) {
    return this.baseService.delete(`Workflows/DeleteUser/${id}`);
  }
  // delete variable

  deleteVariable(id: number) {
    return this.baseService.delete(`Workflows/DeleteVariable/${id}`);
  }
  // geit by id
  getWorkFlowByID(id: number): Observable<any> {
    return this.baseService.get(`Workflows/${id}`);
  }
  // get Work Flow States Actions
  getWorkFlowStatesActionsByID(stateId: number): Observable<any> {
    return this.baseService.get(`Workflows/States/${stateId}/Actions`);
  }
  // get variables Actions
  getVariableByID(
    id: number
  ): Observable<{ workflowId: number; name: string; type: number; id: number }> {
    return this.baseService.get<{ workflowId: number; name: string; type: number; id: number }>(
      `Workflows/GetVariableById/${id}`
    );
  }
  // get Users For Actions
  getUsersForActionsByID(actionId: number): Observable<PaginationVm<usersDto>> {
    return this.baseService.get<PaginationVm<usersDto>>(
      `Workflows/States/Actions/${actionId}/Users`
    );
  }

  //  status view
  statusListViews(workflowId: number): Observable<PaginationVm<statusDto>> {
    return this.baseService.get<PaginationVm<statusDto>>(`Workflows/${workflowId}/States`);
  }
  // adding status
  addStatus(workflowId: number, name: { name: string }): Observable<{ name: string }> {
    return this.baseService.post<{ name: string }>(`Workflows/${workflowId}/States`, name);
  }
  // edit status
  EditStatus(obj: { id: number; name: string }): Observable<{ id: number; name: string }> {
    return this.baseService.put<{ id: number; name: string }>(`Workflows/EditState`, obj);
  }
  EditVariables(obj: {
    id: number;
    name: string;
    type: string;
  }): Observable<{ id: number; name: string; type: string }> {
    return this.baseService.put<{ id: number; name: string; type: string }>(
      `Workflows/EditVariable`,
      obj
    );
  }
  // add variable
  addVariable(workflowId: number, obj: { name: string; type: string }): Observable<any> {
    return this.baseService.post<Addworkflow>(`Workflows/${workflowId}/Variables`, obj);
  }
  // actionList
  getWorkflowStatusActions(
    stateId: number,
    searchTerm?: string,
    pageInfo?: PageInfo
  ): Observable<PaginationVm<ActionDto>> {
    let query = `Workflows/States/${stateId}/Actions?${pageInfo?.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.baseService.get<PaginationVm<ActionDto>>(query);
  }

  // Add Actions
  addActions(stateId: number, obj: addAction) {
    return this.baseService.post(`Workflows/States/${stateId}/Actions`, obj);
  }
  // Add User for Actions
  addUserForActions(actionId: number, obj: { userName: string }) {
    return this.baseService.post(`Workflows/States/Actions/${actionId}/Users`, obj);
  }
  // edit User for Actions
  editUserForActions(obj: { id: number; userName: string }) {
    return this.baseService.put(`Workflows/EditUser`, obj);
  }
  // edit Actions
  editActions(obj: any): Observable<any> {
    return this.baseService.put<any>(`Workflows/EditAction`, obj);
  }
  // #################
}
