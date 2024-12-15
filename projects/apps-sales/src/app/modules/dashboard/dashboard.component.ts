import { Component } from '@angular/core';
import {
  ChartService,
  ChartValueDto,
  DASHBOARD_COLORS,
  LanguageService,
  MONTHS_DTO,
} from 'shared-lib';
import { DashboardService } from './dashboard.service';
import { Subject, takeUntil } from 'rxjs';
import { Chart } from 'angular-highcharts';
import {
  GetReturnSalesStatusReportDto,
  GetSalesStatusReportDto,
  GetTopSalesCategoriesDto,
  GetTopSalesCustomersReportDto,
  GetTopSalesProductsDto,
} from './models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentLanguage: string;
  destroy$ = new Subject<void>();
  colors = DASHBOARD_COLORS;

  // Data variables
  statusChart: Chart;
  statusChartData: ChartValueDto[];

  returnStatusChart: Chart;
  returnStatusChartData: ChartValueDto[];

  monthlySalesChart: Chart;

  topSalesProductChart: Chart;
  topSalesProductChartData: ChartValueDto[];

  topSalesCategoriesChart: Chart;
  topSalesCategoriesChartData: ChartValueDto[];

  topCustomerData: GetTopSalesCustomersReportDto[];
  topSalesPersonsData: any[];

  // Loader variables
  isLoadingStatus = false;
  isLoadingReturnStatus = false;
  isLoadingMonthlySales = false;
  isLoadingBestSellingProduct = false;
  isLoadingBestSellingCategory = false;
  isLoadingTopCustomer = false;
  isLoadingTopSalesPersons = false;

  constructor(
    private languageService: LanguageService,
    private service: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.languageService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe((lang) => (this.currentLanguage = lang));

    this.fetchData();
    this.dataSubscriptions();
    this.loadingSubscriptions();
  }

  fetchData() {
    this.getStatus();
    this.getReturnStatus();
    this.getMonthlySales();
    this.getBestSellingProduct();
    this.getBestSellingCategory();
    this.getTopCustomer();
    this.getTopSalesPersons();
  }

  dataSubscriptions() {
    this.service.status$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const statusLabels: string[] = [];
      data.forEach((status) => statusLabels.push(status.invoiceStatus));
      this.statusChartData = data.map((item: GetSalesStatusReportDto, index) => ({
        y: item.count,
        value: item.count,
        color: this.colors[index],
        name: item.invoiceStatus,
      }));

      this.statusChart = this.chartService.columnChart(statusLabels, this.statusChartData);
    });

    this.service.returnStatus$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const statusLabels: string[] = [];
      data.forEach((status) => statusLabels.push(status.returnSalesStatus));
      this.returnStatusChartData = data.map((item: GetReturnSalesStatusReportDto, index) => ({
        y: item.count,
        value: item.count,
        color: this.colors[index],
        name: item.returnSalesStatus,
      }));

      this.returnStatusChart = this.chartService.columnChart(
        statusLabels,
        this.returnStatusChartData
      );
    });

    this.service.monthlySales$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const MonthLabels = MONTHS_DTO.map((month) =>
        this.currentLanguage == 'en' ? month.en : month.ar
      );
      const totalSales = {
        name: this.currentLanguage == 'en' ? 'Total Purchases' : 'إجمالي الشراء',
        data: data.map((data) => data.totalSales),
      };
      const totalReturn = {
        name: this.currentLanguage == 'en' ? 'Total Returns' : 'إجمالي الإرجاع',
        data: data.map((data) => data.totalReturns),
      };
      const series = [totalSales, totalReturn];

      this.monthlySalesChart = this.chartService.multipleColumnChart(MonthLabels, series);
    });

    this.service.bestSellingProduct$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const sum = data.reduce((acc: number, item: GetTopSalesProductsDto) => {
        return acc + item.quantity;
      }, 0);

      this.topSalesProductChartData = data.map((item, index) => ({
        y: parseFloat(((item.quantity / sum) * 100).toFixed(2)),
        value: item.cost,
        name: item.description,
        color: this.colors[index],
        quantity: `X ${item.quantity}`,
      }));
      this.topSalesProductChart = this.chartService.donutChart(this.topSalesProductChartData);
    });

    this.service.bestSellingCategory$.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      const sum = data.reduce((acc: number, item: GetTopSalesCategoriesDto) => {
        return acc + item.quantity;
      }, 0);

      this.topSalesCategoriesChartData = data.map((item, index) => ({
        y: parseFloat(((item.quantity / sum) * 100).toFixed(2)),
        value: item.quantity,
        name: this.currentLanguage == 'en' ? item.categoryNameEn : item.categoryNameAr,
        color: this.colors[index],
      }));
      this.topSalesCategoriesChart = this.chartService.donutChart(this.topSalesCategoriesChartData);
    });

    this.service.topCustomer$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.topCustomerData = data));

    this.service.topSalesPersons$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.topSalesPersonsData = data));
  }

  loadingSubscriptions() {
    this.service.statusLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingStatus = isLoading));

    this.service.returnStatusLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingReturnStatus = isLoading));

    this.service.monthlySalesLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingMonthlySales = isLoading));

    this.service.bestSellingProductLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingBestSellingProduct = isLoading));

    this.service.bestSellingCategoryLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingBestSellingCategory = isLoading));

    this.service.topCustomerLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingTopCustomer = isLoading));

    this.service.topSalesPersonsLoader$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLoading) => (this.isLoadingTopSalesPersons = isLoading));
  }

  getStatus() {
    this.service.fetchStatus();
  }

  getReturnStatus() {
    this.service.fetchReturnStatus();
  }

  getMonthlySales() {
    this.service.fetchMonthlySales();
  }

  getBestSellingProduct() {
    this.service.fetchBestSellingProduct(5);
  }

  getBestSellingCategory() {
    this.service.fetchBestSellingCategory(5);
  }

  getTopCustomer() {
    this.service.fetchTopCustomer(10);
  }

  getTopSalesPersons() {
    this.service.fetchTopSalesPersons(10);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
