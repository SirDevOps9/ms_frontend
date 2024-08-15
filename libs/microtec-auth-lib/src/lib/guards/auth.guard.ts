import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';
import { RouteFilter } from '../types';
import { LayoutService } from 'apps-shared-lib';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    const currentUrl = window.location.href;

    let loadedModules = this.layoutService.getModules();

    let moduleId = next.data['moduleId'];

    if (!this.authService.isAuthenticated())
      this.router.navigate(['login'], {
        queryParams: { returnUrl: currentUrl },
      });


    if (loadedModules)
      if (loadedModules.find((x) => x.moduleId == moduleId) == null) {
        this.router.navigate(['un-authorized']);
      }

    let routeFilter = next.data['filter'] as RouteFilter;
    if (routeFilter) {
      let hasPermission = this.authService.hasPermission(routeFilter);
      if (!hasPermission) {
        this.router.navigate(['login']);
      }
    }

    return true;
  }

  constructor(
    public router: Router,
    private authService: AuthService,
    private layoutService: LayoutService
  ) {}
}
