import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import {
  StorageService,
  StorageKeys,
  SessionStorageService,
  LogService,
  CookieStorageService,
  RouterService,
} from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    protected localStorageService: StorageService,
    private sessionService: SessionStorageService,
    private oidcSecurityService: OidcSecurityService,
    private logService: LogService,
    private routerService: RouterService,
    private cookieService: CookieStorageService
  ) {}

  authorize() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }

  clearAllStorage() {
    this.sessionService.clearAll();
    this.localStorageService.clearAll();
    this.cookieService.clearAll();
  }
  getAuthToken(): Observable<string> {
    return this.oidcSecurityService.getAccessToken();
  }

  isAuthenticated(): Observable<boolean> {
    return this.oidcSecurityService.isAuthenticated();
  }

  getUserData(): LoginResponse {
    return this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
  }

  afterLoginReidrect() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        this.saveUserData(loginResponse);
        this.routerService.navigateTo('');
      });
  }

  saveUserData(model: LoginResponse) {
    this.sessionService.setItem(StorageKeys.USER_TOKEN, model.accessToken);
    this.localStorageService.setItem(StorageKeys.LOGIN_RESPONSE, model);
  }

  get getUserName(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as LoginResponse;
    this.logService.log(loggedUser, 'authService.UserName');
    return loggedUser.userData.name;
  }
  getUserTokenModel(): TokenModel {
    let tokenModel: TokenModel = {
      AccessToken: this.localStorageService.getItem(StorageKeys.USER_TOKEN)!,
      RefreshToken: this.localStorageService.getItem(
        StorageKeys.USER_REFRESH_TOKEN
      )!,
    };
    return tokenModel;
  }
}
