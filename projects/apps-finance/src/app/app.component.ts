import { Component } from '@angular/core';
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'apps-finance';

  constructor(public languageService: LanguageService) {
    this.languageService.setLang();
  }
}
