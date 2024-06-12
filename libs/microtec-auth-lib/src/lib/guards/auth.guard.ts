import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LogService } from 'shared-lib';
import { AuthService } from '../services';
import { RouteFilter } from '../types';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      let routeFilter = next.data['filter'] as RouteFilter;

      if (routeFilter) {
        let hasPermission = this.authService.hasPermission(routeFilter);
        if (!hasPermission) {
          this.router.navigate(['login']);
        }
      }
      //if (!isAuthenticated) this.router.navigate(['login']);
    });
    return true;
  }

  constructor(
    public router: Router,
    private authService: AuthService,
    private logService: LogService
  ) {}
}
