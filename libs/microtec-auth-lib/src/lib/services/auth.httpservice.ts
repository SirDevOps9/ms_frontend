import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginmodel';
import { AuthenticationResponse } from '../models/authenticationResponse';
import { EnvironmentService, HttpService, SideMenuModel } from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthHttpService {
  private loginAPI = 'Auth/Account';
  private updateLoginDateAPI = 'User/UpdateLastLoggingTime';

  constructor(
    private baseService: HttpService,
    private environmentService: EnvironmentService
  ) {}
  login(model: LoginModel): Observable<AuthenticationResponse> {
    return this.baseService.post<AuthenticationResponse>(
      `${this.loginAPI}/Login`,
      model
    );
  }
  updateLastLoggingTime(): Observable<string> {
    return this.baseService.post<string>(
      `${this.updateLoginDateAPI}`,
      null,
      false
    );
  }

  loadPermissionTree(): Observable<string> {
    return this.baseService.getString(`User/BuildPermissionTree`, false);
  }

  refreshToken(model: TokenModel): Observable<AuthenticationResponse> {
    return this.baseService.post<AuthenticationResponse>(
      `${this.loginAPI}/refresh-token`,
      model
    );
  }

  loadSideMenu(): Observable<SideMenuModel[]> {
    return this.baseService.getFullUrl<SideMenuModel[]>(
      `${this.environmentService.BusinessOwnerUrl}/ErpMenu/GetUserMenus`
    );
  }
}
