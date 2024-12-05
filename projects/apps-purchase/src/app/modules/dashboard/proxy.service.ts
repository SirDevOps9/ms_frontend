import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
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
export class ProxyService {
  private baseUrl = 'dashboard';

  constructor(private http: HttpService) {}

  getStatusReport(): Observable<InvoiceStatusReportDto[]> {
    return this.http.get<InvoiceStatusReportDto[]>(`${this.baseUrl}/GetInvoiceStatusReport`);
  }

  getReturnStatusReport(): Observable<ReturnInvoiceStatusReportDto[]> {
    return this.http.get<ReturnInvoiceStatusReportDto[]>(
      `${this.baseUrl}/GetReturnInvoiceStatusReport`
    );
  }

  monthlyPurchaseReport(): Observable<MonthlyPurchaseReturnReportDto[]> {
    return this.http.get<MonthlyPurchaseReturnReportDto[]>(
      `${this.baseUrl}/GetMonthlyPurchaseReturnReport`
    );
  }

  topPurchaseProducts(count: number): Observable<TopPurchasedProductsDto[]> {
    return this.http.get<TopPurchasedProductsDto[]>(
      `${this.baseUrl}/GetTopPurchasedProducts?count=${count}`
    );
  }

  topPurchaseCategories(count: number): Observable<TopPurchasedCategoriesDto[]> {
    return this.http.get<TopPurchasedCategoriesDto[]>(
      `${this.baseUrl}/GetTopPurchasedCategories?count=${count}`
    );
  }

  topVendors(count: number): Observable<TopVendorsReportDto[]> {
    return this.http.get<TopVendorsReportDto[]>(
      `${this.baseUrl}/GetTopVendorsReport?count=${count}`
    );
  }
}
