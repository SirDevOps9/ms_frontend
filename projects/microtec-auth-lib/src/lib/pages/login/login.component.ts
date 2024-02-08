import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.languageService.setDefaultLang('en');
    this.languageService.setLang();
    this.authService.authorize();
  }
}
