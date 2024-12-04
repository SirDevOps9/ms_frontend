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

  localstoarage = inject(StorageService);
  layoutService = inject(LayoutService);
  GetCurrentUserInfoApi() {
    this.layoutService.GetCurrentUserInfo();
    this.layoutService.currentUserInfo.pipe(skip(1), take(1)).subscribe((res) => {
      this.localstoarage.setItem(StorageKeys.USER_INFO, res);
      let dCompany = res?.companies?.find((x: any) => x?.companyType == CompanyTypes.Holding);
      let dBranch = dCompany?.branches?.find((x: any) => x.isDefault == true);
      let currencies = {
        currencyId: dCompany?.currencyId,
        currencyName: dCompany?.currencyName,
      };

      this.localstoarage.setItem(StorageKeys.DEFAULT_COMPANY, dCompany);
      this.localstoarage.setItem(StorageKeys.DEFAULT_BRANCHE, dBranch);
      this.localstoarage.setItem(StorageKeys.CURRENCEY_OBJ, currencies);
    });
  }
}
