import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AdvancedSearchDto, LatestItems, WarehousesTables } from './models';

@Injectable({
  providedIn: 'root',
})
export class ReportProxyService {
  private baseHttp = 'ItemCardReport/ItemCardReport';
  constructor(private http: HttpService) {}

  getWarehouseTransactionsReport(query: any): Observable<WarehousesTables> {
    let queryList = `${this.baseHttp}`;
    if (query) {
      queryList += `?${query}`;
    }
    return this.http.get<WarehousesTables>(queryList);
  }

  getLatestItemsList(searchTerm: string): Observable<LatestItems[]> {
    const params: string[] = [];
    if (searchTerm) params.push(`SearchTerm=${encodeURIComponent(searchTerm)}`);
    return this.http.get(`Item/GetLatestItemsList?${params}`);
  }

  getItems(
    quieries: string,
    searchTerm: string,
    pageInfo: PageInfo
  ): Observable<PaginationVm<AdvancedSearchDto>> {
    let query = `Item/GetItemsAdvancedSearchList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    if (quieries) {
      query += `&${quieries ? quieries : ''}`;
    }
    return this.http.get<PaginationVm<AdvancedSearchDto>>(query);
  }

  getWareHousesDropDown() {
    return this.http.get<any>(`WareHouse/WareHousesDropDown`);
  }
}
