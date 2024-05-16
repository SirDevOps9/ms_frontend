import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';
import { forkJoin, switchMap } from 'rxjs';
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

    // if (this.environmentService.state) {
    //   this.oidservice.getState().subscribe((stateRes) => {
    //     console.log('Logged State', stateRes);

    //     this.authService.saveTokenData().subscribe({
    //       next: (data: any) => {
    //         this.authHttp.updateLastLoggingTime().subscribe({});
    //         this.authHttp.loadSideMenu().subscribe((res) => {
    //           this.authService.saveSideMenu(res);
    //         });
    //       },
    //     });
    //     location.href = stateRes;
    //   });
    // } else {
    //   this.authService.saveTokenData().subscribe({});
    //   this.routerservice.navigateTo('');
    // }

    if (this.environmentService.state) {
      this.oidservice.getState().subscribe((stateRes) => {
        console.log('Get State', stateRes);
        this.authService.saveTokenData().subscribe({
          next: (data: any) => {
            this.authHttp.updateLastLoggingTime().subscribe({});
            forkJoin([this.authHttp.loadSideMenu()]).subscribe(
              ([sideMenuRes]) => {
                this.authService.saveSideMenu(sideMenuRes);
                location.href = stateRes;
              }
            );
          },
        });
      });
    } else {
      this.authService.saveTokenData().subscribe({
        next: (data: any) => {
          this.authHttp.updateLastLoggingTime().subscribe({});
          this.routerservice.navigateTo(''); 
        },
      });
    }
  }

  constructor(
    private authService: AuthService,
    private authHttp: AuthHttpService,
    private routerservice: RouterService,
    private oidservice: OidcSecurityService,
    private environmentService: EnvironmentService
  ) {}
}
