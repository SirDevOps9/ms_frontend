import { CurrencyService } from './../../../general/currency.service';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LanguageService,
  PageInfo,
  RouterService,
  SharedLibraryEnums,
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
import { tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

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
export class CreateJournalEntryComponent {
  fg: FormGroup;
  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  selectedCurrency: number;

  ngOnInit() {
    this.langService.getTranslation('JournalTitle').subscribe((title) => {
      this.titleService.setTitle(title);
    });

    this.titleService.setTitle;
    this.accountService
      .getAccountsHasNoChildren('', new PageInfo())
      .pipe(tap((elem) => console.log(elem)))
      .subscribe((r) => (this.filteredAccounts = r.result));

    this.currencyService.getCurrencies('');

    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
      console.log(res);
    });
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
    private langService: LanguageService
  ) {
    this.fg = fb.group({
      refrenceNumber: [null, customValidators.required],
      journalDate: [this.getTodaysDate(), customValidators.required],
      periodId: ['Period1', customValidators.required],
      description: ['', customValidators.required],
      journalEntryAttachments: fb.array([]),
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
    this.dialog.open(AttachmentsComponent, {
      header: 'Attachments',
      data: { attachments: this.attachments },
      width: '500px',
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
    currencyNameControl?.setValue(currencyData?.currencyName);
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
    currencyNameControl?.setValue(currencyData?.currencyName);
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
    const ref = this.dialog.open(NoChildrenAccountsComponent, {});
    ref.onClose.subscribe((r) => {
      if (r) {
        this.fa.at(index).get('account')?.setValue(r.id);
        this.fa.at(index)?.get('accountName')?.setValue(r.name);
        this.fa.at(index)?.get('accountCode')?.setValue(r.accountCode);
        var currencyData = this.currencies.find((c) => c.id == r.currencyId);
        this.fa.at(index).get('currency')?.setValue(r.currencyId);
        this.fa.at(index).get('currencyRate')?.setValue(currencyData?.ratePerUnit);
        this.fa.at(index).get('currencyName')?.setValue(currencyData?.currencyName);
        // this.accountSelectedForDialog(r, index);
      }
    });
  }

  filterCurrency(event: any) {
    let query = event.query.toLowerCase();
    this.fitleredCurrencies = this.currencies.filter((c) =>
      c.currencyName?.toLowerCase().includes(query)
    );
  }

  public get fa(): FormArray {
    return this.fg.get('journalEntryLines') as FormArray;
  }

  // onValChange(e: any, fg: FormGroup) {
  //   console.log(e);
  //   let accName = this.filteredAccounts.find((elem) => elem.id == e)?.name;

  //   fg.get('account')?.setValue(accName);

  //   console.log(fg.controls['account']?.value);
  // }

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
    const fg = this.fb.group({
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
    });

    this.fa.push(fg);
  }

  deleteLine(index: number) {
    this.fa.removeAt(index);
  }

  save() {
    const value = this.fg.value as JournalEntryFormValue;

    //console.log('Form Value', value);

    let obj: AddJournalEntryCommand = {
      ...value,
      journalEntryLines: value.journalEntryLines.map((l, i) => ({
        accountId: this.fa.value[i].account,
        creditAmount: l.creditAmount,
        currencyId: l.currency,
        currencyRate: l.currencyRate,
        debitAmount: l.debitAmount,
        lineDescription: l.lineDescription,
      })),
    };
    // console.log(obj);
    this.service
      .addJournalEntry(obj)
      .subscribe((r) => this.routerService.navigateTo('journalentry'));
  }

  RedirectToTemplate() {
    const dialogRef = this.dialog.open(JournalTemplatePopupComponent, {
      width: '800px',
      height: '700px',
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
}
