import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  FormsService,
  PageInfo,
  RouterService,
  customValidators,
  lookupDto,
  LookupEnum,
  LookupsService,
} from 'shared-lib';
import { AccountService } from '../../account.service';
import { AddAccountDto } from '../../models/addAccountDto';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { AccountDto } from '../../models/accountDto';
import { AccountSectionDropDownDto } from '../../models/accountSectionDropDownDto';
import { AccountTypeDropDownDto } from '../../models/accountTypeDropDownDto';
import { TagDropDownDto } from '../../models/tagDropDownDto';
import { AccountProxy } from '../../account.proxy';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.scss',
})
export class AddChartComponent {
  formGroup: FormGroup;
  filteredAccounts: AccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections: AccountSectionDropDownDto[];
  accountTypes: AccountTypeDropDownDto[];
  accountTags: TagDropDownDto[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private currencyService: CurrencyService,
    private formsService: FormsService,
    private lookupsService: LookupsService,
    private accountProxy: AccountProxy
  ) {
    this.formGroup = formBuilder.group({
      nameAr: new FormControl('', customValidators.length(0, 255)),
      nameEn: new FormControl('', customValidators.length(0, 255)),
      levelId: new FormControl(''),
      accountCode: new FormControl('', customValidators.required),
      parentId: new FormControl(''),
      parentAccountCode: new FormControl(''),
      natureId: new FormControl('', customValidators.required),
      hasNoChild: new FormControl(''),
      accountTypeId: new FormControl('', customValidators.required),
      accountSectionId: new FormControl('', customValidators.required),
      currencyId: new FormControl(''),
      tags: new FormControl('', customValidators.required),
      periodicActive: new FormControl(''),
      periodicActiveFrom: new FormControl(''),
      periodicActiveTo: new FormControl(''),
    });
  }
  ngOnInit() {
    this.loadLookups();
    this.Subscribe();
    this.accountService
      .getAllChartOfAccountPaginated('', new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));

    this.currencyService
      .getCurrencies('')
      .subscribe((r) => (this.currencies = r));

    this.accountService
      .getAccountSections()
      .subscribe((res) => (this.accountSections = res));

    this.getTags();
  }

  getAccountTypes(sectionId: number) {
    this.accountService
      .getAccountTypes(sectionId)
      .subscribe((res) => this.accountTypes == res);
  }

  getTags() {
    this.accountService.getTags().subscribe((res) => {
      this.accountTags = res;

      console.log('res', this.accountTags);
    });
  }


  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  onSubmit() {
    if (!this.formsService.validForm(this.formGroup, true)) return;

    let obj: AddAccountDto = this.formGroup.value;

    this.accountService
      .addAccount(obj)
      .subscribe((r) =>
        r == true ? this.routerService.navigateTo('ChartOfAccounts') : false
      );
  }
}
