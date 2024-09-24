import { Component } from '@angular/core';
import { LanguageService, TitleService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'apps-purchase';
  constructor(
    public languageService: LanguageService,
    private titleService: TitleService,
  ) {
    this.languageService.setLang();
  }
  ngOnInit() {
    this.titleService.setTitleFromRoute();
  }
}
