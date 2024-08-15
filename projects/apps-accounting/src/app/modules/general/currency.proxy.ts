import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { CurrencyDto } from './models/currencyDto';
import { CurrencyRateDto } from './models/currencyRateDto';

@Injectable({
  providedIn: 'root',
})
export class CurrencyProxy {
    getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
        return this.httpService.get<CurrencyDto[]>('Currency/CurrencyDropDown?searchKey=' + searchKey);
      }

      getAccountCurrencyRate(currentCurrency:number,accountCurrency:number){
        return this.httpService.get<CurrencyRateDto>(`CurrencyConversion/rate?FromCurrencyId=${currentCurrency}&ToCurrencyId=${accountCurrency}`);
      }


  constructor(private httpService: HttpService) {}
}
