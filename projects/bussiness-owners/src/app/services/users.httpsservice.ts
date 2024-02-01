import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BaseService } from 'shared-lib';
import { UserListResponse } from '../models/users/userlist.response';
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
  ActivateAndDeactivate(id : number) :Observable<Boolean>{
    console.log(id)
    return this.baseService.put<boolean>(
      `${this.userController}/${id}`,{}
    );
  }
}
