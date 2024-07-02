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

    this.authService.collectToken(loginKey);

    console.log('Login Key', loginKey);
  }

  constructor(private authService: AuthService, private routerservice: RouterService) {}
}
