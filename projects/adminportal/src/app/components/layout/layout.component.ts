import { Component } from '@angular/core';
import { LanguageService, RouterService } from 'shared-lib';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from 'microtec-auth-lib';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  constructor(
    public languageService: LanguageService,
    private routerService: RouterService,
    private oidcSecurityService: OidcSecurityService,
    public authService: AuthService
  ) {
    this.languageService.setLang();
  }
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    console.log('logout');

    this.oidcSecurityService
      .logoff()
      .subscribe((result) => console.log(result));
  }
}
