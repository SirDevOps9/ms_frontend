import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import {
  customValidators,
  PageInfo,
  RouterService,
  FormsService,
  ToasterService,
  LanguageService,
} from 'shared-lib';
import { AccountService } from '../../../../account/account.service';
import { AccountDto } from '../../../../account/models';
import { CurrencyService } from '../../../../general/currency.service';
import { CurrencyDto } from '../../../../general/models/currencyDto';
import { NoChildrenAccountsComponent } from '../../../components/noChildrenAccounts/nochildaccounts.component';
import { JournalEntryService } from '../../../journal-entry.service';
import {
  costCenters,
  JournalEntryType,
  EditJournalEntry,
  JournalEntryStatus,
  SharedJournalEnums,
  GetGlOpeningBalanceById,
  JournalEntryGlBalanceLineDto,
  EditJournalEntryLine,
} from '../../../models';
import { JournalStatusUpdate } from '../../../models/update-status';
import { EditCostCenterAllocationPopupComponent } from '../../components/edit-cost-center-allocation-popup/edit-cost-center-allocation-popup.component';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { CurrentUserService } from 'libs/shared-lib/src/lib/services/currentuser.service';
import { CostCenterAllocationPopupComponent } from '../../components/cost-center-allocation-popup/cost-center-allocation-popup.component';

@Component({
  selector: 'app-edit-journal-entry-opening-balance',
  templateUrl: './edit-journal-entry-opening-balance.component.html',
  styleUrl: './edit-journal-entry-opening-balance.component.scss',
})
export class EditJournalEntryOpeningBalanceComponent {
  editJournalForm: FormGroup;
  journalEntry?: GetGlOpeningBalanceById;
  journalEntryLines?: JournalEntryGlBalanceLineDto[];
  accountIdList: number[] = [];
  currencyIdList: number[] = [];
  costCenters: costCenters[] = [];
  currentAccounts: number[] = [];
  totalDebitAmount: number;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  ID: number;
  viewMode: boolean = false;
  disFlag: boolean = true;
  statusName: string;
  journalTypeName: JournalEntryType;
  dirtyTouchedGroups: { index: number; value: any }[] = [];

  journalFilteredData: EditJournalEntryLine[];
  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[] = [];
  fitleredCurrencies: CurrencyDto[];
  selectedCurrency: string;
  isPatching: boolean = false;

  debitLocal: string;
  creditLocal: string;

  ngOnInit() {
    this.ID = this.route.snapshot.params['id'];

    this.getAccounts();
    this.initializeForm();
    this.initializeFormData();
    this.getCurrencies();
    this.journalEntryLinesFormArray.valueChanges.subscribe((res) => {
      if (res && !this.isPatching) {
        this.disFlag = false;
      }
    });
    this.journalEntryLinesArray.valueChanges.subscribe(() => {
      this.journalFilteredData = this.generalService.getDirtyTouchedGroups(
        this.journalEntryLinesArray
      );
    });
  }

  get journalEntryLinesArray(): FormArray {
    return this.editJournalForm.get('journalEntryLines') as FormArray;
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
    this.isPatching = true;

    this.journalEntryService.getJournalEntryOpeningBalanceById(this.ID).subscribe((res) => {
      this.editJournalForm.patchValue({
        ...res,
        // journalDate: new Date(res.journalDate),
      });
      if (
        res.status === this.enums.JournalEntryStatus.Posted ||
        res.status === this.enums.JournalEntryStatus.Submitted
      ) {
        this.viewMode = true;
      }
      this.statusName = res.status;
      this.journalTypeName = res.type;

      this.journalEntry = res;
      this.journalEntryLines = res.openingBalanceJournalEntryLines!;
      const journalEntryLinesArray = this.journalEntryLinesFormArray;

      journalEntryLinesArray.clear();

      this.journalEntryLines.forEach((line) => {
        const { debitAmount, creditAmount, costCenters, currencyRate, ...lineData } = line;

        const lineGroup = this.fb.group(
          {
            id: new FormControl(lineData.id),
            accountId: new FormControl(lineData.accountId, [customValidators.required]),
            accountName: new FormControl(lineData.accountName),
            accountCode: new FormControl(lineData.accountCode),
            lineDescription: new FormControl(lineData.lineDescription, [customValidators.required]),
            debitAmount: new FormControl(debitAmount, [customValidators.required]),
            creditAmount: new FormControl(creditAmount, [customValidators.required]),
            currencyId: new FormControl(lineData.currencyId, [customValidators.required]),
            currency: new FormControl(lineData.currency, [customValidators.required]),
            currencyRate: new FormControl(currencyRate, [customValidators.required]),
            debitAmountLocal: new FormControl(debitAmount * currencyRate),
            creditAmountLocal: new FormControl(creditAmount * currencyRate),
            costCenters: [line.costCenters],
            costCenterConfig: new FormControl(lineData.costCenterConfig),
            selectedFalg: new FormControl(false),
          },
          { validators: customValidators.debitAndCreditBothCanNotBeZero }
        );
        lineGroup.updateValueAndValidity();

        journalEntryLinesArray.push(lineGroup);
        this.isPatching = false;
      });
      this.currentAccounts = this.journalEntryLines.map((line) => line.accountId);

      this.calculateTotalCreditAmount();
      this.calculateTotalDebitAmount();
      this.calculateTotalDebitAmountLocal();
      this.calculateTotalCreditAmountLocal();
    });
  }

  onFilter(event: any) {
    this.accountService.getAccountsHasNoChildrenNew(event, new PageInfo());

    this.accountService.childrenAccountList.subscribe((res: any) => {
      if (res.length) {
        this.filteredAccounts = res.map((account: any) => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`,
        }));
      }
    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editJournalForm, false)) return;

    const request: EditJournalEntry = this.editJournalForm.value;
    request.journalDate = this.convertDateFormat(request.journalDate);
    request.id = this.ID;

    request.journalEntryLines = this.journalFilteredData?.map((item) => {
      item.costCenters = item.costCenters
        ? item.costCenters.map((item) => {
            return {
              id: item.id ? item.id : 0,
              percentage: +item.percentage,
              costCenterId: item.costCenterId,
            };
          })
        : [];
      return item;
    });

    this.journalEntryService.editJournalEntryOpeningBalance(request);
  }

  ChangeStatus(status: JournalEntryStatus) {
    let journalStatus = new JournalStatusUpdate();
    journalStatus.id = this.ID;
    journalStatus.status = status;

    if (status == 'unPosted' && !this.journalEntryLinesFormArray.value.length) {
      this.toasterService.showError('Failure', 'journalEntry Lines is required');
      return;
    } else {
      this.journalEntryService.ChangeStatusOpeneingBalance(journalStatus).subscribe(() => {
        setTimeout(() => {
          this.getAccounts();
          this.initializeForm();
          this.initializeFormData();
          this.getCurrencies();
          //location.reload();
        }, 1500);
      });
    }
  }

  onDiscard() {
    this.routerService.navigateTo(`/transcations/journal-entry-opening-balance`);
  }

  get journalEntryLinesFormArray() {
    return this.editJournalForm.get('journalEntryLines') as FormArray;
  }

  async deleteJournalEntryLine(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);
    const status = this.editJournalForm.get('status')?.value;

    if (!journalLine.get('id')?.value) {
      // If it's a new record, just remove it
      this.journalEntryLinesFormArray.removeAt(index);
    } else if (
      status === this.enums.JournalEntryStatus.Unbalanced ||
      status === this.enums.JournalEntryStatus.Draft
    ) {
      // If it's not new and status is draft balanced or unbalanced, delete it from the backend
      const result = await this.journalEntryService.deleteJournalEntryLineOpeningBalance(
        journalLine.get('id')?.value!
      );
      if (result) {
        this.journalEntryLinesFormArray.removeAt(index);
        this.journalEntryService.journalStatus.subscribe((res) => {
          this.statusName = res;
        });
        this.calculateTotalCreditAmount();
        this.calculateTotalDebitAmount();
        this.calculateTotalDebitAmountLocal();
        this.calculateTotalCreditAmountLocal();
      }
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

  calculateTotalDebitAmount() {
    this.totalDebitAmount = this.journalEntryLinesFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('debitAmount')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }
  calculateTotalCreditAmount() {
    this.totalCreditAmount = this.journalEntryLinesFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('creditAmount')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }

  calculateTotalDebitAmountLocal() {
    this.totalDebitAmountLocal = this.journalEntryLinesFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('debitAmountLocal')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }
  calculateTotalCreditAmountLocal() {
    this.totalCreditAmountLocal = this.journalEntryLinesFormArray.controls.reduce(
      (acc, control) => {
        // Ensure that debitAmount is treated as a number
        const debitValue = parseFloat(control.get('creditAmountLocal')?.value) || 0;
        return acc + debitValue;
      },
      0
    );
  }

  addNewRow() {
    if (!this.formsService.validForm(this.journalEntryLinesFormArray, false)) return;

    const id = this.journalEntryLinesFormArray.length + 1;
    //controls
    const dbControl = new FormControl(0, [customValidators.required, customValidators.nonNegativeNumbers]);
    const crControl = new FormControl(0, [customValidators.required, customValidators.nonNegativeNumbers]);
    const currencyControl = new FormControl(null, customValidators.required);
    const rateControl = new FormControl<number | null>(null, [
      customValidators.required,
   customValidators.nonNegativeNumbers,
    ]);
    //events
    dbControl.valueChanges.subscribe((value) => {
      if (rateControl.value) {
        rateControl.parent?.get('debitAmountLocal')!.setValue(value! * rateControl.value);
      }
    });
    crControl.valueChanges.subscribe((value) => {
      if (rateControl.value) {
        crControl.parent?.get('creditAmountLocal')!.setValue(value! * rateControl.value);
      }
    });
    rateControl.valueChanges.subscribe((value) => {
      const dbLocalControl = rateControl.parent?.get('debitAmountLocal')!;
      const crLocalControl = rateControl.parent?.get('creditAmountLocal')!;
      if (!value) {
        dbLocalControl.setValue(null);
        crLocalControl.setValue(null);
        return;
      }
      if (dbControl.value) {
        dbLocalControl.setValue(value * dbControl.value);
      }
      if (crControl.value) {
        crLocalControl.setValue(value * crControl.value);
      }
    });

    currencyControl?.valueChanges.subscribe((value) => {
      var currencyData = this.currencies.find((c) => c.id == value);

      rateControl.setValue(currencyData?.ratePerUnit!);
    });
    let newLine = this.fb.group(
      {
        id: new FormControl(0),
        accountCode: new FormControl('', [customValidators.required]),
        accountId: new FormControl('', [customValidators.required]),
        accountName: new FormControl(),
        lineDescription: new FormControl(null, [customValidators.required]),
        debitAmount: dbControl,
        creditAmount: crControl,
        currencyId: new FormControl(null, [customValidators.required]),
        currency: new FormControl(null),
        currencyRate: new FormControl(),
        debitAmountLocal: new FormControl(0),
        creditAmountLocal: new FormControl(0),
        costCenters: new FormControl([]),
        selectedFalg: new FormControl(false),
        costCenterConfig: new FormControl(null),
      }
      // { validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    newLine.updateValueAndValidity();

    this.journalEntryLinesFormArray.push(newLine);
    const accountId = newLine.get('accountId')?.value;
    if (accountId) {
      this.journalEntryLinesFormArray.push(accountId);
    }
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
      this.filteredAccounts = r.result.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
  }
  filterAccount(event: any) {
    let query = event.query;
    this.accountService
      .getAllChartOfAccountPaginated(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((account: AccountDto) => {
      if (account) {
        this.updateAccount(account, index);
      }
    });
  }

  accountSelected(event: any, id: number) {
    var accountData = this.filteredAccounts.find((c) => c.id == event);
    this.updateAccount(accountData as AccountDto, id);
  }

  updateAccount(selectedAccount: AccountDto, index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);

    if (this.currentAccounts[index] !== selectedAccount.id) {
      journalLine.get('costCenters')?.setValue([]);
    }

    journalLine.get('accountId')?.setValue(selectedAccount.id);
    journalLine.get('accountName')?.setValue(selectedAccount.name);
    journalLine.get('accountCode')?.setValue(selectedAccount.accountCode);
    journalLine.get('costCenterConfig')?.setValue(selectedAccount.costCenterConfig);
    journalLine.get('selectedFalg')?.setValue(true);
    journalLine.get('lineDescription')?.setValue(selectedAccount.name);
    var currencyData = this.currencies.find((c) => c.id == selectedAccount.currencyId);
    journalLine.get('currencyId')?.setValue(selectedAccount.currencyId);
    journalLine.get('currency')?.setValue(currencyData?.name);

    this.getAccountCurrencyRate(selectedAccount.currencyId as number, index);
  }

  openCostPopup(data: any, journal: FormGroup, account: number, index: number) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);
    if (!account || accountData?.costCenterConfig == 'NotAllow') {
      if (data.costCenterConfig == 'NotAllow') {
        this.toasterService.showError(
          this.langService.transalte('Journal.Error'),
          this.langService.transalte('Journal.CostCenterNotAllowed')
        );
        return;
      }
    }

    const creditAmount = parseFloat(data.creditAmount);
    const debitAmount = parseFloat(data.debitAmount);

    if (
      (creditAmount && debitAmount) ||
      (!creditAmount && !debitAmount) ||
      (creditAmount === 0 && debitAmount === 0)
    ) {
      this.toasterService.showError(
        this.langService.transalte('Journal.Error'),
        this.langService.transalte('Journal.InvalidAmount')
      );
      return;
    }
    if (this.viewMode) {
      const text: String = 'view';
      const dialogRef = this.dialog.open(CostCenterAllocationPopupComponent, {
        width: '900px',
        height: '500px',
        header: 'View Cost Center Allocation',
        data: { ...data, text },
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) data.costCenters = res;
      });
    } else {
      const dialogRef = this.dialog.open(EditCostCenterAllocationPopupComponent, {
        width: '900px',
        height: '600px',
        header: 'Edit Cost Center Allocation',
        data: data,
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) {
          journal.get('costCenters')?.setValue(res);
        }
      });
    }
  }

  getCurrencies() {
    this.currencyService.getCurrencies('');

    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
    });
  }

  filterCurrency(event: any) {
    let query = event.query.toLowerCase();
    this.fitleredCurrencies = this.currencies.filter((c) => c.name?.toLowerCase().includes(query));
  }

  debitValueChanges(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);

    const debitAmountLocalControl = journalLine.get('debitAmountLocal');

    const debitAmountControl = journalLine.get('debitAmount');
    if (debitAmountControl?.value === '' || !debitAmountControl?.value) {
      debitAmountControl!.setValue(0);
    }

    debitAmountLocalControl?.setValue(
      journalLine.get('debitAmount')?.value * journalLine.get('currencyRate')?.value
    );
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
  }

  creditValueChanges(index: number) {
    const journalLine = this.journalEntryLinesFormArray.at(index);

    const creditAmountControl = journalLine.get('creditAmount');
    if (creditAmountControl?.value === '' || !creditAmountControl?.value) {
      creditAmountControl!.setValue(0);
    }
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');
    creditAmountLocalControl?.setValue(
      journalLine.get('creditAmount')?.value * journalLine.get('currencyRate')?.value
    );
    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
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
        this.calculateTotalDebitAmountLocal();
      }

      // Update credit amount local only if credit amount exists
      if (creditAmountControl?.value !== null && creditAmountControl?.value !== undefined) {
        const creditAmountLocal = creditAmountControl?.value * value;
        creditAmountLocalControl?.setValue(creditAmountLocal);
        this.calculateTotalCreditAmountLocal();
      }
    });
  }
  // currencyValueChanges(event: any, index: number) {
  //   const journalLine = this.journalEntryLinesFormArray.at(index);
  //   const currencyRateControl = journalLine.get('currencyRate');
  //   const debitAmountControl = journalLine.get('debitAmount');
  //   const creditAmountControl = journalLine.get('creditAmount');
  //   const debitAmountLocalControl = journalLine.get('debitAmountLocal');
  //   const creditAmountLocalControl = journalLine.get('creditAmountLocal');

  //   currencyRateControl?.valueChanges.subscribe((value) => {
  //     // Update debit amount local only if debit amount exists
  //     if (debitAmountControl?.value !== null && debitAmountControl?.value !== undefined) {
  //       const debitAmountLocal = debitAmountControl?.value * value;
  //       debitAmountLocalControl?.setValue(debitAmountLocal);
  //     }

  //     // Update credit amount local only if credit amount exists
  //     if (creditAmountControl?.value !== null && creditAmountControl?.value !== undefined) {
  //       const creditAmountLocal = creditAmountControl?.value * value;
  //       creditAmountLocalControl?.setValue(creditAmountLocal);
  //     }
  //   });
  // }
  getAccountCurrencyRate(accountCurrency: number, currentJournalId: number) {
    const journalLine = this.journalEntryLinesFormArray.at(currentJournalId);

    const subscription = this.currencyService.accountCurrencyRate.subscribe((res) => {
      const currencyRateControl = journalLine?.get('currencyRate');
      currencyRateControl?.setValue(res.rate);
      subscription.unsubscribe(); 
    });
    this.currencyService.getAccountCurrencyRate(
      accountCurrency,
      this.currentUserService.getCurrency()
    );
  }

  isCostCenterallowed(costCenterConfig: string): boolean {
    if (costCenterConfig === 'Optional' || costCenterConfig === 'Mandatory') return true;
    return false;
  }

  shouldShowCostCenterImage(costCenters: any[]): number {
    if (!costCenters) return -1;
    const totalPercentage = costCenters.reduce(
      (sum: number, item: any) => sum + parseFloat(item.percentage),
      0
    );
    return totalPercentage;
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
    private titleService: Title,
    private langService: LanguageService,
    private route: ActivatedRoute,
    public generalService: GeneralService,
    private currentUserService: CurrentUserService
  ) {
   
  }

  convertDateFormat(data: Date | string) {
    const date = new Date(data);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date into YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
}
