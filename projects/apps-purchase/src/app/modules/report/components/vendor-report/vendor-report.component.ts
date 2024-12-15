import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetVendorStatementReportDto, VendorDropDown } from '../../models';
import { ReportServiceService } from '../../report-service.service';
import { PrintService } from 'shared-lib';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.component.html',
  styleUrls: ['./vendor-report.component.scss'],
})
export class VendorReportComponent implements OnDestroy {
  searchForm: FormGroup;
  vendors: VendorDropDown[] = [];
  vendorsReport: GetVendorStatementReportDto = {} as GetVendorStatementReportDto;
  reportsLoading: boolean = false;
  destroy$ = new Subject<void>();

  constructor(private service: ReportServiceService, private PrintService: PrintService) {}

  ngOnInit() {
    this.initiateFilterForm();
    this.getVendorsDropdown();
    this.subscriptions();
  }

  initiateFilterForm() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    this.searchForm = new FormGroup({
      vendorId: new FormControl(null, [Validators.required]),
      fromDate: new FormControl(firstDayOfMonth, [Validators.required]),
      toDate: new FormControl(lastDayOfMonth, [Validators.required]),
    });
  }

  subscriptions() {
    this.service.vendorDropdown$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.vendors = res;
    });

    this.service.vendorReport$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
      this.vendorsReport = res;
    });

    this.service.vendorLoading$.pipe(takeUntil(this.destroy$)).subscribe((load) => {
      this.reportsLoading = load;
    });
  }

  getVendorsDropdown() {
    this.service.fetchVendorsDropdown();
  }

  printTable(id: string): void {
    this.PrintService.print(id);
  }

  viewData() {
    if (this.searchForm.valid) {
      this.service.fetchVendorReport(this.searchForm.value);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
