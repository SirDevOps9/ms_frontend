import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { parentAccountDto, AccountSectionDropDownDto, AccountTypeDropDownDto, TagDropDownDto, companyDropDownDto, AccountByIdDto, accountById } from 'projects/apps-accounting/src/app/modules/account/models';
import { CurrencyService } from 'projects/apps-accounting/src/app/modules/general/currency.service';
import { CurrencyDto } from 'projects/apps-finance/src/app/modules/general/models';
import { LookupEnum, lookupDto, RouterService, FormsService, LookupsService, LanguageService, ToasterService, CurrentUserService, customValidators, Modules } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddItemCategory } from '../../../models';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-item-category',
  templateUrl: './edit-item-category.component.html',
  styleUrl: './edit-item-category.component.scss'
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
  @Input() resetParentCatId: boolean;

  companyDropDown: companyDropDownDto[];
  AccountsDropDownLookup : { id: number; name: string}[] = []
  ItemCategoryDropDown : { id: number; name : string }[]
  categoryType = [
    { label: 'Storable', value: 'Storable' },
    { label: 'Service', value: 'Service' },
    { label: 'Asset', value: 'Asset' }
  
  ]
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  currencyIsVisible: boolean;
  hasParentAccount: boolean = false;
  selectValue: boolean = false;
  parentAcountName?: parentAccountDto;
  parent?: AccountByIdDto;
  accountTypeIdValue:number
  
  selectedPeriodOption: string = '';
  @Input() parentEditedId?: number ;
  @Output() operationCompleted = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private currencyService: CurrencyService,
    private formsService: FormsService,
    private lookupsService: LookupsService,
    private title: Title,
    private langService: LanguageService,
    private toaserService: ToasterService,
    private currentUserService : CurrentUserService,
    private itemService : ItemsService

  ) {


  }
  ngOnInit() {
    this.getAccountById(this.parentEditedId)

    this.formGroup = this.formBuilder.group({
      id: new FormControl(),
      code: [''],
      nameEn: ['' , [customValidators.required]],
      nameAr: ['' , [customValidators.required]],
      parentCategoryId: [null],
      isDetailed: [false], // Assuming a boolean default of `false`
      isActive: [false], // Assuming a boolean default of `false`
      categoryType: [null],

      glAccountId: [null],
      cashSalesAccountId: [null],
      creditSalesAccountId: [null],
      salesReturnAccountId: [null],
      purchaseAccountId: [null],
      costOfGoodSoldAccountId: [null],
    });
    if (this.parentCategoryList.length == 0) {
      this.formGroup.get('isDetailed')?.patchValue(false);
      this.formGroup.get('parentCategoryId')?.patchValue(0);
      this.formGroup.get('categoryType')?.reset(null);
      this.formGroup.get('categoryType')?.clearValidators();
      this.formGroup.get('categoryType')?.updateValueAndValidity();
      this.showCategory = false;
    }

    this.itemService.EditItemCategoryDataObs.subscribe((res) => {
      if (res) {
        this.formGroup.get('id')?.reset();
        this.formGroup.get('code')?.reset(''); // Reset to an empty string
        this.formGroup.get('nameEn')?.reset('', { emitEvent: false }); // Reset and retain validators
        this.formGroup.get('nameAr')?.reset('', { emitEvent: false }); // Reset and retain validators
        this.formGroup.get('parentCategoryId')?.reset(null); // Reset to null
        this.formGroup.get('isActive')?.reset(false); // Reset to null
        this.formGroup.get('isDetailed')?.reset(false); // Reset to default false
        this.formGroup.get('categoryType')?.reset('', { emitEvent: false }); // Reset and retain validators

        // Reset all the account-related fields to null
        this.formGroup.get('glAccountId')?.reset(null);
        this.formGroup.get('cashSalesAccountId')?.reset(null);
        this.formGroup.get('creditSalesAccountId')?.reset(null);
        this.formGroup.get('salesReturnAccountId')?.reset(null);
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
        const idsToRemove = [...this.childrenParentsIdsInSubParent, this.parentEditedId];
        this.parentCategoryList = res.filter((x) => !idsToRemove.includes(x.id));
      },
      error: (error: any) => {},
    });
  }
  AccountsDropDown() {
    this.itemService.AccountsDropDown()
    this.itemService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
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
    this.formGroup.controls['parentAccountCode'].setValue(event);

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

    this.itemService.EditItemCategoryDataObs.subscribe({
      next: (res: boolean) => {
        if (res) {
          this.operationCompleted.emit(this.parentEditedId);
        } else {
          return;
        }
      },
      error: (err: Error) => {
        return;
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentEditedId']) {
      this.getAccountById(this.parentEditedId);
    }
    if (changes['resetParentCatId']) {
      this.getParentItemCategoriesDropDown();
    }
  }
  childrenParentsIdsInSubParent: number[] = [];
  getAccountById(id: any) {
    this.itemService.getItemCategoryById(id);
    this.itemService.getItemCategoryByIdDataObs.subscribe((res:any) => {
      console.log(res)
      this.parentAcountName = res;
      this.childrenParentsIdsInSubParent = res.childCategoriesDtos
      .filter((x: any) => x.isDetailed != true)
      .map((x: any) => x.id);
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
  cancel(){
    this.operationCompleted.emit(-1);

  }
}
