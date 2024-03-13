import { Observable } from 'rxjs';
import { APIResponse, BaseDto, HttpService } from 'shared-lib';
import { Injectable } from '@angular/core';
import {
  EditUserModel,
  GetUserbyid,
  InviteUserDto,
  UserListResponse,
} from './models';
import { SubscriptionDto } from '../plan/models';

@Injectable({
  providedIn: 'root',
})
export class UserProxy {
  getAll(subscriptionId: number): Observable<APIResponse<UserListResponse[]>> {
    return this.baseService.get<APIResponse<UserListResponse[]>>(
      `User?subscriptionId=${subscriptionId}`
    );
  }

  platformDropDown(): Observable<APIResponse<BaseDto[]>> {
    return this.baseService.get<APIResponse<BaseDto[]>>(
      `PlatformPlan/GetAllDropDown`
    );
  }
  inviteUser(
    userModel: InviteUserDto
  ): Observable<APIResponse<UserListResponse>> {
    return this.baseService.post<APIResponse<UserListResponse>>(
      `InvitedUser/Create`,
      userModel
    );
  }

  resendInvitation(id: string): Observable<APIResponse<boolean>> {
    return this.baseService.post<APIResponse<boolean>>(
      `InvitedUser/ResendEmail/${id}`,
      {}
    );
  }
  activateUser(id: string): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `User/ActivateUser/${id}`,
      {}
    );
  }
  deactivateUser(id: string): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `User/DeactivateUser/${id}`,
      {}
    );
  }
  getUserById(id: string): Observable<APIResponse<GetUserbyid>> {
    return this.baseService.get<APIResponse<GetUserbyid>>(`User/Getbyid/${id}`);
  }

  updateUser(
    user: EditUserModel,
    id: string
  ): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `User/UpdateInvitedBoByAdmin/${id}`,
      user
    );
  }

  GetById(id: string): Observable<APIResponse<string>> {
    return this.baseService.get<APIResponse<string>>(
      `InvitedUser/GetById/${id}`,
      false
    );
  }
  confirmInvitedUser(request: FormData): Observable<APIResponse<boolean>> {
    return this.baseService.postForm<APIResponse<boolean>>(
      `InvitedUser/ConfirmInvitedUser`,
      request
    );
  }
  getAllSubscriptions(): Observable<APIResponse<SubscriptionDto[]>> {
    return this.baseService.get<APIResponse<SubscriptionDto[]>>(`Subscription`);
  }

  constructor(private baseService: HttpService) {}
}
