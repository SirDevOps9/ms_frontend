import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import {
  RouterService,
  LanguageService,
  PageInfo,
  customValidators,
  ToasterService,
  PrintService,
} from 'shared-lib';
import { AccountService } from '../../../../account/account.service';
import { AccountDto, AccountsChildrenDropDown } from '../../../../account/models';
import { JournalEntryService } from '../../../journal-entry.service';
import { reportAccount } from '../../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { DialogService } from 'primeng/dynamicdialog';
import { MultiSelectDetailedAccountsComponent } from '../../../components/multi-select-detailed-accounts/multi-select-detailed-accounts.component';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrl: './account-statement.component.scss',
})
export class AccountStatementComponent {
  reportAccountForm: FormGroup;
  filteredAccounts: AccountsChildrenDropDown[] = [];
  defoultSelectedAcounts: number[] = [];

  tableData: reportAccount[];
  cols: any[] = [];
  total: number = 0;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: ActivatedRoute,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    public generalService: GeneralService,
    private route:Router,
    private dialog: DialogService

  ) {}

  ngOnInit() {

    this.initializeForm();
    this.getAccounts();
    this.initializeDates();

    this.reportAccountForm.valueChanges.subscribe(() => {
      this.tableData = [];
    });
  }
  getAccounts() {
    this.accountService.getDetailedAccounts().subscribe((r) => {
      this.filteredAccounts = r.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
      if (this.router.snapshot.params['id']) {
        this.defoultSelectedAcounts.push(Number(this.router.snapshot.params['id']));
        this.reportAccountForm
          .get('Accounts')
          ?.setValue([Number(this.router.snapshot.params['id'])]);
      } else {
        this.filteredAccounts.forEach((element) => {
          // this.defoultSelectedAcounts.push(element.id);
        });
        this.reportAccountForm.get('Accounts')?.setValue(this.defoultSelectedAcounts);
      }
    });
  }
  initializeForm() {
    this.reportAccountForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      posted: new FormControl(true),
      unposted: new FormControl(false),
      Accounts: new FormControl([]),
    });
  }
  getAccountingReports() {
    if (this.reportAccountForm.valid) {
      if (
        this.reportAccountForm.get('dateFrom')?.value < this.reportAccountForm.get('dateTo')?.value
      ) {
        if (
          this.reportAccountForm.get('posted')?.value != true &&
          this.reportAccountForm.get('unposted')?.value != true
        ) {
          // At least one field must be selected
          this.ToasterService.showError(
            this.languageService.transalte('reportTrial.Error'),
            this.languageService.transalte('reportTrial.selectfaild')
          );
        } else {
          if (this.reportAccountForm.get('Accounts')?.value == null)
            this.reportAccountForm.get('Accounts')?.setValue([]);

          this.journalEntryService.getAccountingReports(this.reportAccountForm.value);

          this.journalEntryService.accountReport.subscribe((res: any) => {
            this.tableData = res;
            this.tableData = this.tableData.map((x) => {
              return {
                ...x,
                totalDebitAmount: x.journalEntryDtos.reduce(
                  (sum, transaction) => sum + transaction.debitAmount,
                  0
                ),
                totalCreditAmount: x.journalEntryDtos.reduce(
                  (sum, transaction) => sum + transaction.creditAmount,
                  0
                ),

                journalEntryDtos: x.journalEntryDtos.map((t) => {
                  const formatdebitAmount = this.generalService.formatNumber(
                    t?.debitAmount,
                    this.generalService.fraction
                  );
                  const formatcreditAmount = this.generalService.formatNumber(
                    t?.creditAmount,
                    this.generalService.fraction
                  );
                  const balance = this.generalService.formatNumber(
                    t?.balance,
                    this.generalService.fraction
                  );
                  return {
                    ...t,
                    creditAmount: formatcreditAmount,
                    debitAmount: formatdebitAmount,
                    balance: balance,
                  };
                }),
              };
            });
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
    const today = new Date();
    let startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setDate(startOfMonth.getDate() + 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    this.reportAccountForm.patchValue({
      dateFrom: startOfMonth.toISOString().split('T')[0],
      dateTo: endOfMonth.toISOString().split('T')[0],
    });
  }
  printTable(id: string) {
    this.PrintService.print(id);
  }

  routeTo(id:number){
    const test =location.href.split("/")
        console.log(test[3]);
    const url = this.route.serializeUrl(
      this.route.createUrlTree([`${test[3]}/transcations/journalentry/view/${id}`])
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
            this.reportAccountForm.get('Accounts')?.setValue(selectedIds);
          }
        });
      }
}
