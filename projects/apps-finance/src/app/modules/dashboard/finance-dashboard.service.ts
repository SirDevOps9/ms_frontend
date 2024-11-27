import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root',
})
export class FinanceDashboardService {
  // Loader subjects
  private statusLoaderSubject = new BehaviorSubject<boolean>(false);
  private bankLoaderSubject = new BehaviorSubject<boolean>(false);
  private cashFlowSummaryLoaderSubject = new BehaviorSubject<boolean>(false);
  private totalBankTreasuriesLoaderSubject = new BehaviorSubject<boolean>(false);
  private treasuriesLoaderSubject = new BehaviorSubject<boolean>(false);
  private incomeLoaderSubject = new BehaviorSubject<boolean>(false);
  private outgoingLoaderSubject = new BehaviorSubject<boolean>(false);
  private resentTransactionsLoaderSubject = new BehaviorSubject<boolean>(false);

  // Loader observables
  statusLoader$ = this.statusLoaderSubject.asObservable();
  bankLoader$ = this.bankLoaderSubject.asObservable();
  cashFlowSummaryLoader$ = this.cashFlowSummaryLoaderSubject.asObservable();
  totalBankTreasuriesLoader$ = this.totalBankTreasuriesLoaderSubject.asObservable();
  treasuriesLoader$ = this.treasuriesLoaderSubject.asObservable();
  incomeLoader$ = this.incomeLoaderSubject.asObservable();
  outgoingLoader$ = this.outgoingLoaderSubject.asObservable();
  resentTransactionsLoader$ = this.resentTransactionsLoaderSubject.asObservable();

  // Data subject
  private statusSubject = new BehaviorSubject<any>(false);
  private bankSubject = new BehaviorSubject<any>(false);
  private cashFlowSummarySubject = new BehaviorSubject<any>(false);
  private totalBankTreasuriesSubject = new BehaviorSubject<any>(false);
  private treasuriesSubject = new BehaviorSubject<any>(false);
  private incomeSubject = new BehaviorSubject<any>(false);
  private outgoingSubject = new BehaviorSubject<any>(false);
  private resentTransactionsSubject = new BehaviorSubject<any>(false);

  // Data observables
  status$ = this.statusSubject.asObservable();
  bank$ = this.bankSubject.asObservable();
  cashFlowSummary$ = this.cashFlowSummarySubject.asObservable();
  totalBankTreasuries$ = this.totalBankTreasuriesSubject.asObservable();
  treasuries$ = this.treasuriesSubject.asObservable();
  income$ = this.incomeSubject.asObservable();
  outgoing$ = this.outgoingSubject.asObservable();
  resentTransactions$ = this.resentTransactionsSubject.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchStatus() {
    this.statusLoaderSubject.next(true);
    this.proxy.getStatus().subscribe({
      next: (data) => this.statusSubject.next(data),
      complete: () => this.statusLoaderSubject.next(false),
    });
  }

  fetchBanks() {
    this.bankLoaderSubject.next(true);
    this.proxy.getBanks().subscribe({
      next: (data) => this.bankSubject.next(data),
      complete: () => this.bankLoaderSubject.next(false),
    });
  }

  fetchCashFlowSummary() {
    this.cashFlowSummaryLoaderSubject.next(true);
    this.proxy.getCashFlowSummary().subscribe({
      next: (data) => this.cashFlowSummarySubject.next(data),
      complete: () => this.cashFlowSummaryLoaderSubject.next(false),
    });
  }

  fetchTotalBankTreasuries() {
    this.totalBankTreasuriesLoaderSubject.next(true);
    this.proxy.getTotalBankTreasuries().subscribe({
      next: (data) => this.totalBankTreasuriesSubject.next(data),
      complete: () => this.totalBankTreasuriesLoaderSubject.next(false),
    });
  }

  fetchTreasuries() {
    this.treasuriesLoaderSubject.next(true);
    this.proxy.getTreasuries().subscribe({
      next: (data) => this.treasuriesSubject.next(data),
      complete: () => this.treasuriesLoaderSubject.next(false),
    });
  }

  fetchIncome() {
    this.incomeLoaderSubject.next(true);
    this.proxy.getIncome().subscribe({
      next: (data) => this.incomeSubject.next(data),
      complete: () => this.incomeLoaderSubject.next(false),
    });
  }

  fetchOutgoing() {
    this.outgoingLoaderSubject.next(true);
    this.proxy.getOutgoing().subscribe({
      next: (data) => this.outgoingSubject.next(data),
      complete: () => this.outgoingLoaderSubject.next(false),
    });
  }

  fetchResentTransactions() {
    this.resentTransactionsLoaderSubject.next(true);
    this.proxy.getResentTransactions().subscribe({
      next: (data) => this.resentTransactionsSubject.next(data),
      complete: () => this.resentTransactionsLoaderSubject.next(false),
    });
  }
}
