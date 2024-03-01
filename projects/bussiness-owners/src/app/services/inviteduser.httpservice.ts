import { Injectable } from '@angular/core';
import { APIResponse, BaseService } from 'shared-lib';
import { Observable } from 'rxjs';
import { AddConfirmedUserDto } from '../models/users/addconfirmedcser.model';

@Injectable({
  providedIn: 'root',
})
export class InviteduserService {
  private userController = 'InvitedUser';
  constructor(private baseService: BaseService) {}

  GetInvitedUserEmail(id: string): Observable<APIResponse<string>> {
    return this.baseService.get<APIResponse<string>>(
      `${this.userController}/GetInvitedUserEmail/${id}`,
      false
    );
  }
  ConfirmInvitedUser(request: FormData): Observable<APIResponse<boolean>> {
    return this.baseService.postForm<APIResponse<boolean>>(
      `${this.userController}/ConfirmInvitedUser`,
      request
    );
  }
}
