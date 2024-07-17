import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { CurrencyDto } from './models/currencyDto';
import { CurrencyProxy } from './currency.proxy';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpService,
              private currencyProxy : CurrencyProxy
  ) {}
  
  private currenciesDataSource = new BehaviorSubject<CurrencyDto[]>([]);

  public currencies = this.currenciesDataSource.asObservable();

  getCurrencies(searchKey:string) {
    this.currencyProxy.getCurrencies(searchKey).subscribe((res)=> {
      this.currenciesDataSource.next(res);
    });
    
  }
}
