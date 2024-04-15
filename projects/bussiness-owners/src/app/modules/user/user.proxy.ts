import { Observable } from 'rxjs';
import { BaseDto, HttpService } from 'shared-lib';
import { Injectable } from '@angular/core';
import {
  AddConfirmedUserDto,
  EditUserModel,
  GetUserbyid,
  InviteUserDto,
  UserListResponse,
} from './models';
import { SubscriptionDto } from '../plan/models';
import { PermissionTreeNode } from 'projects/microtec-auth-lib/src/lib/models';

@Injectable({
  providedIn: 'root',
})
export class UserProxy {
  getAll(subscriptionId: number): Observable<UserListResponse[]> {
    return this.baseService.get<UserListResponse[]>(
      `User?subscriptionId=${subscriptionId}`
    );
  }

  platformDropDown(): Observable<BaseDto[]> {
    return this.baseService.get<BaseDto[]>(`PlatformPlan/GetAllDropDown`);
  }
  inviteUser(userModel: InviteUserDto): Observable<UserListResponse> {
    return this.baseService.post<UserListResponse>(
      `InvitedUser/Create`,
      userModel,
      false
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
