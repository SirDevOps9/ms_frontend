import { Component, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import {
  StorageService,
  AuthService,
  RouterService,
  LanguageService,
  SessionStorageService,
} from 'shared-lib';

@Component({
  selector: 'app-login-redirect',
  templateUrl: './login-redirect.component.html',
  styleUrl: './login-redirect.component.css',
})
export class LoginRedirectComponent implements OnInit {
  loginResponse: any;
  ngOnInit() {
    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        // this.loginResponse = loginResponse;
        this.languageService.setDefaultLang('en');
        this.authService.saveUserData(loginResponse);
        // this.localStorageService.setItem(
        //   StorageKeys.LOGIN_RESPONSE,
        //   loginResponse
        // );
        this.routerService.navigateTo('');
      });
  }
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private localStorageService: StorageService,
    private authService: AuthService,
    private routerService: RouterService,
    private languageService: LanguageService,
    private sessionService: SessionStorageService
  ) {}
}
