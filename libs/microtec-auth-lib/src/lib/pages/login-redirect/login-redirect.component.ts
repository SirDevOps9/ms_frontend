import { AfterViewInit, Component, OnInit } from '@angular/core';

import { AuthService } from 'microtec-auth-lib';
import { RouteParams, RouterService, StorageService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit, AfterViewInit {
  loginResponse: any;

  ngOnInit() {
    let loginKey = this.routerservice.getRouteParams(RouteParams.LOGINKEY);
    let state = this.routerservice.getRouteParams(RouteParams.STATE);
    this.authService.collectToken(loginKey, state);
   
  }

  constructor(
    private authService: AuthService,
      private routerservice: RouterService
  ) {}
  ngAfterViewInit(): void {}

 
}
