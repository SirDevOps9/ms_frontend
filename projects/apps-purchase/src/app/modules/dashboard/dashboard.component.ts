import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {
  InvoiceStatusReportDto,
  ReturnInvoiceStatusReportDto,
  TopPurchasedProductsDto,
  TopVendorsReportDto,
} from './models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ChartService,
  ChartValueDto,
  DASHBOARD_COLORS,
  LanguageService,
  MONTHS_DTO,
} from 'shared-lib';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentLang: string = '';
  private destroy$ = new Subject<void>();

  // Charts & Data
  statusChart: Chart;
  statusChartData: any = [];

  returnStatusChart: Chart;
  returnStatusChartData: any = [];

  monthlyPurchasesChart: Chart;

  mostPurchasedProductsChart: Chart;
  mostPurchasedProductsChartData: ChartValueDto[] = [];

  mostPurchasedCategoriesChart: Chart;
  mostPurchasedCategoriesChartData: ChartValueDto[] = [];

  topVendors: TopVendorsReportDto[] = [];

  // Loaders
  statusChartLoader: boolean = false;
  returnStatusChartLoader: boolean = false;
  monthlyPurchasesChartLoader: boolean = false;
  mostPurchasedProductsChartLoader: boolean = false;
  mostPurchasedCategoriesChartLoader: boolean = false;
  topVendorsLoader: boolean = false;

  colors = DASHBOARD_COLORS;

  constructor(
    private languageService: LanguageService,
    private service: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => (this.currentLang = lang));

    this.fetchData();
    this.subscriptions();
    this.loaderSubscriptions();
  }

  fetchData() {
    this.getStatusReport();
    this.getReturnStatusReport();
    this.getMonthlyPurchasesReport();
    this.getTopPurchasedProducts();
    this.getTopVendors();
  }

  subscriptions() {
    this.service.status$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      const statusLabels: string[] = [];
      status.forEach((status) => statusLabels.push(status.InvoiceStatus));
      this.statusChartData = status.map((item: InvoiceStatusReportDto, index) => ({
        y: item.Count,
        value: item.Count,
        color: this.colors[index],
        name: item.InvoiceStatus,
      }));

      this.statusChart = this.chartService.columnChart(statusLabels, this.statusChartData);
    });

    this.service.returnStatus$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      const statusLabels: string[] = [];
      status.forEach((status) => statusLabels.push(status.ReturnInvoiceStatus));
      this.returnStatusChartData = status.map((item: ReturnInvoiceStatusReportDto, index) => ({
        y: item.Count,
        value: item.Count,
        color: this.colors[index],
        name: item.ReturnInvoiceStatus,
      }));

      this.returnStatusChart = this.chartService.columnChart(
        statusLabels,
        this.returnStatusChartData
      );
    });

    this.service.monthlyPurchase$.pipe(takeUntil(this.destroy$)).subscribe((monthlyPurchase) => {
      const MonthLabels = MONTHS_DTO.map((month) =>
        this.currentLang == 'en' ? month.en : month.ar
      );
      const dataSeries = {
        name: 'Total Purchases',
        data: monthlyPurchase.map((data) => data.totalPurchases),
      };
      const returnSeries = {
        name: 'Total Returns',
        data: monthlyPurchase.map((data) => data.totalReturns),
      };
      const series = [dataSeries, returnSeries];

      this.monthlyPurchasesChart = this.chartService.multipleColumnChart(MonthLabels, series);
    });

    this.service.topPurchaseProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((topPurchaseProduct) => {
        const sum = topPurchaseProduct.reduce((acc: number, item: TopPurchasedProductsDto) => {
          return acc + item.Quantity;
        }, 0);

        this.mostPurchasedProductsChartData = topPurchaseProduct.map((item, index) => ({
          y: parseFloat(((item.Quantity / sum) * 100).toFixed(2)),
          value: item.Cost,
          name: item.Description,
          color: this.colors[index],
          quantity: `X ${item.Quantity}`,
        }));
        this.mostPurchasedProductsChart = this.chartService.donutChart(
          this.mostPurchasedProductsChartData
        );
      });

    this.service.topVendors$.pipe(takeUntil(this.destroy$)).subscribe((topVendors) => {
      this.topVendors = topVendors;
    });
  }

  loaderSubscriptions() {
    this.service.statusLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.statusChartLoader = loader));

    this.service.returnStatusLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((returnStatus) => (this.returnStatusChartLoader = returnStatus));

    this.service.monthlyPurchaseLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.monthlyPurchasesChartLoader = loader));

    this.service.topPurchaseProductsLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.mostPurchasedProductsChartLoader = loader));

    this.service.topVendorsLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loader) => (this.topVendorsLoader = loader));
  }

  getStatusReport() {
    this.service.fetchStatusReport();
  }

  getReturnStatusReport() {
    this.service.fetchReturnStatusReport();
  }

  getMonthlyPurchasesReport() {
    this.service.fetchMonthlyPurchaseReport();
  }

  getTopPurchasedProducts() {
    this.service.fetchTopPurchaseProducts();
  }

  getTopVendors() {
    this.service.fetchTopVendors();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
