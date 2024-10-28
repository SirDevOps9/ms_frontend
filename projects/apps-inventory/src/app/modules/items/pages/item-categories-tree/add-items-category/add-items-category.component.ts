import { Component, EventEmitter, Input, output, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import {
  parentAccountDto,
  AccountSectionDropDownDto,
  AccountTypeDropDownDto,
  TagDropDownDto,
  companyDropDownDto,
} from 'projects/apps-accounting/src/app/modules/account/models';
import { CurrencyDto } from 'projects/apps-finance/src/app/modules/general/models';
import { Subscription } from 'rxjs';
import {
  LookupEnum,
  lookupDto,
  FormsService,
  LookupsService,
  customValidators,
  Modules,
} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddItemCategory } from '../../../models';

@Component({
  selector: 'app-add-items-category',
  templateUrl: './add-items-category.component.html',
  styleUrl: './add-items-category.component.scss',
})
export class AddItemsCategoryComponent {
  formGroup: FormGroup;
  parentAccounts: parentAccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections: AccountSectionDropDownDto[];
  accountTypes: AccountTypeDropDownDto[];
  ItemCategoryDropDown: { id: number; name: string }[];
  AccountsDropDownLookup: { id: number; name: string }[] = [];

  categoryType = [
    { label: 'Storable', value: 1 },
    { label: 'Service', value: 2 },
    { label: 'Asset', value: 3 },
  ];

  accountTags: TagDropDownDto[];
  companyDropDown: companyDropDownDto[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  currencyIsVisible: boolean = false;
  hasParentAccount: boolean = false;
  selectValue: boolean = false;
  parentAcountName?: parentAccountDto;
  parentCategoryList: { id: number; name: string }[] = [];
  currenciesDefault: number;
  selectedPeriodOption: string = '';
  @Input() parentAddedId?: number | undefined;
  @Input() newChiled?: boolean;
  showCategory: boolean = true;
  @Output() operationCompleted = new EventEmitter<any>();
  private savedAddedAccountSubscription: Subscription;
  sendIdAdded = output<any>();

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private formsService: FormsService,
    private lookupsService: LookupsService,

    private itemService: ItemsService
  ) {}
  ngOnInit() {

    this.formGroup = this.formBuilder.group({
      code: [''],
      nameEn: new FormControl('', [customValidators.required]),
      nameAr: ['', [customValidators.required]],
      parentCategoryId: [null],
      isDetailed: [true], // Assuming a boolean default of `false`
      categoryType: [null, [customValidators.required]],

      purchaseAccountId: [null],
      costOfGoodSoldAccountId:[null]
    });
    this.getParentItemCategoriesDropDown();

    this.formGroup.get('isDetailed')?.valueChanges.subscribe((res) => {
      if (res == true) {
        this.formGroup.get('categoryType')?.setValidators(customValidators.required);
        this.formGroup.get('categoryType')?.updateValueAndValidity();
        this.showCategory = true;
      } else {
        this.formGroup.get('categoryType')?.clearValidators();
        this.formGroup.get('categoryType')?.updateValueAndValidity();
        this.showCategory = false;
      }
    });

    this.AccountsDropDown();
  }
  resetForm() {
    this.formGroup.get('id')?.reset();
    this.formGroup.get('code')?.reset(null);

    this.formGroup.get('parentCategoryId')?.reset(null); 
    this.formGroup.get('isDetailed')?.reset(false); 
    this.formGroup.get('categoryType')?.reset(null); 

    // Reset all the account-related fields to null
    this.formGroup.get('purchaseAccountId')?.reset(null);
    this.formGroup.get('costOfGoodSoldAccountId')?.reset(null);
    
  }

  getParentItemCategoriesDropDown() {
    this.itemService.ParentItemCategoriesDropDown('');
    this.itemService.parentItemCategoriesDropDown$.subscribe({
      next: (res: { id: number; name: string }[]) => {
        this.parentCategoryList = res;
      },
      error: (error: any) => {
      },
    });
  }
  AccountsDropDown() {
    this.itemService.AccountsDropDown();
    this.itemService.AccountsDropDownLookupObs.subscribe((res) => {
      this.AccountsDropDownLookup = res;
    });
  }

  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown();
    this.itemService.itemCategoryLookupObs.subscribe((res) => {
      this.ItemCategoryDropDown = res;
    });
  }

  getTags() {
    this.accountService.getTags(Modules.Accounting);
    this.accountService.tags.subscribe((res) => {
      this.accountTags = res;
    });
  }
  getCompanyDropdown() {
    this.accountService.getCompanyDropdown();
    this.accountService.companyDropdown.subscribe((res) => {
      this.companyDropDown = res;
      if (res && res.length > 0 && this.formGroup) {
        // Assuming the company object has an 'id' property that needs to be assigned
        const companiesControl = this.formGroup.get('companies');
        if (companiesControl) {
          companiesControl.setValue([res[0].id]);
        }
      }
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
  }

  onAccountSectionChange(event: any) {
    const sectionId = event;
    if (!sectionId) return;
    this.accountService.getAccountTypes(sectionId);
    this.accountService.accountTypes.subscribe((typeList) => {
      this.accountTypes = typeList;
    });
  }

  onParentAccountChange(event: any) {
    const parentAccountId = event;
    if (!parentAccountId) return;
    this.hasParentAccount = true;
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

    this.itemService.addItemCategory(obj);
    setTimeout(() => {
      this.itemService.AddItemCategoryLookupObs.subscribe({
        next: (res?: any | any) => {
          if (res) {
            this.operationCompleted.emit(res);
          }
        },
        error: (err: Error) => {
          return;
        },
      });
    }, 100);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentAddedId']) {
      this.onParentAccountChange(this.parentAddedId);
    }
    setTimeout(() => {
      this.formGroup.get('parentCategoryId')?.setValue(this.parentAddedId);
    }, 100);

    if (changes['newChiled']) {

      if (this.newChiled == true) {
        this.hasParentAccount = false;
        this.selectValue = false;
      }
    }
  }
  cancel() {
    this.operationCompleted.emit(false);
  }
  ngOnDestroy() {
    if (this.savedAddedAccountSubscription) {
      this.accountService.savedAccountDataSource.next(undefined);
      this.savedAddedAccountSubscription.unsubscribe();
    }
  }
}
