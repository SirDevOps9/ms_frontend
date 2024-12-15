import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { PrintService } from 'shared-lib';
import { CustomerReportService } from '../../customer-report.service';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrl: './customer-report.component.scss',
})
export class CustomerReportComponent {
  searchForm: FormGroup;
  destroy$ = new Subject<void>();

  customerStatementReport: any = {};
  customersDropdown: any[] = [];

  reportsLoading: boolean = false;

  constructor(private PrintService: PrintService, private service: CustomerReportService) {}

  ngOnInit() {
    this.initiateSearchForm();
    this.getCustomersDropdown();
    this.subscriptions();
  }

  initiateSearchForm() {
    this.searchForm = new FormGroup({
      CustomerId: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(null, [Validators.required]),
      toDate: new FormControl(null, [Validators.required]),
    });
  }

  getCustomersDropdown() { }

  subscriptions() {}

  viewData() {}

  printTable(id: string) {
    this.PrintService.print(id);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
