import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import {
  InvoiceStatusReportDto,
  MonthlyPurchaseReturnReportDto,
  ReturnInvoiceStatusReportDto,
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

  topPurchaseProducts(): Observable<TopPurchasedProductsDto[]> {
    return this.http.get<TopPurchasedProductsDto[]>(`${this.baseUrl}/GetTopPurchasedProducts`);
  }

  topPurchaseCategories(): Observable<TopPurchasedProductsDto[]> {
    return this.http.get<TopPurchasedProductsDto[]>(`${this.baseUrl}/GetTopPurchasedCategories`);
  }

  topVendors(): Observable<TopVendorsReportDto[]> {
    return this.http.get<TopVendorsReportDto[]>(`${this.baseUrl}/GetTopVendorsReport`);
  }
}
