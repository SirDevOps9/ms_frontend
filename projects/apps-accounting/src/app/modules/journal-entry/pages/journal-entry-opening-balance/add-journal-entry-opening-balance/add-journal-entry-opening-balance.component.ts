import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { GuidedTour, Orientation, GuidedTourService } from 'ngx-guided-tour';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfo, SharedLibraryEnums, RouterService, LanguageService, FormsService, AttachmentsService, customValidators } from 'shared-lib';
import { AccountService } from '../../../../account/account.service';
import { AccountDto } from '../../../../account/models';
import { CurrencyService } from '../../../../general/currency.service';
import { CurrencyDto } from '../../../../general/models/currencyDto';
import { AttachmentsComponent } from '../../../components/attachments/attachments.component';
import { NoChildrenAccountsComponent } from '../../../components/noChildrenAccounts/nochildaccounts.component';
import { JournalEntryService } from '../../../journal-entry.service';
import { costCenters, AddJournalEntryCommand, AddJournalEntryCommandOpeningBalance } from '../../../models';
import { CostCenterAllocationPopupComponent } from '../../components/cost-center-allocation-popup/cost-center-allocation-popup.component';
import { JournalTemplatePopupComponent } from '../../components/journal-template-popup/journal-template-popup.component';
import { JournalEntryFormValue } from '../../create-journal-entry/create-journal-entry.component';

@Component({
  selector: 'app-add-journal-entry-opening-balance',
  templateUrl: './add-journal-entry-opening-balance.component.html',
  styleUrl: './add-journal-entry-opening-balance.component.scss'
})
export class AddJournalEntryOpeningBalanceComponent {
  fg: FormGroup;
  filteredAccounts: AccountDto[] = [];
  journalEntryAttachments: { attachmentId: string; name: string }[];

  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  costCenters: costCenters[] = [];
  selectedCurrency: number;
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
    this.getAccounts();

    this.currencyService.getCurrencies('');

    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
      console.log(res);
    });
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
    private titleService: Title,
    private langService: LanguageService,
    private formService: FormsService,
    private guidedTourService: GuidedTourService,
    private attachmentService: AttachmentsService
  ) {
    this.titleService.setTitle(this.langService.transalte('OpeningBalance.AddJournal'));

    this.fg = this.fb.group({
      refrenceNumber: [null, [customValidators.required, customValidators.length(0, 15)]],
      journalDate: [this.getTodaysDate(), customValidators.required],
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
      header: 'Attachments',
      data: this.attachmentService.filesInfo,
      width: '700px',
    });

    dialog.onClose.subscribe((res) => {
      this.attachmentService.attachmentIdsObservable.subscribe((res) => {
        this.journalEntryAttachments = this.attachmentService.filesInfo.map(
          (item: any, i: number) => {
            return {
              attachmentId: res[i],
              name: this.attachmentService.filesName[i],
            };
          }
        );

        console.log(this.journalEntryAttachments);
      });
    });
  }

  filterAccount(event: any) {
    let query = event.query;
    this.accountService
      .getAccountsHasNoChildren(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
  }

  accountSelected(event: any, id: number) {
    const selected: any = event.value as AccountDto;
    // if(selected.accountCode=='11'){
    //   this.things.find(t=>t.id==id)!.account = null;
    // }
    const journalLine = this.items.at(id);
    // const currencyControl = journalLine.get('currency');
    // const currencyRateControl = journalLine.get('currencyRate')!;

    // currencyControl?.setValue(selected.currencyId);
    // this.selectedCurrency = selected.currencyId;

    // var currencyData = this.currencies.find((c) => c.id == selected.currencyId);

    // currencyRateControl.setValue(currencyData!.ratePerUnit);

    var accountData = this.filteredAccounts.find((c) => c.id == event);

    console.log('Selectec', accountData);

    const accountName = journalLine.get('accountName');
    accountName?.setValue(accountData?.name);

    journalLine.get('accountCode')?.setValue(accountData?.accountCode);

    var currencyData = this.currencies.find((c) => c.id == accountData?.currencyId);

    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;

    currencyControl?.setValue(accountData?.currencyId);

    currencyRateControl.setValue(currencyData?.ratePerUnit);
    const currencyNameControl = journalLine.get('currencyName');
    currencyNameControl?.setValue(currencyData?.name);

    this.getAccountCurrencyRate(currencyData?.id as number, id);
  }

  accountSelectedForDialog(accountData: any, id: number) {
    const journalLine = this.items.at(id);

    console.log('Selectec', accountData);

    const accountName = journalLine.get('accountName');

    accountName?.setValue(accountData.name);

    journalLine.get('accountCode')?.setValue(accountData?.accountCode);

    var currencyData = this.currencies.find((c) => c.id == accountData?.currencyId);

    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;

    currencyControl?.setValue(accountData?.currencyId);

    currencyRateControl.setValue(currencyData?.ratePerUnit);
    const currencyNameControl = journalLine.get('currencyName');
    currencyNameControl?.setValue(currencyData?.name);
  }

  currencyChanged(index: number) {
    const journalLine = this.items.at(index);
    const currencyControl = journalLine.get('currency');
    const currencyRateControl = journalLine.get('currencyRate')!;
    //console.log('currencyRateControl', currencyRateControl);

    currencyControl?.valueChanges.subscribe((value) => {
      var currencyData = this.currencies.find((c) => c.id == value);

      //console.log('currency rate', currencyData?.ratePerUnit);
      currencyRateControl.setValue(currencyData!.ratePerUnit);
    });
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      height : '100%'
    });
    
    ref.onClose.subscribe((r) => {
      if (r) {
        this.fa.at(index).get('account')?.setValue(r.id);
        this.fa.at(index)?.get('accountName')?.setValue(r.name);
        this.fa.at(index)?.get('accountCode')?.setValue(r.accountCode);
        var currencyData = this.currencies.find((c) => c.id == r.currencyId);
        this.fa.at(index).get('currency')?.setValue(r.currencyId);
        this.fa.at(index).get('currencyName')?.setValue(currencyData?.name);
        // this.accountSelectedForDialog(r, index);
        this.getAccountCurrencyRate(r.currencyId , index);
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
    const id = this.fa.length + 1;
    //controls
    const dbControl = new FormControl(null, [customValidators.required, Validators.min(0)]);
    const crControl = new FormControl(null, [customValidators.required, Validators.min(0)]);
    const currencyControl = new FormControl(null, customValidators.required);
    const rateControl = new FormControl<number | null>(null, [
      customValidators.required,
      Validators.min(0),
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

      //console.log('currency rate', currencyData?.ratePerUnit);

      rateControl.setValue(currencyData?.ratePerUnit!);
    });

    //set group
    const fg = this.fb.group(
      {
        id: new FormControl(id),
        account: new FormControl(null, customValidators.required),
        accountName: new FormControl(null, customValidators.required),
        accountCode: new FormControl(null, customValidators.required),
        lineDescription: new FormControl('', customValidators.required),
        debitAmount: dbControl,
        creditAmount: crControl,
        currency: currencyControl,
        currencyRate: rateControl,
        debitAmountLocal: new FormControl(),
        creditAmountLocal: new FormControl(),
        currencyName: new FormControl(''),
      },
      { validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    this.fg.updateValueAndValidity();
    this.fa.push(fg);
  }

  deleteLine(index: number) {
    this.fa.removeAt(index);
  }

 

  save() {
    if (!this.formService.validForm(this.fg, false)) return;
    const value = this.fg.value as JournalEntryFormValue;

    //console.log('Form Value', value);

    let obj: AddJournalEntryCommandOpeningBalance = {
      ...value,
      openingBalanceJournalEntryAttachments: this.journalEntryAttachments,
      openingBalanceJournalEntryLines: value.journalEntryLines.map((l, i) => ({
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
    console.log(obj);
    this.service
      .addJournalEntryopeningBalance(obj)
      .subscribe((r) => this.routerService.navigateTo('transcations/journal-entry-opening-balance'));
  }

  routeToJournal() {
    this.routerService.navigateTo('/transcations/journal-entry-opening-balance');
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
      //console.log('Received ID:', id);
      if (id) {
        this.service.getJournalTemplateById(id).subscribe((template) => {
          console.log('template:', template);

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
              //console.log('new line', newLine);
              // console.log(this.fa, 'test');
            });
          }
        });
      }
    });
  }

  openCostPopup(data: any, account: number, index: number) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);

    if (
      (!data.creditAmount && !data.debitAmount) ||
      !account ||
      accountData?.costCenterConfig == 'NotAllow'
    ) {
      return null;
    } else {
      const dialogRef = this.dialog.open(CostCenterAllocationPopupComponent, {
        width: '900px',
        height: '500px',
        header: 'Cost Center Allocation',
        data: data,
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) data.costCenters = res;
      });
    }
  }

  debitChanged(index: number) {
    const journalLine = this.items.at(index);
    const creditAmountControl = journalLine.get('creditAmount');
    creditAmountControl!.setValue(0);
  }
  creditChanged(index: number) {
    const journalLine = this.items.at(index);
    const debitAmountControl = journalLine.get('debitAmount');
    debitAmountControl!.setValue(0);
  }
  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }

  getAccountCurrencyRate(accountCurrency: number, currentJournalId: number) {
    let currentCurrency: number = 1;

    const journalLine = this.items.at(currentJournalId);
    this.currencyService.accountCurrencyRate.subscribe((res) => {
      const currencyRateControl = journalLine.get('currencyRate')!;

      currencyRateControl.setValue(res.rate);
    });

    this.currencyService.getAccountCurrencyRate(currentCurrency, accountCurrency);
  }
}
