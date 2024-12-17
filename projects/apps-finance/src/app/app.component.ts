import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { CompanyTypes } from 'projects/bussiness-owners/src/app/modules/company/models';
import { skip, take } from 'rxjs';
import { LanguageService, StorageKeys, StorageService, TitleService } from 'shared-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'apps-finance';

  constructor(public languageService: LanguageService, private titleService: TitleService) {
    this.languageService.setLang();
  }
  ngOnInit() {
    this.titleService.setTitleFromRoute();
  }
}
