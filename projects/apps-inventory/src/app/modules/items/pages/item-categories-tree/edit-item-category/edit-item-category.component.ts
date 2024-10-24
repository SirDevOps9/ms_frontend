import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import {
  parentAccountDto,
  AccountSectionDropDownDto,
  AccountTypeDropDownDto,
  TagDropDownDto,
  companyDropDownDto,
  AccountByIdDto,
} from 'projects/apps-accounting/src/app/modules/account/models';
import { CurrencyDto } from 'projects/apps-finance/src/app/modules/general/models';
import { LookupEnum, lookupDto, FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddItemCategory } from '../../../models';

@Component({
  selector: 'app-edit-item-category',
  templateUrl: './edit-item-category.component.html',
  styleUrl: './edit-item-category.component.scss',
})
export class EditItemCategoryComponent {
  formGroup: FormGroup;
  parentAccounts: parentAccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections: AccountSectionDropDownDto[];
  accountTypes: AccountTypeDropDownDto[];
  accountTags: TagDropDownDto[];
  parentCategoryList: { id: number; name: string }[] = [];

  companyDropDown: companyDropDownDto[];
  AccountsDropDownLookup: { id: number; name: string }[] = [];
  categoryType = [
    { label: 'Storable', value: 'Storable' },
    { label: 'Service', value: 'Service' },
    { label: 'Asset', value: 'Asset' },
  ];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  currencyIsVisible: boolean;
  hasParentAccount: boolean = false;
  selectValue: boolean = false;
  parentAcountName?: parentAccountDto;
  parent?: AccountByIdDto;
  accountTypeIdValue: number;
  showCategory: boolean = true;

  selectedPeriodOption: string = '';
  @Input() parentEditedId?: number;
  @Output() operationCompleted = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,

    private formsService: FormsService,

    private itemService: ItemsService
  ) {}
  ngOnInit() {
    this.AccountsDropDown();

    this.getParentItemCategoriesDropDown();
    this.getAccountById(this.parentEditedId);

    this.formGroup = this.formBuilder.group({
      id: new FormControl(),
      code: [''],
      nameEn: ['', [customValidators.required]],
      nameAr: ['', [customValidators.required]],
      parentCategoryId: [null],
      isDetailed: [false], // Assuming a boolean default of `false`
      categoryType: [null],

      purchaseAccountId: [null],
      costOfGoodSoldAccountId: [null],
    });

    this.itemService.EditItemCategoryDataObs.subscribe((res) => {
      if (res) {
        this.formGroup.get('id')?.reset();
        this.formGroup.get('code')?.reset(''); // Reset to an empty string
        this.formGroup.get('nameEn')?.reset('', { emitEvent: false }); // Reset and retain validators
        this.formGroup.get('nameAr')?.reset('', { emitEvent: false }); // Reset and retain validators
        this.formGroup.get('parentCategoryId')?.reset(null); // Reset to null
        this.formGroup.get('isDetailed')?.reset(false); // Reset to default false
        this.formGroup.get('categoryType')?.reset('', { emitEvent: false }); // Reset and retain validators

        // Reset all the account-related fields to null
        this.formGroup.get('purchaseAccountId')?.reset(null);
        this.formGroup.get('costOfGoodSoldAccountId')?.reset(null);
      }
    });


    this.formGroup.get('isDetailed')?.valueChanges.subscribe((res) => {
      if (res == true) {
        this.formGroup.get('categoryType')?.setValidators(customValidators.required);
        this.formGroup.get('categoryType')?.updateValueAndValidity();
        this.showCategory = true;
      } else {
        this.formGroup.get('categoryType')?.clearValidators();
        this.formGroup.get('categoryType')?.reset(null);
        this.formGroup.get('categoryType')?.updateValueAndValidity();
        this.formGroup.get('costOfGoodSoldAccountId')?.reset();
        this.formGroup.get('purchaseAccountId')?.reset();
        this.showCategory = false;
      }
    });
  }
  getParentItemCategoriesDropDown() {
    this.itemService.ParentItemCategoriesDropDown('');
    this.itemService.parentItemCategoriesDropDown$.subscribe({
      next: (res: { id: number; name: string }[]) => {
        this.parentCategoryList = res;
      },
      error: (error: any) => {},
    });
  }

  AccountsDropDown() {
    this.itemService.AccountsDropDown();
    this.itemService.AccountsDropDownLookupObs.subscribe((res) => {
      this.AccountsDropDownLookup = res;
    });
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
    this.formGroup.controls['parentAccountCode']?.setValue(event);
  }

  toggleCurrencyVisibility() {
    this.currencyIsVisible = !this.currencyIsVisible;
  }

  onRadioButtonChange(value: string) {
    this.selectedPeriodOption = value;
  }

  onSubmit() {
    if (!this.formsService.validForm(this.formGroup, false)) return;

    let obj: AddItemCategory = this.formGroup.value;

    this.itemService.editItemCategory(obj);

    this.itemService.EditItemCategoryDataObs.subscribe((res) => {
      if (res) {
        this.operationCompleted.emit(this.parentEditedId);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentEditedId']) {
      this.getAccountById(this.parentEditedId);
    }
  }
  getAccountById(id: any) {
    this.itemService.getItemCategoryById(id);
    this.itemService.getItemCategoryByIdDataObs.subscribe((res: any) => {
      this.parentAcountName = res;

      if (res.parentId != null) {
        this.hasParentAccount = true;
        this.selectValue = true;
      } else {
        this.hasParentAccount = false;
        this.selectValue = true;
      }

      this.formGroup?.patchValue({ ...res });
    });
  }
  cancel() {
    this.operationCompleted.emit(-1);
  }
}
