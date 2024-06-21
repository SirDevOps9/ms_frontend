import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthProxy, AuthService } from 'microtec-auth-lib';
import { EnvironmentService, RouteParams, RouterService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    let loginKey = this.routerservice.getRouteParams(RouteParams.LOGINKEY);

    this.authService.collectToken(loginKey);

    console.log('Login Key', loginKey);

    // this.oidservice.getState().subscribe((stateRes) => {
    //   console.log('Get State', stateRes);
    //   this.authService.saveTokenData().subscribe({
    //     next: (data: any) => {
    //       this.authProxy.updateLastLoggingTime().subscribe({});
    //       if (stateRes === 'noredirect') {
    //         this.routerservice.navigateTo('');
    //       } else {
    //         location.href = stateRes;
    //       }
    //     },
    //   });
    // });
  }

  constructor(
    private authService: AuthService,
    private authProxy: AuthProxy,
    private routerservice: RouterService,
    private oidservice: OidcSecurityService,
    private environmentService: EnvironmentService
  ) {}
}
