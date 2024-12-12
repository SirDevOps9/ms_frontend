import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetVendorStatementReportDto } from '../../models';
import { ReportServiceService } from '../../report-service.service';
import { PrintService } from 'shared-lib';

@Component({
  selector: 'app-vendor-report',
  templateUrl: './vendor-report.component.html',
  styleUrl: './vendor-report.component.scss',
})
export class VendorReportComponent {
  searchForm: FormGroup;
  vendors: any = [];
  vendorsReport: GetVendorStatementReportDto = {} as GetVendorStatementReportDto;
  searchTerm: string;
  reportsLoading: boolean = false;

  constructor(private service: ReportServiceService, private PrintService: PrintService) {}

  ngOnInit() {
    this.initiateFilterForm();
    this.getVendorsDropdown();
    this.subscriptions();
  }

  initiateFilterForm() {
    this.searchForm = new FormGroup({
      vendorId: new FormControl('', [Validators.required]),
      fromDate: new FormControl(''),
      toDate: new FormControl(''),
    });
  }

  subscriptions() {
    this.service.vendorDropdown$.subscribe((res) => {
      this.vendors = res;
    });

    this.service.vendorReport$.subscribe((res) => {
      this.vendorsReport = res;
    });

    this.service.vendorLoading$.subscribe((load) => {
      this.reportsLoading = load;
    });
  }

  getVendorsDropdown() {
    this.service.fetchVendorsDropdown();
  }

  printTable(id: string): void {
    this.PrintService.print(id);
  }

  onSearchChange() {}
  viewData() {
    if (this.searchForm.valid) {
      this.service.fetchVendorReport(this.searchForm.value);
    }
  }
}
