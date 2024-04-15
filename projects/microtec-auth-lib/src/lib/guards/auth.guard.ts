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
import { Actions, PermissionTreeNode } from '../models';

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
      let permissionsTree = this.authService.getUserPermissions();

      let requiredAction = next.data['action'];

      console.log('requiredAction', requiredAction);

      if (requiredAction) {
        const hasPermission = this.checkPermission(
          permissionsTree,
          requiredAction
        );
        console.log('hasPermission', hasPermission);

        if (!hasPermission) this.router.navigate(['login']);
      }
      this.logService.log(isAuthenticated, 'Guard');
      // if (!isAuthenticated) this.router.navigate(['login']);
    });
    return true;
  }

  private checkPermission(
    tree: PermissionTreeNode[],
    action: Actions
  ): boolean {
    console.log("Action",action);
    
    const hasPermission = tree.some((node) => {
      const includesAction = node.Actions.includes(action);
      console.log(
        `Checking node with Actions: ${node.Actions}, includesAction: ${includesAction}`
      );
      return includesAction;
    });
    return hasPermission;
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
