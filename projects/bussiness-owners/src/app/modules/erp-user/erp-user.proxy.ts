import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse, HttpService } from 'shared-lib';
import { UserListResponse } from '../user/models';

@Injectable({
  providedIn: 'root',
})
export class ERPUserProxy {
  getAll(subscriptionId: number): Observable<APIResponse<UserListResponse[]>> {
    return this.httpService.get<APIResponse<UserListResponse[]>>(
      `ERPUser?subscriptionId=${subscriptionId}`
    );
  }

  constructor(private httpService: HttpService) {}
}
