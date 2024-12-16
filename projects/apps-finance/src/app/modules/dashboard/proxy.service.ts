import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import {
  BankAccountsBalance,
  CashFlowSummary,
  IncomeTransaction,
  IncomingReportDto,
  OutgoingReportDto,
  OutgoingTransaction,
  PaymentStatusCount,
  TotalBankTreasuries,
  TreasuriesBalance,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseHttp = 'dashboard';

  constructor(private http: HttpService) {}

  getStatus(): Observable<PaymentStatusCount[]> {
    return this.http.get<PaymentStatusCount[]>(`${this.baseHttp}/GetPaymentStatusCount`);
  }
  getBanks(): Observable<BankAccountsBalance> {
    return this.http.get<BankAccountsBalance>(`${this.baseHttp}/BankAccountBalances`);
  }
  getCashFlowSummary(): Observable<CashFlowSummary> {
    return this.http.get<CashFlowSummary>(`${this.baseHttp}/CashFlowSummary`);
  }
  getTotalBankTreasuries(): Observable<TotalBankTreasuries> {
    return this.http.get<TotalBankTreasuries>(`${this.baseHttp}/TotalBanksTreasuries`);
  }
  getTreasuries(): Observable<TreasuriesBalance> {
    return this.http.get<TreasuriesBalance>(`${this.baseHttp}/TreasuriesAccountBalances`);
  }
  getIncome(): Observable<IncomingReportDto[]> {
    return this.http.get<IncomingReportDto[]>(`${this.baseHttp}/IncomeReport`);
  }
  getOutgoing(): Observable<OutgoingReportDto[]> {
    return this.http.get<OutgoingReportDto[]>(`${this.baseHttp}/OutgoingReport`);
  }
  getRecentIncomeTransactions(): Observable<IncomeTransaction[]> {
    return this.http.get<IncomeTransaction[]>(`${this.baseHttp}/LastIncomeTransactions`);
  }
  getRecentOutgoingTransactions(): Observable<OutgoingTransaction[]> {
    return this.http.get<OutgoingTransaction[]>(`${this.baseHttp}/LastOutgoingTransactions`);
  }
}
