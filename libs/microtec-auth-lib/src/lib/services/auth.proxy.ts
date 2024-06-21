import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService, HttpService } from 'shared-lib';
import { LoginModel, LoginResponse, TokenRequestViewModel } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthProxy {
  constructor(private baseService: HttpService, private environmentService: EnvironmentService) {}

  formLogin(model: LoginModel): Observable<LoginResponse> {
    return this.baseService.postFullUrl('https://localhost:44330/api/Account/login', model);
  }

  collectToken(tokenModel: TokenRequestViewModel) {
    return this.baseService.postFullUrl(
      this.environmentService.AuthConfiguration?.authority + '/Connect/Token',
      tokenModel
    );
  }

  updateLastLoggingTime(): Observable<string> {
    return this.baseService.postFullUrl(
      `${this.environmentService.BusinessOwnerUrl}/User/UpdateLastLoggingTime`,
      null,
      false
    );
  }

  loadPermissionTree(): Observable<string> {
    return this.baseService.getFullUrlString(
      `${this.environmentService.BusinessOwnerUrl}/User/BuildPermissionTree`,
      false
    );
  }
}
