import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PrintService } from 'shared-lib';
import { CustomerReportService } from '../../customer-report.service';
import { Customer, GetCustomerStatementReportDto } from '../../models';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrl: './customer-report.component.scss',
})
export class CustomerReportComponent {
  searchForm: FormGroup;
  destroy$ = new Subject<void>();

  customerStatementReport: GetCustomerStatementReportDto = {} as GetCustomerStatementReportDto;
  customersDropdown: Customer[] = [];

  reportsLoading: boolean = false;

  constructor(private PrintService: PrintService, private service: CustomerReportService) {}

  ngOnInit() {
    this.initiateSearchForm();
    this.getCustomersDropdown();
    this.subscriptions();
  }

  initiateSearchForm() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const fromDate = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${firstDayOfMonth.getDate().toString().padStart(2, '0')}`;
    const toDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    this.searchForm = new FormGroup({
      CustomerId: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(fromDate, [Validators.required]),
      toDate: new FormControl(toDate, [Validators.required]),
    });
  }
  getCustomersDropdown() {
    this.service.fetchCustomersDropdown();
  }

  subscriptions() {
    this.service.customersDropdown$.subscribe((res) => {
      this.customersDropdown = res;
    });

    this.service.customerReport$.subscribe((res) => {
      this.customerStatementReport = res;
    });

    this.service.customerLoading$.subscribe((res) => {
      this.reportsLoading = res;
    });
  }

  viewData() {
    if (this.searchForm.valid) {
      this.service.fetchCustomerReport(this.searchForm.value);
    }
  }

  printTable(id: string) {
    this.PrintService.print(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
