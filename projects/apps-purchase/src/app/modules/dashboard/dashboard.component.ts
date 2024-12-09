import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import {
  InvoiceStatusReportDto,
  ReturnInvoiceStatusReportDto,
  TopPurchasedCategoriesDto,
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
    this.getTopPurchasedCategories();
    this.getTopVendors();
  }

  subscriptions() {
    this.service.status$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      const statusLabels: string[] = [];
      status.forEach((status) => statusLabels.push(status.invoiceStatus));
      this.statusChartData = status.map((item: InvoiceStatusReportDto, index) => ({
        y: item.count,
        value: item.count,
        color: this.colors[index],
        name: item.invoiceStatus,
      }));

      this.statusChart = this.chartService.columnChart(statusLabels, this.statusChartData);
    });

    this.service.returnStatus$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      const statusLabels: string[] = [];
      status.forEach((status) => statusLabels.push(status.returnInvoiceStatus));
      this.returnStatusChartData = status.map((item: ReturnInvoiceStatusReportDto, index) => ({
        y: item.count,
        value: item.count,
        color: this.colors[index],
        name: item.returnInvoiceStatus,
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
        name: this.currentLang == 'en' ? 'Total Purchases' : 'إجمالي الشراء',
        data: monthlyPurchase.map((data) => data.totalPurchases),
      };
      const returnSeries = {
        name: this.currentLang == 'en' ? 'Total Returns' : 'إجمالي الإرجاع',
        data: monthlyPurchase.map((data) => data.totalReturns),
      };
      const series = [dataSeries, returnSeries];

      this.monthlyPurchasesChart = this.chartService.multipleColumnChart(MonthLabels, series);
    });

    this.service.topPurchaseProducts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((topPurchaseProduct) => {
        const sum = topPurchaseProduct.reduce((acc: number, item: TopPurchasedProductsDto) => {
          return acc + item.quantity;
        }, 0);

        this.mostPurchasedProductsChartData = topPurchaseProduct.map((item, index) => ({
          y: parseFloat(((item.quantity / sum) * 100).toFixed(2)),
          value: item.cost,
          name: item.description,
          color: this.colors[index],
          quantity: `X ${item.quantity}`,
        }));
        this.mostPurchasedProductsChart = this.chartService.donutChart(
          this.mostPurchasedProductsChartData
        );
      });

    this.service.topPurchaseCategories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((topPurchaseCategory) => {
        const sum = topPurchaseCategory.reduce((acc: number, item: TopPurchasedCategoriesDto) => {
          return acc + item.quantity;
        }, 0);

        this.mostPurchasedCategoriesChartData = topPurchaseCategory.map((item, index) => ({
          y: parseFloat(((item.quantity / sum) * 100).toFixed(2)),
          value: item.quantity,
          name: this.currentLang == 'en' ? item.categoryNameEn : item.categoryNameAr,
          color: this.colors[index],
        }));
        this.mostPurchasedCategoriesChart = this.chartService.donutChart(
          this.mostPurchasedCategoriesChartData
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

  getTopPurchasedProducts(count: number = 4) {
    this.service.fetchTopPurchaseProducts(count);
  }

  getTopPurchasedCategories(count: number = 4) {
    this.service.fetchTopPurchaseCategories(count);
  }

  getTopVendors(count: number = 10) {
    this.service.fetchTopVendors(count);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
