import { Component } from '@angular/core';
import { LanguageService } from '../../../../../shared-lib/src/lib/services/language.service';
import { AuthService } from 'microtec-auth-lib';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent {
  userName:string;
  constructor(
    public languageService: LanguageService,
    public authService: AuthService
  ) {
    this.userName = this.authService.getUserName;
    this.languageService.setLang();
  }
  toggleLanguage(): void {
    this.languageService.toggleLanguage();
  }
  logout(): void {
    this.authService.logout();
  }
}
