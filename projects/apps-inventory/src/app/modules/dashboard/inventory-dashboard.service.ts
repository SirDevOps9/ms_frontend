import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';

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

  // Loader observables
  statusLoader$ = this.statusLoaderSubject.asObservable();
  categoriesLoader$ = this.categoriesLoaderSubject.asObservable();
  warehousesLoader$ = this.warehousesLoaderSubject.asObservable();
  lastStockInLoader$ = this.lastStockInLoaderSubject.asObservable();
  lastStockOutLoader$ = this.lastStockOutLoaderSubject.asObservable();
  stockExpiryDateLoader$ = this.stockExpiryDateLoaderSubject.asObservable();

  // Data subject
  private statusSubject = new BehaviorSubject<any>(false);
  private categoriesSubject = new BehaviorSubject<any>(false);
  private warehousesSubject = new BehaviorSubject<any>(false);
  private lastStockInSubject = new BehaviorSubject<any>(false);
  private lastStockOutSubject = new BehaviorSubject<any>(false);
  private stockExpiryDateSubject = new BehaviorSubject<any>(false);

  // Data observables
  status$ = this.statusSubject.asObservable();
  categories$ = this.categoriesSubject.asObservable();
  warehouses$ = this.warehousesSubject.asObservable();
  lastStockIn$ = this.lastStockInSubject.asObservable();
  lastStockOut$ = this.lastStockOutSubject.asObservable();
  stockExpiryDate$ = this.stockExpiryDateSubject.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchStatus() {
    this.statusLoaderSubject.next(true);
    this.proxy.getStatus().subscribe({
      next: (data) => this.statusSubject.next(data),
      complete: () => this.statusLoaderSubject.next(false),
    });
  }

  fetchCategories() {
    this.categoriesLoaderSubject.next(true);
    this.proxy.getCategories().subscribe({
      next: (data) => this.categoriesSubject.next(data),
      complete: () => this.categoriesLoaderSubject.next(false),
    });
  }

  fetchWarehouses() {
    this.warehousesLoaderSubject.next(true);
    this.proxy.getWarehouses().subscribe({
      next: (data) => this.warehousesSubject.next(data),
      complete: () => this.warehousesLoaderSubject.next(false),
    });
  }

  fetchLastStockIn() {
    this.lastStockInLoaderSubject.next(true);
    this.proxy.getLastStockIn().subscribe({
      next: (data) => this.lastStockInSubject.next(data),
      complete: () => this.lastStockInLoaderSubject.next(false),
    });
  }

  fetchLastStockOut() {
    this.lastStockOutLoaderSubject.next(true);
    this.proxy.getLastStockOut().subscribe({
      next: (data) => this.lastStockOutSubject.next(data),
      complete: () => this.lastStockOutLoaderSubject.next(false),
    });
  }

  fetchStockExpiryDate() {
    this.stockExpiryDateLoaderSubject.next(true);
    this.proxy.getStockExpiryDate().subscribe({
      next: (data) => this.stockExpiryDateSubject.next(data),
      complete: () => this.stockExpiryDateLoaderSubject.next(false),
    });
  }
}
