import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  FormsService,
  LanguageService,
  LookupEnum,
  LookupsService,
  PageInfo,
  PageInfoResult,
  RouterService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PaymentMethodComponent } from '../../../components/payment-in/payment-method/payment-method.component';
import { paymentplace ,paymentmethodtype } from '../../../models/enums';
import { FinanceService } from '../../../finance.service';
import { CurrencyDto } from '../../../../general/models';
import { SharedJournalEnums } from '../../../models/sharedEnums';
import { PaidByDropDown } from '../../../models';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';

@Component({
  selector: 'app-add-payment-in',
  templateUrl: './add-payment-in.component.html',
  styleUrl: './add-payment-in.component.scss',
})
export class AddPaymentInComponent {
  LookupEnum = LookupEnum;
  addForm: FormGroup;
  tableData: any[] = [];
  paymentplaceEnum: paymentplace;
  lookups: { [key: string]: lookupDto[] };
  originalPaymentMethodTypeLookups: lookupDto[] = [];
  TreasuryDropDown:any[]=[]
  BankDropDown:any[]=[]
  paymentHubDetails:any[]=[]
  currencies: CurrencyDto[] = [];
  paidBy:PaidByDropDown[] = [];
  other:PaidByDropDown[] = [];
  vendorDropDown:PaidByDropDown[] = [];
  customerDropDown:PaidByDropDown[] = [];
  paidByDetails:any[] = [];
  filteredAccounts: AccountDto[] = [];



  constructor(
    private formBuilder: FormBuilder, 
    private dialog: DialogService,
    private lookupsService: LookupsService,
    private FinanceService:FinanceService,
    private formsService: FormsService,
    private accountService: AccountService,
    public SharedJournalEnums: SharedJournalEnums,


  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.subscribe();
    this.initializeDropDown();

    this.loadLookups();
    this.getTreasuryDropDown();
    this.getBankDropDown();
     

  }
  get journalEntryLinesFormArray() {
    return this.addForm.get('journalEntryLines') as FormArray;
  }
  getTreasuryDropDown(){
    this.FinanceService.treasuryDropDown()
  }
  getBankDropDown(){
    this.FinanceService.bankDropDown()
  }
  getVendorDropdown(){
    this.FinanceService.vendorDropdown()
  }
  getCustomerDropdown(){
    this.FinanceService.customerDropdown()
  }
  initializeDropDown(){
    this.paidBy=[
      {
        id:1,
        name:"customer" 
      },
      {
        id:2,
        name:"vendor" 
      },
      {
        id:3,
        name:"other" 
      },
    ]
    this.other=[
      {
        id:1,
        name:"GL account" 
      },
    ]
    this.getCustomerDropdown();
    this.getVendorDropdown();
    this.getVendorDropdown();
    this.getAccounts() 

  }
   initializeForm() {
    this.addForm = this.formBuilder.group({
      code: new FormControl('', [customValidators.required]),
      journalDate: new FormControl(this.getTodaysDate(), [customValidators.required]),
      description: new FormControl('', [customValidators.required]),
      paymentHubId: new FormControl('', [customValidators.required]),
      paymentHubDetails: new FormControl('', [customValidators.required]),
      bankAccountId: new FormControl('', [customValidators.required]),
      currency: new FormControl('', [customValidators.required]),
      rate: new FormControl('', [customValidators.required]),
      sourceDocument: new FormControl('', [customValidators.required]),
      createdJournal: new FormControl('', [customValidators.required]),
      currentBalance: new FormControl('', [customValidators.required]),
      totalReceivedAmount: new FormControl('', [customValidators.required]),
      newBalance: new FormControl('', [customValidators.required]),
      journalEntryLines: this.formBuilder.array([]),

    });
    this.addForm.controls['journalDate'].setValue(this.getTodaysDate());
    
  }
  ///
  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }  
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.PaymentMethodType,
      LookupEnum.PaymentPlace,
      LookupEnum.CommissionType
    ]);
    
    this.lookupsService.lookups.subscribe((l) => {
      this.lookups = l || {};
      this.originalPaymentMethodTypeLookups = this.lookups[LookupEnum.PaymentMethodType] || [];
    });
  }  

  openDialog(id:any) {
    if(id == this.SharedJournalEnums.paymentmethodtype.Cash){
      return true
    }else{
      const ref = this.dialog.open(PaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data:id
      });
    }
   
  }
  getDetails() {
    const paymentHubId = this.addForm.controls['paymentHubId'].value;
         

    if (paymentHubId == paymentplace.Bank) {
        this.paymentHubDetails = this.BankDropDown
    } else if (paymentHubId == paymentplace.Treasury) {
        this.paymentHubDetails = this.TreasuryDropDown
    }
}

getpaidByDetails(id:number){
  console.log(id ,"id ");
  
  if(id==this.SharedJournalEnums.paiedDropDown.customer){
    this.paidByDetails=this.customerDropDown
    console.log(this.customerDropDown ,"id ");

  } else if(id==this.SharedJournalEnums.paiedDropDown.vendor){
    this.paidByDetails=this.vendorDropDown
  
  } else if(id==this.SharedJournalEnums.paiedDropDown.other){
    this.paidByDetails=this.other
  }
}
  subscribe(){
    this.FinanceService.getTreasuryDropDownDataObservable.subscribe((res:any)=>{
      this.TreasuryDropDown=res
    })
    this.FinanceService.getBankDropDownDataObservable.subscribe((res:any)=>{
      this.BankDropDown=res
    })
    this.FinanceService.getVendorDropdownDataObservable.subscribe((res:any)=>{
      this.vendorDropDown=res
    })
    this.FinanceService.getCustomerDropdownDataObservable.subscribe((res:any)=>{
      this.customerDropDown=res
      
    })

  }
  addNewRow() {
    if (!this.formsService.validForm(this.journalEntryLinesFormArray, false)) return;

    const dbControl = new FormControl(0, [customValidators.required, Validators.min(0)]);
    const crControl = new FormControl(0, [customValidators.required, Validators.min(0)]);
    const currencyControl = new FormControl(null, customValidators.required);
    const rateControl = new FormControl<number | null>(null, [customValidators.required,Validators.min(0),]);
    //events
    dbControl.valueChanges.subscribe((value) => {
      if (rateControl.value) {
        rateControl.parent?.get('debitAmountLocal')!.setValue(value! * rateControl.value);
      }
    });
    crControl.valueChanges.subscribe((value) => {
      if (rateControl.value) {
        crControl.parent?.get('creditAmountLocal')!.setValue(value! * rateControl.value);
      }
    });
    rateControl.valueChanges.subscribe((value) => {
      const dbLocalControl = rateControl.parent?.get('debitAmountLocal')!;
      const crLocalControl = rateControl.parent?.get('creditAmountLocal')!;
      if (!value) {
        dbLocalControl.setValue(null);
        crLocalControl.setValue(null);
        return;
      }
      if (dbControl.value) {
        dbLocalControl.setValue(value * dbControl.value);
      }
      if (crControl.value) {
        crLocalControl.setValue(value * crControl.value);
      }
    });

    currencyControl?.valueChanges.subscribe((value) => {
      var currencyData = this.currencies.find((c) => c.id == value);

      rateControl.setValue(currencyData?.ratePerUnit!);
    });
    let newLine = this.formBuilder.group(
      {
        id: new FormControl(0),
        amount: new FormControl('', [customValidators.required, customValidators.number]),
        paymentMethodId: new FormControl('', [customValidators.required]),
        paidBy: new FormControl('', [customValidators.required]),
        paidByDetailsId: new FormControl('', [customValidators.required]),
        glAccountId: new FormControl('', [customValidators.required]),
        
        accountCode: new FormControl('', [customValidators.required]),
        accountId: new FormControl(),
        accountName: new FormControl(),
        selectedFalg: new FormControl(false),
        costCenterConfig: new FormControl(null),
        lineDescription: new FormControl(null, [customValidators.required]),
        debitAmount: dbControl,
        creditAmount: crControl,
        currencyId: new FormControl(null, [customValidators.required]),
        currency: new FormControl(null),
        currencyRate: new FormControl(),
        debitAmountLocal: new FormControl(0),
        creditAmountLocal: new FormControl(0),
        costCenters: new FormControl([]),
      }
      //{ validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    newLine.updateValueAndValidity();
    this.journalEntryLinesFormArray.push(newLine);
console.log(this.journalEntryLinesFormArray.controls ,"kkkkkkkk");

   
    // this.getAccounts();
  }
  onFilter(event: any) {
    this.accountService.getAccountsHasNoChildrenNew(event, new PageInfo());

    this.accountService.childrenAccountList.subscribe((res: any) => {
      if (res.length) {
        this.filteredAccounts = res.map((account: any) => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`,
        }));
      }
    });
  }
  
  getAccounts() {
    this.accountService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
      this.filteredAccounts = r.result.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
  }
}
