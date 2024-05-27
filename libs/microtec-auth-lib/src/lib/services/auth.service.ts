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
  SideMenuModel,
  MenuModule,
  EnvironmentService,
} from 'shared-lib';
import { TokenModel } from '../models/tokenmodel';
import { PermissionTreeNode, RouteFilter } from '../models';
import { Nullable } from 'primeng/ts-helpers';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authorize() {
    if (this.environmentService.state) {
      this.oidcSecurityService
        .setState(this.environmentService.state)
        .subscribe((res) => this.logService.log(res, 'set state'));
    }
    var storageCulutre = this.languageService.getLang();
    this.oidcSecurityService.authorize(undefined, {
      customParams: { lang: storageCulutre },
    });
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log(result));
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

  getUserPermissions(): PermissionTreeNode[] | Nullable {
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

  saveSideMenu(menuItems: SideMenuModel[]) {
    const distinctModules = menuItems
      .filter(
        (value, index, self) =>
          self.findIndex(
            (item) => item.moduleId === value.moduleId && item.module === value.module
          ) === index
      )
      .map(({ moduleId, module }) => ({ moduleId, module }));

    this.localStorageService.setItem(StorageKeys.MODULES, distinctModules);
    this.localStorageService.setItem(StorageKeys.SIDEMENU, menuItems);
  }

  getModules() {
    let item = this.localStorageService.getItem(StorageKeys.MODULES);
    let menuModules = item! as MenuModule[];
    return menuModules;
  }
  getSideMenu(): SideMenuModel[] {
    let item = this.localStorageService.getItem(StorageKeys.SIDEMENU);
    let sidemenu = item! as SideMenuModel[];
    return sidemenu;
  }

  afterLoginRedirect() {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: LoginResponse) => {
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
    this.logService.log('authService.UserName', loggedUser.userData.fullname);
    return loggedUser?.userData?.fullname ? loggedUser.userData.fullname! : '';
  }

  get getUserPhoto(): string {
    let item = this.localStorageService.getItem(StorageKeys.LOGIN_RESPONSE);
    let loggedUser = item! as LoginResponse;
    return loggedUser?.userData?.Photo;
  }
  getUserTokenModel(): TokenModel {
    let tokenModel: TokenModel = {
      AccessToken: this.localStorageService.getItem(StorageKeys.USER_TOKEN)!,
      RefreshToken: this.localStorageService.getItem(StorageKeys.USER_REFRESH_TOKEN)!,
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
    private languageService: LanguageService,
    private environmentService: EnvironmentService
  ) {}
}
