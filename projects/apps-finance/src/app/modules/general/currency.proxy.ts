import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { CurrencyDto } from './models/currencyDto';

@Injectable({
  providedIn: 'root',
})
export class CurrencyProxy {
  getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
    return this.httpService.get<CurrencyDto[]>('Currency/CurrencyDropDown?searchTerm=' + searchKey);
  }

  constructor(private httpService: HttpService) {}
}
