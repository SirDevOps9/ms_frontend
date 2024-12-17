import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';
import {
  ExpiryItemsReportDto,
  GetLastStockInTransactionDto,
  GetLastStockOutTransactionDto,
  GetStockInOutStatusCountDto,
  InventoryTotalsDto,
  ItemCategoryReportDto,
  ItemWarehouseReportDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class InventoryDashboardService {
  // Loader subjects
  private statusLoaderSubject = new BehaviorSubject<boolean>(false);
  private categoriesLoaderSubject = new BehaviorSubject<boolean>(false);
  private warehousesLoaderSubject = new BehaviorSubject<boolean>(false);
  private lastStockInLoaderSubject = new BehaviorSubject<boolean>(false);
  private lastStockOutLoaderSubject = new BehaviorSubject<boolean>(false);
  private stockExpiryDateLoaderSubject = new BehaviorSubject<boolean>(false);
  private totalStockOverviewLoader = new BehaviorSubject<boolean>(false);

  // Loader observables
  statusLoader$ = this.statusLoaderSubject.asObservable();
  categoriesLoader$ = this.categoriesLoaderSubject.asObservable();
  warehousesLoader$ = this.warehousesLoaderSubject.asObservable();
  lastStockInLoader$ = this.lastStockInLoaderSubject.asObservable();
  lastStockOutLoader$ = this.lastStockOutLoaderSubject.asObservable();
  stockExpiryDateLoader$ = this.stockExpiryDateLoaderSubject.asObservable();
  totalStockOverviewLoader$ = this.totalStockOverviewLoader.asObservable();

  // Data subject
  private statusSubject = new BehaviorSubject<GetStockInOutStatusCountDto[]>([]);
  private categoriesSubject = new BehaviorSubject<ItemCategoryReportDto[]>([]);
  private warehousesSubject = new BehaviorSubject<ItemWarehouseReportDto[]>([]);
  private lastStockInSubject = new BehaviorSubject<GetLastStockInTransactionDto[]>([]);
  private lastStockOutSubject = new BehaviorSubject<GetLastStockOutTransactionDto[]>([]);
  private stockExpiryDateSubject = new BehaviorSubject<ExpiryItemsReportDto[]>([]);
  private totalStockOverviewSubject = new BehaviorSubject<InventoryTotalsDto>({} as InventoryTotalsDto);

  // Data observables
  status$ = this.statusSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();
  warehouses$ = this.warehousesSubject.asObservable();
  lastStockIn$ = this.lastStockInSubject.asObservable();
  lastStockOut$ = this.lastStockOutSubject.asObservable();
  stockExpiryDate$ = this.stockExpiryDateSubject.asObservable();
  totalStockOverView$ = this.totalStockOverviewSubject.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchStatus() {
    this.statusLoaderSubject.next(true);
    this.proxy.getStatus().subscribe({
      next: (data) => this.statusSubject.next(data),
      complete: () => this.statusLoaderSubject.next(false),
    });
  }

  fetchCategories(counts: number) {
    this.categoriesLoaderSubject.next(true);
    this.proxy.getCategories(counts).subscribe({
      next: (data) => this.categoriesSubject.next(data),
      complete: () => this.categoriesLoaderSubject.next(false),
    });
  }

  fetchWarehouses(counts: number) {
    this.warehousesLoaderSubject.next(true);
    this.proxy.getWarehouses(counts).subscribe({
      next: (data) => this.warehousesSubject.next(data),
      complete: () => this.warehousesLoaderSubject.next(false),
    });
  }

  fetchLastStockIn(counts: number) {
    this.lastStockInLoaderSubject.next(true);
    this.proxy.getLastStockIn(counts).subscribe({
      next: (data) => this.lastStockInSubject.next(data),
      complete: () => this.lastStockInLoaderSubject.next(false),
    });
  }

  fetchLastStockOut(counts: number) {
    this.lastStockOutLoaderSubject.next(true);
    this.proxy.getLastStockOut(counts).subscribe({
      next: (data) => this.lastStockOutSubject.next(data),
      complete: () => this.lastStockOutLoaderSubject.next(false),
    });
  }

  fetchStockExpiryDate(counts: number) {
    this.stockExpiryDateLoaderSubject.next(true);
    this.proxy.getStockExpiryDate(counts).subscribe({
      next: (data) => this.stockExpiryDateSubject.next(data),
      complete: () => this.stockExpiryDateLoaderSubject.next(false),
    });
  }

  fetchTotalStockOverview() {
    this.totalStockOverviewLoader.next(true);
    this.proxy.getTotalStockOverview().subscribe({
      next: (data) => this.totalStockOverviewSubject.next(data),
      complete: () => this.totalStockOverviewLoader.next(false),
    });
  }
}
