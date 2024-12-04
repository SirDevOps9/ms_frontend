import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'shared-lib';
import { ExpiryItemsReportDto, GetLastStockInTransactionDto, GetLastStockOutTransactionDto, GetStockInOutStatusCountDto, InventoryTotalsDto, ItemCategoryReportDto, ItemWarehouseReportDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class ProxyService {
  private baseHttp = 'dashboard';
  constructor(private http: HttpService) {}

  getStatus(): Observable<GetStockInOutStatusCountDto[]> {
    return this.http.get<GetStockInOutStatusCountDto[]>(`${this.baseHttp}/GetStockInOutStatusCount`);
  }

  getCategories(itemsNum: number): Observable<ItemCategoryReportDto[]> {
    return this.http.get<ItemCategoryReportDto[]>(`${this.baseHttp}/GetItemCategoryReport?count=${itemsNum}`);
  }

  getWarehouses(itemsNum: number): Observable<ItemWarehouseReportDto[]> {
    return this.http.get<ItemWarehouseReportDto[]>(`${this.baseHttp}/GetItemWarehouseReport?count=${itemsNum}`);
  }

  getLastStockIn(itemNum: number): Observable<GetLastStockInTransactionDto[]> {
    return this.http.get<GetLastStockInTransactionDto[]>(`${this.baseHttp}/GetLastStockInTransaction?count=${itemNum}`);
  }

  getLastStockOut(itemNum: number): Observable<GetLastStockOutTransactionDto[]> {
    return this.http.get<GetLastStockOutTransactionDto[]>(`${this.baseHttp}/GetLastStockOutTransaction?count=${itemNum}`);
  }

  getStockExpiryDate(itemNum: number): Observable<ExpiryItemsReportDto[]> {
    return this.http.get<ExpiryItemsReportDto[]>(`${this.baseHttp}/ExpiryItemsReport?count=${itemNum}`);
  }

  getTotalStockOverview(): Observable<InventoryTotalsDto> {
    return this.http.get<InventoryTotalsDto>(`${this.baseHttp}/GetInventoryTotalsReport`);
  }
}
