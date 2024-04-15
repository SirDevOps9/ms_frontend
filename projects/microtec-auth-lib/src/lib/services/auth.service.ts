import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import {
  StorageService,
  StorageKeys,
  SessionStorageService,
  LogService,
  CookieStorageService,
  RouterService,
  LanguageService,
} from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';
import { PermissionTreeNode } from '../models';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authorize() {
    var storageCulutre = this.languageService.getLang();
    this.oidcSecurityService.authorize(undefined, {
      customParams: { lang: storageCulutre },
    });
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

  getUserPermissions(): PermissionTreeNode[] {
    let encrypted = this.localStorageService.getItem(
      StorageKeys.PERMISSIONTREE
    );
    const decodedString = atob(encrypted);
    const tree: PermissionTreeNode[] = JSON.parse(decodedString);
    console.log('Decoded Tree', tree);

    return tree;
  }
  
  saveTokenData(): Observable<LoginResponse> {
    return this.oidcSecurityService.checkAuth().pipe(
      map((loginResponse: LoginResponse) => {
        this.saveUserData(loginResponse);
        return loginResponse;
      })
    );
  }
  refreshToken(): Observable<LoginResponse> {
    return this.oidcSecurityService.forceRefreshSession().pipe(
      map((loginResponse: LoginResponse) => {
        console.log('refresh Token', loginResponse);
        this.saveUserData(loginResponse);
        return loginResponse;
      })
    );
  }
  afterLoginRedirect() {
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
    return loggedUser?.userData?.name;
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

  constructor(
    private localStorageService: StorageService,
    private sessionService: SessionStorageService,
    private oidcSecurityService: OidcSecurityService,
    private logService: LogService,
    private routerService: RouterService,
    private cookieService: CookieStorageService,
    private languageService: LanguageService
  ) {}
}
