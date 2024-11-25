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
  // Loader subjects
  private revenueStreamLoaderSubject = new BehaviorSubject<boolean>(false);
  private accountBalancesLoaderSubject = new BehaviorSubject<boolean>(false);
  private costCenterBalancesLoaderSubject = new BehaviorSubject<boolean>(false);
  private cashBankAccountBalancesLoaderSubject = new BehaviorSubject<boolean>(false);
  private accountTypeBalancesLoaderSubject = new BehaviorSubject<boolean>(false);
  private journalStatusLoaderSubject = new BehaviorSubject<boolean>(false);
  private journalEntryTypeCountLoaderSubject = new BehaviorSubject<boolean>(false);

  // Loader observables
  revenueStreamLoader$ = this.revenueStreamLoaderSubject.asObservable();
  accountBalancesLoader$ = this.accountBalancesLoaderSubject.asObservable();
  costCenterBalancesLoader$ = this.costCenterBalancesLoaderSubject.asObservable();
  cashBankAccountBalancesLoader$ = this.cashBankAccountBalancesLoaderSubject.asObservable();
  accountTypeBalancesLoader$ = this.accountTypeBalancesLoaderSubject.asObservable();
  journalStatusLoader$ = this.journalStatusLoaderSubject.asObservable();
  journalEntryTypeCountLoader$ = this.journalEntryTypeCountLoaderSubject.asObservable();

  // Data subjects and observables (same as before)
  private accountTypeBalancesSubject = new BehaviorSubject<AccountBalanceDto[]>([]);
  private journalStatusSubject = new BehaviorSubject<JournalStatusDto[]>([]);
  private journalEntryTypeCountSubject = new BehaviorSubject<JournalEntryTypeCountDto[]>([]);
  private cashBankAccountBalancesSubject = new BehaviorSubject<AccountsData>({} as AccountsData);
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

  // Fetch methods with loaders
  fetchAccountTypeBalances(): void {
    this.accountTypeBalancesLoaderSubject.next(true);
    this.proxyService.getAccountTypeBalances().subscribe({
      next: (data) => this.accountTypeBalancesSubject.next(data),
      complete: () => this.accountTypeBalancesLoaderSubject.next(false),
    });
  }

  fetchJournalStatus(): void {
    this.journalStatusLoaderSubject.next(true);
    this.proxyService.getJournalStatus().subscribe({
      next: (data) => this.journalStatusSubject.next(data),
      complete: () => this.journalStatusLoaderSubject.next(false),
    });
  }

  fetchJournalEntryTypeCount(): void {
    this.journalEntryTypeCountLoaderSubject.next(true);
    this.proxyService.getJournalEntryTypeCount().subscribe({
      next: (data) => this.journalEntryTypeCountSubject.next(data),
      complete: () => this.journalEntryTypeCountLoaderSubject.next(false),
    });
  }

  fetchCashBankAccountBalances(count: number): void {
    this.cashBankAccountBalancesLoaderSubject.next(true);
    this.proxyService.getCashBankAccountBalances(count).subscribe({
      next: (data) => this.cashBankAccountBalancesSubject.next(data),
      complete: () => this.cashBankAccountBalancesLoaderSubject.next(false),
    });
  }

  fetchRevenueStream(): void {
    this.revenueStreamLoaderSubject.next(true);
    this.proxyService.getRevenueStream().subscribe({
      next: (data) => this.revenueStreamSubject.next(data),
      complete: () => this.revenueStreamLoaderSubject.next(false),
    });
  }

  fetchAccountBalances(count: number): void {
    this.accountBalancesLoaderSubject.next(true);
    this.proxyService.getAccountBalances(count).subscribe({
      next: (data) => this.accountBalancesSubject.next(data),
      complete: () => this.accountBalancesLoaderSubject.next(false),
    });
  }

  fetchCostCenterBalances(count: number): void {
    this.costCenterBalancesLoaderSubject.next(true);
    this.proxyService.getCostCenterBalances(count).subscribe({
      next: (data) => this.costCenterBalancesSubject.next(data),
      complete: () => this.costCenterBalancesLoaderSubject.next(false),
    });
  }
}
