import { Component, OnInit } from '@angular/core';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddPaymentMethodDto, paymentmethodtype, paymentplace } from '../../../models';
import { SharedFinanceEnums } from '../../../models/shared-finance-enums';
import { BankAccountWithCurrency } from '../../../models/bank-account-with-currency-dto';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  PaymentMethodForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  paymentPlaceOptions = [
    { label: 'Treasury', value: 'Treasury' },
    { label: 'Bank', value: 'Bank' }
  ];
  
  commissionTypeOptions = [
    { label: 'Amount', value: 'Amount' },
    { label: 'Percent', value: 'Percent' }
  ];
  paymentMethodType =[
    { label: 'Cash', value: 'Cash' },
    { label: 'Check', value: 'Check' },
    { label: 'Transfer', value: 'Transfer' },
    { label: 'Visa', value: 'Visa' },
    { label: 'Master', value: 'Master' },
    { label: 'Span', value: 'Span' }
  ];
  treasuryPaymentMethodType = [
    { label: 'Cash', value: 'Cash' }
  ];

  bankPaymentMethodType = [
    { label: 'Check', value: 'Check' },
    { label: 'Transfer', value: 'Transfer' },
    { label: 'Visa', value: 'Visa' },
    { label: 'Master', value: 'Master' },
    { label: 'Span', value: 'Span' }
  ];
 
  accountsList: { id: number; name: string }[];
  BankList: { id: number; name: string }[];
  BankAccountList: BankAccountWithCurrency[];
  paymentplaceEnum: paymentplace;

  constructor(private fb: FormBuilder,
              private financeService: FinanceService,
              private routerService: RouterService,
              private formsService: FormsService,
              private lookupsService: LookupsService,
              private toasterService: ToasterService,
              private languageService: LanguageService,
              public sharedFinanceEnum: SharedFinanceEnums) {
    this.PaymentMethodForm = fb.group({
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

    this.PaymentMethodForm.get('paymentPlace')!.valueChanges.subscribe(value => {
      this.onPaymentPlaceChange(value);
    });

    this.PaymentMethodForm.get('paymentMethodCommissionData.bankId')!.valueChanges.subscribe(bankId => {
      if (bankId) {
        this.getBankAccountDropDown(bankId);
      }
    });

    this.PaymentMethodForm.get('paymentMethodCommissionData.bankAccountId')!.valueChanges.subscribe(accountId => {
      const selectedAccount = this.BankAccountList.find(account => account.id === accountId);
      if (selectedAccount) {
        this.PaymentMethodForm.get('paymentMethodCommissionData.currency')!.setValue(selectedAccount.currencyName);
      }
    });

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

  onPaymentPlaceChange(paymentPlace: string) {
    const paymentMethodControl = this.PaymentMethodForm.get('paymentMethodType');
    const bankInfoGroup = this.PaymentMethodForm.get('paymentMethodCommissionData');
    const commissionInfoGroup = this.PaymentMethodForm.get('paymentMethodCommissionData');

    if (paymentPlace === 'Treasury') {
      this.paymentMethodType = this.treasuryPaymentMethodType;
      paymentMethodControl!.setValue('Cash');
      this.disableBankFields();
      this.resetCommissionFields();
      bankInfoGroup!.disable();
      commissionInfoGroup!.disable();
    } else if (paymentPlace === 'Bank') {
      this.paymentMethodType = this.bankPaymentMethodType;
      paymentMethodControl!.setValue(null);
      this.PaymentMethodForm.get('paymentMethodCommissionData.bankId')!.setValidators([customValidators.required]);
        this.PaymentMethodForm.get('paymentMethodCommissionData.bankAccountId')!.setValidators([customValidators.required]);
      this.enableBankFields();
      bankInfoGroup!.enable();
      commissionInfoGroup!.enable();
    } else {
      this.paymentMethodType = [];
      paymentMethodControl!.setValue(null);
      this.disableBankFields();
      this.resetCommissionFields();
      bankInfoGroup!.disable();
      commissionInfoGroup!.disable();
    }
    paymentMethodControl!.updateValueAndValidity();
    this.checkForCommissionRequirements();
  }

  private disableBankFields() {
    const bankInfoGroup = this.PaymentMethodForm.get('paymentMethodCommissionData');
    bankInfoGroup!.get('bankId')!.disable();
    bankInfoGroup!.get('bankAccountId')!.disable();
    bankInfoGroup!.get('currency')!.disable();
    bankInfoGroup!.get('bankId')!.reset();
    bankInfoGroup!.get('bankAccountId')!.reset();
    bankInfoGroup!.get('currency')!.reset();
  }

  private enableBankFields() {
    const bankInfoGroup = this.PaymentMethodForm.get('paymentMethodCommissionData');
    bankInfoGroup!.get('bankId')!.enable();
    bankInfoGroup!.get('bankAccountId')!.enable();
    bankInfoGroup!.get('currency')!.enable();
  }

  private resetCommissionFields() {
    const commissionControls = this.PaymentMethodForm.get('paymentMethodCommissionData');
    commissionControls!.get('commissionType')!.setValue(null);
    commissionControls!.get('commissionValue')!.setValue(null);
    commissionControls!.get('commissionAccountId')!.setValue(null);
    commissionControls!.get('allowVAT')!.setValue(false);
    commissionControls!.get('commissionType')!.updateValueAndValidity();
    commissionControls!.get('commissionValue')!.updateValueAndValidity();
    commissionControls!.get('commissionAccountId')!.updateValueAndValidity();
    commissionControls!.get('allowVAT')!.updateValueAndValidity();
    commissionControls!.disable();
  }

  private checkForCommissionRequirements() {
    const paymentMethodControl = this.PaymentMethodForm.get('paymentMethodType');
    const commissionTypeControl = this.PaymentMethodForm.get('paymentMethodCommissionData.commissionType');
    const commissionValueControl = this.PaymentMethodForm.get('paymentMethodCommissionData.commissionValue');

    if (paymentMethodControl!.value === 'Check') {
      this.PaymentMethodForm.get('paymentMethodCommissionData.bankId')!.setValidators([customValidators.required]);
      this.PaymentMethodForm.get('paymentMethodCommissionData.bankAccountId')!.setValidators([customValidators.required]);
    } else {
      this.PaymentMethodForm.get('paymentMethodCommissionData.bankId')!.clearValidators();
      this.PaymentMethodForm.get('paymentMethodCommissionData.bankAccountId')!.clearValidators();
    }

    if (['Transfer', 'Visa', 'Master', 'Span'].includes(paymentMethodControl!.value)) {
      commissionTypeControl!.setValidators([customValidators.required]);
      commissionValueControl!.setValidators([customValidators.required]);
    } else {
      commissionTypeControl!.clearValidators();
      commissionValueControl!.clearValidators();
    }

    commissionTypeControl!.updateValueAndValidity();
    commissionValueControl!.updateValueAndValidity();
  }

  onSave() {
    const formData = this.PaymentMethodForm.value as AddPaymentMethodDto;
    console.log("sandra",formData);
    // const saveData = {
    //   code: formData.code,
    //   name: formData.name,
    //   paymentPlace: formData.paymentPlace,
    //   paymentMethodType: formData.paymentMethodType,
    //   paymentMethodCommissionData: {
    //     bankId: formData.paymentMethodCommissionData.bankId,
    //     bankAccountId: formData.paymentMethodCommissionData.bankAccountId,
    //     commissionType: formData.paymentMethodCommissionData.commissionType,
    //     commissionValue: formData.paymentMethodCommissionData.commissionValue,
    //     commissionAccountId: formData.paymentMethodCommissionData.commissionAccountId,
    //     allowVAT: formData.paymentMethodCommissionData.allowVAT
    //   }
    // };

    if (!this.formsService.validForm(this.PaymentMethodForm, false)) return;
  
   this.financeService.addPaymentMethod(formData);
  }
}
