import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  EditJournalEntry,
  GetJournalEntryByIdDto,
  JournalEntryLineDto,
  JournalEntryStatus,
  SharedJournalEnums,
} from '../../models';
import { JournalEntryService } from '../../journal-entry.service';
import {
  FormsService,
  PageInfo,
  RouterService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { JournalStatusUpdate } from '../../models/update-status';
import { AccountService } from '../../../account/account.service';
import { AccountDto } from '../../../account/models/accountDto';
import { DialogService } from 'primeng/dynamicdialog';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { NoChildrenAccountsComponent } from '../../components/noChildrenAccounts/nochildaccounts.component';

@Component({
  selector: 'app-edit-journal-entry',
  templateUrl: './edit-journal-entry.component.html',
  styleUrls: ['./edit-journal-entry.component.scss'],
  providers: [RouterService],
})
export class EditJournalEntryComponent implements OnInit {
  editJournalForm: FormGroup;
  journalEntry?: GetJournalEntryByIdDto;
  journalEntryLines?: JournalEntryLineDto[];
  accountIdList: number[] = [];
  currencyIdList: number[] = [];
  viewMode: boolean = false;
  statusName: string;
  journalTypeName: string;

  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[] = [];
  fitleredCurrencies: CurrencyDto[];
  selectedCurrency: string;

  debitLocal: string;
  creditLocal: string;

  ngOnInit() {
    this.getAccounts();
    this.initializeForm();
    this.initializeFormData();
    this.getCurrencies();
  }

  initializeForm() {
    this.editJournalForm = this.fb.group({
      journalCode: new FormControl(),
      referenceNumber: new FormControl(),
      journalDate: new FormControl('', [
        customValidators.required,
        customValidators.notOnlyWhitespaceValidator,
      ]),
      description: new FormControl(),
      journalPeriod: new FormControl(),
      type: new FormControl(),
      sourceName: new FormControl(),
      sourceCode: new FormControl(),
      reversedJournalCode: new FormControl(),
      status: new FormControl(''),
      totalDebitAmount: new FormControl(),
      totalCreditAmount: new FormControl(),
      journalEntryLines: this.fb.array([]),
    });
  }

  initializeFormData() {
    this.journalEntryService.getJournalEntryById(this.routerService.currentId).subscribe((res) => {
      this.editJournalForm.patchValue({
        ...res,
        journalDate: res.journalDate.substring(0, 10),
      });
      if (
        res.status === this.enums.JournalEntryStatus.Posted ||
        res.status === this.enums.JournalEntryStatus.Submitted
      ) {
        this.viewMode = true;
      }
      this.statusName = res.status;
      this.journalTypeName = this.enums.JournalEntryType[res.type];

      this.journalEntry = res;
      this.journalEntryLines = res.journalEntryLines!;
     // console.log(this.journalEntryLines);
      const journalEntryLinesArray = this.journalEntryLinesFormArray;

      journalEntryLinesArray.clear();

      this.journalEntryLines.forEach((line) => {
        const { currencyId, debitAmount, creditAmount, currencyRate, ...lineData } = line;

        journalEntryLinesArray.push(
          this.fb.group({
            id: new FormControl(lineData.id),
            accountId: new FormControl(lineData.accountId, [customValidators.required]),
            accountName: new FormControl(lineData.accountName),
            accountCode: new FormControl(lineData.accountCode),
            lineDescription: new FormControl(lineData.lineDescription),
            debitAmount: new FormControl(debitAmount, [customValidators.required]),
            creditAmount: new FormControl(creditAmount, [customValidators.required]),
            currency: new FormControl(lineData.currency, [customValidators.required]),
            currencyRate: new FormControl(currencyRate, [customValidators.required]),
            debitAmountLocal: new FormControl(debitAmount * currencyRate),
            creditAmountLocal: new FormControl(creditAmount * currencyRate),
          })
        );

        this.currencyIdList.push(currencyId);
      });
      // }
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editJournalForm, true)) return;

    const request: EditJournalEntry = this.editJournalForm.value;
    request.id = this.routerService.currentId;

    request.journalEntryLines = request.journalEntryLines?.map((item) => {
      const currencyId =
        typeof item.currency == 'string'
          ? this.currencies.find((c) => c.currencyName == item.currency)!.id
          : item.currency.id;
      return { ...item, currencyId: currencyId };
    });
    this.journalEntryService.editJournalEntry(request);
  }

  ChangeStatus(status: JournalEntryStatus) {
    let journalStatus = new JournalStatusUpdate();
    journalStatus.id = this.routerService.currentId;
    journalStatus.status = status;
    //console.log(status);
   // console.log(journalStatus.id);
    this.journalEntryService.ChangeStatus(journalStatus).subscribe(() => {
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }

  onDiscard() {
    //this.editJournalForm.reset();
    this.initializeFormData();
  }

  get journalEntryLinesFormArray() {
    return this.editJournalForm.get('journalEntryLines') as FormArray;
  }
  oncurrencyChange(e: any, journalLine: FormGroup) {
    journalLine.get('currencyRate')?.setValue(journalLine?.value?.currency?.ratePerUnit);
  }

  async deleteJournalEntryLine(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);
    const status = this.editJournalForm.get('status')?.value;

    if (!journalLine.get('id')?.value) {
      // If it's a new record, just remove it
      this.journalEntryLinesFormArray.removeAt(index);
    } else if (
      status === this.enums.JournalEntryStatus.DraftUnbalanced ||
      status === this.enums.JournalEntryStatus.Draftbalanced
    ) {
      // If it's not new and status is draft balanced or unbalanced, delete it from the backend
      const result = await this.journalEntryService.deleteJournalEntryLine(
        journalLine.get('id')?.value!
      );
      if (result) this.journalEntryLinesFormArray.removeAt(index);
    } else {
      // Otherwise, show an error message based on the status
      let message: string = '';
      if (status === this.enums.JournalEntryStatus.Submitted) {
        message = "Can't be deleted, the entry is already submitted.";
      } else if (status === this.enums.JournalEntryStatus.Posted) {
        message = "Can't be deleted, the entry is already posted.";
      }
      this.toasterService.showError('Failure', message);
    }
  }

  addNewRow() {
    let newLine = this.fb.group({
      id: new FormControl(0),
      accountCode: new FormControl('', [customValidators.required]),
      accountId: new FormControl(),
      accountName: new FormControl(),
      lineDescription: new FormControl(),
      debitAmount: new FormControl(0, [customValidators.required, Validators.min(0)]),
      creditAmount: new FormControl(0, [customValidators.required, Validators.min(0)]),
      currency: new FormControl(null, [customValidators.required]),
      currencyRate: new FormControl(),
      debitAmountLocal: new FormControl(),
      creditAmountLocal: new FormControl(),
    });
    this.journalEntryLinesFormArray.push(newLine);
  }

  getAccounts() {
    this.accountService
      .getAccountsHasNoChildren('', new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  filterAccount(event: any) {
   //console.log(this.filteredAccounts);
    let query = event.query;
    this.accountService
      .getAllChartOfAccountPaginated(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {});
    ref.onClose.subscribe((account: AccountDto) => {
      if (account) {
        this.updateAccount(account.id, index);
        // const journalLine = this.journalEntryLinesFormArray.at(index);
        // const accountId = journalLine.get('accountId');
        // accountId?.setValue(account.id);
        // const accountName = journalLine.get('accountName');
        // accountName?.setValue(account.name);
        // journalLine.get('accountCode')?.setValue(account.accountCode);
      }
    });
  }

  updateAccount(event: any, index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);

    journalLine.get('accountId')?.setValue(event);
    var accountData = this.filteredAccounts.find((c) => c.id == event);

    const accountName = journalLine.get('accountName');
    accountName?.setValue(accountData?.name);

    journalLine.get('accountCode')?.setValue(accountData?.accountCode);

    var currencyData = this.currencies.find((c) => c.id == accountData?.currencyId);

    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;

    currencyControl?.setValue(currencyData?.currencyName);
    this.selectedCurrency = currencyData?.currencyName!;
    currencyRateControl.setValue(currencyData?.ratePerUnit);
  }

  getCurrencies() {
    this.currencyService.getCurrencies('');

    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
    });
  }

  filterCurrency(event: any) {
    //console.log(event);
    let query = event.query.toLowerCase();
    //console.log(this.currencies);
    this.fitleredCurrencies = this.currencies.filter((c) =>
      c.currencyName?.toLowerCase().includes(query)
    );
  }

  debitValueChanges(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);
    const creditAmountControl = journalLine.get('creditAmount');
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');
    const debitAmountLocalControl = journalLine.get('debitAmountLocal');

    creditAmountControl!.setValue(0);
    creditAmountLocalControl?.setValue(0);
    debitAmountLocalControl?.setValue(
      journalLine.get('debitAmount')?.value * journalLine.get('currencyRate')?.value
    );
  }

  creditValueChanges(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);
    const debitAmountControl = journalLine.get('debitAmount');
    const debitAmountLocalControl = journalLine.get('debitAmountLocal');
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');

    debitAmountControl!.setValue(0);
    debitAmountLocalControl?.setValue(0);

    creditAmountLocalControl?.setValue(
      journalLine.get('creditAmount')?.value * journalLine.get('currencyRate')?.value
    );
  }

  currencyValueChanges(event: any, index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);
    const currencyRateControl = journalLine.get('currencyRate');
    const debitAmountControl = journalLine.get('debitAmount');
    const creditAmountControl = journalLine.get('creditAmount');
    const debitAmountLocalControl = journalLine.get('debitAmountLocal');
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');

    currencyRateControl?.valueChanges.subscribe((value) => {
      // Update debit amount local only if debit amount exists
      if (debitAmountControl?.value !== null && debitAmountControl?.value !== undefined) {
        const debitAmountLocal = debitAmountControl?.value * value;
        debitAmountLocalControl?.setValue(debitAmountLocal);
      }

      // Update credit amount local only if credit amount exists
      if (creditAmountControl?.value !== null && creditAmountControl?.value !== undefined) {
        const creditAmountLocal = creditAmountControl?.value * value;
        creditAmountLocalControl?.setValue(creditAmountLocal);
      }
    });
  }

  constructor(
    private journalEntryService: JournalEntryService,
    private routerService: RouterService,
    private fb: FormBuilder,
    private formsService: FormsService,
    private accountService: AccountService,
    private dialog: DialogService,
    public enums: SharedJournalEnums,
    private toasterService: ToasterService,
    private currencyService: CurrencyService
  ) {}
}
