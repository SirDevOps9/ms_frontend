import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs';
import {
  ChartService,
  ChartValueDto,
  CurrentUserService,
  DASHBOARD_COLORS,
  LanguageService,
} from 'shared-lib';
import { InventoryDashboardService } from './inventory-dashboard.service';
import {
  ExpiryItemsReportDto,
  GetLastStockInTransactionDto,
  GetLastStockOutTransactionDto,
  InventoryTotalsDto,
  ItemCategoryReportDto,
  ItemWarehouseReportDto,
} from './models';

@Component({
  selector: 'app-inventory-dashboard',
  templateUrl: './inventory-dashboard.component.html',
  styleUrl: './inventory-dashboard.component.scss',
})
export class InventoryDashboardComponent {
  currentLanguage: string;
  defaultCurrency: any;

  // charts and data
  statusChart: Chart;
  statusChartLabels: string[] = [];
  statusChartValues: ChartValueDto[] = [];
  categoriesChart: Chart;
  categoriesChartData: ChartValueDto[];
  warehousesChart: Chart;
  warehouseChartData: ChartValueDto[];
  stockOverview: InventoryTotalsDto = {} as InventoryTotalsDto;
  lastStockOut: GetLastStockOutTransactionDto[] = [];
  lastStockIn: GetLastStockInTransactionDto[] = [];
  stockExpiryDate: ExpiryItemsReportDto[] = [];

  // loaders
  statusLoader: boolean = false;
  categoriesLoader: boolean = false;
  warehousesLoader: boolean = false;
  lastStockInLoader: boolean = false;
  lastStockOutLoader: boolean = false;
  stockExpiryDateLoader: boolean = false;
  totalStockOverviewLoader: boolean = false;

  // clear subscriptions
  private destroy$ = new Subject<void>();

  colors = DASHBOARD_COLORS;

  constructor(
    private chartService: ChartService,
    private languageService: LanguageService,
    private service: InventoryDashboardService,
    private currencyService: CurrentUserService
  ) {}

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => (this.currentLanguage = lang));
    this.defaultCurrency = this.currencyService.getCurrencyCode();

    this.fetchData();
    this.subscriptions();
    this.loaderSubscriptions();
  }

  fetchData() {
    this.getStatus();
    this.getCategories(4);
    this.getWarehouses(4);
    this.getLastStockIn(10);
    this.getLastStockOut(10);
    this.getStockExpiryDate(7);
    this.getTotalStockOverview();
  }
  subscriptions() {
    this.service.status$.subscribe((data) => {
      data.forEach((status) => {
        this.statusChartLabels.push(status.status);
      });
      this.statusChartValues = data.map((item, index) => ({
        y: item.count,
        value: item.count,
        color: this.colors[index],
        name: item.status,
      }));
      if (this.statusChartValues.length > 0) {
        this.statusChart = this.chartService.columnChart(
          this.statusChartLabels,
          this.statusChartValues
        );
      }
    });

    this.service.categories$.subscribe((data) => {
      const sum = data.reduce((acc: number, item: ItemCategoryReportDto) => {
        return acc + (item.itemCount || 0);
      }, 0);
      this.categoriesChartData = data.map((item, index) => ({
        y: parseFloat(((item.itemCount / sum) * 100).toFixed(2)),
        value: item.itemCount,
        name: `${this.currentLanguage == 'ar' ? item.nameAr : item.nameEn} (${parseFloat(
          ((item.itemCount / sum) * 100).toFixed(2)
        )}%)`,
        color: this.colors[index],
      }));
      if (this.categoriesChartData.length > 0) {
        this.categoriesChart = this.chartService.donutChart(this.categoriesChartData);
      }
    });

    this.service.warehouses$.subscribe((data) => {
      const sum = data.reduce((acc: number, item: ItemWarehouseReportDto) => {
        return acc + (item.totalQuantity || 0);
      }, 0);
      this.warehouseChartData = data.map((item, index) => ({
        y: parseFloat(((item.totalQuantity / sum) * 100).toFixed(2)),
        value: item.totalQuantity,
        name: `${item.name} (${parseFloat(((item.totalQuantity / sum) * 100).toFixed(2))}%)`,
        color: this.colors[index],
      }));
      if (this.warehouseChartData.length > 0) {
        this.warehousesChart = this.chartService.donutChart(this.warehouseChartData);
      }
    });

    this.service.lastStockIn$.subscribe((data) => {
      this.lastStockIn = data;
    });
    this.service.lastStockOut$.subscribe((data) => {
      this.lastStockOut = data;
    });
    this.service.stockExpiryDate$.subscribe((data) => {
      this.stockExpiryDate = data;
    });

    this.service.totalStockOverView$.subscribe((data) => {
      this.stockOverview = data;
    });
  }
  loaderSubscriptions() {
    this.service.statusLoader$.subscribe((loader) => {
      this.statusLoader = loader;
    });
    this.service.categoriesLoader$.subscribe((loader) => {
      this.categoriesLoader = loader;
    });
    this.service.warehousesLoader$.subscribe((loader) => {
      this.warehousesLoader = loader;
    });
    this.service.lastStockInLoader$.subscribe((loader) => {
      this.lastStockInLoader = loader;
    });
    this.service.lastStockOutLoader$.subscribe((loader) => {
      this.lastStockOutLoader = loader;
    });
    this.service.stockExpiryDateLoader$.subscribe((loader) => {
      this.stockExpiryDateLoader = loader;
    });
    this.service.totalStockOverviewLoader$.subscribe((loader) => {
      this.totalStockOverviewLoader = loader;
    });
  }

  getStatus() {
    this.service.fetchStatus();
  }
  getCategories(numberOfItems: number) {
    this.service.fetchCategories(numberOfItems);
  }
  getWarehouses(numberOfItems: number) {
    this.service.fetchWarehouses(numberOfItems);
  }
  getLastStockIn(numberOfItems: number) {
    this.service.fetchLastStockIn(numberOfItems);
  }
  getLastStockOut(numberOfItems: number) {
    this.service.fetchLastStockOut(numberOfItems);
  }
  getStockExpiryDate(numberOfItems: number) {
    this.service.fetchStockExpiryDate(numberOfItems);
  }
  getTotalStockOverview() {
    this.service.fetchTotalStockOverview();
  }

  isExpired(date: string) {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    return selectedDate.getTime() < currentDate.getTime();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
