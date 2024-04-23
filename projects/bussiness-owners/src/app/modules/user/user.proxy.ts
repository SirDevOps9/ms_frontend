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
  InviteUserDto,
  UserListResponse,
} from './models';
import { SubscriptionDto } from '../subscription/models';

@Injectable({
  providedIn: 'root',
})
export class UserProxy {
  getAll(subscriptionId: number): Observable<UserListResponse[]> {
    return this.baseService.get<UserListResponse[]>(
      `User?subdomainId=${subscriptionId}`
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


  inviteUser(userModel: InviteUserDto): Observable<UserListResponse> {
    return this.baseService.post<UserListResponse>(
      `InvitedUser/Create`,
      userModel,
    );
  }

  resendInvitation(id: string): Observable<boolean> {
    return this.baseService.post<boolean>(`InvitedUser/ResendEmail/${id}`, {});
  }
  activateUser(id: string): Observable<boolean> {
    return this.baseService.put<boolean>(`User/ActivateUser/${id}`, {});
  }
  deactivateUser(id: string): Observable<boolean> {
    return this.baseService.put<boolean>(`User/DeactivateUser/${id}`, {});
  }
  getUserById(id: string): Observable<GetUserbyid> {
    return this.baseService.get<GetUserbyid>(`User/Getbyid/${id}`);
  }

  updateUser(user: EditUserModel, id: string): Observable<boolean> {
    return this.baseService.put<boolean>(
      `User/UpdateInvitedBoByAdmin/${id}`,
      user
    );
  }

  getById(id: string): Observable<InviteUserDto> {
    return this.baseService.get<InviteUserDto>(
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
