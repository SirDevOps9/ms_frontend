import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  FormsService,
  RouterService,
  customValidators,
  lookupDto,
  LookupEnum,
  LookupsService,
  ToasterService,
  LanguageService,
} from 'shared-lib';
import { AccountService } from '../../account.service';
import { AddAccountDto } from '../../models';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { AccountDto } from '../../models';
import { AccountSectionDropDownDto } from '../../models';
import { AccountTypeDropDownDto } from '../../models';
import { TagDropDownDto } from '../../models';
import { parentAccountDto } from '../../models';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.scss',
})
export class AddChartComponent {
  formGroup: FormGroup;
  parentAccounts: parentAccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections: AccountSectionDropDownDto[];
  accountTypes: AccountTypeDropDownDto[];
  accountTags: TagDropDownDto[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  currencyIsVisible: boolean = false;
  hasParentAccount: boolean = false;

  selectedPeriodOption: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private currencyService: CurrencyService,
    private formsService: FormsService,
    private lookupsService: LookupsService,
    private toaserService : ToasterService,
    private languageService : LanguageService
  ) {
    this.formGroup = formBuilder.group({
      nameAr: new FormControl('', customValidators.length(0, 255)),
      nameEn: new FormControl('', customValidators.length(0, 255)),
      levelId: new FormControl(''),
      accountCode: new FormControl('', customValidators.required),
      parentId: new FormControl(''),
      accountSectionName: new FormControl(''),
      natureId: new FormControl('', customValidators.required),
      hasNoChild: new FormControl(),
      accountTypeId: new FormControl('', customValidators.required),
      accountSectionId: new FormControl('', customValidators.required),
      currencyId: new FormControl(),
      tags: new FormControl([]),
      AccountActivation: new FormControl(''),
      periodicActiveFrom: new FormControl(),
      periodicActiveTo: new FormControl(),
    });
  }
  ngOnInit() {
    this.loadLookups();
    this.Subscribe();

    this.accountService.getAllParentAccounts();
    this.accountService.parentAccounts.subscribe((res) => {
      this.parentAccounts = res;
    });

    this.currencyService.getCurrencies('');
    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
    });

    this.accountService.getAccountSections();
    this.accountService.accountSections.subscribe((res) => {
      this.accountSections = res;
    });

    this.getTags();

    this.formGroup.get('AccountActivation')?.valueChanges.subscribe((value) => {
      this.onRadioButtonChange(value);
    });

    if (this.routerService.currentId) this.onParentAccountChange(this.routerService.currentId);
  }

  getTags() {
    this.accountService.getTags();
    this.accountService.tags.subscribe((res) => {
      this.accountTags = res;
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  onAccountSectionChange(event: any) {
    const sectionId = event;
    if (!sectionId) return;
    this.accountService.getAccountTypes(sectionId);
    this.accountService.accountTypes.subscribe((typeList) => {
      this.accountTypes = typeList;
    });

    this.formGroup.patchValue({ accountTypeId: [] });
  }

  onParentAccountChange(event: any) {
    const parentAccountId = event;
    if (!parentAccountId) return;
    this.hasParentAccount = true;
    this.accountService.getAccount(parentAccountId);
    this.accountService.selectedAccount.subscribe((response) => {
      const newAccountData = {
        levelId: response.levelId,
        accountCode: response.accountCode,
        accountSectionId: response.accountSectionId,
        accountSectionName: response.accountSectionName,
        natureId: response.accountNature,
      };
      this.onAccountSectionChange(response.accountSectionId);
      this.formGroup.patchValue(newAccountData);
    });
  }

  toggleCurrencyVisibility() {
    this.currencyIsVisible = !this.currencyIsVisible;
  }

  onRadioButtonChange(value: string) {
    console.log(value);
    this.selectedPeriodOption = value;
  }

  onSubmit() {
    if (!this.formsService.validForm(this.formGroup, true)) return;

    let obj: AddAccountDto = this.formGroup.value;

    this.accountService.addAccount(obj);

    this.accountService.savedAddedAccount.subscribe((res) => {
      if (res) {
        this.toaserService.showSuccess(
          this.languageService.transalte('ChartOfAccounts.SuccessTitle'),
          this.languageService.transalte('ChartOfAccounts.SuccessMessage')
        )
      }
    });
  }
}
