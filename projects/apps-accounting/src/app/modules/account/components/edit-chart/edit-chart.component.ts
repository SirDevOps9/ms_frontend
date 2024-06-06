import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LookupEnum, lookupDto, RouterService, FormsService, LookupsService, ToasterService, LanguageService, customValidators } from 'shared-lib';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { AccountService } from '../../account.service';
import { parentAccountDto, AccountSectionDropDownDto, AccountTypeDropDownDto, TagDropDownDto, AddAccountDto, AccountByIdDto, accountById } from '../../models';

@Component({
  selector: 'app-edit-chart',
  templateUrl: './edit-chart.component.html',
  styleUrl: './edit-chart.component.scss'
})
export class EditChartComponent {
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
  selectValue: boolean = false;
  parentAcountName?: parentAccountDto;
  parent?: AccountByIdDto;

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
    private toaserService: ToasterService,
    private languageService: LanguageService
  ) {
    this.formGroup = formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [customValidators.length(0, 255), customValidators.required]),
      levelId: new FormControl(''),
      accountCode: new FormControl(''),
      parentAccountCode: new FormControl(''),
      parentId: new FormControl(null),
      accountSectionName: new FormControl(''),
      natureId: new FormControl('', customValidators.required),
      hasNoChild: new FormControl(false),
      accountTypeId: new FormControl('', customValidators.required),
      accountSectionId: new FormControl('', customValidators.required),
      currencyId: new FormControl(),
      tags: new FormControl([]),
      AccountActivation: new FormControl('Active'),
      periodicActiveFrom: new FormControl(),
      periodicActiveTo: new FormControl(),
    });
  }
  ngOnInit() {
    this.getAccountById(this.parentEditedId)
    this.loadLookups();
    this.Subscribe();
    this.accountService.getAllParentAccounts();
    this.accountService.parentAccounts.subscribe((res) => {
      if (res) {
        this.parentAccounts = res;
      }
    });

    this.accountService.getAccountSections();
    this.accountService.accountSections.subscribe((res) => {
      this.accountSections = res;
    });
    this.getTags();
    this.getCurrencies();
    this.formGroup.get('AccountActivation')?.valueChanges.subscribe((value) => {
      this.onRadioButtonChange(value);
    });

  }
  getCurrencies(){
  this.currencyService.getCurrencies('');
  this.currencyService.currencies.subscribe((res) => {
    this.currencies = res;
  });
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
    this.getAccountById(this.parentEditedId);

  }

  toggleCurrencyVisibility() {
    this.currencyIsVisible = !this.currencyIsVisible;
  }

  onRadioButtonChange(value: string) {
    this.selectedPeriodOption = value;
  }

  onSubmit() {

    if (!this.formsService.validForm(this.formGroup, false)) return;


    let obj: accountById = this.formGroup.value;

    this.accountService.editAccount(obj);

    this.accountService.editedAccount.subscribe((res) => {
      if (res) {
        this.operationCompleted.emit(this.parentEditedId);
        this.toaserService.showSuccess(
          this.languageService.transalte('ChartOfAccounts.SuccessTitle'),
          this.languageService.transalte('ChartOfAccounts.SuccessMessage')
        );
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentEditedId']) {
      this.onParentAccountChange(this.parentEditedId);
    }
  }
  getAccountById(id: any) {
    this.accountService.getAccountById(id);
    this.accountService.selectedAccountById.subscribe((res:any) => {
      this.parentAcountName = res;

            if(res.parentId!=null){
              this.hasParentAccount = true
              this.selectValue = true
            }else{
              this.hasParentAccount=false
              this.selectValue=true
              
            }
            const newAccountData = {
              id:res.id,
              name: res.name || '',
              levelId: res.levelId || '',
              accountCode: res.accountCode || '',
              parentAccountCode: res.parentAccountCode || '',
              parentId: res.parentId || null,
              accountSectionName: res.accountSectionName || '',
              natureId: res.natureId || '',
              hasNoChild: res.hasNoChild || false,
              accountTypeId: res.accountTypeId || '',
              accountSectionId: res.accountSectionId || '',
              currencyId: res.currencyId ,
              tags: res.tags || [],
              AccountActivation: res.AccountActivation || 'Active',
              periodicActiveFrom: res.periodicActiveFrom || null,
              periodicActiveTo: res.periodicActiveTo || null
            };
            this.onAccountSectionChange(res.accountSectionId);
            this.formGroup.patchValue(newAccountData);

    });
  }
}