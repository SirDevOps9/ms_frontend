import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LanguageService, customValidators, ToasterService, DateTimeService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { reportCostAllData } from '../../../models';

@Component({
  selector: 'app-cost-center-report',
  templateUrl: './cost-center-report.component.html',
  styleUrl: './cost-center-report.component.scss',
})
export class CostCenterReportComponent {
  reportCostForm: FormGroup;
  filteredAccounts: any;
  defoultSelectedAcounts: number[] = [];

  tableData: reportCostAllData[];
  test: reportCostAllData[];

  constructor(
    private fb: FormBuilder,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService: ToasterService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('reportCost.title'));
    this.initializeForm();
    this.getAccounts();
    this.initializeDates();
    this.reportCostForm.valueChanges.subscribe(() => {
      this.tableData = [];
    });
  }
  getAccounts() {
    this.journalEntryService.getCostCenterLookup().subscribe((res: any[]) => {
      this.filteredAccounts = res.map((costCenter) => ({
        ...costCenter,
        displayName: `${costCenter.name} (${costCenter.code})`,
      }));
    });
  }
  initializeForm() {
    this.reportCostForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      posted: new FormControl(true),
      unposted: new FormControl(false),
      costCenters: new FormControl([]),
    });
  }
  getCostCenterReports() {
    if (this.reportCostForm.valid) {
      if (this.reportCostForm.get('dateFrom')?.value < this.reportCostForm.get('dateTo')?.value) {
        if (
          this.reportCostForm.get('posted')?.value != true &&
          this.reportCostForm.get('unposted')?.value != true
        ) {
          // At least one field must be selected
          this.ToasterService.showError(
            this.languageService.transalte('reportTrial.Error'),
            this.languageService.transalte('reportTrial.selectfaild')
          );
        } else {
          this.journalEntryService.getCostCenterReports(this.reportCostForm.value);
          this.journalEntryService.CostCenterReport.subscribe((res: any) => {
            if (res.length > 0) {
              this.tableData = res;
              console.log(this.tableData, '00000000');
            }
          });
        }
      } else {
        this.ToasterService.showError(
          this.languageService.transalte('reportTrial.Error'),
          this.languageService.transalte(' date From is not before the end of dateTo.')
        );
      }
    }
  }
  initializeDates() {
    this.reportCostForm.patchValue({
      dateFrom: this.dateTimeService.firstDayOfMonth(),
      dateTo: this.dateTimeService.lastDayOfMonth(),
    });
  }
}
