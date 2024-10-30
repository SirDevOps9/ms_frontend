import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
  input,
  output,
} from '@angular/core';
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
  Modules,
} from 'shared-lib';
import { AccountService } from '../../account.service';
import { AddAccountDto, companyDropDownDto, AccountSectionDropDownDto, AccountTypeDropDownDto, TagDropDownDto, parentAccountDto } from '../../models';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { Title } from '@angular/platform-browser';
import { CurrentUserService } from 'libs/shared-lib/src/lib/services/currentuser.service';
import { Subscription } from 'rxjs';


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
  sendIdAdded = output<any>()
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
    private currentUserService: CurrentUserService

  ) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.AddChartOfAccount'));

    this.formGroup = formBuilder.group({
      name: new FormControl('', [customValidators.length(0, 255), customValidators.required]),
      levelId: new FormControl(''),
      accountCode: new FormControl(''),
      parentId: new FormControl(null),
      accountSectionName: new FormControl(''),
      natureId: new FormControl('', customValidators.required),
      hasNoChild: new FormControl(false),
      accountTypeId: new FormControl('', customValidators.required),
      accountSectionId: new FormControl('', customValidators.required),
      currencyId: new FormControl(),
      tags: new FormControl([]),
      companies: new FormControl([]),
      accountActivation: new FormControl('Active'),
      periodicActiveFrom: new FormControl(),
      periodicActiveTo: new FormControl(),
      costCenterConfig: new FormControl()
    });
  }
  ngOnInit() {
    this.loadLookups();
    this.Subscribe();
    this.accountService.getAllParentAccounts();

    if (this.parentAddedId) {
      this.onParentAccountChange(this.parentAddedId);
    }

    this.accountService.parentAccounts.subscribe((res) => {
      if (res) {
        this.parentAccounts = res;
      }
    });

    this.currencyService.getCurrencies('');
    this.currencyService.currencies.subscribe((res) => {
      this.currencies = res;
    });
    this.formGroup.controls['currencyId'].setValue(this.currentUserService.getCurrency())
    // this.currenciesDefault= this.currentUserService.getCurrency()

    this.accountService.getAccountSections();
    this.accountService.accountSections.subscribe((res) => {
      this.accountSections = res;
    });

    this.getTags();
    this.getCompanyDropdown();

    this.formGroup.get('accountActivation')?.valueChanges.subscribe((value) => {
      this.onRadioButtonChange(value);
    });

    if (this.routerService.currentId) this.onParentAccountChange(this.routerService.currentId);
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
    this.hasParentAccount = true;
    this.accountService.getAccount(parentAccountId);
    this.accountService.selectedAccount.subscribe((response) => {
      this.parentAcountName = response;
      this.selectValue = true
      const newAccountData = {
        levelId: response.levelId! + 1,
        accountCode: response.accountCode,
        accountSectionId: response.accountSectionId,
        accountSectionName: response.accountSectionName,
        natureId: response.natureId,
        parentId: response.id,
      };
      this.formGroup.get('accountTypeId')?.setValue([null]);

      this.onAccountSectionChange(response.accountSectionId);
      this.formGroup.patchValue(newAccountData);
    });
  }

  toggleCurrencyVisibility() {
    this.currencyIsVisible = !this.currencyIsVisible;
  }

  onRadioButtonChange(value: string) {
    this.selectedPeriodOption = value;
  }

  onSubmit() {
    if (!this.formsService.validForm(this.formGroup, false)) return;

    let obj: AddAccountDto = this.formGroup.value;

    this.accountService.addAccount(obj);
    this.accountService.savedAddedAccount.subscribe(
      {next:(res?:AddAccountDto | any)=>{
      if(res){
        this.sendIdAdded.emit(res)
        console.log(res);
        
      }

    },
  error:(err:Error)=>{
    return
  }})


  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentAddedId']) {
      this.onParentAccountChange(this.parentAddedId);
    }

    if (changes['newChiled']) {
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