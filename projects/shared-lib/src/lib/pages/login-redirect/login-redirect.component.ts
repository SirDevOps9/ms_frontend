import { Component, OnInit } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';
import { StorageKeys } from '../../constants/storagekeys';
import { StorageService } from '../../services/localstorage.service';
import { AuthService } from '../../services/auth.httpservice';
import { RouterService } from '../../services/router.service';
import { LanguageService } from '../../services/language.service';
import { SessionStorageService } from '../../services/sessionstorage.service';

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

  // logout() {
  //   this.oidcSecurityService
  //     .logoff()
  //     .subscribe((result) => console.log(result));
  // }

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private localStorageService: StorageService,
    private authService: AuthService,
    private routerService:RouterService,
    private languageService:LanguageService,
    private sessionService:SessionStorageService
  ) {}
}
