import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';
import { forkJoin } from 'rxjs';
import { EnvironmentService, RouterService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    console.log(this.environmentService.state);
    this.oidservice.getState().subscribe((stateRes) => {
      console.log('Get State', stateRes);
      this.authService.saveTokenData().subscribe({
        next: (data: any) => {
          this.authHttp.updateLastLoggingTime().subscribe({});
          if (stateRes === 'noredirect') {
            this.routerservice.navigateTo('');
          } else {
            forkJoin([this.authHttp.loadSideMenu()]).subscribe(([sideMenuRes]) => {
              this.authService.saveSideMenu(sideMenuRes);
              location.href = stateRes;
            });
          }
        },
      });
    });
  }

  constructor(
    private authService: AuthService,
    private authHttp: AuthHttpService,
    private routerservice: RouterService,
    private oidservice: OidcSecurityService,
    private environmentService: EnvironmentService
  ) {}
}
