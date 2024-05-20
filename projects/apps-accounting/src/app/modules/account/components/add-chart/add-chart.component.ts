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
import { AddAccountDto } from '../../models';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { AccountDto } from '../../models';
import { AccountSectionDropDownDto } from '../../models';
import { AccountTypeDropDownDto } from '../../models';
import { TagDropDownDto } from '../../models';
import { parentAccountDto } from '../../models';
import { log } from 'console';

@Component({
  selector: 'app-add-chart',
  templateUrl: './add-chart.component.html',
  styleUrl: './add-chart.component.scss',
})
export class AddChartComponent {
  formGroup: FormGroup;
  parentAccounts: parentAccountDto[] = [];
  selectedParentAccount: parentAccountDto = {} as parentAccountDto;
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections: AccountSectionDropDownDto[];
  accountTypes: AccountTypeDropDownDto[];
  accountTags: TagDropDownDto[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  currencyIsVisible: boolean = false;
  hasparent: boolean = false;

  selectedPeriodOption: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private currencyService: CurrencyService,
    private formsService: FormsService,
    private lookupsService: LookupsService
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
      .getAllParentAccounts();
      this.accountService.parentAccounts.subscribe((res) => {
        this.parentAccounts = res;
      })

    this.currencyService.getCurrencies('');
    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
    });

    this.accountService.getAccountSections();
    this.accountService.accountSections.subscribe((res) => {
      this.accountSections = res;
    });

    this.getTags();

    this.formGroup.get('periodicActive')?.valueChanges.subscribe((value) => {
      this.onRadioButtonChange(value);
    });


    if(this.routerService.currentParetId)
      this.onParentAccountChange(1);
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
    this.hasparent=true
    this.accountService.getAccount(parentAccountId);
    this.accountService.selectedAccount.subscribe((response) => {
      this.selectedParentAccount = response;

      const newAccountData = {
        levelId: this.selectedParentAccount.levelId,
        accountCode: this.selectedParentAccount.accountCode,
        accountSectionId : this.selectedParentAccount.accountSectionId,
        //natureId:this.selectedParentAccount.natureId
      };
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
    //obj.natureId = this.formGroup.controls('natureId').value;

    // const obj2 : AddAccountDto = {
    //   natureId = this.formGroup.controls('natureId').value,

    // }


    this.accountService
      .addAccount(obj)
      .subscribe((r) => (r == true ? this.routerService.navigateTo('ChartOfAccounts') : false));
  }
}
