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
import { RouteFilter } from '../models';

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
      let routeFilter = next.data['filter'] as RouteFilter;

      console.log('requiredAction', routeFilter);

      if (routeFilter) {
        let hasPermission = this.authService.hasPermission(routeFilter);
        console.log('hasPermission', hasPermission);
        if (!hasPermission) {
          this.router.navigate(['login']);
        }
      }
      if (!isAuthenticated) this.router.navigate(['login']);
    });
    return true;
  }
}
