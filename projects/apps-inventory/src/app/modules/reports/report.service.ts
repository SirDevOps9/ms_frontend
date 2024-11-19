import { Injectable } from '@angular/core';
import { ReportProxyService } from './report-proxy.service';
import { CardReportQuery, WarehousesTables } from './models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  cardWarehousesReport = new BehaviorSubject<WarehousesTables[]>([]);

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
}
