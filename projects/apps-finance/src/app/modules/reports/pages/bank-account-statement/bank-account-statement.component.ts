import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountsChildrenDropDown } from 'projects/apps-accounting/src/app/modules/account/models';
import { JournalEntryService } from 'projects/apps-accounting/src/app/modules/journal-entry/journal-entry.service';
import { reportAccount } from 'projects/apps-accounting/src/app/modules/journal-entry/models';
import {
  ToasterService,
  LanguageService,
  RouterService,
  customValidators,
  FormsService,
  PrintService,
} from 'shared-lib';
import {
  BankAccount,
  BankAccountStatementDto,
  BankAccountStatementLinesDto,
  DropDownDto,
} from '../../models';
import { ReportsService } from '../../reports.service';

@Component({
  selector: 'app-bank-account-statement',
  templateUrl: './bank-account-statement.component.html',
  styleUrls: ['./bank-account-statement.component.scss'],
})
export class BankAccountStatementComponent {
  accountStatementForm: FormGroup;
  defoultSelectedAcounts: number[] = [];
  tableData: BankAccountStatementDto;
  transactions: BankAccountStatementLinesDto[] = [];
  totalDebit: number;
  totalCredit: number;
  cols: any[] = [];
  total: number = 0;
  currency: string;
  BankDropDown: DropDownDto[] = [];
  bankAccount: BankAccount[] = [];
  totalBalance: number;
  selectedBankName: string = '';
  selectedBankAccountName: string = '';
  openingDebit: number;
  openingCredit: number;
  openingBalance:number;
  openingHeader:String;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private reportsService: ReportsService,
    private routerService: RouterService,
    private router:Router,
    private titleService: Title,
    private languageService: LanguageService,
    private journalEntryService: JournalEntryService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    public generalService: GeneralService,
    private formsService: FormsService,

  ) {}

  ngOnInit() {
    this.titleService.setTitle(this.languageService.transalte('reportAccount.AccountStatement'));

    this.initializeForm();
    //this.initializeDates();

    this.accountStatementForm.valueChanges.subscribe(() => {
      this.tableData = {} as BankAccountStatementDto;
    });

    this.getBankDropDown();
    this.reportsService.getBankDropDownDataObservable.subscribe((res: any) => {
      this.BankDropDown = res;
    });
  }

  initializeForm() {
    this.accountStatementForm = this.fb.group({
      dateFrom: new FormControl('', [customValidators.required]),
      dateTo: new FormControl('', [customValidators.required]),
      bankId: new FormControl('', [customValidators.required]),
      bankAccountId: new FormControl('', [customValidators.required]),
    });
  }
  getAccountingReports() {
    if (!this.formsService.validForm(this.accountStatementForm)) return;
    if (
      this.accountStatementForm.get('dateFrom')?.value <
      this.accountStatementForm.get('dateTo')?.value
    ) {
      this.reportsService.getBankAccountStatement(this.accountStatementForm.value);

      this.reportsService.BankAccountStatementObservable.subscribe(
        (res: BankAccountStatementDto) => {
          this.tableData = res;
          this.transactions = res?.transactions;
          this.totalDebit = res?.totalDebit;
          this.totalCredit = res?.totalCredit;
          this.totalBalance = res?.totalBalance;
          this.openingDebit = res?.openingBalance?.debit;
          this.openingCredit = res?.openingBalance?.credit;
          this.openingBalance = res?.openingBalance?.balance;
          this.openingHeader =res?.openingBalance?.headerDescription;
        }
      );
    } else {
      this.ToasterService.showError(
        this.languageService.transalte('reportTrial.Error'),
        this.languageService.transalte(' date From is not before the end of dateTo.')
      );
    }
  }
  initializeDates() {
    const today = new Date();
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    this.accountStatementForm.patchValue({
      dateFrom: today.toISOString().split('T')[0],
      dateTo: endOfMonth.toISOString().split('T')[0],
    });
  }
  printTable(id: string) {
    this.PrintService.print(id);
  }
  getBankDropDown() {
    this.reportsService.bankDropDown();
  }

  bankAccountDropDown(bankId: number) {
    this.reportsService.bankAccountDropDown(bankId).subscribe((res: any) => {
      this.bankAccount = res;

      const selectedBank = this.BankDropDown.find((bank: any) => bank.id === bankId);
      if (selectedBank) {
        this.selectedBankName = selectedBank.name;
      }
    });
  }

  getCurrencyBankAccount(bankAccountId: number) {
    this.bankAccount.forEach((account: any) => {
      if (account.id == bankAccountId) {
        this.currency = account.currencyName;
        this.selectedBankAccountName = account.accountNumber;
      }
    });
  }

  routeToPaymentView(id:number){
    const test =location.href.split("/")
        console.log(test[3]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`${test[3]}/transcations/paymentin/view/${id}`])
    );
    window.open(url, '_blank');
      }
    
      routeToJournalView(id:number){
        const test =location.href.split("/")
            console.log(test[3]);
        const url = this.router.serializeUrl(
          this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
        );
        window.open(url, '_blank');
          }
    }