import { Component, OnInit } from '@angular/core';
import { AuthHttpService, AuthService } from 'microtec-auth-lib';
import { RouterService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    this.authService.saveTokenData().subscribe({
      next: (data: any) => {
        this.authHttp.updateLastLoggingTime().subscribe({});

        this.authHttp.loadSideMenu().subscribe((res) => {
          this.authService.saveSideMenu(res);
          this.routerservice.navigateTo('');
        });
      },
    });
  }

  constructor(
    private authService: AuthService,
    private authHttp: AuthHttpService,
    private routerservice: RouterService
  ) {}
}
