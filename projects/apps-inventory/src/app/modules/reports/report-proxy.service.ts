import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PaginationVm } from 'shared-lib';
import { WarehousesTables } from './models';

@Injectable({
  providedIn: 'root',
})
export class ReportProxyService {
  private baseHttp = '';
  constructor(private http: HttpService) {}

  getWarehouseTransactionsReport(): Observable<PaginationVm<WarehousesTables>> {
    return this.http.get<PaginationVm<WarehousesTables>>(this.baseHttp);
  }
}
