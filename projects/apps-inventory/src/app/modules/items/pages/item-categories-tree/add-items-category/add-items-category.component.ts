import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { parentAccountDto, AccountSectionDropDownDto, AccountTypeDropDownDto, TagDropDownDto, companyDropDownDto, AddAccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { CurrencyService } from 'projects/apps-accounting/src/app/modules/general/currency.service';
import { CurrencyDto } from 'projects/apps-finance/src/app/modules/general/models';
import { Subscription } from 'rxjs';
import { LookupEnum, lookupDto, RouterService, FormsService, LookupsService, ToasterService, LanguageService, CurrentUserService, customValidators, Modules } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddItemCategory } from '../../../models';

@Component({
  selector: 'app-add-items-category',
  templateUrl: './add-items-category.component.html',
  styleUrl: './add-items-category.component.scss'
})
export class AddItemsCategoryComponent {
  formGroup: FormGroup;
  parentAccounts: parentAccountDto[] = [];
  currencies: CurrencyDto[];
  fitleredCurrencies: CurrencyDto[];
  accountSections: AccountSectionDropDownDto[];
  accountTypes: AccountTypeDropDownDto[];
  ItemCategoryDropDown : { id: number; name : string }[]
  AccountsDropDownLookup : { id: number; name: string}[] = []

  categoryType = [
    { label: 'Storable', value: 1 },
    { label: 'Service', value: 2 },
    { label: 'Asset', value: 3 }
  
  ]

  accountTags: TagDropDownDto[];
  companyDropDown: companyDropDownDto[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  currencyIsVisible: boolean = false;
  hasParentAccount: boolean = false;
  selectValue: boolean = false;
  parentAcountName?: parentAccountDto;
  currenciesDefault: number
  selectedPeriodOption: string = '';
  @Input() parentAddedId?: number | undefined;
  @Input() newChiled?: boolean;
  @Output() operationCompleted = new EventEmitter<any>();
  private savedAddedAccountSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private routerService: RouterService,
    private currencyService: CurrencyService,
    private formsService: FormsService,
    private lookupsService: LookupsService,
    private toaserService: ToasterService,
    private title: Title,
    private langService: LanguageService,
    private currentUserService: CurrentUserService,
    private itemService : ItemsService

  ) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.AddChartOfAccount'));

    this.formGroup = formBuilder.group({
      code: [''],
      nameEn: [''],
      nameAr: [''],
      parentCategoryId: [null],
      isDetailed: [false], // Assuming a boolean default of `false`
      categoryType: [''],

      glAccountId: [null],
      cashSalesAccountId: [null],
      creditSalesAccountId: [null],
      salesReturnAccountId: [null],
      purchaseAccountId: [null],
      salesCostAccountId: [null],
      discountAccountId: [null],
      evaluationAccountId: [null],
      adjustmentAccountId: [null],
      goodsInTransitAccountId: [null]
    });
  }
  ngOnInit() {
    this.Subscribe();

    // if (this.parentAddedId) {
    //   this.onParentAccountChange(this.parentAddedId);
    // }

    // this.accountService.parentAccounts.subscribe((res) => {
    //   if (res) {
    //     this.parentAccounts = res;
    //   }
    // });

    this.AccountsDropDown()
    


    // if (this.routerService.currentId) this.onParentAccountChange(this.routerService.currentId);
    this.ItemCategoryDropDownData()
    this.itemService.AddItemCategoryLookupObs.subscribe(res=>{
      
    })
  }

  AccountsDropDown() {
    this.itemService.AccountsDropDown()
    this.itemService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
  }

  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown()
    this.itemService.itemCategoryLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res
      console.log(res)
    })
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
      this.companyDropDown = res
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
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));

    this.savedAddedAccountSubscription = this.accountService.savedAddedAccount.subscribe((res) => {
      if (res) {
        this.operationCompleted.emit(res);
        this.toaserService.showSuccess(
          this.langService.transalte('ChartOfAccount.Success'),
          this.langService.transalte('ChartOfAccount.AddedSuccessfully')
        );
      }
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
    const parentAccountId = event;
    if (!parentAccountId) return;
    this.itemService.getItemCategoryById(parentAccountId);
    this.itemService.getItemCategoryByIdDataObs.subscribe((res:any) => {
      console.log(res)
    })
    // this.accountService.getAccount(parentAccountId);
    // this.accountService.selectedAccount.subscribe((response) => {
    //   this.parentAcountName = response;
    //   this.selectValue = true
    //   const newAccountData = {
    //     levelId: response.levelId! + 1,
    //     accountCode: response.accountCode,
    //     accountSectionId: response.accountSectionId,
    //     accountSectionName: response.accountSectionName,
    //     natureId: response.natureId,
    //     parentId: response.id,
    //   };
    //   this.formGroup.get('accountTypeId')?.setValue([null]);

    //   this.onAccountSectionChange(response.accountSectionId);
    //   this.formGroup.patchValue(newAccountData);
    // });
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

  }
  ngOnChanges(changes: SimpleChanges): void {
  //  this.formGroup.patchValue({
  //   nameEn: [''],
  //   nameAr: [''],
  //   parentCategoryId: [null],
  //   isDetailed: [false], // Assuming a boolean default of `false`
  //   categoryType: [''],

  //   glAccountId: [null],
  //   cashSalesAccountId: [null],
  //   creditSalesAccountId: [null],
  //   salesReturnAccountId: [null],
  //   purchaseAccountId: [null],
  //   salesCostAccountId: [null],
  //   discountAccountId: [null],
  //   evaluationAccountId: [null],
  //   adjustmentAccountId: [null],
  //   goodsInTransitAccountId: [null]
  //  })

  //   this.hasParentAccount = true

    if (changes['parentAddedId']) {


      this.onParentAccountChange(this.parentAddedId);
    }
    console.log(this.parentAddedId)
    console.log(changes)


    if (changes['newChiled']) {
      console.log(this.newChiled ,"11111")

      if (this.newChiled == true) {
        this.hasParentAccount = false
        this.selectValue = false

        delete this.formGroup.value.accountCode
        this.formGroup.get('accountCode')?.setValue([null]);
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