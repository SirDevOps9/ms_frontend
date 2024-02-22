import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { LanguageService, RouteParams, RouterService } from 'shared-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private authService: AuthService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    let culture = this.routerService.getRouteParams(RouteParams.CULTUREQUERY);
    this.languageService.setDefaultLang(culture);
    this.authService.authorize();
  }
}
