import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChartService, LanguageService } from 'shared-lib';
import { FinanceDashboardService } from '../../finance-dashboard.service';
import { Chart } from 'angular-highcharts';
import {
  BankAccountsBalance,
  CashFlowSummary,
  IncomeTransaction,
  OutgoingTransaction,
  TreasuriesBalance,
} from '../../models';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrl: './finance-dashboard.component.scss',
})
export class FinanceDashboardComponent {
  currentLanguage: string;
  currencyDropDown = [
    {
      label: 'EGP',
      value: 'EGP',
    },
    {
      label: 'USD',
      value: 'USD',
    },
    {
      label: 'EUR',
      value: 'EUR',
    },
    {
      label: 'GBP',
      value: 'GBP',
    },
  ];
  defaultCurrency = this.currencyDropDown[0];

  // charts
  statusChart: Chart;
  statusChartLabel: string[] = [];
  statusChartValues: any = [];
  totalBankTreasuriesChart: Chart;
  totalBankTreasuriesData: any = [];
  incomeChart: Chart;
  outgoingChart: Chart;
  outGoingChartData: any = [];
  cashFlowSummary: CashFlowSummary = {} as CashFlowSummary;
  bankAccounts: BankAccountsBalance = {} as BankAccountsBalance;
  recentIncomeTransactionData: IncomeTransaction[] = [];
  recentOutgoingTransactionData: OutgoingTransaction[] = [];
  treasuries: TreasuriesBalance = {} as TreasuriesBalance;

  // loaders
  statusLoader: boolean = false;
  banksLoader: boolean = false;
  cashFlowSummaryLoader: boolean = false;
  totalBankTreasuriesLoader: boolean = false;
  treasuriesLoader: boolean = false;
  incomeLoader: boolean = false;
  outgoingLoader: boolean = false;
  recentIncomeTransactionsLoader: boolean = false;
  recentOutgoingTransactionsLoader: boolean = false;

  // clear subscriptions
  private destroy$ = new Subject<void>();

  colors = [
    '#FF5733',
    '#33C1FF',
    '#28A745',
    '#FFC107',
    '#FF33A6',
    '#6610F2',
    '#FF6F61',
    '#4B8C6A',
    '#FFB6C1',
    '#8A2BE2',
  ];

  constructor(
    private chartService: ChartService,
    private languageService: LanguageService,
    private service: FinanceDashboardService
  ) {}

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => (this.currentLanguage = lang));

    this.fetchData();
    this.subscriptions();
    this.loadersSubscriptions();
  }
  subscriptions() {
    this.service.status$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      data.forEach((status) => {
        this.statusChartLabel.push(status.status);
      });
      this.statusChartValues = data.map((status, index) => ({
        y: status.count,
        value: status.count,
        color: this.colors[index],
        name: status.status,
      }));
      this.statusChart = this.chartService.columnChart(
        this.statusChartLabel,
        this.statusChartValues
      );
    });

    this.service.cashFlowSummary$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.cashFlowSummary = data;
    });

    this.service.totalBankTreasuries$.pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
      let sum = 0;
      for (let i in data) {
        sum += data[i];
      }
      Object.keys(data).forEach((key, index) => {
        this.totalBankTreasuriesData.push({
          name: key,
          y: parseFloat(((data[key] / sum) * 100).toFixed(2)),
          value: data[key],
          color: this.colors[index],
        });
      });
      this.totalBankTreasuriesChart = this.chartService.donutChart(this.totalBankTreasuriesData);
    });

    this.service.bank$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.bankAccounts = data;
    });

    this.service.treasuries$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.treasuries = data;
    });

    this.service.income$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const categories = Array.from(new Set(data.map((item) => item.paidBy)));
      const dataSeries = categories.map((category) => ({
        name: category,
        data: months.map((month) => {
          const found = data.find(
            (item) => item.paidBy === category && item.month.startsWith(month)
          );
          return found ? found.totalAmount : 0;
        }),
      }));

      this.incomeChart = this.chartService.multipleColumnChart(months, dataSeries);
    });

    this.service.outgoing$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const sum = data.reduce((acc: number, item: any) => {
        return acc + (item.totalAmount || 0);
      }, 0);
      this.outGoingChartData = data.map((item, index) => ({
        y: parseFloat(((item.totalAmount / sum) * 100).toFixed(2)),
        value: item.totalAmount,
        name: item.paidBy,
        color: this.colors[index],
      }));

      this.outgoingChart = this.chartService.donutChart(this.outGoingChartData);
    });

    this.service.recentIncomeTransactions$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.recentIncomeTransactionData = data;
    });
    this.service.recentOutgoingTransactions$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.recentOutgoingTransactionData = data;
    });
  }

  loadersSubscriptions() {
    this.service.statusLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.statusLoader = loader));

    this.service.bankLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.banksLoader = loader));

    this.service.cashFlowSummaryLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.cashFlowSummaryLoader = loader));

    this.service.totalBankTreasuriesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.totalBankTreasuriesLoader = loader));

    this.service.treasuriesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.treasuriesLoader = loader));

    this.service.incomeLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.incomeLoader = loader));

    this.service.outgoingLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.outgoingLoader = loader));

    this.service.recentIncomeTransactionsLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.recentIncomeTransactionsLoader = loader));

    this.service.recentOutgoingTransactionsLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.recentOutgoingTransactionsLoader = loader));
  }
  fetchData() {
    this.getStatus();
    this.getBanks();
    this.getCashFlowSummary();
    this.getTotalBankTreasuries();
    this.getTreasuries();
    this.getIncome();
    this.getOutgoing();
    this.getRecentIncomeTransactions();
    this.getRecentOutgoingTransactions();
  }

  getStatus() {
    this.service.fetchStatus();
  }
  getBanks() {
    this.service.fetchBanks();
  }
  getCashFlowSummary() {
    this.service.fetchCashFlowSummary();
  }
  getTotalBankTreasuries() {
    this.service.fetchTotalBankTreasuries();
  }
  getTreasuries() {
    this.service.fetchTreasuries();
  }
  getIncome() {
    this.service.fetchIncome();
  }
  getOutgoing() {
    this.service.fetchOutgoing();
  }
  getRecentIncomeTransactions() {
    this.service.fetchRecentIncomeTransactions();
  }
  getRecentOutgoingTransactions() {
    this.service.fetchRecentOutgoingTransactions();
  }

  selectCurrency(e: any) {
    console.log(e);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
