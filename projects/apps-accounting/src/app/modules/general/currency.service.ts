import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { CurrencyDto } from './models/currencyDto';
import { CurrencyProxy } from './currency.proxy';
import { CurrencyRateDto } from './models/currencyRateDto';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpService,
              private currencyProxy : CurrencyProxy
  ) {}
  
  private currenciesDataSource = new BehaviorSubject<CurrencyDto[]>([]);
  private accountCurrencyRateDataSource = new BehaviorSubject<CurrencyRateDto>({rate:0});


  public currencies = this.currenciesDataSource.asObservable();
  public accountCurrencyRate = this.accountCurrencyRateDataSource.asObservable();

  

  getCurrencies(searchKey:string) {
    this.currencyProxy.getCurrencies(searchKey).subscribe((res)=> {
      this.currenciesDataSource.next(res);
    });
  }
  getAccountCurrencyRate(currentCurrency:number,accountCurrency:number){
    this.currencyProxy.getAccountCurrencyRate(currentCurrency,accountCurrency).subscribe((response) => {
      this.accountCurrencyRateDataSource.next(response);
    });
  }
}
