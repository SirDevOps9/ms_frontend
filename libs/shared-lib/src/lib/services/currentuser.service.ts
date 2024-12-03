import { Injectable } from '@angular/core';
import { HttpService, LanguageService, StorageKeys, StorageService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  getCurrencyId(): number {
    let obj = this.localStorage.getItem(StorageKeys.CURRENCEY_OBJ);
    // Replace with your logic to get the currency value
    return obj.currencyId;
  }
  getCurrencyName(): number {
    let obj = this.localStorage.getItem(StorageKeys.CURRENCEY_OBJ);
    // Replace with your logic to get the currency value
    return obj.currencyName;
  }
  constructor(
    private httpService: HttpService,
    public languageService: LanguageService,
    public localStorage: StorageService
  ) {}
}
