import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { DashboardService } from '../../dashboard.service';
import {
  Account,
  AccountBalanceDto,
  AccountsData,
  CostCenter,
  JournalEntryTypeCountDto,
  JournalStatusDto,
  RevenueStream,
} from '../../models';
import { Subject, takeUntil } from 'rxjs';
import { ChartService, DASHBOARD_COLORS, LanguageService } from 'shared-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrl: './accounting-dashboard.component.scss',
})
export class AccountingDashboardComponent {
  constructor(
    private service: DashboardService,
    private languageService: LanguageService,
    private router: Router,
    private chartService: ChartService
  ) {}
  private destroy$ = new Subject<void>();

  revenueStream: RevenueStream = { totalRevenues: 0, totalExpenses: 0, grossProfit: 0 };
  accountsList: Account[] = [];
  costCenters: CostCenter[] = [];
  accountTypeBalances: AccountBalanceDto[] = [];
  journalStatus: JournalStatusDto[] = [];
  journalEntryTypeCount: JournalEntryTypeCountDto[] = [];
  cashBankAccountsBalance: AccountsData = {} as AccountsData;
  currentLanguage: string;
  isAccountsSorted = true;
  accountsByMostUsed: boolean;
  costCenterByMostUsed: boolean;

  statusChartLabels: string[] = [];
  statusChartValues: any = [];

  JournalSourceChartData: any = [];

  revenueStreamLoader: boolean = false;
  accountsListLoader: boolean = false;
  costCentersLoader: boolean = false;
  cashBankAccountBalancesLoader: boolean = false;
  accountTypeBalancesLoader: boolean = false;
  journalStatusLoader: boolean = false;
  journalEntryTypeCountLoader: boolean = false;

  colors = DASHBOARD_COLORS;

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => (this.currentLanguage = lang));

    this.fetchData();
    this.subscriptionsCalls();
    this.loadingSubscriptions();
  }

  navigateToJournalList() {
    this.router.navigate(['transcations/journalentry']);
  }

  fetchData() {
    this.getAccountTypeBalance();
    this.getJournalEntryTypeCount();
    this.getJournalStatus();
    this.getCashBankAccountBalances();
    this.getRevenueStreams();
    this.getAccounts(10, true);
    this.getCostCenters(10, true);
  }

  getAccountTypeBalance() {
    this.service.fetchAccountTypeBalances();
  }
  getJournalStatus() {
    this.service.fetchJournalStatus();
  }
  getJournalEntryTypeCount() {
    this.service.fetchJournalEntryTypeCount();
  }
  getCashBankAccountBalances() {
    this.service.fetchCashBankAccountBalances(5);
  }
  getRevenueStreams() {
    this.service.fetchRevenueStream();
  }
  getAccounts(count: number, byMostUsed: boolean) {
    this.accountsByMostUsed = byMostUsed;
    this.service.fetchAccountBalances(count, byMostUsed);
  }
  getCostCenters(count: number, byMostUsed: boolean) {
    this.costCenterByMostUsed = byMostUsed;
    this.service.fetchCostCenterBalances(count, byMostUsed);
  }

  reSortCostCenters() {
    if (this.costCenterByMostUsed) {
      this.getCostCenters(10, false);
    } else {
      this.getCostCenters(10, true);
    }
  }
  reSortAccounts() {
    if (this.accountsByMostUsed) {
      this.getAccounts(10, false);
    } else {
      this.getAccounts(10, true);
    }
  }

  subscriptionsCalls() {
    this.service.revenueStream$.pipe(takeUntil(this.destroy$)).subscribe((revenueStream) => {
      this.revenueStream = revenueStream;
    });

    this.service.accountBalances$.pipe(takeUntil(this.destroy$)).subscribe((accountsList) => {
      this.accountsList = accountsList;
    });

    this.service.costCenterBalances$.pipe(takeUntil(this.destroy$)).subscribe((costCenters) => {
      this.costCenters = costCenters;
    });

    this.service.cashBankAccountBalances$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cashBankAccountsBalance) => {
        this.cashBankAccountsBalance = cashBankAccountsBalance;
      });

    this.service.accountTypeBalances$
      .pipe(takeUntil(this.destroy$))
      .subscribe((accountTypeBalances) => {
        this.accountTypeBalances = accountTypeBalances;
      });

    this.service.journalStatus$.pipe(takeUntil(this.destroy$)).subscribe((journalStatus) => {
      this.journalStatus = journalStatus;
      this.journalStatus.forEach((status) => {
        this.statusChartLabels.push(status.journalEntryStatus);
      });
      this.statusChartValues = journalStatus.map((item, index) => ({
        y: item.count,
        value: item.count,
        color: this.colors[index],
        name: item.journalEntryStatus,
      }));
      this.chart = this.chartService.columnChart(this.statusChartLabels, this.statusChartValues);
    });

    this.service.journalEntryTypeCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((journalEntryTypeCount) => {
        this.journalEntryTypeCount = journalEntryTypeCount;
        const sum = this.journalEntryTypeCount.reduce((acc: number, item: any) => {
          return acc + (item.count || 0);
        }, 0);
        this.JournalSourceChartData = journalEntryTypeCount.map((item, index) => ({
          y: parseFloat(((item.count / sum) * 100).toFixed(2)),
          value: item.count,
          name: `${item.journalEntryType} (${parseFloat(((item.count / sum) * 100).toFixed(2))}%)`,
          color: this.colors[index],
        }));
        this.journalSourcesChart = this.chartService.donutChart(this.JournalSourceChartData);
      });
  }

  loadingSubscriptions() {
    this.service.accountBalancesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.accountsListLoader = value));
    this.service.revenueStreamLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.revenueStreamLoader = value));
    this.service.costCenterBalancesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.costCentersLoader = value));
    this.service.cashBankAccountBalancesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.cashBankAccountBalancesLoader = value));
    this.service.accountTypeBalancesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.accountTypeBalancesLoader = value));
    this.service.journalStatusLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.journalStatusLoader = value));
    this.service.journalEntryTypeCountLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => (this.journalEntryTypeCountLoader = value));
  }
  chart: Chart;

  journalSourcesChart: Chart;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
