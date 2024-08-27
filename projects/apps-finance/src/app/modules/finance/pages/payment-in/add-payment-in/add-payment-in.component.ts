import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  FormsService,
  LanguageService,
  LookupEnum,
  LookupsService,
  PageInfo,
  PageInfoResult,
  RouterService,
  ToasterService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PaymentMethodComponent } from '../../../components/payment-in/payment-method/payment-method.component';
import { paymentplace, paymentmethodtype, paymentplaceString } from '../../../models/enums';
import { FinanceService } from '../../../finance.service';
import { CurrencyDto } from '../../../../general/models';
import { SharedJournalEnums } from '../../../models/sharedEnums';
import { AccountDto, BankAccount, BankPaymentMethods, costCenters, CustomerDropDown, PaidByDropDown, SimpleDropDown, TreasuriesPaymentMethod, TreasuryDropDown, VendorDropDown } from '../../../models';
import { PopupAccountsComponent } from '../../../components/payment-in/popup-accounts/popup-accounts.component';
import { AddCostCenterComponent } from '../../../components/payment-in/add-cost-center/add-cost-center.component';
import { DatePipe, formatDate } from '@angular/common';
import { CurrentUserService } from 'libs/shared-lib/src/lib/services/currentuser.service';

@Component({
  selector: 'app-add-payment-in',
  templateUrl: './add-payment-in.component.html',
  styleUrl: './add-payment-in.component.scss',
})
export class AddPaymentInComponent {
  LookupEnum = LookupEnum;
  addForm: FormGroup;
  paymentform: FormGroup;
  CostCenter: FormGroup;
  tableData: any[] = [];
  costCenters: costCenters[] = [];
  paymentplaceEnum: paymentplace;
  paymentplaceString:paymentplaceString
  lookups: { [key: string]: lookupDto[] };
  originalPaymentMethodTypeLookups: lookupDto[] = [];
  TreasuryDropDown: TreasuryDropDown[] = []
  BankDropDown: SimpleDropDown[] = []
  paymentHubDetails: SimpleDropDown[] | TreasuryDropDown[] = []
  currencies: CurrencyDto[] = [];
  paidBy: PaidByDropDown[] = [];
  other: PaidByDropDown[] = [];
  vendorDropDown: VendorDropDown[] = [];
  customerDropDown: CustomerDropDown[] = [];
  paidByDetailsCustomer: CustomerDropDown[] = [];
  paidByDetailsVendor: VendorDropDown[] = [];
  paidByDetailsOther: SimpleDropDown[] = [];
  bankAccount: BankAccount[] = [];
  filteredAccounts: AccountDto[] = [];
  accountName: string = "";
  paidName: string = "";
  PaymentInDate: string = "";
  localAmount: number;
  totalAmount: number = 0;
  AccountBalance: number = 0;
  TreasuryBalance: number = 0;
  totalLocalAmount: number = 0;
  newBalance: number = 0;
  selectedBank: boolean;
  selectedCurrency: string = "";
  paymentMethod: BankPaymentMethods[] = []
  AllTreasuriesPayMethod: TreasuriesPaymentMethod[] = []

  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private lookupsService: LookupsService,
    private FinanceService: FinanceService,
    private formsService: FormsService,
    public SharedJournalEnums: SharedJournalEnums,
    private toasterService: ToasterService,
    private langService: LanguageService,
    private currentUserService: CurrentUserService,

  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.subscribe();
    this.initializeDropDown();

    this.loadLookups();



  }
  get paymentInDetailsFormArray() {
    return this.addForm.get('paymentInDetails') as FormArray;
  }
  getTreasuryDropDown() {
    this.FinanceService.treasuryDropDown()
  }
  getBankDropDown() {
    this.FinanceService.bankDropDown()
  }
  getVendorDropdown() {
    this.FinanceService.vendorDropdown()
  }
  getCustomerDropdown() {
    this.FinanceService.customerDropdown()
  }
  initializeDropDown() {
    this.paidBy = [
      {
        id: 1,
        name: "customer"
      },
      {
        id: 2,
        name: "vendor"
      },
      {
        id: 3,
        name: "other"
      },
    ]
    this.other = [
      {
        id: 1,
        name: "GL account"
      },
    ]
    this.getCustomerDropdown();
    this.getVendorDropdown();
    this.getAccounts()

  }
  initializeForm() {
    this.addForm = this.formBuilder.group({
      description: new FormControl(''),
      PaymentInDate: new FormControl(this.getTodaysDate(), [customValidators.required]),
      paymentHub: new FormControl('', [customValidators.required]),
      bankAccountId: new FormControl(null, [customValidators.required]),
      paymentHubDetailId: new FormControl('', [customValidators.required]),
      currencyId: new FormControl(null, [customValidators.required]),
      rate: new FormControl<number | undefined>(0, [customValidators.required]),
      glAccountId: new FormControl(null),
      paymentInDetails: this.formBuilder.array([]),

////////
      code: new FormControl(''),
      currency: new FormControl(""),
      currentBalance: new FormControl(0),
      totalReceivedAmount: new FormControl(0),
      newBalance: new FormControl(''),
      paymentInDetailCostCenters: new FormControl(null),
    });
    this.addForm.controls['PaymentInDate'].patchValue(new Date());

  }

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

  openDialog(value: any, selectedPayment: any, journal: any, amount: number) {
    if (selectedPayment.paymentMethodType == this.SharedJournalEnums.paymentMethodTypeString.Cash || selectedPayment.paymentMethodType == null) {
      return true
    } else {
      const data = value
      const ref = this.dialog.open(PaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data: { ...data, selectedPayment },
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          journal.get('paymentInMethodDetails')?.setValue(res);
        }
      });
    }


  }
  getDetails(id: string) {
    this.paymentInDetailsFormArray.clear()    
    this.addForm.controls['currentBalance'].patchValue(0)
    this.addForm.controls['totalReceivedAmount'].patchValue(0)

    this.calculateTotalAmount()
    this.addForm.controls['paymentHubDetailId'].setValue(null)
    this.selectedCurrency = "";
    this.addForm.controls['rate'].setValue(null);

    if (id == paymentplaceString.Bank) {
      this.getBankDropDown();
      this.paymentHubDetails = this.BankDropDown
      this.selectedBank = true
    } else if (id == paymentplaceString.Treasury) {
      this.getTreasuryDropDown();
      this.paymentHubDetails = this.TreasuryDropDown
      this.getAllTreasuriesPaymentMethodsDropdown()
      this.selectedBank = false
    }
  }

  getpaidByDetails(index: number, name: string) {
    const journalLine = this.paymentInDetailsFormArray.at(index);
    journalLine.get('glAccountname')?.setValue(null);
    if (name == this.SharedJournalEnums.paiedDropDown.customer) {
      this.paidByDetailsCustomer = this.customerDropDown
    } else if (name == this.SharedJournalEnums.paiedDropDown.vendor) {
      this.paidByDetailsVendor = this.vendorDropDown

    } else if (name == this.SharedJournalEnums.paiedDropDown.other) {
      this.paidByDetailsOther = this.other
    }
  }
updateRateInPaymentDetails(newRate: any) {
  this.paymentInDetailsFormArray.controls.forEach((formGroup) => {
    formGroup.get('rate')?.setValue(newRate);
  });
}
updatecurrencyIdnPaymentDetails(currencyId: any) {
  this.paymentInDetailsFormArray.controls.forEach((formGroup) => {
    formGroup.get('currencyId')?.setValue(currencyId);
  });
}
  subscribe() {
    this.FinanceService.getTreasuryDropDownDataObservable.subscribe((res: any) => {
      this.TreasuryDropDown = res
    })
    this.FinanceService.getBankDropDownDataObservable.subscribe((res: any) => {
      this.BankDropDown = res
    })
    this.FinanceService.getVendorDropdownDataObservable.subscribe((res: any) => {
      this.vendorDropDown = res
    })
    this.FinanceService.getCustomerDropdownDataObservable.subscribe((res: any) => {
      this.customerDropDown = res
    })
    this.FinanceService.AllPayMethodsDropdownObservable.subscribe((res: any) => {
      this.paymentMethod = res
    })
    this.FinanceService.AllTreasuriesPayMethodsDropdownObservable.subscribe((res: any) => {
      this.AllTreasuriesPayMethod = res
    })
    this.FinanceService.TreasuryBalanceObservable.subscribe((res: any) => {
      this.TreasuryBalance = res
    })
    this.FinanceService.AccountBalanceObservable.subscribe((res: any) => {
      this.AccountBalance = res
    })
    this.addForm.get('PaymentInDate')?.valueChanges.subscribe((res: any) => {
      this.PaymentInDate = this.formatDate(res, 'yyyy-MM-dd');
    })

    this.addForm.get('paymentHub')?.valueChanges.subscribe((res: any) => {
      if (res == paymentplace.Treasury) {
        this.addForm.get('bankAccountId')?.clearValidators()
        this.addForm.get('bankAccountId')?.updateValueAndValidity()
      } else if (res == paymentplace.Bank) {
        this.addForm.get('bankAccountId')?.addValidators([customValidators.required])
        this.addForm.get('bankAccountId')?.updateValueAndValidity()
      }
    })
    this.FinanceService.accountCurrencyRate.subscribe((res) => {
      if (res) {
        this.addForm.controls['rate'].patchValue(res.rate)
        this.calculateTotalLocalAmount()
        this.updateRateInPaymentDetails(res.rate)
      }
    });
    this.addForm.controls['currencyId'].valueChanges.subscribe((currencyId:any)=>{
      this.updatecurrencyIdnPaymentDetails(currencyId) 
    })
    this.addForm.controls['currencyId'].valueChanges.subscribe((currencyId:any)=>{
      this.updatecurrencyIdnPaymentDetails(currencyId) 
    })


  }
  addNewRow() {
    if (!this.formsService.validForm(this.paymentInDetailsFormArray, false)) return;
    let newLine = this.formBuilder.group(
      {
        amount: new FormControl(0, [customValidators.required, customValidators.number, customValidators.hasSpaces]),
        paymentMethodId: new FormControl(null, [customValidators.required]),
        paymentMethodType: new FormControl(null, [customValidators.required]),
        paidBy: new FormControl('', [customValidators.required]),
        paidByDetailsId: new FormControl<string>('', [customValidators.required]),
        glAccountId: new FormControl(null, [customValidators.required]),
        notes: new FormControl(''),
        rate: new FormControl(this.addForm.controls['rate'].value),
        currencyId: new FormControl(this.addForm.controls['currencyId'].value),
        paymentInMethodDetails: new FormControl([]),
        paymentInDetailCostCenters: new FormControl([]),

        /////////
        id: new FormControl(0),
        glAccountname: new FormControl(''),
        paymentMethodName: new FormControl(''),
        paidByDetailsName: new FormControl(''),
        // accountCode: new FormControl('', [customValidators.required]),
        // accountId: new FormControl(),
        accountName: new FormControl(),
        // selectedFalg: new FormControl(false),
        costCenterConfig: new FormControl(null),
        // lineDescription: new FormControl(null, [customValidators.required]),
        // currencyId: new FormControl(null, [customValidators.required]),
        currency: new FormControl(""),
        // currencyRate: new FormControl(),
        // debitAmountLocal: new FormControl(0),
        // creditAmountLocal: new FormControl(0),
        // costCenters: new FormControl([]),
      }
      //{ validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    newLine.updateValueAndValidity();
    this.paymentInDetailsFormArray.push(newLine);
  }
  shouldShowCostCenterImage(costCenters: any[]): number {
    if (!costCenters) return -1;
    const totalPercentage = costCenters.reduce(
      (sum: number, item: any) => sum + parseFloat(item.percentage),
      0
    );
    return totalPercentage;
  }
  onFilter(event: any) {
    this.FinanceService.getAccountsHasNoChildrenNew(event, new PageInfo());

    this.FinanceService.childrenAccountList.subscribe((res: any) => {
      if (res.length) {
        this.filteredAccounts = res.map((account: any) => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`,

        }));

      }
    });
  }

  getAccounts() {
    this.FinanceService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
      this.filteredAccounts = r.result.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
  }
  openDialogSearch(index: number) {

    const ref = this.dialog.open(PopupAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((account: AccountDto) => {
      if (account) {
        this.updateAccount(account, index);
      }
    });

  }
  updateAccount(selectedAccount: AccountDto, index: number) {
    const journalLine = this.paymentInDetailsFormArray.at(index);
    journalLine.get('accountName')?.setValue(selectedAccount.name);
    journalLine.get('costCenterConfig')?.setValue(selectedAccount.costCenterConfig);

  }
  accountSelected(event: any, id: number) {
    var accountData = this.filteredAccounts.find((c) => c.id == event);
    this.updateAccount(accountData as AccountDto, id);
  }
  isCostCenterallowed(journalLine:any ,costCenterConfig: string): boolean {
    if (costCenterConfig === this.SharedJournalEnums.costCenterConfig.Mandatory || costCenterConfig === this.SharedJournalEnums.costCenterConfig.Optional){
      return true;
    } else{
      this.CostCenter = this.formBuilder.group({
        costCenterId: new FormControl(null),
        percentage: new FormControl(null),
       
      });
      journalLine.get('paymentInDetailCostCenters')?.setValue([]);

      return false;

    }
  }
  isCostCenterContainsData(costCenter: number) {
    if (costCenter) return true;
    return false;
  }
  bankAccountDropDown(id: number) {

    if (this.selectedBank) {
      console.log( this.selectedBank,"44444444444");

      this.FinanceService.BankAccountDropDown(id).subscribe((res: any) => {
        this.bankAccount = res
        this.addForm.controls['currencyId'].patchValue(null)
      })
    } else if(!this.selectedBank) {
      console.log( this.paymentHubDetails,"44444444444");

      this.TreasuryDropDown.forEach((e: any) => {
        if(id==e.id){
          this.selectedCurrency = e.currencyName
        
          this.getTreasuryBalance(e.id)
  
          // this.addForm.controls['currency'].patchValue(e.currencyName)
          this.addForm.controls['currencyId'].patchValue(e.currencyId)
  
          this.getAccountCurrencyRate(this.addForm.controls['currencyId'].value as number, id);
          this.addForm.controls['currentBalance'].patchValue(this.TreasuryBalance)
  
        }
     
      })
    }
  }
  getCurrencyBankAccount(id: number) {
    this.bankAccount.forEach((element: any) => {
      if (element.id == id) {
        this.selectedCurrency = element.currencyName
        this.addForm.controls['currencyId'].patchValue(element.currencyId)
        this.getAccountCurrencyRate(this.addForm.controls['currencyId'].value as number, id);
        this.getAccountBalance(element.id)
      }
    });
    this.getAllPayMethodsDropdown(this.addForm.controls['paymentHubDetailId'].value, id)
    this.addForm.controls['currentBalance'].patchValue(this.AccountBalance)
  }
  clacLocalAmount(e: any) {
    this.addForm.controls['rate'].valueChanges.subscribe((res: number) => {
      this.localAmount = e * this.addForm.controls['rate'].value
    })
    this.localAmount = e * this.addForm.controls['rate'].value
  }
  getPaymentMethodName(paymentMethodId: any): string {
    const paymentMethod = this.lookups[LookupEnum.PaymentMethodType]?.find(option => option.id === paymentMethodId);
    // this.paymentInDetailsFormArray.controls['paymentMethodType']

    return paymentMethod ? paymentMethod.name : '';
  }
  getLabelPayment(journalLine: any, paymentMethodId: any): string {

    if (this.selectedBank) {
      const selectedPayment = this.paymentMethod.find(method => method.id === paymentMethodId);
      journalLine.get('paymentMethodName')?.setValue(selectedPayment?.name);
console.log(selectedPayment ,"selectedPaymentselectedPayment");
this.paymentform = this.formBuilder.group({
  paymentMethodId: new FormControl(selectedPayment?.id),
  chequeNumber: new FormControl(null),
  chequeDueDate: new FormControl(null),
  bankReference: new FormControl(null ),
  VatAmount: new FormControl(null),
  CommissionAmount: new FormControl(null),
});
const chequeDueDate = this.formatDate(this.paymentform.controls['chequeDueDate'].value, 'yyyy-MM-dd');
// this.paymentform.controls['chequeDueDate'].patchValue(chequeDueDate);
  journalLine.get('paymentInMethodDetails')?.setValue(this.paymentform.value);
      return selectedPayment ? selectedPayment.name : '';

    } else {
      const selectedPayment = this.AllTreasuriesPayMethod.find(method => method.id === paymentMethodId);
      journalLine.get('paymentMethodName')?.setValue(selectedPayment?.name);
      console.log(selectedPayment ,"selectedPaymentselectedPayment");
      this.paymentform = this.formBuilder.group({
        paymentMethodId: new FormControl(selectedPayment?.id),
        chequeNumber: new FormControl(null),
        chequeDueDate: new FormControl(null),
        bankReference: new FormControl(null ),
        VatAmount: new FormControl(null),
        CommissionAmount: new FormControl(null),
      });
      const chequeDueDate = this.formatDate(this.paymentform.controls['chequeDueDate'].value, 'yyyy-MM-dd');
      // this.paymentform.controls['chequeDueDate'].patchValue(chequeDueDate);

        journalLine.get('paymentInMethodDetails')?.setValue(this.paymentform.value);
          
      return selectedPayment ? selectedPayment.name : '';
    }

  }
  getLabel(journal: FormGroup, id: number): string | undefined {
    const paidByValue = journal.controls['paidBy'].value;

    if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e: any) => e.id === id);
      console.log(customer?.name ,"customer.namecustomer.name");
      
      journal.controls['paidByDetailsName'].setValue(customer ? customer.name:"")
      return customer ? customer.name : '';
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e: any) => e.id === id);
      journal.controls['paidByDetailsName'].setValue(vendor ? vendor.name:"")

      return vendor ? vendor.name : '';
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.other) {
      const other = this.other.find((e: any) => e.id === id);
      journal.controls['paidByDetailsName'].setValue(other ? other.name:"")

      return other ? other.name : '';
    }

    return '';
  }
  handleButtonClick(journalLine: any): void {

    if (this.selectedBank) {
      const paymentMethodId = journalLine.controls['paymentMethodId'].value;
      const selectedPayment = this.paymentMethod.find(method => method.id === paymentMethodId);

      if (selectedPayment) {
        journalLine.get('paymentMethodType')?.setValue(selectedPayment.paymentMethodType);
        const paymentMethodType = selectedPayment.paymentMethodType;
        this.openDialog(journalLine.value, selectedPayment, journalLine, journalLine.get('amount').value);
      }
    } else {
          
      this.toasterService.showError(
        this.langService.transalte('PaymentIn.Error'),
        this.langService.transalte('PaymentIn.paymentMethodTypeNotAllowed')
      );
    }

  }
  setType(journalLine: any) {
    const paymentMethodId = journalLine.controls['paymentMethodId'].value;
    const TreasuriesPayMethod = this.AllTreasuriesPayMethod.find(method => method.id === paymentMethodId);
    journalLine.get('paymentMethodType')?.setValue(TreasuriesPayMethod?.paymentMethodType);
  }
  openCostPopup(data: any, journal: FormGroup, account: number, index: number) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);
    if (!account || accountData?.costCenterConfig == 'NotAllow') {
      if (data.costCenterConfig == 'NotAllow') {
        this.toasterService.showError(
          this.langService.transalte('Journal.Error'),
          this.langService.transalte('Journal.CostCenterNotAllowed')
        );
        return;
      }
    }
    if (
      journal.controls['amount'].value == 0
    ) {
      this.toasterService.showError(
        this.langService.transalte('Journal.Error'),
        this.langService.transalte('Journal.InvalidAmount')
      );
      return;
    }


    const dialogRef = this.dialog.open(AddCostCenterComponent, {
      width: '900px',
      height: '600px',
      header: 'Edit Cost Center Allocation',
      data: data,
    });
    dialogRef.onClose.subscribe((res) => {

      if (res) {
        journal.get('paymentInDetailCostCenters')?.setValue(res);
      }
    });

  }
  save() {
    // if (!this.formsService.validForm(this.paymentInDetailsFormArray && this.addForm, false)) return;

    // const formattedChequeDueDate = this.formatDate(this.addForm.controls['chequeDueDate'].value, 'yyyy-MM-dd');
    const formattedPaymentInDate = this.formatDate(this.addForm.controls['PaymentInDate'].value, 'yyyy-MM-dd');
    const paymentHubDetailId = this.addForm.controls['paymentHubDetailId'].value.toString();
    this.paymentInDetailsFormArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        const paidByDetailsIdControl = control.get('paidByDetailsId');
        
        if (paidByDetailsIdControl) {
          const paidByDetailsId = paidByDetailsIdControl.value.toString();
          control.get('paidByDetailsId')?.setValue(paidByDetailsId)
          console.log(paidByDetailsId);
          // Add your logic here to work with paidByDetailsId
        } else {
          console.error('paidByDetailsId control not found in FormGroup');
        }
      } else {
        console.error('Control is not a FormGroup');
      }
    });
    // Update the form controls with the formatted dates if necessary
    // this.addForm.controls['chequeDueDate'].setValue(formattedChequeDueDate);
    this.addForm.controls['PaymentInDate'].setValue(formattedPaymentInDate);
    this.addForm.controls['paymentHubDetailId'].setValue(paymentHubDetailId);

    // Now you can proceed with saving the form data
    console.log(this.addForm.value);
    
    this.FinanceService.addPaymentIn(this.addForm.value)
  }
  formatDate(date: string, format: string): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(date, format) || '';
  }
  deleteLine(index: number) {
    this.paymentInDetailsFormArray.removeAt(index);
    this.calculateTotalAmount()
  }
  calculateTotalAmount() {
    this.totalAmount = this.paymentInDetailsFormArray.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('amount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalAmount = this.paymentInDetailsFormArray.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('amount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount()
  }
  calculateTotalLocalAmount() {
    let total = 0;

    this.paymentInDetailsFormArray.controls.forEach((journalLine: any) => {
      const amount = journalLine.controls['amount'].value || 0;
      const rate = this.addForm.controls['rate'].value;
      if (rate) {
        total += amount * rate;
      }
    });
    this.addForm.controls['totalReceivedAmount'].patchValue(total)

    return total;
  }
  getAccountCurrencyRate(accountCurrency: number, currentJournalId: number) {
    this.FinanceService.getAccountCurrencyRate(
      accountCurrency,
      this.currentUserService.getCurrency()
    );
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.FinanceService.GetAllPayMethodsDropdown(BankId, BankAccountId)
  }
  getGlAccount(index: number, id: number) {
    const journalLine: any = this.paymentInDetailsFormArray.at(index);
    const paidByValue = journalLine.controls['paidBy'].value;
    if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e) => e.id === id);
      if (customer) {

        journalLine.get('glAccountId')?.setValue(customer.id);
        journalLine.get('glAccountname')?.setValue(customer.accountName);

      }
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e) => e.id === id);
      if (vendor) {
        journalLine.get('glAccountId')?.setValue(vendor.id);
        journalLine.get('glAccountname')?.setValue(vendor.accountName);

      }
    }
    this.getLabel(journalLine , id)

  }

  getGlAccountName(index: number, id: number): string {
    const journalLine: any = this.paymentInDetailsFormArray.at(index);
    const paidByValue = journalLine.controls['paidBy'].value;

    if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e) => e.id === id);
      if (customer) {
        const account = customer.accountName;
        return account;
      }
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e) => e.id === id);
      if (vendor) {
        const account = vendor.accountName;
        return account;
      }
    }

    return '';
  }
  getAllTreasuriesPaymentMethodsDropdown() {
    this.FinanceService.GetAllTreasuriesPaymentMethodsDropdown();
  }
  getTreasuryBalance(id: number) {
    this.FinanceService.GetTreasuryBalance(id);
  }
  getAccountBalance(id: number) {
    this.FinanceService.GetAccountBalance(id);
  }
}
