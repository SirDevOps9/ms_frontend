import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse, BaseService } from 'shared-lib';
import { UserListResponse } from '../models/users/userlist.response';
import { InviteUserDto } from '../models/users/inviteuser.model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userController = 'User';
  private inviteUserController = 'InvitedUser/Create';
  constructor(private baseService: BaseService) {}

  getAll(): Observable<APIResponse<UserListResponse[]>> {
    return this.baseService.get<APIResponse<UserListResponse[]>>(
      `${this.userController}`
    );
  }

  inviteUser(userModel: InviteUserDto): Observable<APIResponse<boolean>> {
    return this.baseService.post<APIResponse<boolean>>(
      `${this.inviteUserController}`,
      userModel
    );
  }
  ActivateAndDeactivate(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/${id}`,
      {}
    );
  }
}
