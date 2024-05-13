import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { CurrencyDto } from './models/currencyDto';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpService) {}

  getCurrencies(searchKey: string): Observable<CurrencyDto[]> {
    return this.http.get<CurrencyDto[]>('Currency?searchKey=' + searchKey);
  }
}
