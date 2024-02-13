import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APIResponse, BaseService } from 'shared-lib';
import { UserListResponse } from '../models/users/userlist.response';
import{AddConfirmedUserDto}from '../models/users/add-ConfirmedUserDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userController = 'User';

  constructor(private baseService: BaseService) {}

  getAll(): Observable<UserListResponse[]> {
    return this.baseService.get<UserListResponse[]>(
      `${this.userController}`
    );
  }
  activateUser(id : number) :Observable<APIResponse<boolean>>{
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/ActivateUser/${id}`,{}
    );
  }
  deactivateUser(id : number) :Observable<APIResponse<boolean>>{
    return this.baseService.put<APIResponse<boolean>>(
      `${this.userController}/DeactivateUser/${id}`,{}
    );
  }
  addUser(request: AddConfirmedUserDto): Observable<APIResponse<boolean>> {
    return this.baseService.post<APIResponse<boolean>>(
      `${this.userController}/CreateInvitedUser`,
      request
    );
  }
}
