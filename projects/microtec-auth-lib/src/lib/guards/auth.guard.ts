import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LogService } from 'shared-lib';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    public router: Router,
    private authService: AuthService,
    private logService: LogService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.logService.log(isAuthenticated, 'Guard');
      // if (!isAuthenticated) this.router.navigate(['login']);
    });
    return true;
  }
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
}
