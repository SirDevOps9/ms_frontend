import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import {
  Account,
  AccountBalanceDto,
  AccountsData,
  CostCenter,
  JournalEntryTypeCountDto,
  JournalStatusDto,
  RevenueStream,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseHttp = 'dashboard';
  constructor(private http: HttpService) {}

  getAccountTypeBalances(): Observable<AccountBalanceDto[]> {
    return this.http.get<AccountBalanceDto[]>(`${this.baseHttp}/AccountTypeBalances`);
  }

  getJournalStatus(): Observable<JournalStatusDto> {
    return this.http.get<JournalStatusDto>(`${this.baseHttp}/JournalEntryStatus`);
  }

  getJournalEntryTypeCount(): Observable<JournalEntryTypeCountDto> {
    return this.http.get<JournalEntryTypeCountDto>(`${this.baseHttp}/JournalEntryTypeCount`);
  }

  getCashBankAccountBalances(): Observable<AccountsData[]> {
    return this.http.get<AccountsData[]>(`${this.baseHttp}/CashBankAccountBalances`);
  }

  getRevenueStream(): Observable<RevenueStream> {
    return this.http.get<RevenueStream>(`${this.baseHttp}/RevenueSteam`);
  }

  getAccountBalances(): Observable<Account[]> {
    return this.http.get(`${this.baseHttp}/AccountsBalances`);
  }

  getCostCenterBalances(): Observable<CostCenter[]> {
    return this.http.get<CostCenter[]>(`${this.baseHttp}/CostCenterBalances`);
  }
}
