import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import {
  GetMonthlySalesReportDto,
  GetReturnSalesStatusReportDto,
  GetSalesStatusReportDto,
  GetTopSalesCategoriesDto,
  GetTopSalesCustomersReportDto,
  GetTopSalesProductsDto,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseUrl = 'dashboard';

  constructor(private http: HttpService) {}

  getStatus(): Observable<GetSalesStatusReportDto[]> {
    return this.http.get<GetSalesStatusReportDto[]>(`${this.baseUrl}/GetSalesStatusReport`);
  }

  getReturnStatus(): Observable<GetReturnSalesStatusReportDto[]> {
    return this.http.get<GetReturnSalesStatusReportDto[]>(
      `${this.baseUrl}/GetReturnSalesStatusReport`
    );
  }

  getMonthlySales(): Observable<GetMonthlySalesReportDto[]> {
    return this.http.get<GetMonthlySalesReportDto[]>(`${this.baseUrl}/GetMonthlySalesReport`);
  }

  getBestSellingProduct(count: number): Observable<GetTopSalesProductsDto[]> {
    return this.http.get<GetTopSalesProductsDto[]>(
      `${this.baseUrl}/GetTopSalesProducts?count=${count}`
    );
  }

  getBestSellingCategory(count: number): Observable<GetTopSalesCategoriesDto[]> {
    return this.http.get<GetTopSalesCategoriesDto[]>(`${this.baseUrl}/GetTopSalesCategories?count=${count}`);
  }

  getTopCustomer(count: number): Observable<GetTopSalesCustomersReportDto[]> {
    return this.http.get<GetTopSalesCustomersReportDto[]>(
      `${this.baseUrl}/GetTopSalesCustomersReport?count=${count}`
    );
  }

  getTopSalesPersons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetTopSalesPersons`);
  }
}
