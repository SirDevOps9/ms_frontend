import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { TopVendorsReportDto } from './models';
import { Subject } from 'rxjs';
import { ChartService, LanguageService } from 'shared-lib';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  currentLang: string = '';
  private destroy$ = new Subject<void>();

  // charts && data
  statusChart: Chart;
  statusChartData: any = [];

  returnStatusChart: Chart;
  returnStatusChartData: any = [];

  monthlyPurchasesCHart: Chart;

  mostPurchasedProductsChart: Chart;
  mostPurchasedProductsChartData: any = [];

  mostPurchasedCategoriesChart: Chart;
  mostPurchasedCategoriesChartData: any = [];

  topVendors: TopVendorsReportDto[] = [];

  // loaders
  statusChartLoader: boolean = false;
  returnStatusChartLoader: boolean = false;
  monthlyPurchasesChartLoader: boolean = false;
  mostPurchasedProductsChartLoader: boolean = false;
  mostPurchasedCategoriesChartLoader: boolean = false;
  topVendorsLoader: boolean = false;

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
    private languageService: LanguageService,
    private service: DashboardService,
    private chartService: ChartService
  ) {}

  ngOnInit() {
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
    this.service.status$.subscribe((status) => {});
    this.service.returnStatus$.subscribe((status) => {});
    this.service.monthlyPurchase$.subscribe((monthlyPurchase) => {});
    this.service.topPurchaseProducts$.forEach((topPurchaseProduct) => {});
    this.service.topVendors$.subscribe((topVendors) => {});
  }

  loaderSubscriptions() {
    this.service.statusLoader$.subscribe((loader) => {
      this.statusChartLoader = loader;
    });
    this.service.returnStatusLoader$.subscribe((returnStatus) => {
      this.returnStatusChartLoader = returnStatus;
    });
    this.service.monthlyPurchaseLoader$.subscribe((loader) => {
      this.monthlyPurchasesChartLoader = loader;
    });
    this.service.topPurchaseProductsLoader$.subscribe((loader) => {
      this.mostPurchasedProductsChartLoader = loader;
    });
    this.service.topVendorsLoader$.subscribe((loader) => {
      this.topVendorsLoader = loader;
    });
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
}
