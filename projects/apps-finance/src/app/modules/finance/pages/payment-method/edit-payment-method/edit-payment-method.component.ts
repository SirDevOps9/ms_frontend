import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { BankAccountWithCurrency } from '../../../models/bank-account-with-currency-dto';
import { AddPaymentMethodDto, paymentplace } from '../../../models';
import { FinanceService } from '../../../finance.service';
import { SharedFinanceEnums } from '../../../models/shared-finance-enums';
import { ActivatedRoute } from '@angular/router';
import { GetPaymentMethodByIdDto } from '../../../models/get-payment-method-by-id-dto';

@Component({
  selector: 'app-edit-payment-method',
  templateUrl: './edit-payment-method.component.html',
  styleUrls: ['./edit-payment-method.component.scss']
})
export class EditPaymentMethodComponent implements OnInit {
  PaymentMethodForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  accountsList: { id: number; name: string }[];
  BankList: { id: number; name: string }[];
  BankAccountList: BankAccountWithCurrency[] = [];
  paymentplaceEnum: paymentplace;
  id: number = this.route.snapshot.params['id']
  originalPaymentMethodTypeLookups: lookupDto[] = [];


  constructor(private fb: FormBuilder,
              private financeService: FinanceService,
              private routerService: RouterService,
              private formsService: FormsService,
              private lookupsService: LookupsService,
              private toasterService: ToasterService,
              private languageService: LanguageService,
              private route : ActivatedRoute,
              public sharedFinanceEnum: SharedFinanceEnums) {

    this.PaymentMethodForm = fb.group({
      id: new FormControl(null),
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
        allowVAT: new FormControl(false)
      })
    });
  }

  ngOnInit() {
    this.getChildrenAccountsDropDownLookup();
    this.getBankDropDown();
    this.loadLookups();
    this.getPaymentMethodInfoById(this.id);
    

    // this.PaymentMethodForm.get('paymentPlace')!.valueChanges.subscribe(value => {
    //   this.onPaymentPlaceChange(value);
    // });

     this.PaymentMethodForm.get('paymentMethodCommissionData.bankId')!.valueChanges.subscribe(bankId => {
       if (bankId) {
         this.getBankAccountDropDown(bankId);
       }
     });

    // this.PaymentMethodForm.get('paymentMethodCommissionData.bankAccountId')!.valueChanges.subscribe(accountId => {
    //   const selectedAccount = this.BankAccountList.find(account => account.id === accountId);
    //   if (selectedAccount) {
    //     this.PaymentMethodForm.get('paymentMethodCommissionData.currency')!.setValue(selectedAccount.currencyName);
    //   }
    // });

    this.PaymentMethodForm.get('paymentMethodCommissionData.commissionType')!.valueChanges.subscribe(commissionType => {
      if (commissionType) {
        this.PaymentMethodForm.get('paymentMethodCommissionData.commissionAccountId')!.setValidators([customValidators.required]);
        this.PaymentMethodForm.get('paymentMethodCommissionData.commissionValue')!.setValidators([customValidators.required]);
      } else {
        this.PaymentMethodForm.get('paymentMethodCommissionData.commissionAccountId')!.clearValidators();
        this.PaymentMethodForm.get('paymentMethodCommissionData.commissionValue')!.clearValidators();
      }
      this.PaymentMethodForm.get('paymentMethodCommissionData.commissionAccountId')!.updateValueAndValidity();
      this.PaymentMethodForm.get('paymentMethodCommissionData.commissionValue')!.updateValueAndValidity();
    });
  }

  getPaymentMethodInfoById(id:number) {
    this.financeService.getPaymentMethodByID(id)
    this.financeService.sendPaymentMethodByIDObservable.subscribe(res=>{
      this.PaymentMethodForm.patchValue({

        id: res.id, 
        code: res.code,
        name: res.name,
        paymentPlace: res.paymentPlace,
        paymentMethodType: res.paymentMethodType,
         paymentMethodCommissionData: {
          bankId: res.paymentMethodCommissionData?.bankId ,
          bankAccountId: res.paymentMethodCommissionData?.bankAccountId ,
          commissionType: res.paymentMethodCommissionData?.commissionType ,
          commissionValue: res.paymentMethodCommissionData?.commissionValue ,
          commissionAccountId: res.paymentMethodCommissionData?.commissionAccountId ,
          allowVAT: res.paymentMethodCommissionData?.allowVAT ,
          currency: res.paymentMethodCommissionData?.currencyName
         }
      });
    })
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
    this.financeService.BankDropDown().subscribe((res:any) => {
      this.BankList = res;
    });
  }

  onPaymentPlaceChange(paymentPlace: any) {

   this.PaymentMethodForm.get('paymentMethodType')?.setValue(null);
   
   let paymentMethodTypeOptions: lookupDto[] = [];

   if (paymentPlace == this.sharedFinanceEnum.PaymentPlace.Treasury)
     {
      console.log('Treasury')
       paymentMethodTypeOptions = this.originalPaymentMethodTypeLookups?.filter(
           option => option.id == this.sharedFinanceEnum.paymentMethodType.Cash.toString()
       );
     }
    else if (paymentPlace == this.sharedFinanceEnum.PaymentPlace.Bank) 
      {
       paymentMethodTypeOptions = this.originalPaymentMethodTypeLookups?.filter(
           option => 
               option.id == this.sharedFinanceEnum.paymentMethodType.Check.toString() || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Master.toString() || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Span.toString()|| 
               option.id == this.sharedFinanceEnum.paymentMethodType.Transfer.toString() || 
               option.id == this.sharedFinanceEnum.paymentMethodType.Visa.toString()
       );
       console.log(paymentMethodTypeOptions)
   }
   this.lookups[LookupEnum.PaymentMethodType] = paymentMethodTypeOptions;

  }

  onSave() {
    const formData = this.PaymentMethodForm.value as GetPaymentMethodByIdDto;
    if (formData.paymentPlace == this.sharedFinanceEnum.PaymentPlace.Treasury.toString()) {
      formData.paymentMethodCommissionData = null;
  }

    if (!this.formsService.validForm(this.PaymentMethodForm, false)) return;
  
   this.financeService.editPaymentMethod(formData);
  }
  changebankaccount(e: any) 
  {
      const selectedAccount = this.BankAccountList.find(account => account.id === e);
      console.log("selectedAccount", selectedAccount)
      if (selectedAccount) {
        this.PaymentMethodForm.get('paymentMethodCommissionData.currency')!.setValue(selectedAccount.currencyName);
      }
    
  }
}

