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
  private baseUrl = '';

  constructor(private http: HttpService) {}

  getStatusReport(): Observable<InvoiceStatusReportDto[]> {
    return this.http.get<InvoiceStatusReportDto[]>(`${this.baseUrl}/status-report`);
  }

  getReturnStatusReport(): Observable<ReturnInvoiceStatusReportDto[]> {
    return this.http.get<ReturnInvoiceStatusReportDto[]>(`${this.baseUrl}/return-status-report`);
  }

  monthlyPurchaseReport(): Observable<MonthlyPurchaseReturnReportDto[]> {
    return this.http.get<MonthlyPurchaseReturnReportDto[]>(
      `${this.baseUrl}/monthly-purchase-report`
    );
  }

  topPurchaseProducts(): Observable<TopPurchasedProductsDto[]> {
    return this.http.get<TopPurchasedProductsDto[]>(`${this.baseUrl}/top-purchase-products`);
  }

  topVendors(): Observable<TopVendorsReportDto[]> {
    return this.http.get<TopVendorsReportDto[]>(`${this.baseUrl}/top-vendors`);
  }
}
