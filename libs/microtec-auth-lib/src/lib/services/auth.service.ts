import { Injectable, signal } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  StorageService,
  StorageKeys,
  SessionStorageService,
  LogService,
  CookieStorageService,
  LanguageService,
  EnvironmentService,
  RouteParams,
  RouterService,
} from 'shared-lib';
import {
  PermissionTreeNode,
  RefreshTokenDto,
  RouteFilter,
  TokenModel,
  TokenRequestViewModel,
} from '../types';
import { HttpParams } from '@angular/common/http';
import { AuthProxy } from '.';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = signal<any>(undefined);

  authorize() {
    var storageCulutre = this.languageService.getLang();
    const currentUrl = this.routerService.getRouteParams('returnUrl') || '/';

    const params = new HttpParams()
      .set(RouteParams.REDIRECTURL, this.environmentService.AuthConfiguration?.redirectUrl!)
      .set(RouteParams.CLIENTKEY, this.environmentService.AuthConfiguration?.clientId!)
      .set(RouteParams.SCOPES, this.environmentService.AuthConfiguration?.scopes!)
      .set(RouteParams.CULTUREQUERY, storageCulutre)
      .set(RouteParams.STATE, currentUrl);

    location.href =
      this.environmentService.AuthConfiguration?.authority +
      '/Connect/Authorize?' +
      params.toString();
  }

  logout() {
    const params = new HttpParams()
      .set(RouteParams.RETURNURL, this.environmentService.AuthConfiguration?.logoutRedirectUri!)
      .set(RouteParams.CLIENTKEY, this.environmentService.AuthConfiguration?.clientId!);

    location.href =
      this.environmentService.AuthConfiguration?.authority + '/Account/Logout?' + params.toString();
  }

  collectToken(key: string, state: string) {
    var storageCulutre = this.languageService.getLang();

    let tokenModel: TokenRequestViewModel = {
      clientKey: this.environmentService.AuthConfiguration?.clientId!,
      culture: storageCulutre,
      key: key,
      redirectUrl: this.environmentService.AuthConfiguration?.redirectUrl!,
      scopes: this.environmentService.AuthConfiguration?.scopes!,
      state: state,
    };

    this.authProxy.collectToken(tokenModel).subscribe({
      next: (res) => {
        this.saveLoginData(res);
        if (state.includes('logout-redirect')) {
          this.router.navigate(['/']);
        } else {
          if (state == '' || state == '/') {
            //alert(this.environmentService.AuthConfiguration!.state!);
            location.href = this.environmentService.AuthConfiguration!.state!;
          } else {
            location.href = state;
          }
        }
      },
    });
  }

  saveLoginData(model: TokenModel) {
    this.localStorageService.setItem(StorageKeys.USER_TOKEN, model.token);
    this.localStorageService.setItem(StorageKeys.LOGIN_RESPONSE, model);
    
  }

  clearAllStorage() {
    this.sessionService.clearAll();
    this.localStorageService.clearAll();
    this.cookieService.clearAll();
  }

  isAuthenticated() {
    let token = this.localStorageService.getItem(StorageKeys.USER_TOKEN);

    if (token) return true;
    return false;
  }

  getUserData(): TokenModel {
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
  refreshToken(): Observable<TokenModel> {
    let userData = this.getUserData();
    let refreshTokenDto: RefreshTokenDto = {
      accessToken: userData.token,
      refreshToken: userData.refreshToken,
    };
    return this.authProxy.refreshToken(refreshTokenDto).pipe(
      map((loginResponse) => {
        this.saveLoginData(loginResponse);
        return loginResponse;
      })
    );
  }

  get getUserName(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as TokenModel;
    this.logService.log('authService.UserName', loggedUser.userInfo.fullName);
    return loggedUser?.userInfo?.fullName ? loggedUser.userInfo.fullName! : '';
  }

  get getUserPhoto(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as TokenModel;
    return loggedUser?.userInfo?.profilePicId;
  }

  get getUserEmail(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as TokenModel;
    return loggedUser?.userInfo?.email;
  }

  constructor(
    private localStorageService: StorageService,
    private sessionService: SessionStorageService,
    private logService: LogService,
    private cookieService: CookieStorageService,
    private languageService: LanguageService,
    private environmentService: EnvironmentService,
    private authProxy: AuthProxy,
    private routerService: RouterService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
