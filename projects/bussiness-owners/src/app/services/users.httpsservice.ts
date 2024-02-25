import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse, BaseDto, BaseService } from 'shared-lib';
import { UserListResponse } from '../models/users/userlist.response';
import { InviteUserDto } from '../models/users/inviteuser.model';
import { GetUserbyid } from '../models/users/getuserbyid.response';
import { boupdateuser } from '../models/users/boupdateduser.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userController = 'User';
  private inviteUserController = 'InvitedUser/Create';
  private platformPlansAPI = 'PlatformPlan/GetAllDropDown';
  private subDomainAPI = 'SubDomain/GetAllDropDown';
  private resendInvitationAPI = 'InvitedUser/ResendEmail';

  constructor(private baseService: BaseService) {}

  getAll(): Observable<APIResponse<UserListResponse[]>> {
    return this.baseService.get<APIResponse<UserListResponse[]>>(
      `${this.userController}`
    );
  }

  platformDropDown(): Observable<APIResponse<BaseDto[]>> {
    return this.baseService.get<APIResponse<UserListResponse[]>>(
      `${this.platformPlansAPI}`
    );
  }

  subDomainDropDown(): Observable<APIResponse<BaseDto[]>> {
    return this.baseService.get<APIResponse<UserListResponse[]>>(
      `${this.subDomainAPI}`
    );
  }

  inviteUser(
    userModel: InviteUserDto
  ): Observable<APIResponse<UserListResponse>> {
    return this.baseService.post<APIResponse<UserListResponse>>(
      `${this.inviteUserController}`,
      userModel
    );
  }

  resendInvitation(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.post<APIResponse<boolean>>(
      `${this.resendInvitationAPI}/${id}`,
      {}
    );
  }
  activateUser(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/ActivateUser/${id}`,
      {}
    );
  }
  deactivateUser(id: string): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/DeactivateUser/${id}`,
      {}
    );
  }
}
