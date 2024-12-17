import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProxyService } from './proxy.service';
import { Customer, GetCustomerStatementReportDto } from './models';

@Injectable({
  providedIn: 'root',
})
export class CustomerReportService {
  customersDropdown = new BehaviorSubject<Customer[]>([]);
  customerReportData = new BehaviorSubject<GetCustomerStatementReportDto>(
    {} as GetCustomerStatementReportDto
  );
  customerReportLoading = new BehaviorSubject<boolean>(false);

  customersDropdown$ = this.customersDropdown.asObservable();
  customerReport$ = this.customerReportData.asObservable();
  customerLoading$ = this.customerReportLoading.asObservable();

  constructor(private proxy: ProxyService) {}

  fetchCustomersDropdown() {
    this.proxy.getCustomersDropdown().subscribe((res) => {
      this.customersDropdown.next(res);
    });
  }

  fetchCustomerReport(searchData: any) {
    this.customerReportLoading.next(true);
    this.proxy.getCustomerStatementReport(searchData).subscribe({
      next: (res) => {
        this.customerReportData.next(res);
        this.customerReportLoading.next(false);
      },
      error: () => {
        this.customerReportLoading.next(false);
      },
    });
  }
}
