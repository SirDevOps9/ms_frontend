import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { BankAccountWithCurrency } from '../../../models/bank-account-with-currency-dto';
import { AddPaymentMethodDto, DropDownDto, paymentmethodtype, paymentplace } from '../../../models';
import { FinanceService } from '../../../finance.service';
import { SharedFinanceEnums } from '../../../models/shared-finance-enums';
import { ActivatedRoute } from '@angular/router';
import { GetPaymentMethodByIdDto } from '../../../models/get-payment-method-by-id-dto';
import { Title } from '@angular/platform-browser';

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
  disableCommission: boolean = false;
  taxList: DropDownDto[];




  constructor(private fb: FormBuilder,
              private financeService: FinanceService,
              private routerService: RouterService,
              private formsService: FormsService,
              private lookupsService: LookupsService,
              private toasterService: ToasterService,
              private languageService: LanguageService,
              private route : ActivatedRoute,
              public sharedFinanceEnum: SharedFinanceEnums,
              private title: Title,
            ) {

    
  }

  ngOnInit() {
    this.title.setTitle(this.languageService.transalte('add-paymentMethod.title-edit'));

    this.initForm();
    this.getChildrenAccountsDropDownLookup();
    this.getBankDropDown();
    this.loadLookups();
    this.getPaymentMethodInfoById(this.id);
    this.subscribe();

   
  }
   
  initForm(){
    this.PaymentMethodForm = this.fb.group({
      id: new FormControl(null),
      code: new FormControl(null),
      name: new FormControl('', [customValidators.required]),
      paymentPlace: new FormControl(0, [customValidators.required]),
      paymentMethodType: new FormControl(0, [customValidators.required]),
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
  subscribe(){
    this.lookupsService.lookups.subscribe((l) => {
      this.lookups = l;
      this.originalPaymentMethodTypeLookups =l["PaymentMethodType"] ;
    });

    this.PaymentMethodForm.get('paymentPlace')!.valueChanges.subscribe(() => {
      this.updateCommissionFields();
    });

    this.PaymentMethodForm.get('paymentMethodType')!.valueChanges.subscribe(() => {
      this.updateCommissionFields();
    });

     this.PaymentMethodForm.get('paymentMethodCommissionData.bankId')!.valueChanges.subscribe(bankId => {
       if (bankId) {
         this.getBankAccountDropDown(bankId);
       }
     });

     this.PaymentMethodForm.get('paymentMethodCommissionData.allowVAT')!.valueChanges.subscribe(allowVAT => {
      if (allowVAT) {
        this.getTaxDropDown();
        this.PaymentMethodForm.get('paymentMethodCommissionData.taxId')!.setValidators([customValidators.required]);
        this.PaymentMethodForm.get('paymentMethodCommissionData.taxId')!.updateValueAndValidity();
      }else{
        this.PaymentMethodForm.get('paymentMethodCommissionData.taxId')!.clearValidators();
        this.PaymentMethodForm.get('paymentMethodCommissionData.taxId')!.updateValueAndValidity();

      }
    });
  }

  updateCommissionFields() {
    const paymentPlace = this.PaymentMethodForm.get('paymentPlace')!.value;
    const paymentMethod = this.PaymentMethodForm.get('paymentMethodType')!.value;


    if (paymentPlace == paymentplace[paymentplace.Treasury] ||
    paymentMethod == paymentmethodtype[paymentmethodtype.Check] ) {
      this.disableCommission=true;
    } else {
      this.disableCommission=false;
    }
    

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
          currency: res.paymentMethodCommissionData?.currencyName,
          taxId: res.paymentMethodCommissionData?.taxId
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
  }

  getTaxDropDown() {
    this.financeService.getTaxDropDown();
    
    this.financeService.taxDropDowmSourceObservable.subscribe((res) => {
      this.taxList =res;
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
   }
   this.lookups[LookupEnum.PaymentMethodType] = paymentMethodTypeOptions;

  }

  onSave() {
    const formData = this.PaymentMethodForm.value as GetPaymentMethodByIdDto;
    if (formData.paymentPlace == this.sharedFinanceEnum.PaymentPlace.Treasury) {
      formData.paymentMethodCommissionData = null;
  }
  if(!formData.paymentMethodCommissionData?.allowVAT)
    {
      formData.paymentMethodCommissionData!.taxId= null
    }
    if (!this.formsService.validForm(this.PaymentMethodForm, false)) return;
  
   this.financeService.editPaymentMethod(formData);
  }
  changebankaccount(e: any) 
  {
      const selectedAccount = this.BankAccountList.find(account => account.id === e);
      if (selectedAccount) {
        this.PaymentMethodForm.get('paymentMethodCommissionData.currency')!.setValue(selectedAccount.currencyName);
      }
    
  }
}

