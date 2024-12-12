import { Injectable } from '@angular/core';
import { ProxyService } from './proxy.service';
import { BehaviorSubject } from 'rxjs';
import { GetVendorStatementReportDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class ReportServiceService {
  vendorsReportData = new BehaviorSubject<GetVendorStatementReportDto>(
    {} as GetVendorStatementReportDto
  );
  vendorDropdown = new BehaviorSubject<[]>([]);

  vendorReport$ = this.vendorsReportData.asObservable();
  vendorDropdown$ = this.vendorDropdown.asObservable();

  vendorReportLoading = new BehaviorSubject<boolean>(false);

  vendorLoading$ = this.vendorReportLoading.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchVendorReport(vendorSearch: any) {
    this.vendorReportLoading.next(true);
    this.proxy.getVendorsReports(vendorSearch).subscribe((res) => {
      this.vendorsReportData.next(res);
      this.vendorReportLoading.next(true);
    });
  }

  fetchVendorsDropdown() {
    this.proxy.getVendorsDropdown().subscribe((res) => {
      this.vendorDropdown.next(res);
    });
  }
}
