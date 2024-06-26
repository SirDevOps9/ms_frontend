import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import {
  StorageService,
  StorageKeys,
  SessionStorageService,
  LogService,
  CookieStorageService,
  LanguageService,
  EnvironmentService,
  RouteParams,
} from 'shared-lib';
import { PermissionTreeNode, RouteFilter, TokenRequestViewModel } from '../types';
import { HttpParams } from '@angular/common/http';
import { AuthProxy } from '.';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<any>(undefined);

  authorize() {
    var storageCulutre = this.languageService.getLang();

    const params = new HttpParams()
      .set(RouteParams.REDIRECTURL, this.environmentService.AuthConfiguration?.redirectUrl!)
      .set(RouteParams.CLIENTKEY, this.environmentService.AuthConfiguration?.clientId!)
      .set(RouteParams.CULTUREQUERY, storageCulutre);

    location.href =
      this.environmentService.AuthConfiguration?.authority +
      '/Connect/Authorize?' +
      params.toString();
  }

  logout() {
    location.href = 'logout';
    //this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
  }

  collectToken(key: string) {
    var storageCulutre = this.languageService.getLang();

    let tokenModel: TokenRequestViewModel = {
      clientName: this.environmentService.AuthConfiguration?.clientId!,
      culture: storageCulutre,
      key: key,
      redirectUrl: this.environmentService.AuthConfiguration?.redirectUrl!,
    };

    this.authProxy.collectToken(tokenModel).subscribe({
      next: (res) => {
        console.log('tokenResult', res);
      },
    });
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
    let userData = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    this.currentUser.set(userData);
    return userData;
  }

  getUserPermissions(): PermissionTreeNode[] | null {
    let encrypted = this.localStorageService.getItem(StorageKeys.PERMISSIONTREE);

    if (encrypted === null) return null;
    const decodedString = atob(encrypted);
    const tree: PermissionTreeNode[] = JSON.parse(decodedString);
    return tree;
  }

  hasPermission(filter: RouteFilter): boolean {
    let tree = this.getUserPermissions();
    if (tree === null) return false;

    let userPermission = tree!.filter(
      (x) => x.AppId == filter.App && x.LicenseId == filter.License && x.ServiceId == filter.Service
    );

    if (userPermission.length === 0) return false;

    const hasPermission = userPermission.some((node) => {
      const includesAction = node.Actions.includes(filter.Action);
      return includesAction;
    });

    return hasPermission;
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
        this.saveUserData(loginResponse);
        return loginResponse;
      })
    );
  }

  saveUserData(model: LoginResponse) {
    this.currentUser.set(model);
    this.sessionService.setItem(StorageKeys.USER_TOKEN, model.accessToken);
    this.localStorageService.setItem(StorageKeys.LOGIN_RESPONSE, model);
  }

  get getUserName(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as LoginResponse;
    this.logService.log('authService.UserName', loggedUser.userData.fullname);
    return loggedUser?.userData?.fullname ? loggedUser.userData.fullname! : '';
  }

  get getUserPhoto(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as LoginResponse;
    return loggedUser?.userData?.Photo;
  }

  constructor(
    private localStorageService: StorageService,
    private sessionService: SessionStorageService,
    private oidcSecurityService: OidcSecurityService,
    private logService: LogService,
    private cookieService: CookieStorageService,
    private languageService: LanguageService,
    private environmentService: EnvironmentService,
    private authProxy: AuthProxy
  ) {}
}
