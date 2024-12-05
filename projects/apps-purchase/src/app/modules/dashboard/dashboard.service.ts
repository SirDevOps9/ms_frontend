import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';
import {
  InvoiceStatusReportDto,
  MonthlyPurchaseReturnReportDto,
  ReturnInvoiceStatusReportDto,
  TopPurchasedCategoriesDto,
  TopPurchasedProductsDto,
  TopVendorsReportDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  // Loader subjects
  private statusLoaderSubject = new BehaviorSubject<boolean>(false);
  private returnStatusLoaderSubject = new BehaviorSubject<boolean>(false);
  private monthlyPurchaseLoaderSubject = new BehaviorSubject<boolean>(false);
  private topPurchaseProductsLoaderSubject = new BehaviorSubject<boolean>(false);
  private topPurchaseCategoriesLoaderSubject = new BehaviorSubject<boolean>(false);
  private topVendorsLoaderSubject = new BehaviorSubject<boolean>(false);

  // Loader observables
  statusLoader$ = this.statusLoaderSubject.asObservable();
  returnStatusLoader$ = this.returnStatusLoaderSubject.asObservable();
  monthlyPurchaseLoader$ = this.monthlyPurchaseLoaderSubject.asObservable();
  topPurchaseProductsLoader$ = this.topPurchaseProductsLoaderSubject.asObservable();
  topPurchaseCategoriesLoader$ = this.topPurchaseCategoriesLoaderSubject.asObservable();
  topVendorsLoader$ = this.topVendorsLoaderSubject.asObservable();

  // Data subject
  private statusSubject = new BehaviorSubject<InvoiceStatusReportDto[]>([]);
  private returnStatusSubject = new BehaviorSubject<ReturnInvoiceStatusReportDto[]>([]);
  private monthlyPurchaseSubject = new BehaviorSubject<MonthlyPurchaseReturnReportDto[]>([]);
  private topPurchaseProductsSubject = new BehaviorSubject<TopPurchasedProductsDto[]>([]);
  private topPurchaseCategoriesSubject = new BehaviorSubject<TopPurchasedCategoriesDto[]>([]);
  private topVendorsSubject = new BehaviorSubject<TopVendorsReportDto[]>([]);

  // Data observables
  status$ = this.statusSubject.asObservable();
  returnStatus$ = this.returnStatusSubject.asObservable();
  monthlyPurchase$ = this.monthlyPurchaseSubject.asObservable();
  topPurchaseProducts$ = this.topPurchaseProductsSubject.asObservable();
  topPurchaseCategories$ = this.topPurchaseCategoriesSubject.asObservable();
  topVendors$ = this.topVendorsSubject.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchStatusReport() {
    this.statusLoaderSubject.next(true);
    this.proxy.getStatusReport().subscribe({
      next: (data) => this.statusSubject.next(data),
      complete: () => this.statusLoaderSubject.next(false),
    });
  }

  fetchReturnStatusReport() {
    this.returnStatusLoaderSubject.next(true);
    this.proxy.getReturnStatusReport().subscribe({
      next: (data) => this.returnStatusSubject.next(data),
      complete: () => this.returnStatusLoaderSubject.next(false),
    });
  }

  fetchMonthlyPurchaseReport() {
    this.monthlyPurchaseLoaderSubject.next(true);
    this.proxy.monthlyPurchaseReport().subscribe({
      next: (data) => this.monthlyPurchaseSubject.next(data),
      complete: () => this.monthlyPurchaseLoaderSubject.next(false),
    });
  }

  fetchTopPurchaseProducts(count: number) {
    this.topPurchaseProductsLoaderSubject.next(true);
    this.proxy.topPurchaseProducts(count).subscribe({
      next: (data) => this.topPurchaseProductsSubject.next(data),
      complete: () => this.topPurchaseProductsLoaderSubject.next(false),
    });
  }

  fetchTopPurchaseCategories(count: number) {
    this.topPurchaseCategoriesLoaderSubject.next(true);
    this.proxy.topPurchaseCategories(count).subscribe({
      next: (data) => this.topPurchaseCategoriesSubject.next(data),
      complete: () => this.topPurchaseCategoriesLoaderSubject.next(false),
    });
  }

  fetchTopVendors(count: number) {
    this.topVendorsLoaderSubject.next(true);
    this.proxy.topVendors(count).subscribe({
      next: (data) => this.topVendorsSubject.next(data),
      complete: () => this.topVendorsLoaderSubject.next(false),
    });
  }
}
