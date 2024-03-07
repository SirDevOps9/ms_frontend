import { Observable } from 'rxjs';
import { APIResponse, BaseDto, BaseService } from 'shared-lib';
import { Injectable } from '@angular/core';
import { GetUserbyid, InviteUserDto, UserListResponse, boupdateuser } from './models';
import { SubscriptionDto } from '../plan/models';

@Injectable({
  providedIn: 'root',
})
export class UserProxy {

  constructor(private baseService: BaseService) {}

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
    return this.baseService.get<APIResponse<GetUserbyid>>(
      `User/Getbyid/${id}`
    );
  }

  updateUser(user: boupdateuser, id: string): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `User/BOUpdateUser/${id}`,
      user
    );
  }

  getInvitedUserEmail(id: string): Observable<APIResponse<string>> {
    return this.baseService.get<APIResponse<string>>(
      `InvitedUser/GetInvitedUserEmail/${id}`,
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
}
