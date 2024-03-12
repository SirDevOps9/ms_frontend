import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, BaseService } from 'shared-lib';
import { UserListResponse } from '../user/models';


@Injectable({
  providedIn: 'root'
})
export class ERPUserProxy {


getAll(subscriptionId: number): Observable<APIResponse<UserListResponse[]>> {
  return this.baseService.get<APIResponse<UserListResponse[]>>(
    `ERPUser?subscriptionId=${subscriptionId}`
  );
}


constructor(private baseService: BaseService) { }

}
