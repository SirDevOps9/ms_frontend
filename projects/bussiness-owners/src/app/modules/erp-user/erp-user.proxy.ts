import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, HttpService } from 'shared-lib';
import { UserListResponse } from '../user/models';
import { InviteErpUserDto } from './models/inviteerpuser';


@Injectable({
  providedIn: 'root'
})
export class ERPUserProxy {

getAll(subscriptionId: number): Observable<APIResponse<UserListResponse[]>> {
  return this.baseService.get<APIResponse<UserListResponse[]>>(
    `ERPUser?subscriptionId=${subscriptionId}`
  );
}

inviteUser(
  userModel: InviteErpUserDto
): Observable<APIResponse<UserListResponse[]>> {
  return this.baseService.post<APIResponse<UserListResponse>>(
    `ERPUser/InviteUser`,
    userModel
  );
}

getEmailOptions(query: string): Observable<APIResponse<string[]>> {
  return this.baseService.get<APIResponse<string[]>>(`ERPUser/emailOptions?query=${query}`);
}

constructor(private baseService: HttpService) { }

}
