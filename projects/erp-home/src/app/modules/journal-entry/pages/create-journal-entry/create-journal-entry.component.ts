import { CurrencyService } from './../../../general/currency.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PageInfo, customValidators } from 'shared-lib';
import { AccountDto } from '../../../account/models/accountDto';
import { AccountService } from '../../../account/account.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { JournalTemplatePopupComponent } from '../components/journal-template-popup/journal-template-popup.component';
import { DialogService } from 'primeng/dynamicdialog';
import { JournalEntryService } from '../../journal-entry.service';

export class Thing {
  id: number;
  accountId: number;
  account: AccountDto;
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
  debitAmountLocal: number;
  creditAmountLocal: number;
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
  currencyRate: number;
}

@Component({
  selector: 'app-journal-entry',
  templateUrl: './create-journal-entry.component.html',
  styleUrl: './create-journal-entry.component.scss'
})
export class CreateJournalEntryComponent {

  fg: FormGroup;
  things: Thing[] = [];
  filteredAccounts: AccountDto[] = [{
    id: 0,
    nameAr: '',
    nameEn: 'Select more'
  }];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];

  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private currencyService: CurrencyService,
    private dialog: DialogService ,
    private JournalService:JournalEntryService ) {
    this.fg = fb.group({
      refrenceNumber: ['', customValidators.required],
      journalDate: [this.getTodaysDate(), customValidators.required],
      periodId: [null, customValidators.required],
      periodName: [''],
      description: ['', customValidators.required],
      journalEntryAttachments: fb.array([]),
      journalEntryLines: fb.array([])
    });
    this.fg.controls['journalDate'].valueChanges.subscribe(v => {
      this.fg.patchValue({
        periodId: 1,
        periodName: 'Period1'
      })
    });
  }

  public get attachments(): FormArray {
    return this.fg.controls['journalEntryAttachments'] as FormArray;
  }

  public get items(): FormArray {
    return this.fg.controls['journalEntryLines'] as FormArray;
  }

  addAttachment() {
    this.attachments.push(this.fb.group({
      attachmentId: ['', customValidators.required],
      name: ['', customValidators.required]
    }))
  }

  ngOnInit() {
    this.accountService.getAllPaginated('', new PageInfo())
      .subscribe(r => this.filteredAccounts = r.result);
    this.currencyService.getCurrencies('')
      .subscribe(r => this.currencies = r);
  }
  extras = [];
  addLine() {
    const id = this.items.length + 1;
    const fg = this.fb.group({
      id: new FormControl(id),
      lineDescription: ['', customValidators.required],
      debitAmount: [null, customValidators.required],
      creditAmount: [null, customValidators.required],
      currencyId: [null, customValidators.required],
      currencyRate: [null, customValidators.required],
      accountId: [null, customValidators.required]
    });
    this.items.push(fg)
  }
  filterAccount(event: any) {
    // console.log(event.originalEvent);
    console.log(this.filteredAccounts);

    let query = event.query;
    this.accountService.getAllPaginated(query, new PageInfo())
      .subscribe(r => this.filteredAccounts.concat(r.result));
  }
  accountSelected(event: any) {
    console.log(event);
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
  save() {
  }
  test() {
    console.log(this.things);
  }
 
  RedirectToTemplate() {
    const dialogRef = this.dialog.open(JournalTemplatePopupComponent, {
      width: '800px',
      height: '700px'
    });
  
    dialogRef.onClose.subscribe((id: any) => {
      console.log('Received ID:', id);
      this.JournalService.getJournalTemplateById(id).subscribe(template => {
        console.log('template:', template);
        this.fg.patchValue({
          journalDate: new Date().toISOString().substring(0, 10), // Set today's date or template's date?
          periodId: template.PeriodId,
          description: template.Description,
        });

          while (this.items.length !== 0) {
          this.items.removeAt(0);
        }
  
        // Loop through template lines and add them to the form array
        template.GetJournalTemplateLinesByIdDto.forEach(line => {
          const fg = this.fb.group({
            lineDescription: line.LineDescription,
            debitAmount: line.DebitAmount,
            creditAmount: line.CreditAmount,
            currencyId: line.CurrencyId,
            currencyRate: line.CurrencyRate,
            accountId: line.AccountId
          });
          this.items.push(fg);
        });
      });
    });
  }
}
