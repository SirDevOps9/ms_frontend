import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, BaseService } from 'shared-lib';
import { UserListResponse } from '../models/users/userlist.response';


@Injectable({
  providedIn: 'root'
})
export class ErpUsersService {

constructor(private baseService: BaseService) { }
getAll(subscriptionId: number): Observable<APIResponse<UserListResponse[]>> {
  return this.baseService.get<APIResponse<UserListResponse[]>>(
    `ERPUser?subscriptionId=${subscriptionId}`
  );
}
}
