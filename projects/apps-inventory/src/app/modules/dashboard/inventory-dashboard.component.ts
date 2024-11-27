import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subject } from 'rxjs';
import { ChartService, LanguageService } from 'shared-lib';
import { InventoryDashboardService } from './inventory-dashboard.service';

@Component({
  selector: 'app-inventory-dashboard',
  templateUrl: './inventory-dashboard.component.html',
  styleUrl: './inventory-dashboard.component.scss',
})
export class InventoryDashboardComponent {
  currentLanguage: string;

  statusChart: Chart;
  categoriesChart: Chart;
  warehousesChart: Chart;

  // loaders
  statusLoader: boolean = false;
  categoriesLoader: boolean = false;
  warehousesLoader: boolean = false;
  lastStockInLoader: boolean = false;
  lastStockOutLoader: boolean = false;
  stockExpiryDateLoader: boolean = false;

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
    private service: InventoryDashboardService
  ) {}

  ngOnInit() {
    this.languageService.language$.subscribe((lang) => (this.currentLanguage = lang));

    this.fetchData();
    this.subscriptions();
    this.loaderSubscriptions();
  }

  fetchData() {
    this.getStatus();
    this.getCategories();
    this.getWarehouses();
    this.getLastStockIn();
    this.getLastStockOut();
    this.getStockExpiryDate();
  }
  subscriptions() {
    this.service.status$.subscribe((data) => {});
    this.service.categories$.subscribe((data) => {});
    this.service.warehouses$.subscribe((data) => {});
    this.service.lastStockIn$.subscribe((data) => {});
    this.service.lastStockOut$.subscribe((data) => {});
    this.service.stockExpiryDate$.subscribe((data) => {});
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
  }

  getStatus() {
    this.service.fetchStatus();
  }
  getCategories() {
    this.service.fetchCategories();
  }
  getWarehouses() {
    this.service.fetchWarehouses();
  }
  getLastStockIn() {
    this.service.fetchLastStockIn();
  }
  getLastStockOut() {
    this.service.fetchLastStockOut();
  }
  getStockExpiryDate() {
    this.service.fetchStockExpiryDate();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
