import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService, PageInfo, PaginationVm } from 'shared-lib';
import { AddStockIn, LatestItems, OperationalStockIn, StockInDetail, StockInDto, itemDefinitionDto } from '../items/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsProxyService {

  constructor(private httpService: HttpService) {}
  getStockIn(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<StockInDto>> {
    let query = `Transaction/GetStockInTransactionList?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<StockInDto>>(query);
  }

  exportsStockInList(searchTerm: string | undefined): Observable<itemDefinitionDto[]> {
    let query = `Transaction/GetStockInTransactionList/Export?`;
    if (searchTerm) {
      query += `searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<itemDefinitionDto[]>(query);
  }

  operationTagDropdown(): Observable<OperationalStockIn[]> {
    return this.httpService.get(`OperationalTag/OperationalTagStockDropDown?OperationType=StockIn`);
  }
  addStockIn(obj: AddStockIn): Observable<AddStockIn> {
    return this.httpService.post('StockIn', obj);
  }
  editStockIn(obj: AddStockIn): Observable<AddStockIn> {
    return this.httpService.put('StockIn', obj);
  }

  getAllStockIn(searchTerm: string, pageInfo: PageInfo): Observable<PaginationVm<StockInDto>> {
    let query = `StockIn?${pageInfo.toQuery}`;
    if (searchTerm) {
      query += `&searchTerm=${encodeURIComponent(searchTerm)}`;
    }
    return this.httpService.get<PaginationVm<StockInDto>>(query);
  }

  exportStockInList(
    searchTerm?: string,
    SortBy?: number,
    SortColumn?: string
  ): Observable<StockInDto[]> {
    let query = `StockIn/Export?`;
    const params: string[] = [];
    if (searchTerm) params.push(`searchTerm=${encodeURIComponent(searchTerm)}`);
    if (SortBy) params.push(`SortBy=${SortBy}`);
    if (SortColumn) params.push(`SortColumn=${SortColumn}`);
    query += params.join('&');
    return this.httpService.get<StockInDto[]>(query);
  }

  deleteStockIn(id: number) {
    return this.httpService.delete(`StockIn/${id}`);
  }
  deleteStockInLine(id: number) {
    return this.httpService.delete(`StockIn/DeleteLine/${id}`);
  }

  getStockInById(id: number) {
    return this.httpService.get(`StockIn/${id}`);
  }
  getItemBarcodeForItem(barcode: string): Observable<StockInDetail> {
    return this.httpService.get(`Item/GetItemByBarcode?Barcode=${barcode}`);
  }

  getLatestItemsList(): Observable<LatestItems[]> {
    return this.httpService.get(`Item/GetLatestItemsList`);
  }

  getWareHousesDropDown() {
    return this.httpService.get<any>(`WareHouse/WareHousesDropDown`);
  }

}
 