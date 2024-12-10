import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseUrl = 'dashboard';

  constructor(private http: HttpService) {}

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetStockInOutStatusCount`);
  }

  getReturnStatus(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetReturnStockInOutStatusCount`);
  }

  getMonthlySales(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetMonthlySales`);
  }

  getBestSellingProduct(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetBestSalesProduct`);
  }

  getBestSellingCategory(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetBestSellingCategory`);
  }

  getTopCustomer(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetTopCustomer`);
  }

  getTopSalesPersons(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetTopSalesPersons`);
  }
}
