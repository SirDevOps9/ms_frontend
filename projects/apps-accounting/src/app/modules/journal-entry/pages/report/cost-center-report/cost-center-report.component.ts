import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  LanguageService,
  customValidators,
  ToasterService,
  DateTimeService,
  PrintService,
} from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { GetOpenFinancialPeriodDate, reportCostAllData } from '../../../models';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';

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
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    public generalService: GeneralService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.getAccounts();
    this.getOpenFinancialPeriodDate();
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
          if (this.reportCostForm.get('costCenters')?.value == null)
            this.reportCostForm.get('costCenters')?.setValue([]);

          this.journalEntryService.getCostCenterReports(this.reportCostForm.value);
          this.journalEntryService.CostCenterReport.subscribe((res: any) => {
            if (res.length > 0) {
              this.tableData = res;
              this.tableData = this.tableData.map((x) => {
                return {
                  ...x,
                  transactions: x.transactions.map((t) => {
                    const formatdebitAmount = this.generalService.formatNumber(
                      t?.debit,
                      this.generalService.fraction
                    );
                    const formatcreditAmount = this.generalService.formatNumber(
                      t?.credit,
                      this.generalService.fraction
                    );
                    const balance = this.generalService.formatNumber(
                      t?.balance,
                      this.generalService.fraction
                    );
                    return {
                      ...t,
                      debit: formatdebitAmount,
                      credit: formatcreditAmount,
                      balance: balance,
                    };
                  }),
                };
              });
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
  getOpenFinancialPeriodDate() {
    this.journalEntryService
      .getOpenFinancialYearDate()
      .subscribe((res: GetOpenFinancialPeriodDate) => {
        if (res) {
          const dateFrom = new Date(res.dateFrom);
          const dateTo = new Date(res.dateTo);
          this.reportCostForm.patchValue({
            dateFrom: dateFrom,
            dateTo: dateTo,
          });
        } else {
          this.initializeDates();
        }
      });
  }
  printTable(id: string) {
    this.PrintService.print(id);
  }
  initializeDates() {
    this.reportCostForm.patchValue({
      dateFrom: this.dateTimeService.firstDayOfMonth(),
      dateTo: this.dateTimeService.lastDayOfMonth(),
    });
  }
}
