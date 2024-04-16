import { Component } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { AuthService } from 'microtec-auth-lib';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(
    public languageService: LanguageService,
    public authService: AuthService
  ) {
    this.languageService.setLang();
  }
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    this.authService.logout();
  }
}
