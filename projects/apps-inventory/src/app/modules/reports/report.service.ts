import { Injectable } from '@angular/core';
import { ReportProxyService } from './report-proxy.service';
import {
  AdvancedSearchDto,
  CardReportQuery,
  GetWarehouseList,
  LatestItems,
  WarehousesTables,
} from './models';
import { BehaviorSubject } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  cardWarehousesReport = new BehaviorSubject<WarehousesTables[]>([]);
  itemsDataSource = new BehaviorSubject<AdvancedSearchDto[]>([]);
  sendlatestItemsList = new BehaviorSubject<LatestItems[]>([]);
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  wareHousesDropDownLookup = new BehaviorSubject<GetWarehouseList[]>([]);

  wareHousesDropDownLookup$ = this.wareHousesDropDownLookup.asObservable();
  cardWarehousesReportList = this.cardWarehousesReport.asObservable();
  sendlatestItemsList$ = this.sendlatestItemsList.asObservable();
  itemsList = this.itemsDataSource.asObservable();

  constructor(private reportProxy: ReportProxyService) {}

  getWarehousesReport(query: CardReportQuery) {
    const params = new URLSearchParams();
    params.append('ItemVariantId', query.itemVariantId.toString());
    query.warehouseId.forEach((warehouseId: any) => {
      params.append('WarehousesIds', warehouseId.toString());
    });

    this.reportProxy.getWarehouseTransactionsReport(params).subscribe((res) => {
      this.cardWarehousesReport.next(res);
    });
  }

  getLatestItemsList(searchTerm: string = '') {
    return this.reportProxy.getLatestItemsList(searchTerm).subscribe((res) => {
      this.sendlatestItemsList.next(res);
    });
  }

  getItems(quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.reportProxy.getItems(quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSource.next(res.result);
      this.currentPageInfo.next(res.pageInfoResult);
    });
  }

  getWareHousesDropDown() {
    return this.reportProxy.getWareHousesDropDown().subscribe((res) => {
      this.wareHousesDropDownLookup.next(res);
    });
  }
}
