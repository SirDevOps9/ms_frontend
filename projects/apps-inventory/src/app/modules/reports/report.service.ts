import { Injectable } from '@angular/core';
import { ReportProxyService } from './report-proxy.service';
import { CardReportQuery, WarehousesTables } from './models';
import { BehaviorSubject } from 'rxjs';
import { AdvancedSearchDto } from '../items/models';
import { PageInfo, PageInfoResult } from 'shared-lib';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  cardWarehousesReport = new BehaviorSubject<WarehousesTables[]>([]);
  itemsDataSource = new BehaviorSubject<AdvancedSearchDto[]>([])
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  cardWarehousesReportList = this.cardWarehousesReport.asObservable();

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

  getItems(quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.reportProxy.getItems(quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSource.next(res.result);
      this.currentPageInfo.next(res.pageInfoResult);
    });
  }
}
