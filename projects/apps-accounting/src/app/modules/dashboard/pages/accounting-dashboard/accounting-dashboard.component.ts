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
import { LanguageService } from 'shared-lib';

@Component({
  selector: 'app-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrl: './accounting-dashboard.component.scss',
})
export class AccountingDashboardComponent {
  constructor(private service: DashboardService, private languageService: LanguageService) {}
  private destroy$ = new Subject<void>();

  revenueStream: RevenueStream = { totalRevenues: 0, totalExpenses: 0, grossProfit: 0 };
  accountsList: Account[] = [];
  costCenters: CostCenter[] = [];
  accountTypeBalances: AccountBalanceDto[] = [];
  journalStatus: JournalStatusDto[] = [];
  journalEntryTypeCount: JournalEntryTypeCountDto[] = [];
  cashBankAccountsBalance: AccountsData = {} as AccountsData;
  currentLanguage: string;

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

  colors = ['#5eb5af', '#d66457', '#e7994f', '#80d657', '#e750b5'];

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => (this.currentLanguage = lang));

    this.fetchData();
    this.subscriptionsCalls();
    this.loadingSubscriptions();
  }

  fetchData() {
    this.getAccountTypeBalance();
    this.getJournalEntryTypeCount();
    this.getJournalStatus();
    this.getCashBankAccountBalances();
    this.getRevenueStreams();
    this.getAccounts();
    this.getCostCenters();
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
  getAccounts() {
    this.service.fetchAccountBalances(10);
  }
  getCostCenters() {
    this.service.fetchCostCenterBalances(10);
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
      this.chart = this.columnChart(this.statusChartLabels, this.statusChartValues);
    });

    this.service.journalEntryTypeCount$
      .pipe(takeUntil(this.destroy$))
      .subscribe((journalEntryTypeCount) => {
        this.journalEntryTypeCount = journalEntryTypeCount;
        const sum = this.journalEntryTypeCount.reduce((acc: number, item: any) => {
          return acc + (item.count || 0);
        }, 0);
        this.JournalSourceChartData = journalEntryTypeCount.map((item, index) => ({
          y: (item.count / sum) * 100,
          value: item.count,
          name: item.journalEntryType,
          color: this.colors[index],
        }));
        this.journalSourcesChart = this.donutChart(this.JournalSourceChartData);
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

  columnChart(labels: string[], values: any, tooltip: string = '') {
    return new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: '',
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      xAxis: {
        categories: labels,
        title: {
          text: null,
        },
      },
      yAxis: {
        min: 0,
        tickInterval: 20,
        title: {
          text: null,
        },
      },

      tooltip: {
        valueSuffix: tooltip,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      exporting: {},
      series: [
        {
          type: 'column',
          name: '',
          data: values,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  donutChart(values: any, tooltip: string = '') {
    return new Chart({
      chart: {
        type: 'pie',
      },
      title: {
        text: '',
        align: 'left',
      },
      subtitle: {
        text: '',
        align: 'left',
      },
      tooltip: {
        valueSuffix: ' (%)',
      },
      plotOptions: {
        pie: {
          innerSize: '70%',
        },
      },
      series: [
        {
          type: 'pie',
          name: '',
          data: values,
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  journalSourcesChart: Chart;

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
