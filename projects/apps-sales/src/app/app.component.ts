import { Component, inject } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { CompanyTypes } from 'projects/bussiness-owners/src/app/modules/company/models';
import { skip, take } from 'rxjs';
import { LanguageService, StorageKeys, StorageService, TitleService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'apps-sales';

  constructor(public languageService: LanguageService, private titleService: TitleService) {
    this.languageService.setLang();
  }
  ngOnInit() {
    this.titleService.setTitleFromRoute();
  }
}
