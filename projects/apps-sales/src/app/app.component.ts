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
