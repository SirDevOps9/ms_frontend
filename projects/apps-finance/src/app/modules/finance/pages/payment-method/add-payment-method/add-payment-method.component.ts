import { Component, OnInit } from '@angular/core';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddPaymentMethodDto, DropDownDto, paymentmethodtype, paymentplace } from '../../../models';
import { SharedFinanceEnums } from '../../../models/shared-finance-enums';
import { BankAccountWithCurrency } from '../../../models/bank-account-with-currency-dto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  paymentMethodForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  accountsList: { id: number; name: string }[];
  BankList: DropDownDto[];
  taxList: DropDownDto[];
  BankAccountList: BankAccountWithCurrency[]=[];
  paymentplaceEnum: paymentplace;
  originalPaymentMethodTypeLookups: lookupDto[] = [];

  constructor(private fb: FormBuilder,
              private financeService: FinanceService,
              private routerService: RouterService,
              private formsService: FormsService,
              private lookupsService: LookupsService,
              private title: Title,
              private languageService: LanguageService,
              public sharedFinanceEnum: SharedFinanceEnums) 
              {


    this.paymentMethodForm = fb.group({
      code: new FormControl(null),
      name: new FormControl('', [customValidators.required]),
      paymentPlace: new FormControl('', [customValidators.required]),
      paymentMethodType: new FormControl('', [customValidators.required]),
      paymentMethodCommissionData: this.fb.group({
        bankId: new FormControl(null),
        bankAccountId: new FormControl(null),
        currency:new FormControl(null),
        commissionType: new FormControl(null),
        commissionValue: new FormControl(null),
        commissionAccountId: new FormControl(null),
        allowVAT: new FormControl(false),
        taxId:new FormControl(null),
      })
    });
  }

  ngOnInit() {
    this.getChildrenAccountsDropDownLookup();
    this.getBankDropDown();
    this.loadLookups();

     this.paymentMethodForm.get('paymentPlace')!.valueChanges.subscribe(value => {

       this.onPaymentPlaceChange(value);
     });

    this.paymentMethodForm.get('paymentMethodCommissionData.bankId')!.valueChanges.subscribe(bankId => {
      if (bankId) {
        this.getBankAccountDropDown(bankId);
      }
    });

    this.paymentMethodForm.get('paymentMethodCommissionData.allowVAT')!.valueChanges.subscribe(allowVAT => {
      if (allowVAT) {
        this.getTaxDropDown();
        this.paymentMethodForm.get('paymentMethodCommissionData.taxId')!.setValidators([customValidators.required]);
        this.paymentMethodForm.get('paymentMethodCommissionData.taxId')!.updateValueAndValidity();
      }else{
        this.paymentMethodForm.get('paymentMethodCommissionData.taxId')!.clearValidators();
        this.paymentMethodForm.get('paymentMethodCommissionData.taxId')!.updateValueAndValidity();

      }
    });

    this.paymentMethodForm.get('paymentMethodCommissionData.bankAccountId')!.valueChanges.subscribe(accountId => {
      const selectedAccount = this.BankAccountList.find(account => account.id === accountId);
      if (selectedAccount) {
        this.paymentMethodForm.get('paymentMethodCommissionData.currency')!.setValue(selectedAccount.currencyName);
      }
    });

    this.paymentMethodForm.get('paymentMethodCommissionData.commissionType')!.valueChanges.subscribe(commissionType => {
      if (commissionType) {
        this.paymentMethodForm.get('paymentMethodCommissionData.commissionAccountId')!.setValidators([customValidators.required]);
        this.paymentMethodForm.get('paymentMethodCommissionData.commissionValue')!.setValidators([customValidators.required]);
      } else {
        this.paymentMethodForm.get('paymentMethodCommissionData.commissionAccountId')!.clearValidators();
        this.paymentMethodForm.get('paymentMethodCommissionData.commissionValue')!.clearValidators();
      }
      this.paymentMethodForm.get('paymentMethodCommissionData.commissionAccountId')!.updateValueAndValidity();
      this.paymentMethodForm.get('paymentMethodCommissionData.commissionValue')!.updateValueAndValidity();
    });
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.PaymentMethodType,
      LookupEnum.PaymentPlace,
      LookupEnum.CommissionType
    ]);
    this.lookupsService.lookups.subscribe((l) => {
      this.lookups = l;
      this.originalPaymentMethodTypeLookups =l["PaymentMethodType"] ;
    });

  }

 

  discard() {
    this.routerService.navigateTo('/masterdata/payment-method')
  }

  getChildrenAccountsDropDownLookup() {
    this.financeService.getChildrenAccountsDropDownLookup().subscribe((res) => {
      this.accountsList = res;
    });
  }

  getBankAccountDropDown(id: number) {
    this.financeService.BankAccountDropDown(id).subscribe((res) => {
      this.BankAccountList = res;
    });
  }

  getBankDropDown() {
    this.financeService.BankDropDown().subscribe((res) => {
      this.BankList = res;
    });
  }

  getTaxDropDown() {
    this.financeService.getTaxDropDown();
    
    this.financeService.taxDropDowmSourceObservable.subscribe((res) => {
      this.taxList =res;
    });
  }

  onPaymentPlaceChange(paymentPlace: any) {

   this.paymentMethodForm.get('paymentMethodType')?.setValue(null);
   
   let paymentMethodTypeOptions: lookupDto[] = [];

   if (paymentPlace == this.sharedFinanceEnum.PaymentPlace.Treasury)
     {
      console.log('Treasury')
       paymentMethodTypeOptions = this.originalPaymentMethodTypeLookups?.filter(
           option => option.id == this.sharedFinanceEnum.paymentMethodType.Cash
       );
       this.paymentMethodForm.get('paymentMethodCommissionData.bankId')?.clearValidators();
       this.paymentMethodForm.get('paymentMethodCommissionData.bankAccountId')?.clearValidators();
       this.paymentMethodForm.get('paymentMethodCommissionData.bankId')?.updateValueAndValidity();
       this.paymentMethodForm.get('paymentMethodCommissionData.bankAccountId')?.updateValueAndValidity();
     
     }
    else if (paymentPlace == this.sharedFinanceEnum.PaymentPlace.Bank) 
      {
        console.log('Bank')
       paymentMethodTypeOptions = this.originalPaymentMethodTypeLookups?.filter(
           option => 
               option.id == this.sharedFinanceEnum.paymentMethodType.Check || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Master || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Span || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Transfer || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Visa
       );
       this.paymentMethodForm.get('paymentMethodCommissionData.bankId')?.setValidators([customValidators.required]);
       this.paymentMethodForm.get('paymentMethodCommissionData.bankAccountId')?.setValidators([customValidators.required]);
       this.paymentMethodForm.get('paymentMethodCommissionData.bankId')?.updateValueAndValidity();
       this.paymentMethodForm.get('paymentMethodCommissionData.bankAccountId')?.updateValueAndValidity();
  }
   this.lookups[LookupEnum.PaymentMethodType] = paymentMethodTypeOptions;

  }
  

  onSave() {
    const formData = this.paymentMethodForm.value as AddPaymentMethodDto;

    if(!formData.paymentMethodCommissionData?.allowVAT)
      {
        formData.paymentMethodCommissionData!.taxId= null
      }
    if (formData.paymentPlace == this.sharedFinanceEnum.PaymentPlace.Treasury.toString()) 
      {
      formData.paymentMethodCommissionData = null;
      }
  


    if (!this.formsService.validForm(this.paymentMethodForm, false)) return;
  
   this.financeService.addPaymentMethod(formData);
  }
}
