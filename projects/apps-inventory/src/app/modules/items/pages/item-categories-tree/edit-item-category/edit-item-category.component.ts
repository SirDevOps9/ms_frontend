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
    this.title.setTitle(this.langService.transalte('ChartOfAccount.EditChartOfAccount'));

    this.formGroup = formBuilder.group({
      id: new FormControl(),
     

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
    this.getAccountById(this.parentEditedId)

   
 


    this.ItemCategoryDropDownData()
    this.AccountsDropDown()

  }
  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown()
    this.itemService.itemCategoryLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res
      console.log(res)
    })
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
    this.itemService.getItemCategoryByIdDataObs.subscribe((res:any) => {
      this.parentAcountName = res;

            if(res.parentId!=null){
              this.hasParentAccount = true
              this.selectValue = true
            }else{
              this.hasParentAccount=false
              this.selectValue=true
              
            }
          

            this.formGroup.patchValue({...res});
           

    });
  }
  cancel(){
    this.operationCompleted.emit(-1);

  }
}
