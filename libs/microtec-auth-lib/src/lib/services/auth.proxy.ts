import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService, HttpService } from 'shared-lib';
import { RefreshTokenDto, TokenModel, TokenRequestViewModel } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthProxy {
  constructor(private baseService: HttpService, private environmentService: EnvironmentService) {}

  collectToken(tokenModel: TokenRequestViewModel): Observable<TokenModel> {
    return this.baseService.postFullUrlJson(
      this.environmentService.AuthConfiguration?.authority + '/Connect/Token',
      tokenModel
    );
  }

  refreshToken(model: RefreshTokenDto): Observable<TokenModel> {
    return this.baseService.postFullUrlJson(
      this.environmentService.AuthConfiguration?.authority + '/Connect/RefreshToken',
      model
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
