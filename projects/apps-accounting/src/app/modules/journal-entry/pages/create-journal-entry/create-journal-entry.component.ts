import { CurrencyService } from './../../../general/currency.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AttachmentsService,
  ComponentType,
  FormsService,
  LanguageService,
  PageInfo,
  RouterService,
  SharedLibraryEnums,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { AccountService } from '../../../account/account.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { DialogService } from 'primeng/dynamicdialog';
import { AddJournalEntryCommand } from '../../models/addJournalEntryCommand';
import { JournalEntryService } from '../../journal-entry.service';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';
import { JournalTemplatePopupComponent } from '../components/journal-template-popup/journal-template-popup.component';
import { NoChildrenAccountsComponent } from '../../components/noChildrenAccounts/nochildaccounts.component';
import { Title } from '@angular/platform-browser';
import { GuidedTourService, Orientation, GuidedTour } from 'ngx-guided-tour';
import { CostCenterAllocationPopupComponent } from '../components/cost-center-allocation-popup/cost-center-allocation-popup.component';
import { costCenters } from '../../models';
import { CurrentUserService } from 'libs/shared-lib/src/lib/services/currentuser.service';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { take } from 'rxjs';
export interface JournalEntryLineFormValue {
  id: number;
  account: AccountDto;
  lineDescription: string;
  debitAmount: number;
  creditAmount: number;
  currency: number;
  currencyRate: number;
  debitAmountLocal: number;
  creditAmountLocal: number;
  costCenters: costCenters[];
}
export interface JournalEntryFormValue {
  refrenceNumber: string;
  journalDate: string;
  periodId: string;
  description: string;
  journalEntryAttachments: { attachmentId: string; name: string }[];
  journalEntryLines: JournalEntryLineFormValue[];
}

@Component({
  selector: 'app-journal-entry',
  templateUrl: './create-journal-entry.component.html',
  styleUrl: './create-journal-entry.component.scss',
})
export class CreateJournalEntryComponent implements OnInit , OnDestroy  {
  fg: FormGroup;
  totalDebitAmount: number;
  totalDebitAmountLocal: number;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  filteredAccounts: AccountDto[] = [];
  journalEntryAttachments: { attachmentId: string; name: string }[];

  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  costCenters: costCenters[] = [];
  selectedCurrency: number;
  accountData: any = {};
  private readonly TOUR: GuidedTour = {
    tourId: 'purchases-tour',
    useOrb: false,
    skipCallback: () => alert('skip clicked'),
    completeCallback: () => alert('complete clicked'),
    steps: [
      {
        title: 'Step 1',
        selector: '.step-1-element',
        content: 'Fill In Reference Number',
        orientation: Orientation.Bottom,
      },
      {
        title: 'Step 2',
        selector: '.step-2-element',
        content: 'Select Date',
        orientation: Orientation.Bottom,
      },
      {
        title: 'Step 3',
        selector: '.step-3-element',
        content: 'Add Journal Entry Description',
        orientation: Orientation.Bottom,
      },
      {
        title: 'Step 4',
        content: 'Select To Add New Journal Entry',
        selector: '.step-4-element',

        orientation: Orientation.Right,
      },
    ],
  };
  ngOnInit() {
    this.totalDebitAmount = 0;
    this.totalCreditAmount = 0;
    this.totalDebitAmountLocal = 0;
    this.totalCreditAmountLocal = 0;
    this.getAccounts();

    this.currencyService.getCurrencies('');

    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
    });
    this.addThing();
  }
  getAccounts() {
    this.accountService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
      this.filteredAccounts = r.result.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
  }
  public startTour(): void {
    this.guidedTourService.startTour(this.TOUR);
  }
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private currencyService: CurrencyService,
    private dialog: DialogService,
    public sharedLibEnums: SharedLibraryEnums,
    private service: JournalEntryService,
    private routerService: RouterService,
    private langService: LanguageService,
    private formService: FormsService,
    private guidedTourService: GuidedTourService,
    private attachmentService: AttachmentsService,
    private currentUserService: CurrentUserService,
    public generalService: GeneralService,
    private toasterService: ToasterService
  ) {
    this.fg = this.fb.group({
      refrenceNumber: [null, [customValidators.required, customValidators.length(0, 15)]],
      journalDate: [new Date().toISOString().split('T')[0], customValidators.required],
      periodId: ['Period1', customValidators.required],
      description: ['', customValidators.required],

      journalEntryLines: fb.array([]),
    });
  }

  public get attachments(): FormArray {
    return this.fg.controls['journalEntryAttachments'] as FormArray;
  }

  public get items(): FormArray {
    return this.fg.controls['journalEntryLines'] as FormArray;
  }

  openAttachments() {
    const dialog = this.dialog.open(AttachmentsComponent, {
      // data: this.attachmentService.filesInfo,
      width: '1200px',
      height: '1000px',
      data: {
        journalEntryAttachments: this.attachmentService.filesInfo,
        page: ComponentType.add,
      }
    });

    dialog.onClose.subscribe((res) => {
      this.journalEntryAttachments = res
      console.log(res ,"close");
      
    });
  }

  filterAccount(event: any) {
    let query = event.query;
    this.accountService
      .getAccountsHasNoChildren(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  accountSelected(event: any, id: number) {
    const journalLine = this.items.at(id);

    this.accountData = this.filteredAccounts.find((c) => c.id == event);

    const accountName = journalLine.get('accountName');
    accountName?.setValue(this.accountData?.name);

    journalLine.get('accountCode')?.setValue(this.accountData?.accountCode);
    journalLine.get('lineDescription')?.setValue(this.accountData.name);
    journalLine.get('costCenterConfig')?.setValue(this.accountData.costCenterConfig);
    journalLine.get('selectedFalg')?.setValue(true);

    var currencyData = this.currencies.find((c) => c.id == this.accountData?.currencyId);

    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;

    currencyControl?.setValue(this.accountData?.currencyId);

    currencyRateControl.setValue(currencyData?.ratePerUnit);
    const currencyNameControl = journalLine.get('currencyName');
    currencyNameControl?.setValue(currencyData?.name);

    this.getAccountCurrencyRate(currencyData?.id as number, id);
  }

  accountSelectedForDialog(accountData: any, id: number) {
    const journalLine = this.items.at(id);

    const accountName = journalLine.get('accountName');

    accountName?.setValue(this.accountData.name);

    journalLine.get('accountCode')?.setValue(this.accountData?.accountCode);

    var currencyData = this.currencies.find((c) => c.id == this.accountData?.currencyId);

    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;

    currencyControl?.setValue(this.accountData?.currencyId);

    currencyRateControl.setValue(currencyData?.ratePerUnit);
    const currencyNameControl = journalLine.get('currencyName');
    currencyNameControl?.setValue(currencyData?.name);
  }

  currencyChanged(index: number) {
    const journalLine = this.items.at(index);
    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;

    currencyControl?.valueChanges.subscribe((value) => {
      var currencyData = this.currencies.find((c) => c.id == value);

      currencyRateControl.setValue(currencyData!.ratePerUnit);
    });
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.fa.at(index).get('account')?.setValue(r.id);
        this.fa.at(index)?.get('accountName')?.setValue(r.name);
        this.fa.at(index)?.get('accountCode')?.setValue(r.accountCode);
        this.fa.at(index)?.get('costCenterConfig')?.setValue(r.costCenterConfig);
        this.fa.at(index)?.get('lineDescription')?.setValue(r.name);
        this.fa.at(index).get('selectedFalg')?.setValue(true);
        var currencyData = this.currencies.find((c) => c.id == r.currencyId);
        this.fa.at(index).get('currency')?.setValue(r.currencyId);
        this.fa.at(index).get('currencyName')?.setValue(currencyData?.name);
        this.getAccountCurrencyRate(r.currencyId, index);
      }
    });
  }

  filterCurrency(event: any) {
    let query = event.query.toLowerCase();
    this.fitleredCurrencies = this.currencies.filter((c) => c.name?.toLowerCase().includes(query));
  }

  public get fa(): FormArray {
    return this.fg.get('journalEntryLines') as FormArray;
  }

  addThing() {
    if (!this.formService.validForm(this.fa, false)) return;

    const id = this.fa.length + 1;
    //controls
    const dbControl = new FormControl(0, [customValidators.required, customValidators.nonNegativeNumbers]);
    const crControl = new FormControl(0, [customValidators.required,customValidators.nonNegativeNumbers]);
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

    //set group
    const fg = this.fb.group(
      {
        id: new FormControl(id),
        account: new FormControl(null, customValidators.required),
        accountName: new FormControl(null, customValidators.required),
        accountCode: new FormControl(null, customValidators.required),
        costCenterConfig: new FormControl(null),
        lineDescription: new FormControl('', customValidators.required),
        debitAmount: dbControl,
        creditAmount: crControl,
        currency: currencyControl,
        currencyRate: rateControl,
        debitAmountLocal: new FormControl(),
        creditAmountLocal: new FormControl(),
        currencyName: new FormControl(''),
        costCenters: new FormControl(),
        selectedFalg: new FormControl(false),
      }
      //{ validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    this.fg.updateValueAndValidity();

    this.fa.push(fg);
    // this.calculateTotalDebitAmount();
    // this.calculateTotalCreditAmount();
    this.getAccounts();
  }

  deleteLine(index: number) {
    this.fa.removeAt(index);
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
  }

  save() {
    if (!this.formService.validForm(this.fg, false)) return;
    const value = this.fg.value as JournalEntryFormValue;
    // value.journalDate = this.convertDateFormat(value.journalDate);
    let obj: AddJournalEntryCommand = {
      ...value,
      journalEntryAttachments: this.journalEntryAttachments,
      journalEntryLines: value.journalEntryLines.map((l, i) => ({
        accountId: this.fa.value[i].account,
        creditAmount: l.creditAmount,
        currencyId: l.currency,
        currencyRate: l.currencyRate,
        debitAmount: l.debitAmount,
        lineDescription: l.lineDescription,
        costCenters: l.costCenters
          ? l.costCenters.map((item) => {
              return {
                percentage: +item.percentage,
                costCenterId: item.costCenterId,
              };
            })
          : [],
      })),
    };
    this.service
    .addJournalEntry(obj)
    .subscribe({
      next: (r) => {
        this.routerService.navigateTo('transcations/journalentry');
        this.attachmentService.attachemntIdsList=[] 
      },
      error:  (error)  => {
      }
    });
  }

  routeToJournal() {
    this.routerService.navigateTo('transcations/journalentry');
    // this.calculateTotalDebitAmount();
    // this.calculateTotalCreditAmount();
  }

  RedirectToTemplate() {
    const dialogRef = this.dialog.open(JournalTemplatePopupComponent, {
      width: 'auto',
      height: 'auto',
      data: {
        hasNoChildren: false,
      },
    });

    dialogRef.onClose.subscribe((id: any) => {
      if (id) {
        this.service.getJournalTemplateById(id).subscribe((template) => {
          // Set template values to the form group
          this.fg.patchValue({
            refrenceNumber: template.code,
            periodId: 'Period1',
            description: template.description,
          });

          // Clear existing journal entry lines
          while (this.items.length !== 0) {
            this.items.removeAt(0);
          }

          // Add new journal entry lines

          if (template.getJournalTemplateLinesByIdDto.length > 0) {
            template.getJournalTemplateLinesByIdDto.forEach((line) => {
              const newLine = this.fb.group({
                id: new FormControl(line.id),
                account: new FormControl(line.accountId, customValidators.required),
                accountName: new FormControl(line.accountName, customValidators.required),
                accountCode: new FormControl(line.accountCode, customValidators.required),
                costCenterConfig: new FormControl(line.costCenterConfig, customValidators.required),
                lineDescription: new FormControl(line.lineDescription, customValidators.required),
                debitAmount: new FormControl(line.debitAmount, [customValidators.required]),
                creditAmount: new FormControl(line.creditAmount, [customValidators.required]),
                currency: new FormControl(line.currencyId, customValidators.required),
                currencyName: new FormControl(line.currency, customValidators.required),
                currencyRate: new FormControl(line.currencyRate, [customValidators.required]),
                debitAmountLocal: new FormControl(line.debitAmountLocal),
                creditAmountLocal: new FormControl(line.creditAmountLocal),
              });

              this.fa.push(newLine);
            });
          }
        });
      }
    });
  }

  openCostPopup(data: any, journal: FormGroup, account: number, index: number) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);

    if (!account || accountData?.costCenterConfig == 'NotAllow') {
      this.toasterService.showError(
        this.langService.transalte('Journal.Error'),
        this.langService.transalte('Journal.CostCenterNotAllowed')
      );
      return;
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

    const dialogRef = this.dialog.open(CostCenterAllocationPopupComponent, {
      width: '900px',
      height: '600px',
      data: data,
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) journal.get('costCenters')?.setValue(res);
    });
  }

  debitChanged(index: number) {
    const journalLine = this.items.at(index);
    const creditAmountControl = journalLine.get('creditAmount');
    const debitAmountControl = journalLine.get('debitAmount');
    if (debitAmountControl?.value === '' || !debitAmountControl?.value) {
      debitAmountControl!.setValue(0);
    }
    this.calculateTotalDebitAmount();
    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
  }
  creditChanged(index: number) {
    const journalLine = this.items.at(index);
    const debitAmountControl = journalLine.get('debitAmount');
    const creditAmountControl = journalLine.get('creditAmount');
    if (creditAmountControl?.value === '' || !creditAmountControl?.value) {
      creditAmountControl!.setValue(0);
    }

    this.calculateTotalCreditAmount();
    this.calculateTotalDebitAmount();
    this.calculateTotalDebitAmountLocal();
    this.calculateTotalCreditAmountLocal();
  }
  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }

  getAccountCurrencyRate(accountCurrency: number, currentJournalId: number) {
    const journalLine = this.items.at(currentJournalId);
    
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
  onFilter(event: any) {
    this.accountService.getAccountsHasNoChildrenNew(event, new PageInfo());

    this.accountService.childrenAccountList.subscribe((res: any) => {
      if (res.length) {
        this.filteredAccounts = res.map((account: any) => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`,
        }));

      }

      //          this.filteredAccounts=res.result.map((account:any) => ({
      //   ...account,
      //   displayName: `${account.name} (${account.accountCode})`,
      // }));
    });

    // this.accountService.getAccountsHasNoChildrenNew(event, new PageInfo()).subscribe((r) => {
    //   this.filteredAccounts = r.result.map((account) => ({
    //     ...account,
    //     displayName: `${account.name} (${account.accountCode})`,
    //   }));
    // });
  }
  calculateTotalDebitAmount() {
    this.totalDebitAmount = this.items.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('debitAmount')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }
  calculateTotalCreditAmount() {
    this.totalCreditAmount = this.items.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('creditAmount')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }

  calculateTotalDebitAmountLocal() {
    this.totalDebitAmountLocal = this.items.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('debitAmountLocal')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }
  calculateTotalCreditAmountLocal() {
    this.totalCreditAmountLocal = this.items.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('creditAmountLocal')?.value) || 0;
      return acc + debitValue;
    }, 0);
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

  currencyValueChanges(event: any, index: number) {
    const journalLine = this.fa.at(index);
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
  
  ngOnDestroy(): void {
    this.attachmentService.attachemntIdsList=[] 

  }
}
