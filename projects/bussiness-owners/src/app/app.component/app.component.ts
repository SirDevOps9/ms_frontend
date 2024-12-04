import { Component, inject } from '@angular/core';
import { LayoutService } from 'apps-shared-lib';
import { skip, take } from 'rxjs';
import { LanguageService, StorageKeys, StorageService } from 'shared-lib';
import { CompanyTypes } from '../modules/company/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Bussiness Owners';
  constructor(public languageService: LanguageService) {
    this.languageService.setLang();
  }
}
