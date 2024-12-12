import { Component, inject } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { LayoutProxy } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.proxy';
import { CompanyTypes } from 'projects/bussiness-owners/src/app/modules/company/models';
import { skip, take } from 'rxjs';
import { LanguageService, StorageKeys, StorageService, TitleService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'erp-Accounting';

  constructor(public languageService: LanguageService, private titleService: TitleService) {
    this.languageService.setLang();
  }
  ngOnInit() {
    this.titleService.setTitleFromRoute();
  }
}
