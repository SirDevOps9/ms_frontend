import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    public router: Router,
    private oidcSecurityService: OidcSecurityService
  ) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean | UrlTree> {
  //   return this.oidcSecurityService.isAuthenticated$.pipe(
  //     take(1),
  //     map(({ isAuthenticated }) => {
  //       // allow navigation if authenticated
  //       if (isAuthenticated) {
  //         return true;
  //       }

  //       // redirect if not authenticated
  //       return this.router.parseUrl('/login');
  //     })
  //   );
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken }) => {
        console.log(isAuthenticated);
        console.log(accessToken);

        if (!isAuthenticated) this.router.navigate(['login']);
      });
    return true;
  }
}
