import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChartService, LanguageService } from 'shared-lib';
import { FinanceDashboardService } from '../../finance-dashboard.service';
import { Chart } from 'angular-highcharts';

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
  incomeChart: Chart;
  outgoingChart: Chart;

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

    this.service.bank$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});

    this.service.cashFlowSummary$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});

    this.service.totalBankTreasuries$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});

    this.service.treasuries$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});

    this.service.income$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});

    this.service.outgoing$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});

    this.service.recentIncomeTransactions$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});
    this.service.recentOutgoingTransactions$.pipe(takeUntil(this.destroy$)).subscribe((data) => {});
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
    // this.getRecentOutgoingTransactions();
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
