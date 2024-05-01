import { CurrencyService } from './../../../general/currency.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageInfo, RouterService, SharedLibraryEnums, customValidators } from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { AccountService } from '../../../account/account.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountsComponent } from '../../components/accounts/accounts.component';
import { AddJournalEntryCommand, CreateJournalEntryLine } from '../../models/addJournalEntryCommand';
import { JournalEntryService } from '../../journal-entry.service';
import { AttachmentsComponent } from '../../components/attachments/attachments.component';

export class Thing {
  id: number;
  accountId: number | undefined;
  private _account: AccountDto | null;
  public get account(): AccountDto | null {
    return this._account;
  }
  public set account(value: AccountDto | null) {
    this._account = value;
    this.accountId = value?.id;
  }
  lineDescription: string;
  private _debitAmount: number;
  public get debitAmount(): number {
    return this._debitAmount;
  }
  public set debitAmount(value: number) {
    this._debitAmount = value;
    if (this.currencyRate) {
      this.debitAmountLocal = value * this.currencyRate;
    }
  }
  private _creditAmount: number;
  public get creditAmount(): number {
    return this._creditAmount;
  }
  public set creditAmount(value: number) {
    this._creditAmount = value;
    if (this.currencyRate) {
      this.creditAmountLocal = value * this.currencyRate;
    }
  }
  debitAmountLocal?: number;
  creditAmountLocal?: number;
  private _currency: CurrencyDto;
  public get currency(): CurrencyDto {
    return this._currency;
  }
  public set currency(value: CurrencyDto) {
    this._currency = value;
    this.currencyId = value?.id;
    this.currencyRate = value?.ratePerUnit;
  }
  currencyId: number;
  private _currencyRate: number;
  public get currencyRate(): number {
    return this._currencyRate;
  }
  public set currencyRate(value: number) {
    this._currencyRate = value;
    if(!value){
      this.creditAmountLocal = undefined;
      this.debitAmountLocal = undefined;
      return;
    }
    if (this.creditAmount) {
      this.creditAmountLocal = this.creditAmount * value;
    }
    if (this.debitAmount) {
      this.debitAmountLocal = this.debitAmount * value;
    }
  }
  public toCreateJournalEntryLine():CreateJournalEntryLine{
    return {
      accountId: this.accountId!,
      creditAmount: this.creditAmount,
      currencyId: this.currencyId,
      currencyRate: this.currencyRate,
      debitAmount: this.debitAmount,
      lineDescription: this.lineDescription
    };
  }
}

@Component({
  selector: 'app-journal-entry',
  templateUrl: './create-journal-entry.component.html',
  styleUrl: './create-journal-entry.component.scss'
})
export class CreateJournalEntryComponent {
  fg: FormGroup;
  things: Thing[] = [];
  // filteredAccounts: AccountDto[] = [{
  //   id: 0,
  //   nameAr: '',
  //   nameEn: 'Select more'
  // }];
  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];

  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private currencyService: CurrencyService,
    private dialog: DialogService,
    public sharedLibEnums: SharedLibraryEnums,
    private service: JournalEntryService,
    private routerService: RouterService,
  ) {
    this.fg = fb.group({
      refrenceNumber: ['', customValidators.required],
      journalDate: [this.getTodaysDate(), customValidators.required],
      periodId: ['Period1', customValidators.required],
      description: ['', customValidators.required],
      journalEntryAttachments: fb.array([]),
    });
  }

  public get attachments(): FormArray {
    return this.fg.controls['journalEntryAttachments'] as FormArray;
  }

  public get items(): FormArray {
    return this.fg.controls['journalEntryLines'] as FormArray;
  }

  openAttachments(){
    this.dialog.open(AttachmentsComponent, {
      data: {attachments: this.attachments}
    });
  }

  ngOnInit() {
    this.accountService.getAllPaginated('', new PageInfo())
      .subscribe(r => this.filteredAccounts = r.result);
    this.currencyService.getCurrencies('')
      .subscribe(r => this.currencies = r);
  }

  filterAccount(event: any) {
    // console.log(event.originalEvent);
    console.log(this.filteredAccounts);
    let query = event.query;
    this.accountService.getAllPaginated(query, new PageInfo())
      .subscribe(r => this.filteredAccounts = (r.result));
  }

  accountSelected(event: any, id: number) {
    const selected = event.value as AccountDto;
    // if(selected.accountCode=='11'){
    //   this.things.find(t=>t.id==id)!.account = null;
    // }
    console.log(event);
  }

  openDialog(index: number) {
    const ref = this.dialog.open(AccountsComponent, {})
    ref.onClose.subscribe(r => {
      if (r) {
        this.things[index].account = r;
      }
    })
  }

  filterCurrency(event: any) {
    let query = event.query.toLowerCase();
    this.fitleredCurrencies = this.currencies.filter(c =>
      c.currencyName?.toLowerCase().includes(query));
  }

  addThing() {
    const id = this.things.length + 1;
    let thing = new Thing();
    thing.id = id;
    this.things.push(thing);
  }
  deleteLine(index: number){
    this.things.splice(index, 1);
  }
  save() {
    let obj = this.fg.value;
    obj.journalEntryLines = this.things.map(t=>t.toCreateJournalEntryLine());
    this.service.addJournalEntry(obj).subscribe(r=>this.routerService.navigateTo('journalentry'));
  }
  test() {
    console.log(this.things);
    console.log(this.fg.value);
  }
}
