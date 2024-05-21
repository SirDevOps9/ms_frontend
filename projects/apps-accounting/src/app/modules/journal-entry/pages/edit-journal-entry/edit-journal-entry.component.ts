import { Component, OnInit } from '@angular/core';
import {
  EditJournalEntry,
  GetJournalEntryByIdDto,
  JournalEntryLineDto,
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
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JournalStatusUpdate } from '../../models/update-status';
import { AccountService } from '../../../account/account.service';
import { AccountDto } from '../../../account/models/accountDto';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountsComponent } from '../../components/accounts/accounts.component';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';

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

  ngOnInit() {
    this.getAccounts();
    this.initializeForm();
    this.initializeFormData();
    this.getCurrencies()
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
      status: new FormControl(),
      totalDebitAmount: new FormControl(),
      totalCreditAmount: new FormControl(),
      journalEntryLines: this.fb.array([]),
    });
  }

  initializeFormData() {
    this.journalEntryService
      .getJournalEntryById(this.routerService.currentId)
      .subscribe((res) => {
        this.editJournalForm.patchValue({
          ...res,
          journalDate: res.journalDate.substring(0, 10)
        },
        
      );

        console.log('calling init 1', this.editJournalForm.value);

        if (res.status === this.enums.JournalEntryStatus.Posted || res.status === this.enums.JournalEntryStatus.submited) {
          this.viewMode = true;
        }
        this.statusName = this.enums.JournalEntryStatus[res.status];
        this.journalTypeName = this.enums.JournalEntryType[res.type];

        this.journalEntry = res;
        this.journalEntryLines = res.journalEntryLines!;
        console.log(this.journalEntryLines);
        const journalEntryLinesArray = this.journalEntryLinesFormArray;

        journalEntryLinesArray.clear();

        this.journalEntryLines.forEach((line) => {
          const { currencyId, ...lineData } = line;

          journalEntryLinesArray.push(
            this.fb.group({
              id: new FormControl(lineData.id),
              accountId: new FormControl(lineData.accountId, [
                customValidators.required,
              ]),
              accountName: new FormControl(lineData.accountName),
              accountCode: new FormControl(lineData.accountCode),
              lineDescription: new FormControl(lineData.lineDescription),
              debitAmount: new FormControl(lineData.debitAmount, [
                customValidators.required,
              ]),
              creditAmount: new FormControl(lineData.creditAmount, [
                customValidators.required,
              ]),
              currency: new FormControl(lineData.currency, [
                customValidators.required,
              ]),
              currencyRate: new FormControl(lineData.currencyRate, [
                customValidators.required,
              ]),
              debitAmountLocal: new FormControl(lineData.debitAmountLocal),
              creditAmountLocal: new FormControl(lineData.creditAmountLocal),
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
      const currencyId = typeof item.currency == 'string'? this.currencies.find(c=>c.currencyName==item.currency)!.id : item.currency.id;
      return {...item, currencyId: currencyId }
    })
    this.journalEntryService.editJournalEntry(request)
  }

  ChangeStatus(status: number) {
    let journalStatus = new JournalStatusUpdate();
    journalStatus.id = this.routerService.currentId;
    journalStatus.status = status;
    console.log(status);
    console.log(journalStatus.id);
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
    journalLine.get('currencyRate')?.setValue(journalLine?.value?.currency?.ratePerUnit)

  }
  valueChanges(event: any, index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);

    const currencyRateControl = journalLine.get('currencyRate');
    const debitAmountControl = journalLine.get('debitAmount');
    const creditAmountControl = journalLine.get('creditAmount');
    const debitAmountLocalControl = journalLine.get('debitAmountLocal');
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');


    // Subscribe to changes in debit amount
    debitAmountControl?.valueChanges.subscribe((value) => {
      console.log(value)
      console.log(currencyRateControl?.value)
      const debitAmountLocal = event * currencyRateControl?.value;
      debitAmountLocalControl?.setValue(debitAmountLocal);
    });
    console.log(index, debitAmountControl);
    console.log(event);

    // Subscribe to changes in credit amount
    // creditAmountControl?.valueChanges.subscribe((value) => {
    //   const creditAmountLocal = value * currencyRateControl?.value;

    // });

    console.log(journalLine.get('creditAmount')?.value)
    console.log(journalLine.get('currencyRate')?.value)

    creditAmountLocalControl?.setValue(journalLine.get('creditAmount')?.value * journalLine.get('currencyRate')?.value);
    debitAmountLocalControl?.setValue(journalLine.get('debitAmount')?.value * journalLine.get('currencyRate')?.value);


    // Subscribe to changes in currency rate
    currencyRateControl?.valueChanges.subscribe((value) => {
      // Update debit amount local only if debit amount exists
      if (
        debitAmountControl?.value !== null &&
        debitAmountControl?.value !== undefined
      ) {
        const debitAmountLocal = debitAmountControl?.value * value;
        debitAmountLocalControl?.setValue(debitAmountLocal);
      }

      // Update credit amount local only if credit amount exists
      if (
        creditAmountControl?.value !== null &&
        creditAmountControl?.value !== undefined
      ) {
        const creditAmountLocal = creditAmountControl?.value * value;
        creditAmountLocalControl?.setValue(creditAmountLocal);
      }
    });
  }
  async deleteJournalEntryLine(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);
    const status = this.editJournalForm.get('status')?.value;

    if (!journalLine.get('id')?.value) {
      // If it's a new record, just remove it
      this.journalEntryLinesFormArray.removeAt(index);
    }
    else if (
      status === this.enums.JournalEntryStatus.DraftUnbalanced ||
      status === this.enums.JournalEntryStatus.Draftbalanced
    ) {
      // If it's not new and status is draft balanced or unbalanced, delete it from the backend
      const result = await this.journalEntryService.deleteJournalEntryLine(journalLine.get('id')?.value!);
      if (result)
        this.journalEntryLinesFormArray.removeAt(index);

    } else {
      // Otherwise, show an error message based on the status
      let message: string = '';
      if (status === this.enums.JournalEntryStatus.submited) {
        message = "Can't be deleted, the entry is already submitted.";
      } else if (status === this.enums.JournalEntryStatus.Posted) {
        message = "Can't be deleted, the entry is already posted.";
      }
      this.toasterService.showError('Failure', message);
    }
  }

  addNewRow() {
    this.journalEntryLinesFormArray.push(
      this.fb.group({
        id: new FormControl(0),
        accountCode: new FormControl('', [
          customValidators.required,
        ]),
        accountId: new FormControl(),
        accountName: new FormControl(),
        lineDescription: new FormControl(),
        debitAmount: new FormControl(0),
        creditAmount: new FormControl(0),
        currency: new FormControl(null, [
          customValidators.required,
        ]),
        currencyRate: new FormControl(),
        debitAmountLocal: new FormControl(),
        creditAmountLocal: new FormControl(),
      })
    );
  }

  getAccounts() {
    this.accountService
      .getAllChartOfAccountPaginated('', new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  filterAccount(event: any) {
    console.log(this.filteredAccounts);
    let query = event.query;
    this.accountService
      .getAllChartOfAccountPaginated(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  openDialog(index: number) {
    const ref = this.dialog.open(AccountsComponent, {});
    ref.onClose.subscribe((account: AccountDto) => {
      if (account) {
        const journalLine = this.journalEntryLinesFormArray.at(index);
        const accountId = journalLine.get('accountId');
        accountId?.setValue(account.id);
        const accountName = journalLine.get('accountName');
        accountName?.setValue(account.nameEn);
        journalLine.get('accountCode')?.setValue(account.accountCode);
      }
    });
  }

  updateAccount(event: any, index: number){
    console.log(event.value);
    const journalLine = this.journalEntryLinesFormArray.at(index);
    journalLine.get('accountId')?.setValue(event.value.id);
    const accountName = journalLine.get('accountName');
    accountName?.setValue(event.value.nameEn);
    journalLine.get('accountCode')?.setValue(event.value.accountCode);
  }

  getCurrencies() {
    this.currencyService.getCurrencies('');

      this.currencyService.currencies.subscribe((res) => {
        this.currencies = res;
      })
  }

  filterCurrency(event: any,) {
    console.log(event)
    let query = event.query.toLowerCase();
    console.log(this.currencies)
    this.fitleredCurrencies = this.currencies.filter(c =>
      c.currencyName?.toLowerCase().includes(query));


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
    private currencyService: CurrencyService,

  ) { }
}
