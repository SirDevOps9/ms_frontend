import { Component, OnInit } from '@angular/core';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';
import { switchMap } from 'rxjs';
import { RouterService, StorageKeys, StorageService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    this.authService
      .saveTokenData()
      .pipe(switchMap(() => this.authHttp.UpdateLastLoggingTime()))
      .subscribe({
        next: (tenantObj) => {
          this.localStorage.setItem(StorageKeys.TENANT, tenantObj);
          this.routerservice.navigateTo('');
          // this.authService.afterLoginRedirect();
        },
      });
  }
  constructor(
    private authService: AuthService,
    private localStorage: StorageService,
    private authHttp: AuthHttpService,
    private routerservice: RouterService
  ) { }
}
