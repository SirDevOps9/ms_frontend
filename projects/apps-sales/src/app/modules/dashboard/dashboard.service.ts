import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // Loader subjects
  private statusLoaderSubject = new BehaviorSubject<boolean>(false);
  private returnStatusLoaderSubject = new BehaviorSubject<boolean>(false);
  private monthlySalesLoaderSubject = new BehaviorSubject<boolean>(false);
  private bestSellingProductLoaderSubject = new BehaviorSubject<boolean>(false);
  private bestSellingCategoryLoaderSubject = new BehaviorSubject<boolean>(false);
  private topCustomerLoaderSubject = new BehaviorSubject<boolean>(false);
  private topSalesPersonsLoaderSubject = new BehaviorSubject<boolean>(false);

  // Loader observables
  statusLoader$ = this.statusLoaderSubject.asObservable();
  returnStatusLoader$ = this.returnStatusLoaderSubject.asObservable();
  monthlySalesLoader$ = this.monthlySalesLoaderSubject.asObservable();
  bestSellingProductLoader$ = this.bestSellingProductLoaderSubject.asObservable();
  bestSellingCategoryLoader$ = this.bestSellingCategoryLoaderSubject.asObservable();
  topCustomerLoader$ = this.topCustomerLoaderSubject.asObservable();
  topSalesPersonsLoader$ = this.topSalesPersonsLoaderSubject.asObservable();

  // Data subject
  private statusSubject = new BehaviorSubject<any[]>([]);
  private returnStatusSubject = new BehaviorSubject<any[]>([]);
  private monthlySalesSubject = new BehaviorSubject<any[]>([]);
  private bestSellingProductSubject = new BehaviorSubject<any[]>([]);
  private bestSellingCategorySubject = new BehaviorSubject<any[]>([]);
  private topCustomerSubject = new BehaviorSubject<any[]>([]);
  private topSalesPersonsSubject = new BehaviorSubject<any[]>([]);

  // Data observables
  status$ = this.statusSubject.asObservable();
  returnStatus$ = this.returnStatusSubject.asObservable();
  monthlySales$ = this.monthlySalesSubject.asObservable();
  bestSellingProduct$ = this.bestSellingProductSubject.asObservable();
  bestSellingCategory$ = this.bestSellingCategorySubject.asObservable();
  topCustomer$ = this.topCustomerSubject.asObservable();
  topSalesPersons$ = this.topSalesPersonsSubject.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchStatus() {
    this.statusLoaderSubject.next(true);
    this.proxy.getStatus().subscribe({
      next: (data) => this.statusSubject.next(data),
      complete: () => this.statusLoaderSubject.next(false),
    });
  }

  fetchReturnStatus() {
    this.returnStatusLoaderSubject.next(true);
    this.proxy.getReturnStatus().subscribe({
      next: (data) => this.returnStatusSubject.next(data),
      complete: () => this.returnStatusLoaderSubject.next(false),
    });
  }

  fetchMonthlySales() {
    this.monthlySalesLoaderSubject.next(true);
    this.proxy.getMonthlySales().subscribe({
      next: (data) => this.monthlySalesSubject.next(data),
      complete: () => this.monthlySalesLoaderSubject.next(false),
    });
  }

  fetchBestSellingProduct() {
    this.bestSellingProductLoaderSubject.next(true);
    this.proxy.getBestSellingProduct().subscribe({
      next: (data) => this.bestSellingProductSubject.next(data),
      complete: () => this.bestSellingProductLoaderSubject.next(false),
    });
  }

  fetchBestSellingCategory() {
    this.bestSellingCategoryLoaderSubject.next(true);
    this.proxy.getBestSellingCategory().subscribe({
      next: (data) => this.bestSellingCategorySubject.next(data),
      complete: () => this.bestSellingCategoryLoaderSubject.next(false),
    });
  }

  fetchTopCustomer() {
    this.topCustomerLoaderSubject.next(true);
    this.proxy.getTopCustomer().subscribe({
      next: (data) => this.topCustomerSubject.next(data),
      complete: () => this.topCustomerLoaderSubject.next(false),
    });
  }

  fetchTopSalesPersons() {
    this.topSalesPersonsLoaderSubject.next(true);
    this.proxy.getTopSalesPersons().subscribe({
      next: (data) => this.topSalesPersonsSubject.next(data),
      complete: () => this.topSalesPersonsLoaderSubject.next(false),
    });
  }
}
