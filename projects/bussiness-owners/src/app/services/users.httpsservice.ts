import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse, BaseService } from 'shared-lib';
import { UserListResponse } from '../models/users/userlist.response';
import { InviteUserDto } from '../models/users/inviteuser.model';
import { GetUserbyid } from '../models/users/getuserbyid.response';
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

  inviteUser(userModel: InviteUserDto): Observable<APIResponse<UserListResponse>> {
    return this.baseService.post<APIResponse<UserListResponse>>(
      `${this.inviteUserController}`,
      userModel
    );
  }

  activateUser(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/ActivateUser/${id}`,
      {}
    );
  }
  deactivateUser(id: number): Observable<APIResponse<boolean>> {
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/${id}`,
      {}
    );
  }
  getUserById(id:string): Observable<APIResponse<GetUserbyid>> {
    return this.baseService.get<APIResponse<GetUserbyid>>(
      `${this.userController}/Getbyid/${id}`
    );
  }
  
  updateUser(user:any , id:string):Observable<APIResponse<boolean>> {
    return this.baseService.get<APIResponse<boolean>>(
      `${this.userController}/Getbyid/${id}`
    );
  }
}
