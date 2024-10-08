import { Component, OnInit } from '@angular/core';
import {
  CurrentUserService,
  customValidators,
  FormsService,
  LanguageService,
  lookupDto,
  LookupEnum,
  LookupsService,
  PageInfo,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { CurrencyDto } from '../../../../general/models';
import { PopupAccountsComponent } from '../../../components/paymentin/popup-accounts/popup-accounts.component';
import {
  costCenters,
  paymentplace,
  paymentplaceString,
  TreasuryDropDown,
  SimpleDropDown,
  PaidByDropDown,
  VendorDropDown,
  CustomerDropDown,
  BankAccount,
  AccountDto,
  BankPaymentMethods,
  TreasuriesPaymentMethod,
  SharedFinanceTranscationEnums,
} from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { AddPaymentOutCostCenterComponent } from '../../../components/paymentout/add-payment-out-cost-center/add-payment-out-cost-center.component';
import { PaymentOutPaymentMethodComponent } from '../../../components/paymentout/payment-out-payment-method/payment-out-payment-method.component';

@Component({
  selector: 'app-edit-payment-out',
  templateUrl: './edit-payment-out.component.html',
  styleUrls: ['./edit-payment-out.component.scss'],
})
export class EditPaymentOutComponent implements OnInit {
  paymentDetails: any;
  LookupEnum = LookupEnum;
  addForm: FormGroup;
  paymentform: FormGroup;
  CostCenter: FormGroup;
  tableData: any[] = [];
  costCenters: costCenters[] = [];
  paymentplaceEnum: paymentplace;
  paymentplaceString: paymentplaceString;
  lookups: { [key: string]: lookupDto[] };
  originalPaymentMethodTypeLookups: lookupDto[] = [];
  TreasuryDropDown: TreasuryDropDown[] = [];
  BankDropDown: SimpleDropDown[] = [];
  paymentHubDetails: SimpleDropDown[] | TreasuryDropDown[] = [];
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
  accountName: string = '';
  paidName: string = '';
  paymentOutDate: string = '';
  localAmount: number;
  totalAmount: number = 0;
  AccountBalance: number = 0;
  TreasuryBalance: number = 0;
  totalLocalAmount: number = 0;
  id: number;
  newBalance: number = 0;
  updatedNewBalance: number = 0;
  selectedBank: boolean;
  selectedCurrency: string = '';
  paymentMethod: BankPaymentMethods[] = [];
  AllTreasuriesPayMethod: TreasuriesPaymentMethod[] = [];
  paymentInDraft: boolean;
  paymentInPosted: boolean;
  change: boolean;
  paymenInId: number;

  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private lookupsService: LookupsService,
    private financeService: TranscationsService,
    private formsService: FormsService,
    public sharedFinanceEnums: SharedFinanceTranscationEnums,
    private toasterService: ToasterService,
    private langService: LanguageService,
    private currentUserService: CurrentUserService,
    private routerService: RouterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.getPaymentDetails(this.id);
    this.initializeForm();
    this.subscribe();
    this.initializeDropDown();
    this.loadLookups();
  }
  getPaymentDetails(id: number) {
    this.financeService.GetPaymentOutById(id);
  }
  get paymentOutDetailsFormArray() {
    return this.addForm.get('paymentOutDetails') as FormArray;
  }
  getTreasuryDropDown() {
    this.financeService.treasuryDropDown();
  }
  getBankDropDown() {
    this.financeService.bankDropDown();
  }
  getVendorDropdown() {
    this.financeService.vendorDropdown();
  }
  getCustomerDropdown() {
    this.financeService.customerDropdown();
  }
  initializeDropDown() {
    this.paidBy = [
      { id: 1, name: this.sharedFinanceEnums.paiedDropDown.customer },
      { id: 2, name: this.sharedFinanceEnums.paiedDropDown.vendor },
      { id: 3, name: this.sharedFinanceEnums.paiedDropDown.other },
    ];
    this.other = [
      {
        id: 1,
        name: this.sharedFinanceEnums.OtherOptions.GLAccount,
      },
    ];
    this.getCustomerDropdown();
    this.getVendorDropdown();
    this.getAccounts();
  }
  initializeForm() {
    this.addForm = this.formBuilder.group({
      id: new FormControl(0),
      description: new FormControl(''),
      paymentOutDate: new FormControl('', [customValidators.required]),
      paymentHub: new FormControl('', [customValidators.required]),
      bankAccountId: new FormControl(null),
      paymentHubDetailId: new FormControl('', [customValidators.required]),
      currencyId: new FormControl(null),
      rate: new FormControl<number | undefined>(0, [customValidators.required,customValidators.nonNegativeNumbers]),
      glAccountId: new FormControl(null),
      paymentOutDetails: this.formBuilder.array([]),
      code: new FormControl(''),
      currency: new FormControl(''),
      currentBalance: new FormControl(0),
      totalPaidAmount: new FormControl(0),
      newBalance: new FormControl(0, customValidators.nonNegativeNumbers),
      paymentOutDetailCostCenters: new FormControl(null),
    });
    this.addForm.controls['paymentOutDate'].patchValue(new Date().toISOString().split('T')[0]);
  }

  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.PaymentMethodType,
      LookupEnum.PaymentPlace,
      LookupEnum.CommissionType,
    ]);

    this.lookupsService.lookups.subscribe((l) => {
      this.lookups = l || {};
      this.originalPaymentMethodTypeLookups = this.lookups[LookupEnum.PaymentMethodType] || [];
    });
  }

  openDialog(value: any, selectedPayment: any, journal: any, amount: number) {
    if (
      selectedPayment.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Cash ||
      selectedPayment.paymentMethodType == null
    ) {
      return true;
    } else {
      const data = value;
      const viewdata = this.paymentInPosted;

      const ref = this.dialog.open(PaymentOutPaymentMethodComponent, {
        width: '900px',
        height: '600px',
        data: { ...data, selectedPayment , viewdata },
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          journal.get('paymentOutMethodDetail')?.setValue(res);
        }
      });
    }
  }
  getDetails(id: string) {
    // this.paymentOutDetailsFormArray.clear()
    this.addForm.controls['currentBalance'].patchValue(0);
    this.addForm.controls['totalPaidAmount'].patchValue(0);

    this.calculateTotalAmount();
    this.addForm.controls['paymentHubDetailId'].setValue(null);
    this.selectedCurrency = '';
    this.addForm.controls['rate'].setValue(null);

    if (id == paymentplaceString.Bank) {
      this.getBankDropDown();
      this.paymentHubDetails = this.BankDropDown;
      this.selectedBank = true;
      this.addForm.get('bankAccountId')?.addValidators(customValidators.required);
      this.addForm.get('bankAccountId')?.updateValueAndValidity();
    } else if (id == paymentplaceString.Treasury) {
      this.getTreasuryDropDown();
      this.paymentHubDetails = this.TreasuryDropDown;
      this.getAllTreasuriesPaymentMethodsDropdown();
      this.selectedBank = false;
    }
  }



  getpaidByDetails(index: number, name: string) {
    const journalLine = this.paymentOutDetailsFormArray.at(index);
    journalLine.get('glAccountname')?.setValue(null);
    journalLine.get('paidByDetailsName')?.setValue(null);    
    journalLine.get('accountName')?.setValue(null);

    if (name == this.sharedFinanceEnums.paiedDropDown.customer) {
      journalLine.get('glAccountId')?.clearValidators();
      journalLine.get('glAccountId')?.updateValueAndValidity();
      this.paidByDetailsCustomer = this.customerDropDown;
    } else if (name == this.sharedFinanceEnums.paiedDropDown.vendor) {
      journalLine.get('glAccountId')?.clearValidators();
      journalLine.get('glAccountId')?.updateValueAndValidity();
      this.paidByDetailsVendor = this.vendorDropDown;
    } else if (name == this.sharedFinanceEnums.paiedDropDown.other) {
      journalLine.get('glAccountId')?.updateValueAndValidity();

      journalLine.get('glAccountId')?.setValidators(customValidators.required);
      journalLine.get('glAccountId')?.updateValueAndValidity();
      this.paidByDetailsOther = this.other;
    }
  }
  updateRateInPaymentDetails(newRate: any) {
    this.paymentOutDetailsFormArray.controls.forEach((formGroup) => {
      formGroup.get('rate')?.setValue(newRate);
    });
  }
  updatecurrencyIdnPaymentDetails(currencyId: any) {
    this.paymentOutDetailsFormArray.controls.forEach((formGroup) => {
      formGroup.get('currencyId')?.setValue(currencyId);
    });
  }
  toNumber(value: string): number {
    let numberValue = parseInt(value);
    return numberValue;
  }
  subscribe() {
    this.financeService.getTreasuryDropDownDataObservable.subscribe((res: any) => {
      this.TreasuryDropDown = res;
    });
    this.financeService.getBankDropDownDataObservable.subscribe((res: any) => {
      this.BankDropDown = res;
    });
    this.financeService.getVendorDropdownDataObservable.subscribe((res: any) => {
      this.vendorDropDown = res;
    });
    this.financeService.getCustomerDropdownDataObservable.subscribe((res: any) => {
      this.customerDropDown = res;
    });
    this.financeService.AllPayMethodsDropdownObservable.subscribe((res: any) => {
      this.paymentMethod = res;
    });
    this.financeService.AllTreasuriesPayMethodsDropdownObservable.subscribe((res: any) => {
      this.AllTreasuriesPayMethod = res;
    });
    this.financeService.TreasuryBalanceObservable.subscribe((res: any) => {
      this.AccountBalance = res;
    });
    this.financeService.AccountBalanceObservable.subscribe((res: any) => {
      this.AccountBalance = res;
    });

    this.addForm.get('paymentHub')?.valueChanges.subscribe((res: any) => {
      if (res == paymentplaceString.Treasury) {
        this.addForm.get('bankAccountId')?.clearValidators();
        this.addForm.get('bankAccountId')?.updateValueAndValidity();
      } else if (res == paymentplaceString.Bank) {
        this.addForm.get('bankAccountId')?.addValidators([customValidators.required]);
        this.addForm.get('bankAccountId')?.updateValueAndValidity();
      }
    });
    this.addForm.controls['currencyId'].valueChanges.subscribe((currencyId: any) => {
      this.updatecurrencyIdnPaymentDetails(currencyId);
    });
    this.addForm.controls['currencyId'].valueChanges.subscribe((currencyId: any) => {
      this.updatecurrencyIdnPaymentDetails(currencyId);
    });
    this.financeService.paymentOutDetailsDataObservable.subscribe((res: any) => {
      this.paymentDetails = res;
      this.paymenInId = res?.id;
      if (res?.status == this.sharedFinanceEnums.paymentInStatus.Draft) {
        this.paymentInDraft = true;
        this.paymentInPosted = false;

      } else if (res?.status == this.sharedFinanceEnums.paymentInStatus.Posted) {
        this.paymentInDraft = false;
        this.paymentInPosted = true;

      }

      this.addForm.patchValue({
        ...res,
      });
      this.addForm.get('paymentOutDate')?.setValue(new Date(res?.paymentOutDate));

      if (res?.paymentOutDetails) {
        res?.paymentOutDetails.forEach((element: any) => {
          const formGroup = this.formBuilder.group({
            ...element,
            paymentOutDetailCostCenters: this.formBuilder.array(
              element.paymentOutDetailCostCenters.map((costCenter: any) =>
                this.formBuilder.group(costCenter)
              )
            ),
          });

          this.paymentOutDetailsFormArray.push(formGroup);
          this.calculateTotalAmount();
        });
      }

      if (res?.paymentHub) {
        if (res?.paymentHub == this.sharedFinanceEnums.paymentplaceString.Bank) {
          this.getAccountBalance(res?.bankAccountId);
          if (res?.currencyId) {
            this.getAccountCurrencyRate(res?.currencyId);
          }
        } else if (res?.paymentHub == this.sharedFinanceEnums.paymentplaceString.Treasury) {
          this.getTreasuryBalance(res?.treasuryId);

          if (res?.currencyId) {
            this.getAccountCurrencyRate(res?.currencyId);
          }
        }
      }

      this.paymentOutDetailsFormArray.controls.forEach((control: any, index: number) => {
        if (control.value.paidBy === this.sharedFinanceEnums.paiedDropDown.other) {
          control
            .get('paidByDetailsName')
            ?.setValue(this.sharedFinanceEnums.OtherOptions.GLAccount);
        }
      });
      this.addForm.controls['currency'].patchValue(res?.currencyName);
    });
    this.addForm.controls['paymentHub'].valueChanges.subscribe((paymentHub: any) => {
      this.getDetails(paymentHub);
      this.addForm.controls['paymentHubDetailId'].patchValue(
        this.paymentDetails.paymentHubDetailId
      );

      this.bankAccountDropDown(this.paymentDetails.paymentHubDetailId);
    });
    this.addForm.controls['paymentHubDetailId'].valueChanges.subscribe((res: any) => {
      this.getCurrencyBankAccount(this.toNumber(res));
    });

    this.addForm.controls['totalPaidAmount'].valueChanges.subscribe(() => {
      this.updateNewBalance();
    });

    this.updateNewBalance();
  }

  addNewRow() {
    if (!this.formsService.validForm(this.paymentOutDetailsFormArray, false)) return;

    let newLine = this.formBuilder.group(
      {
        amount: new FormControl('', [customValidators.required, customValidators.hasSpaces]),
        paymentMethodId: new FormControl(null, [customValidators.required]),
        paymentMethodType: new FormControl('Check'),
        ratio: new FormControl(null),
        paidBy: new FormControl('', [customValidators.required]),
        paidByDetailsId: new FormControl<string>('', [customValidators.required]),
        glAccountId: new FormControl(null, [customValidators.required]),
        notes: new FormControl(''),
        rate: new FormControl(this.addForm.controls['rate'].value),
        currencyId: new FormControl(this.addForm.controls['currencyId'].value),
        paymentOutMethodDetail: new FormControl([]),
        paymentOutDetailCostCenters: new FormControl([]),

        /////////
        id: new FormControl(0),
        // accountName: new FormControl(''),
        paymentMethodName: new FormControl(''),
        paidByDetailsName: new FormControl(''),
        // accountCode: new FormControl('', [customValidators.required]),
        // accountId: new FormControl(),
        accountName: new FormControl(),
        // selectedFalg: new FormControl(false),
        costCenterConfig: new FormControl(null),
        // lineDescription: new FormControl(null, [customValidators.required]),
        // currencyId: new FormControl(null, [customValidators.required]),
        currency: new FormControl(''),
        // currencyRate: new FormControl(),
        // debitAmountLocal: new FormControl(0),
        // creditAmountLocal: new FormControl(0),
        // costCenters: new FormControl([]),
      }
      //{ validators: customValidators.debitAndCreditBothCanNotBeZero }
    );
    newLine.updateValueAndValidity();
    this.paymentOutDetailsFormArray.push(newLine);
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
    this.financeService.getAccountsHasNoChildrenNew(event, new PageInfo());

    this.financeService.childrenAccountList.subscribe((res: any) => {
      if (res?.length) {
        this.filteredAccounts = res?.map((account: any) => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`,
        }));
      }
    });
  }

  getAccounts() {
    this.financeService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
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
    const journalLine = this.paymentOutDetailsFormArray.at(index);
    journalLine.get('accountName')?.setValue(selectedAccount.name);
    journalLine.get('costCenterConfig')?.setValue(selectedAccount.costCenterConfig);
    journalLine.get('glAccountId')?.setValue(selectedAccount.id);
  }
  accountSelected(event: any, id: number) {
    var accountData = this.filteredAccounts.find((c) => c.id == event);
    this.updateAccount(accountData as AccountDto, id);
  }
  isCostCenterallowed(journalLine: any, costCenterConfig: string): boolean {
    if (
      costCenterConfig === this.sharedFinanceEnums.costCenterConfig.Mandatory ||
      costCenterConfig === this.sharedFinanceEnums.costCenterConfig.Optional
    ) {
      return true;
    } else {
      this.CostCenter = this.formBuilder.group({
        costCenterId: new FormControl(null),
        percentage: new FormControl(null),
      });
      journalLine.get('paymentOutDetailCostCenters')?.setValue([]);

      return false;
    }
  }
  isCostCenterContainsData(costCenter: number) {
    if (costCenter) return true;
    return false;
  }
  bankAccountDropDown(id: number) {
    if (this.selectedBank) {
      this.financeService.BankAccountDropDown(id).subscribe((res: any) => {
        this.bankAccount = res;
        this.addForm.controls['currencyId'].patchValue(null);
      });
    } else if (!this.selectedBank) {
      this.TreasuryDropDown.forEach((e: any) => {
        if (id == e.id) {
          this.selectedCurrency = e.currencyName;

          this.getTreasuryBalance(e.id);

          this.addForm.controls['currency'].patchValue(e.currencyName);
          this.addForm.controls['currencyId'].patchValue(e.currencyId);

          this.getAccountCurrencyRate(this.addForm.controls['currencyId'].value as number);
          this.addForm.controls['currentBalance'].patchValue(this.TreasuryBalance);
        }
      });
    }
  }
  getCurrencyBankAccount(id: number) {
    if (this.addForm.controls['paymentHubDetailId'].value && id) {
      this.bankAccount.forEach((element: any) => {
        if (element.id == id) {
          this.selectedCurrency = element.currencyName;
          this.addForm.controls['currencyId'].patchValue(element.currencyId);
          this.getAccountCurrencyRate(this.addForm.controls['currencyId'].value as number);
          this.getAccountBalance(element.id);
        }
      });

      this.getAllPayMethodsDropdown(this.addForm.controls['paymentHubDetailId'].value, id);
    }
    this.addForm.controls['currentBalance'].patchValue(this.AccountBalance);
  }
  clacLocalAmount(e: any) {
    this.addForm.controls['rate'].valueChanges.subscribe((res: number) => {
      this.localAmount = e * this.addForm.controls['rate'].value;
    });
    this.localAmount = e * this.addForm.controls['rate'].value;
  }
  getPaymentMethodName(paymentMethodId: any): string {
    const paymentMethod = this.lookups[LookupEnum.PaymentMethodType]?.find(
      (option) => option.id === paymentMethodId
    );
    // this.paymentOutDetailsFormArray.controls['paymentMethodType']

    return paymentMethod ? paymentMethod.name : '';
  }
  getLabelPayment(journalLine: any, paymentMethodId: any): string {
    if (this.selectedBank) {
      const selectedPayment = this.paymentMethod.find((method) => method.id === paymentMethodId);
      journalLine.get('paymentMethodName')?.setValue(selectedPayment?.name);
      journalLine.get('paymentMethodType')?.setValue(selectedPayment?.paymentMethodType);
      journalLine.get('ratio')?.setValue(selectedPayment?.ratio);

      this.paymentform = this.formBuilder.group({
        paymentMethodId: new FormControl(selectedPayment?.id),
        chequeNumber: new FormControl(null),
        chequeDueDate: new FormControl(null),
        bankReference: new FormControl(null),
        VatAmount: new FormControl(null),
        CommissionAmount: new FormControl(null),
      });

      journalLine.get('paymentOutMethodDetail')?.setValue(this.paymentform.value);
      return selectedPayment ? selectedPayment.name : '';
    } else {
      const selectedPayment = this.AllTreasuriesPayMethod.find(
        (method) => method.id === paymentMethodId
      );

      this.paymentform = this.formBuilder.group({
        paymentMethodId: new FormControl(selectedPayment?.id),
        chequeNumber: new FormControl(null),
        chequeDueDate: new FormControl(null),
        bankReference: new FormControl(null),
        VatAmount: new FormControl(null),
        CommissionAmount: new FormControl(null),
      });

      journalLine.get('paymentOutMethodDetail')?.setValue(this.paymentform.value);
      journalLine.get('paymentMethodName')?.setValue(selectedPayment?.name);
      // journalLine.get('paymentOutMethodDetail')?.setValue([]);
      return selectedPayment ? selectedPayment.name : '';
    }
  }
  getLabel(journal: FormGroup, id: number): string | undefined {
    const paidByValue = journal.controls['paidBy'].value;
    if (paidByValue === this.sharedFinanceEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e: any) => e.id === id);
      journal.controls['paidByDetailsName'].setValue(customer ? customer.name : '');
      return customer ? customer.name : '';
    } else if (paidByValue === this.sharedFinanceEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e: any) => e.id === id);
      journal.controls['paidByDetailsName'].setValue(vendor ? vendor.name : '');

      return vendor ? vendor.name : '';
    } else if (paidByValue === this.sharedFinanceEnums.paiedDropDown.other) {
      const other = this.other.find((e: any) => e.id === id);
      journal.controls['paidByDetailsName'].setValue(other ? other.name : '');

      return other ? other.name : '';
    }

    return '';
  }
  handleButtonClick(journalLine: any): void {
    if (this.selectedBank) {
      const paymentMethodId = journalLine.controls['paymentMethodId'].value;
      const selectedPayment = this.paymentMethod.find((method) => method.id === paymentMethodId);

      if (selectedPayment) {
        journalLine.get('paymentMethodType')?.setValue(selectedPayment.paymentMethodType);
        const paymentMethodType = selectedPayment.paymentMethodType;
        this.openDialog(
          journalLine.value,
          selectedPayment,
          journalLine,
          journalLine.get('amount').value
        );
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
    const TreasuriesPayMethod = this.AllTreasuriesPayMethod.find(
      (method) => method.id === paymentMethodId
    );
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
    if (journal.controls['amount'].value == 0) {
      this.toasterService.showError(
        this.langService.transalte('Journal.Error'),
        this.langService.transalte('Journal.InvalidAmount')
      );
      return;
    }
    const viewdata = this.paymentInPosted;

    const dialogRef = this.dialog.open(AddPaymentOutCostCenterComponent, {
      width: '900px',
      height: '600px',
      header: 'Edit Cost Center Allocation',
      data:{ ...data,viewdata },
    });
    dialogRef.onClose.subscribe((res) => {
      if (res) {
        const paymentInDetailCostCenters = journal.get('paymentOutDetailCostCenters') as FormArray;

        const resArray = res || []; // Ensure res is an array

        while (paymentInDetailCostCenters.length < resArray.length) {
          paymentInDetailCostCenters.push(this.formBuilder.control(null));
        }

        paymentInDetailCostCenters.patchValue(resArray);
      }
    });
  }
  save() {
    if (!this.formsService.validForm(this.paymentOutDetailsFormArray && this.addForm, false))
      return;

    let lineNumber = 0;
    let validpaymentOutDetails: boolean = true;
    this.paymentOutDetailsFormArray.controls.forEach((control) => {
      lineNumber++;

      if (
        control.value.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Check
      ) {
        if (
          control.value.paymentOutMethodDetail.chequeNumber == null ||
          control.value.paymentOutMethodDetail.chequeDueDate == null
        ) {
          this.toasterService.showError(
            this.langService.transalte('PaymentIn.Error'),
            this.langService.transalte(`PaymentIn.paymentMethodTypeRequired`) + lineNumber
          );
          validpaymentOutDetails = false;
          return;
        }
      } else if (
        control.value.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Master
      ) {
        if (control.value.paymentOutMethodDetail.bankReference == null) {
          this.toasterService.showError(
            this.langService.transalte('PaymentIn.Error'),
            this.langService.transalte(`PaymentIn.paymentMethodTypeRequired`) + lineNumber
          );
          validpaymentOutDetails = false;

          return;
        }
      } else if (
        control.value.paymentMethodType == this.sharedFinanceEnums.paymentMethodTypeString.Visa
      ) {
        if (control.value.paymentOutMethodDetail.bankReference == null) {
          this.toasterService.showError(
            this.langService.transalte('PaymentIn.Error'),
            this.langService.transalte(`PaymentIn.paymentMethodTypeRequired`) + lineNumber
          );
          validpaymentOutDetails = false;

          return;
        }
      }
    });
    if (validpaymentOutDetails) {
      const paymentHubDetailId = this.addForm.controls['paymentHubDetailId'].value.toString();
      this.paymentOutDetailsFormArray.controls.forEach((control) => {
        if (control instanceof FormGroup) {
          const paidByDetailsIdControl = control.get('paidByDetailsId');

          if (paidByDetailsIdControl) {
            const paidByDetailsId = paidByDetailsIdControl.value.toString();
            control.get('paidByDetailsId')?.setValue(paidByDetailsId);
          }
        }
      });

      this.addForm.controls['paymentHubDetailId'].setValue(paymentHubDetailId);

      this.financeService.editPaymentOut(this.addForm.value);
    }
  }

  deleteLine(index: number) {
    this.paymentOutDetailsFormArray.removeAt(index);
    this.calculateTotalAmount();
  }
  calculateTotalAmount() {
    this.totalAmount = this.paymentOutDetailsFormArray.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('amount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalAmount = this.paymentOutDetailsFormArray.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('amount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount();
  }
  calculateTotalLocalAmount() {
    let total = 0;

    this.paymentOutDetailsFormArray.controls.forEach((journalLine: any) => {
      const amount = journalLine.controls['amount'].value || 0;
      const rate = this.addForm.controls['rate'].value;
      if (rate) {
        total += amount * rate;
      }
    });
    this.addForm.controls['totalPaidAmount'].patchValue(total);

    return total;
  }
  getAccountCurrencyRate(accountCurrency: number) {
    this.financeService.getAccountCurrencyRate(
      accountCurrency,
      this.currentUserService.getCurrency()
    );
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.financeService.getAllPayMethodsDropdown(BankId, BankAccountId);
  }
  getGlAccount(index: number, id: number) {
    const journalLine: any = this.paymentOutDetailsFormArray.at(index);
    const paidByValue = journalLine.controls['paidBy'].value;
    if (paidByValue === this.sharedFinanceEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e) => e.id === id);
      if (customer) {
        if (customer.accountId > 0) {
          journalLine.get('glAccountId')?.setValue(customer.accountId);
          journalLine.get('accountName')?.setValue(customer.accountName);
        }
      }
    } else if (paidByValue === this.sharedFinanceEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e) => e.id === id);
      if (vendor) {
        if (vendor.accountId > 0) {
          journalLine.get('glAccountId')?.setValue(vendor.accountId);
          journalLine.get('accountName')?.setValue(vendor.accountName);
        }
      }
    }
    this.getLabel(journalLine, id);
  }
  getGlAccountName(index: number, id: number): string {
    const journalLine: any = this.paymentOutDetailsFormArray.at(index);
    const paidByValue = journalLine.controls['paidBy'].value;

    if (paidByValue === this.sharedFinanceEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e) => e.id === id);
      if (customer) {
        const account = customer.accountName;
        return account;
      }
    } else if (paidByValue === this.sharedFinanceEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e) => e.id === id);
      if (vendor) {
        const account = vendor.accountName;
        return account;
      }
    }

    return '';
  }
  getAllTreasuriesPaymentMethodsDropdown() {
    this.financeService.GetAllTreasuriesPaymentMethodsDropdown();
  }
  getTreasuryBalance(id: number) {
    this.financeService.GetTreasuryBalance(id);
  }
  getAccountBalance(id: number) {
    this.financeService.GetAccountBalance(id);
  }
  cancel() {
    this.routerService.navigateTo(`/transcations/paymentout`);
  }

  updateNewBalance() {
    const totalPaidAmount = this.addForm.controls['totalPaidAmount'].value || 0;

    const newBalance = this.AccountBalance - totalPaidAmount;

    this.addForm.controls['newBalance'].setValue(newBalance);

    this.addForm.controls['newBalance'].updateValueAndValidity();
    this.updatedNewBalance = newBalance;
  }
  onDelete(id: number, index: number): void {
    if(!this.paymentInPosted){
    const Line = this.paymentOutDetailsFormArray.at(index);

    if (id == 0) {
      this.deleteLine(index);
    } else {
      this.financeService.paymentOutDeleteLine(Line.get('id')?.value!);
      this.financeService.paymentOutLineDeletedObser.subscribe((res: boolean) => {
        if (res == true) {
          this.paymentOutDetailsFormArray.removeAt(index);
          this.calculateTotalAmount();
        }
      });
    }}else{
      return
    }
  }

  ngOnDestroy(): void {
    this.financeService.paymentOutDetails.next(null);
  }

  addToPost() {
    this.financeService.postPaymentOut(this.paymenInId);
  }
}
