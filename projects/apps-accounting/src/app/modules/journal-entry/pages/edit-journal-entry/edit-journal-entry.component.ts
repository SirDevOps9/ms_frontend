import {  Component, OnInit } from '@angular/core';
import {
  EditJournalEntry,
  GetJournalEntryByIdDto,
  JournalEntryLineDto,
  JournalEntryStatus,
  JournalEntryType,
  SharedJournalEnums,
  costCenters,
} from '../../models';
import { JournalEntryService } from '../../journal-entry.service';
import { 
  FormsService,
  LanguageService,
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
import { Title } from '@angular/platform-browser';
import { EditCostCenterAllocationPopupComponent } from '../components/edit-cost-center-allocation-popup/edit-cost-center-allocation-popup.component';
import { CurrentUserService } from 'libs/shared-lib/src/lib/services/currentuser.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';

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
  costCenters: costCenters[] = [];
  disFlag : boolean = false
  viewMode: boolean = false;
  statusName: string;
  journalTypeName: JournalEntryType;
  totalDebitAmount: number;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;

  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[] = [];
  fitleredCurrencies: CurrencyDto[];
  selectedCurrency: string;

  debitLocal: string;
  creditLocal: string;

  currentAccounts: number[] = [];

  ngOnInit() {

    this.getAccounts();
    this.initializeForm();
    this.initializeFormData();
    this.getCurrencies();
    // this.journalEntryLinesFormArray.valueChanges.subscribe(res=>{
    //   if(res) {
    //     this.disFlag = false
    //   }
    // })
  }
  get journalEntryLinesFormArray() {
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
      this.journalTypeName = res.type;

      this.journalEntry = res;
      this.journalEntryLines = res.journalEntryLines!;
      const journalEntryLinesArray = this.journalEntryLinesFormArray;

      journalEntryLinesArray.clear();

      this.journalEntryLines.forEach((line) => {
        const {  debitAmount, creditAmount, costCenters, currencyRate , ...lineData } =
          line;

        const lineGroup = this.fb.group(
          {
            id: new FormControl(lineData.id),
            accountId: new FormControl(lineData.accountId, [customValidators.required]),
            accountName: new FormControl(lineData.accountName),
            
            accountCode: new FormControl(lineData.accountCode),
            lineDescription: new FormControl(lineData.lineDescription, [customValidators.required]),
            debitAmount: new FormControl(debitAmount, [customValidators.required]),
            costCenterConfig: new FormControl(lineData.costCenterConfig),
            selectedFalg: new FormControl(false),

            creditAmount: new FormControl(creditAmount, [customValidators.required]),
            currencyId: new FormControl(lineData.currencyId, [customValidators.required]),
            currency: new FormControl(lineData.currency, [customValidators.required]),
            currencyRate: new FormControl(currencyRate, [customValidators.required]),
            debitAmountLocal: new FormControl(debitAmount * currencyRate),
            creditAmountLocal: new FormControl(creditAmount * currencyRate),
            costCenters: [line.costCenters],
          },
         // { validators: customValidators.debitAndCreditBothCanNotBeZero }
        );
        lineGroup.updateValueAndValidity();

        journalEntryLinesArray.push(lineGroup);
      });

      this.currentAccounts = this.journalEntryLines.map(line => line.accountId);

      this.calculateTotalCreditAmount();
      this.calculateTotalDebitAmount();
      this.calculateTotalDebitAmountLocal();
      this.calculateTotalCreditAmountLocal();

    });
  }

  onSubmit() {
    if (!this.formsService.validForm(this.editJournalForm, false)) return;

    const request: EditJournalEntry = this.editJournalForm.value;
    request.id = this.routerService.currentId;

    request.journalEntryLines = request.journalEntryLines?.map((item) => {
      item.costCenters = item.costCenters
        ? item.costCenters.map((item) => {
            return {
              id: item.id ? item.id : 0,
              percentage: +item.percentage,
              costCenterId: item.costCenterId,
            };
          })
        : [];
      return item ;
    });
    this.journalEntryService.editJournalEntry(request);
  }

  ChangeStatus(status: JournalEntryStatus) {
    let journalStatus = new JournalStatusUpdate();
    journalStatus.id = this.routerService.currentId;
    journalStatus.status = status;

    this.journalEntryService.ChangeStatus(journalStatus).subscribe(() => {
      setTimeout(() => {
        location.reload();
      }, 1500);
    });
  }

  onDiscard() {
    this.routerService.navigateTo(`/transcations/journalentry`);
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
      const result = await this.journalEntryService.deleteJournalEntryLine(
        journalLine.get('id')?.value!
      );
      if (result) {
        this.journalEntryLinesFormArray.removeAt(index);
      this.journalEntryService.journalStatus.subscribe((res) => {
        this.statusName = res;
        
    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
      });
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

  addNewRow() {
    if (!this.formsService.validForm(this.journalEntryLinesFormArray, false)) return;
    let newLine = this.fb.group(
      {
        id: new FormControl(0),
        accountCode: new FormControl('', [customValidators.required]),
        accountId: new FormControl(),
        accountName: new FormControl(),
        selectedFalg: new FormControl(false),
        costCenterConfig: new FormControl(null),
        lineDescription: new FormControl(null, [customValidators.required]),
        debitAmount: new FormControl(null, [customValidators.required, Validators.min(0)]),
        creditAmount: new FormControl(null, [customValidators.required, Validators.min(0)]),
        currencyId: new FormControl(null,[customValidators.required]),
        currency:new FormControl(null),
        currencyRate: new FormControl(),
        debitAmountLocal: new FormControl(),
        creditAmountLocal: new FormControl(),
        costCenters: new FormControl([]),
      },
      //{ validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    newLine.updateValueAndValidity();
    this.journalEntryLinesFormArray.push(newLine);
    
    const accountId = newLine.get('accountId')?.value;
    if (accountId) {
      this.currentAccounts.push(accountId);
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
      .getAccountsHasNoChildren(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent,
       { 
         width: 'auto',
          height : 'auto'
      });
    ref.onClose.subscribe((account: AccountDto) => {
      if (account) {
        this.updateAccount(account, index);
      }
    });
  }
  accountSelected(event: any, id: number) {

    var accountData = this.filteredAccounts.find((c) => c.id == event);
    this.updateAccount(accountData as AccountDto , id);
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
    console.log(selectedAccount)
    journalLine.get('selectedFalg')?.setValue(true);
    journalLine.get('lineDescription')?.setValue(selectedAccount.name);



    

    var currencyData = this.currencies.find((c) => c.id == selectedAccount.currencyId);
    journalLine.get('currencyId')?.setValue(selectedAccount.currencyId);
    journalLine.get('currency')?.setValue(currencyData?.name);


    this.getAccountCurrencyRate(selectedAccount.currencyId as number, index);
  }

  openCostPopup(data: any, journal : FormGroup, account: number, index: number) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);
    console.log(accountData)
    if (
      (!data.creditAmount && !data.debitAmount) ||
      !account ||
      accountData?.costCenterConfig == 'NotAllow'
    ) {
      return null;
    } else {
      const dialogRef = this.dialog.open(EditCostCenterAllocationPopupComponent, {
        width: '900px',
        height: '500px',
        header: 'Edit Cost Center Allocation',
        data: data,
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) {
          journal.get('costCenters')?.setValue(res)
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
    const debitAmountControl = journalLine.get('debitAmount');
    const creditAmountControl = journalLine.get('creditAmount');

    const debitAmountLocalControl = journalLine.get('debitAmountLocal');
    const creditAmountLocalControl = journalLine.get('creditAmountLocal');

    if (creditAmountControl?.value === '' || !creditAmountControl?.value) {

      creditAmountControl!.setValue(0);
    }

    creditAmountLocalControl?.setValue(
      journalLine.get('creditAmount')?.value * journalLine.get('currencyRate')?.value
    );
    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
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
    this.totalCreditAmountLocal = this.journalEntryLinesFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('creditAmountLocal')?.value) || 0;
      return acc + debitValue;
    }, 0);
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
  getAccountCurrencyRate(accountCurrency: number, currentJournalId: number) {

    const journalLine = this.journalEntryLinesFormArray.at(currentJournalId);

    this.currencyService.accountCurrencyRate.subscribe((res) => {
      const currencyRateControl = journalLine.get('currencyRate')!;

      currencyRateControl.setValue(res.rate);
    });

    this.currencyService.getAccountCurrencyRate(accountCurrency, this.currentUserService.getCurrency());
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
    private currentUserService : CurrentUserService,
    public generalService : GeneralService

  ) {
    this.titleService.setTitle(this.langService.transalte('Journal.EditJournal'));

  }
}
