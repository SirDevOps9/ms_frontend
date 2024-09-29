import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ToasterService,
  LanguageService,
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
import { SourceDocument } from '../../models/source-document-dto';

@Component({
  selector: 'app-bank-account-statement',
  templateUrl: './bank-account-statement.component.html',
  styleUrls: ['./bank-account-statement.component.scss'],
})
export class BankAccountStatementComponent {
  accountStatementForm: FormGroup;
  tableData?: BankAccountStatementDto;
  transactions: BankAccountStatementLinesDto[] = [];
  total: number = 0;
  currency: string;
  BankDropDown: DropDownDto[] = [];
  bankAccount: BankAccount[] = [];
  totalBalance: number;
  selectedBankName: string = '';
  selectedBankAccountName: string = '';
  openingDebit: number;
  openingCredit: number;
  openingBalance: number;
  openingHeader: String;

    fromDate : string = ''
  toDate : string = ''
  constructor(
    private fb: FormBuilder,
    private reportsService: ReportsService,
    private router: Router,
    private languageService: LanguageService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    private formsService: FormsService
  ) {}

  ngOnInit() {

    this.initializeForm();
    this.initializeDates();

    this.accountStatementForm.valueChanges.subscribe(() => {
      this.tableData = undefined;
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
        }
      );
    } else {
      this.ToasterService.showError(
        this.languageService.transalte('Error'),
        this.languageService.transalte('DateFromLessThanToValidation')
      );
    }
  }
  initializeDates() {
    const today = new Date();
    let startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    startOfMonth.setDate(startOfMonth.getDate() + 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1);
    this.accountStatementForm.patchValue({
      dateFrom: startOfMonth.toISOString().split('T')[0],
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

  routeToPaymentView(id: number, paymentname: string) {
    const currentUrl = location.href.split('/');
    if (paymentname == SourceDocument.PaymentIn) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`${currentUrl[3]}/transcations/paymentin/view/${id}`])
      );
      window.open(url, '_blank');
    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`${currentUrl[3]}/transcations/paymentout/view/${id}`])
      );
      window.open(url, '_blank');
    }
  }
  routeToJournalView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
    );
    window.open(url, '_blank');
  }
}
