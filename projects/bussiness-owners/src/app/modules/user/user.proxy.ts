import { Observable } from 'rxjs';
import {
  BaseDto,
  PageInfo,
  PaginationVm,
  FilterDto,
  HttpService,
} from 'shared-lib';
import { Injectable } from '@angular/core';
import {
  AddConfirmedUserDto,
  EditUserModel,
  GetUserbyid,
  CreateInvitedUser,
  UserListResponse,
  InvitedUserDto,
} from './models';
import { SubscriptionDto } from '../subscription/models';
import { PermissionTreeNode } from 'microtec-auth-lib';

@Injectable({
  providedIn: 'root',
}) 
export class UserProxy {
  getAll(subdomainId: string): Observable<UserListResponse[]> {
    return this.baseService.get<UserListResponse[]>(
      `User?subdomainId=${subdomainId}`
    );
  }
  getAllPaginated(
    filterDto: FilterDto
  ): Observable<PaginationVm<UserListResponse>> {
    return this.baseService.get<PaginationVm<UserListResponse>>(
      `User/GetAllPaginated?${filterDto.toQuery}`
    );
  }

  // fromPageInfoToString(pageInfo: PageInfo): string {
  //   let query = `PageInfo.Offset=${pageInfo.offset}&PageInfo.PageSize=${pageInfo.pageSize}`;
  //   console.log(query);
  // fromPageInfoToString(pageInfo: PageInfo): string {
  //   let query = `PageInfo.Offset=${pageInfo.offset}&PageInfo.PageSize=${pageInfo.pageSize}`;
  //   console.log(query);

  //   return query;
  // }
  //   return query;
  // }
  platformDropDown(): Observable<BaseDto[]> {
    return this.baseService.get<BaseDto[]>(`PlatformPlan/GetAllDropDown`);
  }


  inviteUser(userModel: CreateInvitedUser): Observable<UserListResponse> {
    return this.baseService.post<UserListResponse>(
      `InvitedUser/Create`,
      userModel,
    );
  }

  testTree(): Observable<PermissionTreeNode[]> {
    return this.baseService.get<PermissionTreeNode[]>(
      `User/TestTree`,
      false
    );
  }

  resendInvitation(id: string): Observable<boolean> {
    return this.baseService.post<boolean>(`InvitedUser/ResendEmail/${id}`, {});
  }
  activateUser(id: string, subdomainId: any): Observable<boolean> {
    return this.baseService.put<boolean>(`User/ActivateUser/${id}`, {subdomainId});
  }
  deactivateUser(id: string, subdomainId: any): Observable<boolean> {
    return this.baseService.put<boolean>(`User/DeactivateUser/${id}`, {subdomainId});
  }

  getUserById(id: string, subdomainId: string): Observable<GetUserbyid> {
    return this.baseService.get<GetUserbyid>(`User/Getbyid/${id}/${subdomainId }`);
  }

  updateUser(user: EditUserModel, id: string, subdomainId: string): Observable<boolean> {
    return this.baseService.put<boolean>(
      `User/UpdateUserByAdmin/${id}/${subdomainId}`,
      user
    );
  }

  getInvitedById(id: string): Observable<InvitedUserDto> {
    return this.baseService.get<InvitedUserDto>(
      `InvitedUser/GetById/${id}`,
      false
    );
  }

  confirmInvitedUser(request: AddConfirmedUserDto): Observable<boolean> {
    return this.baseService.post<boolean>(
      `InvitedUser/ConfirmInvitedUser`,
      request
    );
  }
  getAllSubscriptions(): Observable<SubscriptionDto[]> {
    return this.baseService.get<SubscriptionDto[]>(`Subscription`);
  }

  constructor(private baseService: HttpService) {}
}
