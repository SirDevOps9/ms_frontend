import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { UserListResponse } from '../user/models';

@Injectable({
  providedIn: 'root',
})
export class ERPUserProxy {
  getAll(subscriptionId: number): Observable<UserListResponse[]> {
    return this.httpService.get<UserListResponse[]>(
      `ERPUser?subscriptionId=${subscriptionId}`
    );
  }

  constructor(private httpService: HttpService) {}
}
