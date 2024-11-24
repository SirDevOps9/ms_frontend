import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';
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
export class DashboardService {
  private accountTypeBalancesSubject = new BehaviorSubject<AccountBalanceDto[]>([]);
  private journalStatusSubject = new BehaviorSubject<JournalStatusDto>({} as JournalStatusDto);
  private journalEntryTypeCountSubject = new BehaviorSubject<JournalEntryTypeCountDto>(
    {} as JournalEntryTypeCountDto
  );
  private cashBankAccountBalancesSubject = new BehaviorSubject<AccountsData[]>([]);
  private revenueStreamSubject = new BehaviorSubject<RevenueStream>({} as RevenueStream);
  private accountBalancesSubject = new BehaviorSubject<Account[]>([]);
  private costCenterBalancesSubject = new BehaviorSubject<CostCenter[]>([]);

  accountTypeBalances$ = this.accountTypeBalancesSubject.asObservable();
  journalStatus$ = this.journalStatusSubject.asObservable();
  journalEntryTypeCount$ = this.journalEntryTypeCountSubject.asObservable();
  cashBankAccountBalances$ = this.cashBankAccountBalancesSubject.asObservable();
  revenueStream$ = this.revenueStreamSubject.asObservable();
  accountBalances$ = this.accountBalancesSubject.asObservable();
  costCenterBalances$ = this.costCenterBalancesSubject.asObservable();

  constructor(private proxyService: ProxyService) {}

  fetchAccountTypeBalances(): void {
    this.proxyService.getAccountTypeBalances().subscribe((data) => {
      this.accountTypeBalancesSubject.next(data);
    });
  }

  fetchJournalStatus(): void {
    this.proxyService.getJournalStatus().subscribe((data) => {
      this.journalStatusSubject.next(data);
    });
  }

  fetchJournalEntryTypeCount(): void {
    this.proxyService.getJournalEntryTypeCount().subscribe((data) => {
      this.journalEntryTypeCountSubject.next(data);
    });
  }

  fetchCashBankAccountBalances(): void {
    this.proxyService.getCashBankAccountBalances().subscribe((data) => {
      this.cashBankAccountBalancesSubject.next(data);
    });
  }

  fetchRevenueStream(): void {
    this.proxyService.getRevenueStream().subscribe((data) => {
      this.revenueStreamSubject.next(data);
    });
  }

  fetchAccountBalances(): void {
    this.proxyService.getAccountBalances().subscribe((data) => {
      this.accountBalancesSubject.next(data);
    });
  }

  fetchCostCenterBalances(): void {
    this.proxyService.getCostCenterBalances().subscribe((data) => {
      this.costCenterBalancesSubject.next(data);
    });
  }
}
