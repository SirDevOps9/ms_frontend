import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseHttp = 'test';
  constructor(private http: HttpService) {}

  getStatus(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }

  getWarehouses(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }

  getLastStockIn(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }

  getLastStockOut(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }

  getStockExpiryDate(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
}
