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
  getBanks(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
  getCashFlowSummary(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
  getTotalBankTreasuries(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
  getTreasuries(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
  getIncome(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
  getOutgoing(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
  getResentTransactions(): Observable<any> {
    return this.http.get<any>(this.baseHttp);
  }
}
