import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { RouteParams, RouterService } from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;

  ngOnInit() {
    let loginKey = this.routerservice.getRouteParams(RouteParams.LOGINKEY);
    let state = this.routerservice.getRouteParams(RouteParams.STATE);

    this.authService.collectToken(loginKey, state);
  }

  constructor(private authService: AuthService, private routerservice: RouterService) {}
}
