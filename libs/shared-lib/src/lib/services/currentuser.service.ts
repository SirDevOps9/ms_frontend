import { Injectable } from '@angular/core';
import { HttpService, LanguageService, StorageKeys, StorageService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  getCurrency(): number {
    let obj = this.localStorage.getItem(StorageKeys.CURRENCEY_OBJ);
    // Replace with your logic to get the currency value
    return obj.currencyId;
  }
  getCurrencyName(): number {
    let obj = this.localStorage.getItem(StorageKeys.CURRENCEY_OBJ);
    // Replace with your logic to get the currency value
    return obj.currencyName;
  }

  //TODO: MohamedF add currency flag when sign in
  getCurrencyCode(): string {
    let obj = this.localStorage.getItem(StorageKeys.CURRENCEY_OBJ);
    // Replace with your logic to get the currency value
    return obj.code;
  }
  constructor(
    private httpService: HttpService,
    public languageService: LanguageService,
    public localStorage: StorageService
  ) {}
}
