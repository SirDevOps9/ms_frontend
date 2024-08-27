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
import { paymentplace, paymentmethodtype } from '../../../models/enums';
import { FinanceService } from '../../../finance.service';
import { CurrencyDto } from '../../../../general/models';
import { SharedJournalEnums } from '../../../models/sharedEnums';
import { costCenters, PaidByDropDown } from '../../../models';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { PopupAccountsComponent } from '../../../components/payment-in/popup-accounts/popup-accounts.component';
import { AddCostCenterComponent } from '../../../components/payment-in/add-cost-center/add-cost-center.component';
import { DatePipe, formatDate } from '@angular/common';
import { CurrencyService } from 'projects/apps-accounting/src/app/modules/general/currency.service';
import { CurrentUserService } from 'libs/shared-lib/src/lib/services/currentuser.service';

@Component({
  selector: 'app-add-payment-in',
  templateUrl: './add-payment-in.component.html',
  styleUrl: './add-payment-in.component.scss',
})
export class AddPaymentInComponent {
  LookupEnum = LookupEnum;
  addForm: FormGroup;
  tableData: any[] = [];
  costCenters: costCenters[] = [];
  paymentplaceEnum: paymentplace;
  lookups: { [key: string]: lookupDto[] };
  originalPaymentMethodTypeLookups: lookupDto[] = [];
  TreasuryDropDown: any[] = []
  BankDropDown: any[] = []
  paymentHubDetails: any[] = []
  currencies: CurrencyDto[] = [];
  paidBy: PaidByDropDown[] = [];
  other: PaidByDropDown[] = [];
  vendorDropDown: any[] = [];
  customerDropDown: any[] = [];
  paidByDetailsCustomer: any[] = [];
  paidByDetailsVendor: any[] = [];
  paidByDetailsOther: any[] = [];
  bankAccount: any;
  filteredAccounts: AccountDto[] = [];
  accountName: string = "";
  paidName: string = "";
  journalDate: string = "";
  localAmount: number;
  totalAmount: number = 0;
  AccountBalance: number = 0;
  TreasuryBalance: number = 0;
  totalLocalAmount: number = 0;
  newBalance: number = 0;
  selectedBank: boolean;
  selectedCurrency: string = "";
  paymentMethod: any[] = []
  AllTreasuriesPayMethod: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private dialog: DialogService,
    private lookupsService: LookupsService,
    private FinanceService: FinanceService,
    private formsService: FormsService,
    private accountService: AccountService,
    public SharedJournalEnums: SharedJournalEnums,
    private toasterService: ToasterService,
    private langService: LanguageService,
    private currencyService: CurrencyService,
    private currentUserService: CurrentUserService,
    private cdr: ChangeDetectorRef




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
      code: new FormControl(''),
      journalDate: new FormControl(this.getTodaysDate(), [customValidators.required]),
      description: new FormControl(''),
      paymentHubId: new FormControl('', [customValidators.required]),
      paymentHubDetails: new FormControl(null, [customValidators.required]),
      bankAccountId: new FormControl('', [customValidators.required]),
      currency: new FormControl(""),
      currencyId: new FormControl(null, [customValidators.required]),
      rate: new FormControl<number | undefined>(0, [customValidators.required]),
      // sourceDocument: new FormControl(''),
      // createdJournal: new FormControl(''),
      currentBalance: new FormControl(0),
      totalReceivedAmount: new FormControl(0),
      newBalance: new FormControl(''),
      journalEntryLines: this.formBuilder.array([]),
      paymentInDetailCostCenters: new FormControl(),
    });
    this.addForm.controls['journalDate'].patchValue(new Date());

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
    console.log(value, "4444444444444444444");
    console.log(selectedPayment, "4444444444444444444");

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
  getDetails(id: number) {
this.journalEntryLinesFormArray.controls=[]
this.addForm.controls['currentBalance'].patchValue(0)
this.addForm.controls['totalReceivedAmount'].patchValue(0)

this.calculateTotalAmount()
    this.addForm.controls['paymentHubDetails'].setValue(null)
    this.selectedCurrency = "";
    this.addForm.controls['rate'].setValue(null);

    if (id == paymentplace.Bank) {
      this.paymentHubDetails = this.BankDropDown
      this.selectedBank = true
    } else if (id == paymentplace.Treasury) {
      this.paymentHubDetails = this.TreasuryDropDown
      this.getAllTreasuriesPaymentMethodsDropdown()
      this.selectedBank = false
    }
  }

  getpaidByDetails(index:number , name: string) {
    console.log(    this.journalEntryLinesFormArray.controls[index].value.glAccountname,"00000000000");
    const journalLine = this.journalEntryLinesFormArray.at(index);
    journalLine.get('glAccountname')?.setValue(null);


    if (name == this.SharedJournalEnums.paiedDropDown.customer) {
      this.paidByDetailsCustomer = this.customerDropDown
    } else if (name == this.SharedJournalEnums.paiedDropDown.vendor) {
      this.paidByDetailsVendor = this.vendorDropDown

    } else if (name == this.SharedJournalEnums.paiedDropDown.other) {
      this.paidByDetailsOther = this.other
    }
  }
  // getpaidByDetails(rowIndex: number, name: string) {
  //   let details:any = [];
  //   if (name === this.SharedJournalEnums.paiedDropDown.customer) {
  //     details = this.customerDropDown;
  //   } else if (name === this.SharedJournalEnums.paiedDropDown.vendor) {
  //     details = this.vendorDropDown;
  //   } else if (name === this.SharedJournalEnums.paiedDropDown.other) {
  //     details = this.other;
  //   }
  //   (this.journalEntryLinesFormArray.controls[rowIndex] as FormGroup).patchValue({
  //     paidByDetails: details
  //   });
  // }
  // getpaidByDetails(rowIndex: number, name: string) {
  //   let details:any = [];
  //   if (name === this.SharedJournalEnums.paiedDropDown.customer) {
  //     details = this.customerDropDown;
  //   } else if (name === this.SharedJournalEnums.paiedDropDown.vendor) {
  //     details = this.vendorDropDown;
  //   } else if (name === this.SharedJournalEnums.paiedDropDown.other) {
  //     details = this.other;
  //   }

  //   (this.journalEntryLinesFormArray.controls[rowIndex] as FormGroup).patchValue({
  //     paidByDetails: details,
  //     paidByDetailsId: null // Reset selected value if options change
  //   });
  // }


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
     this.TreasuryBalance=res
    })
    this.FinanceService.AccountBalanceObservable.subscribe((res: any) => {
      this.AccountBalance=res
    })
    this.addForm.get('journalDate')?.valueChanges.subscribe((res: any) => {
      this.journalDate = this.formatDate(res, 'yyyy-MM-dd');
      console.log(this.journalDate, "this.journalDate");
    })

    this.addForm.get('paymentHubId')?.valueChanges.subscribe((res: any) => {
      if (res == paymentplace.Treasury) {
        this.addForm.get('bankAccountId')?.clearValidators()
        this.addForm.get('bankAccountId')?.updateValueAndValidity()
      } else if (res == paymentplace.Bank) {
        this.addForm.get('bankAccountId')?.addValidators([customValidators.required])
        this.addForm.get('bankAccountId')?.updateValueAndValidity()
      }
    })
    this.currencyService.accountCurrencyRate.subscribe((res) => {
      if (res) {
        this.addForm.controls['rate'].patchValue(res.rate)
        this.calculateTotalLocalAmount()
      }
    });


  }
  addNewRow() {
    //  if (!this.formsService.validForm(this.journalEntryLinesFormArray  , false)) return;
    let newLine = this.formBuilder.group(
      {
        id: new FormControl(0),
        amount: new FormControl(0, [customValidators.required, customValidators.number , customValidators.hasSpaces]),
        paymentMethodId: new FormControl(null, [customValidators.required]),
        paymentMethodType: new FormControl(null, [customValidators.required]),
        paidBy: new FormControl('', [customValidators.required]),
        paidByDetailsId: new FormControl('', [customValidators.required]),
        glAccountId: new FormControl(null, [customValidators.required]),
        glAccountname: new FormControl(''),
        paymentMethodName: new FormControl(''),
        paymentInDetailCostCenters: new FormControl([]),
        notes: new FormControl(''),
        paymentInMethodDetails: new FormControl([]),
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
    this.journalEntryLinesFormArray.push(newLine);
    console.log(this.journalEntryLinesFormArray.controls, "kkkkkkkk");


    // this.getAccounts();
  }
  shouldShowCostCenterImage(costCenters: any[]): number {
    console.log(costCenters, "00000000000000");
    if (!costCenters) return -1;
    const totalPercentage = costCenters.reduce(
      (sum: number, item: any) => sum + parseFloat(item.percentage),
      0
    );
    return totalPercentage;
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
    const journalLine = this.journalEntryLinesFormArray.at(index);
    journalLine.get('accountName')?.setValue(selectedAccount.name);
    journalLine.get('costCenterConfig')?.setValue(selectedAccount.costCenterConfig);

  }
  accountSelected(event: any, id: number) {
    var accountData = this.filteredAccounts.find((c) => c.id == event);
    this.updateAccount(accountData as AccountDto, id);
  }
  isCostCenterallowed(costCenterConfig: string): boolean {
    if (costCenterConfig === this.SharedJournalEnums.costCenterConfig.Mandatory || costCenterConfig === this.SharedJournalEnums.costCenterConfig.Optional) return true;
    return false;
  }
  isCostCenterContainsData(costCenter: number) {
    if (costCenter) return true;
    return false;
  }
  bankAccountDropDown(id: number) {

    if (this.selectedBank) {
      this.FinanceService.BankAccountDropDown(id).subscribe((res: any) => {
        this.bankAccount = res
        this.addForm.controls['currencyId'].patchValue(null)
      })
    } else {
      this.paymentHubDetails.forEach((e: any) => {
        this.selectedCurrency = e.currencyName
        this.getTreasuryBalance(e.id)
        console.log(this.TreasuryBalance ,"TreasuryBalanceTreasuryBalance");
        
        // this.addForm.controls['currency'].patchValue(e.currencyName)
        this.addForm.controls['currencyId'].patchValue(e.currencyId)
        
        this.getAccountCurrencyRate(this.addForm.controls['currencyId'].value as number, id);
        this.addForm.controls['currentBalance'].patchValue(this.TreasuryBalance)

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
    this.getAllPayMethodsDropdown(this.addForm.controls['paymentHubDetails'].value, id)
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
    // this.journalEntryLinesFormArray.controls['paymentMethodType']

    return paymentMethod ? paymentMethod.name : '';
  }
  getPaidName(id: number) {
    // this.paidByDetails.forEach((e: any) => {
    //   if (e.id == id) {
    //     this.paidName = e.name
    //   }
    // });
  }
  // getlabole(id:number){
  //   this.paidByDetails.forEach((e:any)=>{
  //     if(e.id==id){
  //       console.log(e ,"111111111111");
  //       return e.name
  //     }
  //   })
  // }
  // getLabel(journal:FormGroup , id: number) {
  //   if(journal.controls['paidBy'].value == this.SharedJournalEnums.paiedDropDown.customer ){
  //     this.customerDropDown.forEach((e:any)=>{
  //       if(e.id==id){
  //         return e.name
  //       }
  //     })
  //   }else if(journal.controls['paidBy'].value == this.SharedJournalEnums.paiedDropDown.vendor ){
  //     this.vendorDropDown.forEach((e:any)=>{
  //         if(e.id==id){
  //           return e.name
  //         }
  //     })

  //   }else if(journal.controls['paidBy'].value == this.SharedJournalEnums.paiedDropDown.other ){
  //     this.other.forEach((e:any)=>{
  //       if(e.id==id){
  //         return e.name
  //       }
  //   })
  //   }
  //   console.log(journal.controls['paidBy'].value );
  //   console.log(id ,"2222");

  // }
  // getLabelPayment(journal: FormGroup, id: number) {
  //  journal.controls['paymentMethodId'].value;
  //   this.paymentMethod.find((ele)=>{
  //     if(ele.id==id){
  //       console.log(ele.name);
  //       return ele.name
  //     }
  //   })
  //    }
  getLabelPayment(journalLine: any, paymentMethodId: any): string {

    if(this.selectedBank){
      const selectedPayment = this.paymentMethod.find(method => method.id === paymentMethodId);
      console.log("00000");
      journalLine.get('paymentMethodName')?.setValue(selectedPayment.name);

      return selectedPayment ? selectedPayment.name : '';
      
    }else{
      const selectedPayment = this.AllTreasuriesPayMethod.find(method => method.id === paymentMethodId);
      console.log("00000");
      journalLine.get('paymentMethodName')?.setValue(selectedPayment.name);
      return selectedPayment ? selectedPayment.name : '';
    }
   
  }
  getLabel(journal: FormGroup, id: number): string | undefined {
    const paidByValue = journal.controls['paidBy'].value;

    if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e: any) => e.id === id);
      return customer ? customer.name : '';
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e: any) => e.id === id);
      return vendor ? vendor.name : '';
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.other) {
      const other = this.other.find((e: any) => e.id === id);
      return other ? other.name : '';
    }

    return '';
  }
  handleButtonClick(journalLine: any): void {
    if(this.selectedBank){
      const paymentMethodId = journalLine.controls['paymentMethodId'].value;
      const selectedPayment = this.paymentMethod.find(method => method.id === paymentMethodId);
  
      if (selectedPayment) {
        journalLine.get('paymentMethodType')?.setValue(selectedPayment.paymentMethodType);
        const paymentMethodType = selectedPayment.paymentMethodType;
        this.openDialog(journalLine.value, selectedPayment, journalLine, journalLine.get('amount').value);
      }
    }else {
     
      
    }
   
  }
  setType(journalLine:any){
    const paymentMethodId = journalLine.controls['paymentMethodId'].value;
    const TreasuriesPayMethod  = this.AllTreasuriesPayMethod.find(method => method.id === paymentMethodId);
    journalLine.get('paymentMethodType')?.setValue(TreasuriesPayMethod.paymentMethodType);
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
    // if (!this.formsService.validForm(this.journalEntryLinesFormArray && this.addForm, false)) return;

    // const formattedChequeDueDate = this.formatDate(this.addForm.controls['chequeDueDate'].value, 'yyyy-MM-dd');
    // const formattedJournalDate = this.formatDate(this.addForm.controls['journalDate'].value, 'yyyy-MM-dd');

    // Update the form controls with the formatted dates if necessary
    // this.addForm.controls['chequeDueDate'].setValue(formattedChequeDueDate);
    // this.addForm.controls['journalDate'].setValue(formattedJournalDate);

    // Now you can proceed with saving the form data
    console.log(this.addForm.value, "00000000");
    this.FinanceService.addPaymentIn(this.addForm.value)
  }
  formatDate(date: string, format: string): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(date, format) || '';
  }
  deleteLine(index: number) {
    this.journalEntryLinesFormArray.removeAt(index);
    this.calculateTotalAmount()
  }
  calculateTotalAmount() {
    this.totalAmount = this.journalEntryLinesFormArray.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('amount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalAmount = this.journalEntryLinesFormArray.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('amount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.calculateTotalLocalAmount()
  }
  calculateTotalLocalAmount() {
    let total = 0;

    this.journalEntryLinesFormArray.controls.forEach((journalLine: any) => {
      const amount = journalLine.controls['amount'].value || 0;
      const rate = this.addForm.controls['rate'].value;
      if(rate){
        total += amount * rate;
      } 
    });
    this.addForm.controls['totalReceivedAmount'].patchValue(total)

    return total;
  }
  getAccountCurrencyRate(accountCurrency: number, currentJournalId: number) {
    this.currencyService.getAccountCurrencyRate(
      accountCurrency,
      this.currentUserService.getCurrency()
    );
  }
  getAllPayMethodsDropdown(BankId: number, BankAccountId: number) {
    this.FinanceService.GetAllPayMethodsDropdown(BankId, BankAccountId)
  }
  getGlAccount(index: number, id: number) {
    const journalLine:any = this.journalEntryLinesFormArray.at(index);
    const paidByValue = journalLine.controls['paidBy'].value;
    if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e) => e.id === id);
      if (customer) {
        journalLine.get('glAccountname')?.setValue(customer.accountName);

      }
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e) => e.id === id);
      if (vendor) {
        journalLine.get('glAccountname')?.setValue(vendor.accountName);

      }
    }


  }
  // getGlAccountName(index: number, id: number) {
  //   const journalLine:any = this.journalEntryLinesFormArray.at(index);

  //   const paidByValue = journalLine.controls['paidBy'].value;

   
  //   if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
  //     this.customerDropDown.find((e) => {
  //       if (e.id == id) {
  //         const account = e.accountName
  //         console.log(account,"accountaccount");

  //         return account
  //       }

  //     })
      
  //   } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
  //     this.vendorDropDown.find((e) => {
  //       if (e.id == id) {
  //         const account = e.accountName
  //         console.log(account,"accountaccount");
          
  //         return account
  //       }

  //     })
    
  //   } 

  // }
  getGlAccountName(index: number, id: number): string {
    const journalLine: any = this.journalEntryLinesFormArray.at(index);
    const paidByValue = journalLine.controls['paidBy'].value;
  
    if (paidByValue === this.SharedJournalEnums.paiedDropDown.customer) {
      const customer = this.customerDropDown.find((e) => e.id === id);
      if (customer) {
        const account = customer.accountName;
        console.log(account, "customer account");
        return account;
      }
    } else if (paidByValue === this.SharedJournalEnums.paiedDropDown.vendor) {
      const vendor = this.vendorDropDown.find((e) => e.id === id);
      if (vendor) {
        const account = vendor.accountName;
        console.log(account, "vendor account");
        return account;
      }
    }
  
    // Return an empty string if no match is found or if the conditions aren't met
    return '';
  }
  getAllTreasuriesPaymentMethodsDropdown(){
    this.FinanceService.GetAllTreasuriesPaymentMethodsDropdown();
    
  }
  getTreasuryBalance(id:number){
    this.FinanceService.GetTreasuryBalance(id);
  }
  getAccountBalance(id:number){
    this.FinanceService.GetAccountBalance(id);
  }
}
