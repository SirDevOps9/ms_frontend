import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PaginationVm } from 'shared-lib';
import { WarehousesTables } from './models';
import { LatestItems } from '../items/models';

@Injectable({
  providedIn: 'root',
})
export class ReportProxyService {
  private baseHttp = 'ItemCardReport/ItemCardReport';
  constructor(private http: HttpService) {}

  getWarehouseTransactionsReport(query: any): Observable<WarehousesTables[]> {
    let queryList = `${this.baseHttp}`;
    if (query) {
      queryList += `?${query}`;
    }
    return this.http.get<WarehousesTables[]>(queryList);
  }

  getLatestItemsList(searchTerm: string): Observable<LatestItems[]> {
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    return this.http.get(`Item/GetLatestItemsList?${params}`);
  }
}
