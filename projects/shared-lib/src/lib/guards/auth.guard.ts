import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { StorageService } from '../services/localstorage.service';
import { StorageKeys } from '../constants/storagekeys';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { SessionStorageService } from '../services/sessionstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    public router: Router,
    private sessionService: SessionStorageService,
    private oidcSecurityService: OidcSecurityService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken }) => {
        if (!isAuthenticated) this.router.navigate(['login']);
      });
    return true;
    // if (
    //   this.sessionService.getItem(StorageKeys.USER_TOKEN) == '' ||
    //   this.sessionService.getItem(StorageKeys.USER_TOKEN) == null
    // ) {
    //   this.router.navigate(['login']);
    // }
    // return true;
  }
}
