import { Component, OnInit } from '@angular/core';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';
import { forkJoin, switchMap } from 'rxjs';
import { StorageKeys, StorageService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    // this.authService
    //   .saveTokenData()
    //   .pipe(switchMap(() => this.authHttp.updateLastLoggingTime()),)
    //   .subscribe({
    //     next: (tenantObj) => {
    //       this.localStorage.setItem(StorageKeys.TENANT, tenantObj);
    //       this.authService.afterLoginRedirect();
    //     },
    //   });

    this.authService
      .saveTokenData()
      .pipe(
        switchMap(() =>
          forkJoin({
            tenantObj: this.authHttp.updateLastLoggingTime(),
           // permissiontree: this.authHttp.loadPermissionTree(),
          })
        )
      )
      .subscribe({
        next: ({ tenantObj}) => {
          this.localStorage.setItem(StorageKeys.TENANT, tenantObj);
         // this.localStorage.setItem(StorageKeys.PERMISSIONTREE, permissiontree);
          this.authService.afterLoginRedirect();
        },
      });
  }

  constructor(
    private authService: AuthService,
    private localStorage: StorageService,
    private authHttp: AuthHttpService
  ) {}
}
