import { Component } from '@angular/core';
import { ChartService, LanguageService } from 'shared-lib';
import { DashboardService } from './dashboard.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentLanguage: string;
  destroy$ = new Subject<void>();

  // Data variables
  statusData: any[];
  returnStatusData: any[];
  monthlySalesData: any[];
  bestSellingProductData: any[];
  bestSellingCategoryData: any[];
  topCustomerData: any[];
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
    this.service.status$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.statusData = data));

    this.service.returnStatus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.returnStatusData = data));

    this.service.monthlySales$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.monthlySalesData = data));

    this.service.bestSellingProduct$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.bestSellingProductData = data));

    this.service.bestSellingCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.bestSellingCategoryData = data));

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
    this.service.fetchBestSellingProduct();
  }

  getBestSellingCategory() {
    this.service.fetchBestSellingCategory();
  }

  getTopCustomer() {
    this.service.fetchTopCustomer();
  }

  getTopSalesPersons() {
    this.service.fetchTopSalesPersons();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
