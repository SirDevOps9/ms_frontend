import { Component, OnInit } from '@angular/core';
import { reportTrialDto } from '../../../models';
import {
  DateTimeService,
  LanguageService,
  PrintService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountsChildrenDropDown } from '../../../../account/models';
import { AccountService } from '../../../../account/account.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { MultiSelectDetailedAccountsComponent } from '../../../components/multi-select-detailed-accounts/multi-select-detailed-accounts.component';

@Component({
  selector: 'app-trial-blance',
  templateUrl: './trial-blance.component.html',
  styleUrl: './trial-blance.component.scss',
})
export class TrialBlanceComponent implements OnInit {
  reportTrialForm: FormGroup;
  filteredAccounts: AccountsChildrenDropDown[] = [];
  defoultSelectedAcounts: number[] = [];

  tableData: reportTrialDto[] = [];
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    private dateTimeService: DateTimeService,
    public generalService: GeneralService,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.tableData = [];
    this.initializeForm();
    this.getAccounts();
    this.initializeDates();
    this.reportTrialForm.valueChanges.subscribe((res) => {
      this.tableData = [];
    });
  }
  printTable(id: string) {
    this.PrintService.print(id);
  }

  getAccounts() {
    this.accountService.getDetailedAccounts().subscribe((r) => {
      this.filteredAccounts = r.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
  }
  initializeForm() {
    this.reportTrialForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      posted: new FormControl(true),
      unposted: new FormControl(false),
      allowZero: new FormControl(false),
      Accounts: new FormControl([]),
    });
  }
  getTrialBalance() {
    if (this.reportTrialForm.valid) {
      const dateFrom = this.reportTrialForm.get('dateFrom')?.value;
      const dateTo = this.reportTrialForm.get('dateTo')?.value;

      if (dateFrom >= dateTo) {
        this.ToasterService.showError(
          this.languageService.transalte('reportTrial.Error'),
          this.languageService.transalte('reportTrial.DateFromNotBeforeDateTo')
        );
        return; // Exit the function if dateFrom is not before dateTo
      }

      const isPostedChecked = this.reportTrialForm.get('posted')?.value;
      const isUnpostedChecked = this.reportTrialForm.get('unposted')?.value;

      if (!isPostedChecked && !isUnpostedChecked) {
        this.ToasterService.showError(
          this.languageService.transalte('reportTrial.Error'),
          this.languageService.transalte('reportTrial.selectField')
        );
        return; // Exit the function if neither posted nor unposted is selected
      }

      if (this.reportTrialForm.get('Accounts')?.value == null) {
        this.reportTrialForm.get('Accounts')?.setValue([]);
      }

      this.journalEntryService.getTrialBalance(this.reportTrialForm.value);
      this.journalEntryService.report.subscribe((res: any) => {
        this.tableData = res.map(
          (x: any) =>
            ({
              accountId: x.accountId,
              accountCode: x.accountCode,
              accountName: x.accountName,
              accountNature: x.accountNature,
              openingBalance: {
                debit: this.generalService.formatNumber(
                  x.openingBalance.debit,
                  this.generalService.fraction
                ),
                credit: this.generalService.formatNumber(
                  x.openingBalance.credit,
                  this.generalService.fraction
                ),
              },
              transactionBalance: {
                debit: this.generalService.formatNumber(
                  x.transactionBalance.debit,
                  this.generalService.fraction
                ),
                credit: this.generalService.formatNumber(
                  x.transactionBalance.credit,
                  this.generalService.fraction
                ),
              },
              endingBalance: {
                debit: this.generalService.formatNumber(
                  x.endingBalance.debit,
                  this.generalService.fraction
                ),
                credit: this.generalService.formatNumber(
                  x.endingBalance.credit,
                  this.generalService.fraction
                ),
              },
            } as reportTrialDto)
        );
      });
    }
  }
  initializeDates() {
    this.reportTrialForm.patchValue({
      dateFrom: this.dateTimeService.firstDayOfMonth(),
      dateTo: this.dateTimeService.lastDayOfMonth(),
    });
  }
  routeTo(id: number) {
    const test = location.href.split('/');
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`${test[3]}/transcations/account-statement/${id}`])
    );
    window.open(url, '_blank');
  }
  openDialog() {
    const ref = this.dialog.open(MultiSelectDetailedAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((selectedAccounts: AccountsChildrenDropDown[]) => {
      if (selectedAccounts) {
        const selectedIds = selectedAccounts.map((acc) => acc.id);
        this.reportTrialForm.get('Accounts')?.setValue(selectedIds);
      }
    });
  }
}
