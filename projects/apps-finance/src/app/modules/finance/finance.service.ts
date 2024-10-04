import { Injectable } from '@angular/core';
import { FinanceProxyService } from './finance-proxy.service';
import { HttpService, LanguageService, LoaderService, PageInfo, PageInfoResult, PaginationVm, RouterService, ToasterService } from 'shared-lib';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TreasureDefinitionDto } from './models/treasureDefinitionsDto';
import { AccountDto, AddPaymentMethodDto, AddPaymentTermDto, AddTreasuryDto, CurrencyRateDto, DropDownDto, EditTreasuryDto, GetAllPaymentInDto, GetTreasuryDtoById, PaymentMethodDto, PaymentTermDto } from './models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BankDefinitionDto } from './models/BankDefinitionDto';
import { HttpClient } from '@angular/common/http';
import { AddBankDto } from './models/addBankDto';
import { UserPermission } from './models/user-permission';
import { bankByID } from './models/getBankByID';
import { GetPaymentTermById } from './models/get-payment-term-by-id-dto';
import { GetPaymentMethodByIdDto } from './models/get-payment-method-by-id-dto';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private financeProxy : FinanceProxyService , private toasterService : ToasterService , private languageService : LanguageService , private loaderService : LoaderService, private http : HttpClient , private routerService : RouterService) { }
  sendTreasuryDataSource  = new BehaviorSubject<TreasureDefinitionDto[]>([])
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public treasureDefinitions = new BehaviorSubject<AddTreasuryDto>({} as AddTreasuryDto);
  public getTreasureDefinitionsByID = new BehaviorSubject<GetTreasuryDtoById>({} as GetTreasuryDtoById);
  public exportedTreasuryListDataSource = new BehaviorSubject<TreasureDefinitionDto []>([]);
  public confirmSendTreasuryData = new BehaviorSubject<boolean>(false);
  public sendBankDataSource = new BehaviorSubject<BankDefinitionDto[]>([])
  public exportedBankListDataSource = new BehaviorSubject<BankDefinitionDto []>([]);
  public sendBankDefinition = new BehaviorSubject<AddBankDto>({} as AddBankDto)
  public getUsersPermissionData = new BehaviorSubject<UserPermission[]>([])
  public sendBankByID = new BehaviorSubject<bankByID>({} as bankByID)
  public paymentTermDataSource = new BehaviorSubject<PaymentTermDto[]>([])
  public exportedpaymentTermListDataSource = new BehaviorSubject<PaymentTermDto[]>([]);
  public sendPaymentTermByID = new BehaviorSubject<GetPaymentTermById>({} as GetPaymentTermById)
  public paymentMethodDataSource = new BehaviorSubject<PaymentMethodDto[]>([])
  public exportedpaymentMethodListDataSource = new BehaviorSubject<PaymentMethodDto[]>([]);
  public sendPaymentMethodByID = new BehaviorSubject<GetPaymentMethodByIdDto>({} as GetPaymentMethodByIdDto)
  public paymentInDataSource = new BehaviorSubject<GetAllPaymentInDto[]>([])

  public exportedpaymentinListDataSource = new BehaviorSubject<GetAllPaymentInDto[]>([]);

  public sendTaxDropDownDataSource = new BehaviorSubject<DropDownDto[]>([]);
  public paymentSaved = new BehaviorSubject<number>(0);

  public getTreasuryDropDownData = new BehaviorSubject<any>([])
  public getBankDropDownData = new BehaviorSubject<any>([])
  public getCustomerDropdownData = new BehaviorSubject<any>([])
  public getVendorDropdownData = new BehaviorSubject<any>([])
  public AllPayMethodsDropdown = new BehaviorSubject<any>([])
  public AllTreasuriesPayMethodsDropdown = new BehaviorSubject<any>([])
  public AccountBalance = new BehaviorSubject<number>(0)
  public TreasuryBalance = new BehaviorSubject<number>(0)
  public childrenAccountDataSource = new BehaviorSubject<AccountDto[]>([]);
  public childrenAccountList = this.childrenAccountDataSource.asObservable();
  public childrenAccountPageInfo = new BehaviorSubject<PageInfoResult>({});
  private accountCurrencyRateDataSource = new BehaviorSubject<CurrencyRateDto>({rate:0});





  getVendorDropdownDataObservable = this.getVendorDropdownData.asObservable()
  getCustomerDropdownDataObservable = this.getCustomerDropdownData.asObservable()
  getBankDropDownDataObservable = this.getBankDropDownData.asObservable()
  getTreasuryDropDownDataObservable = this.getTreasuryDropDownData.asObservable()
  sendTreasuryDataSourceObservable = this.sendTreasuryDataSource.asObservable()
  addTreasureDefinitionsObservable = this.treasureDefinitions.asObservable()
  getTreasureDefinitionsByIDObservable = this.getTreasureDefinitionsByID.asObservable()
  exportedTreasuryListDataSourceObservable = this.exportedTreasuryListDataSource.asObservable()
  confirmSendTreasuryDataObservable = this.confirmSendTreasuryData.asObservable()
  sendBankDataSourceObservable = this.sendBankDataSource.asObservable()
  exportedBankListDataSourceObservable = this.exportedBankListDataSource.asObservable()
  sendBankDefinitionObservable = this.sendBankDefinition.asObservable()
  getUsersPermissionDataObservable = this.getUsersPermissionData.asObservable()
  sendBankByIDObservable = this.sendBankByID.asObservable()
  paymentTermDataSourceObservable = this.paymentTermDataSource.asObservable()
  exportedPaymentTermDataSourceObservable = this.exportedpaymentTermListDataSource.asObservable()
  sendPaymentTermByIDObservable = this.sendPaymentTermByID.asObservable()
  paymentMethodDataSourceObservable = this.paymentMethodDataSource.asObservable()
  exportedPaymentMethodDataSourceObservable = this.exportedpaymentMethodListDataSource.asObservable()
  sendPaymentMethodByIDObservable = this.sendPaymentMethodByID.asObservable()
  AllPayMethodsDropdownObservable = this.AllPayMethodsDropdown.asObservable()
  AllTreasuriesPayMethodsDropdownObservable = this.AllTreasuriesPayMethodsDropdown.asObservable()
  AccountBalanceObservable = this.AccountBalance.asObservable()
  TreasuryBalanceObservable = this.TreasuryBalance.asObservable()
  public accountCurrencyRate = this.accountCurrencyRateDataSource.asObservable();
  paymentInDataSourceObservable = this.paymentInDataSource.asObservable()
  exportedPaymentinDataSourceObservable = this.exportedpaymentinListDataSource.asObservable()

  taxDropDowmSourceObservable = this.sendTaxDropDownDataSource.asObservable()




  private bankAccountDeleted = new BehaviorSubject<boolean>(false);
  public bankAccountDeletedObser = this.bankAccountDeleted.asObservable();



  getTreasureDefinitions(quieries: string, pageInfo: PageInfo)  {
    this.financeProxy.getTreasureDefinitions(quieries, pageInfo).subscribe((response) => {
     this.sendTreasuryDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }
  
  getTreasureDefinitionsByIdData(id : number)  {
   return this.financeProxy.getTreasureDefinitionsById(id)
  }
  getTreasuryDefinitionsView(id : number)  {
    return this.financeProxy.getTreasuryDefinitionsView(id)
   }
 


  EditTreasureDefinitionsById(model: EditTreasuryDto, dialogRef: DynamicDialogRef)  {
    this.loaderService.show();

    this.financeProxy.EditTreasureDefinitionsById(model).subscribe( {
      next: (res) => {

        this.toasterService.showSuccess(
          this.languageService.transalte('editTreasury.success'),
          this.languageService.transalte('editTreasury.edit')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  
  }
  addTreasureDefinitions(model: AddTreasuryDto, dialogRef: DynamicDialogRef) {
    this.loaderService.show();
    this.financeProxy.addTreasureDefinitions(model).subscribe({
      next: (res) => {

        this.toasterService.showSuccess(
          this.languageService.transalte('addTreasury.success'),
          this.languageService.transalte('addTreasury.add')
        );
        this.loaderService.hide();
        dialogRef.close(res);
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  }


  async deleteTreasury(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.financeProxy.deleteTreasury(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteTreasury.success'),
            this.languageService.transalte('deleteTreasury.delete')
          );
          this.loaderService.hide();
          const currentCostCenter = this.sendTreasuryDataSource.getValue();
          const updatedCostCenter = currentCostCenter.filter((c) => c.id !== id);
          this.sendTreasuryDataSource.next(updatedCostCenter);
        },
        
      });
    }
  }
  async deleteBank(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.financeProxy.deleteBank(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteBank.success'),
            this.languageService.transalte('deleteBank.delete')
          );
          this.loaderService.hide();
          const currentCostCenter = this.sendBankDataSource.getValue();
          const updatedCostCenter = currentCostCenter.filter((c : any) => c.id !== id);
          this.sendBankDataSource.next(updatedCostCenter);
        },
        
      });
    }
  }
  async confirmSendTreasury() {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
   this.confirmSendTreasuryData.next(true)
    }
  }

  getBranchLookup()  {
   return this.financeProxy.getBranchLookup()
  }

  getChildrenAccountsDropDownLookup() {
    return this.financeProxy.getChildrenAccountsDropDownLookup()

  }
  GetAccountOpeningBalance(id : number) {
    return this.financeProxy.GetAccountOpeningBalance(id)

  }


  exportsTreasuryList(searchTerm:string | undefined) {
    this.financeProxy.exportsTreasuryList(searchTerm).subscribe({
      next: (res) => {
         this.exportedTreasuryListDataSource.next(res);
      },
    });
  }

  getBankDefinitions(quieries: string, pageInfo: PageInfo)  {
    this.financeProxy.getBankDefinitions(quieries, pageInfo).subscribe((response) => {
     this.sendBankDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }
  addBankDefinition(obj:AddBankDto) {
    this.loaderService.show();

    this.financeProxy.addBankDefinition(obj).subscribe( {
      next: (res) => {

        this.toasterService.showSuccess(
          this.languageService.transalte('addBank.success'),
          this.languageService.transalte('addBank.add')
        );
        this.loaderService.hide();
        this.routerService.navigateTo('/masterdata/bank-definition')
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  
  }
  
  editBankDefinition(obj : bankByID) {
    this.financeProxy.editBankDefinition(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('editBank.success'),
          this.languageService.transalte('editBank.edit')
        );
        this.routerService.navigateTo('/masterdata/bank-definition')
        
      }
    })
  }
  getBankDefinitionByID(id : number) {
    this.financeProxy.getBankDefinitionByID(id).subscribe(res=>{
      if(res) {
       this.sendBankByID.next(res)
        
      }
    })
  }

  async deleteBankAccount(id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.loaderService.show();

      this.financeProxy.deleteBankAccount(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('deleteBank.success'),
            this.languageService.transalte('deleteBank.delete')
          );
          this.loaderService.hide();
          this.bankAccountDeleted.next(res);
        },
        error: () => {
          this.loaderService.hide();
          this.toasterService.showError(
            this.languageService.transalte('Error'),
            this.languageService.transalte('DeleteError')
          );
        },
      });
    }
  }

  getUserPermissionLookupData() {
    this.financeProxy.getUserPermissionLookupData().subscribe(res=>{
      this.getUsersPermissionData.next(res)
    })
  }
  exportsBankList(searchTerm:string | undefined) {
    this.financeProxy.exportsBankList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedBankListDataSource.next(res);
      },
    });
  }

  getAllPaymentTerm(quieries: string, pageInfo: PageInfo)  {
    this.financeProxy.getAllPymentTerm(quieries, pageInfo).subscribe((response) => {
     this.paymentTermDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }

  exportsPaymentTermList(searchTerm:string | undefined) {
    this.financeProxy.exportsPaymentTermList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedpaymentTermListDataSource.next(res);
      },
    });
  }

  async deletePaymentTerm(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.financeProxy.deletePaymentTerm(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('paymentterm.success'),
            this.languageService.transalte('paymentterm.deleted')
          );
          this.loaderService.hide();
          const currentPaymentTerm = this.paymentTermDataSource.getValue();
          const updatedcurrentPaymentTerm = currentPaymentTerm.filter((c : any) => c.id !== id);
          this.paymentTermDataSource.next(updatedcurrentPaymentTerm);
        },
        
      });
    }
  }
  addPaymentTerm(obj:AddPaymentTermDto) {
    this.loaderService.show();

    this.financeProxy.addPaymentTerm(obj).subscribe( {
      next: (res) => {

        this.toasterService.showSuccess(
          this.languageService.transalte('add-paymentterm.success'),
          this.languageService.transalte('add-paymentterm.add')
        );
        this.loaderService.hide();
        this.routerService.navigateTo('/masterdata/paymentterm')
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  
  }
  
  
  getPaymentTermByID(id : number) {
    this.financeProxy.getPaymentTermByID(id).subscribe(res=>{
      if(res) {
       this.sendPaymentTermByID.next(res)
        
      }
    })
  }
  editPaymentTerm(obj : any) {
    this.financeProxy.editPaymentTerm(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('add-paymentterm.success'),
          this.languageService.transalte('add-paymentterm.edit')
        );
        this.routerService.navigateTo('/masterdata/paymentterm')
        
      }
    })
  }
  getAllPaymentMethod(quieries: string, pageInfo: PageInfo)  {
    this.financeProxy.getAllPymentMethod(quieries, pageInfo).subscribe((response) => {
     this.paymentMethodDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }

  exportsPaymentMethodList(searchTerm:string | undefined) {
    this.financeProxy.exportsPaymentMethodList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedpaymentMethodListDataSource.next(res);
      },
    });
  }

  async deletePaymentMethod(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.financeProxy.deletePaymentMethod(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('delete')
          );
          this.loaderService.hide();
          const currentPaymentMethod = this.paymentMethodDataSource.getValue();
          const updatedcurrentPaymentMethod = currentPaymentMethod.filter((c : any) => c.id !== id);
          this.paymentMethodDataSource.next(updatedcurrentPaymentMethod);
        },
        
      });
    }
  }

  BankAccountDropDown(id: number) {
    return this.financeProxy.BankAccountDropDown(id)

  }
  BankDropDown() {
    return this.financeProxy.BankDropDown()
  }

  bankDropDown() {
    this.financeProxy.BankDropDown().subscribe((res) => {
      if (res) {
        this.getBankDropDownData.next(res);
      }
    });
  }

  treasuryDropDown() {
    this.financeProxy.treasuryDropDown().subscribe((res) => {
      if (res) {
        this.getTreasuryDropDownData.next(res);
      }
    });
  }
  customerDropdown() {
    this.financeProxy.CustomerDropdown().subscribe((res) => {
      if (res) {
        this.getCustomerDropdownData.next(res);
      }
    });
  }
  vendorDropdown() {
    this.financeProxy.VendorDropdown().subscribe((res) => {
      if (res) {
        this.getVendorDropdownData.next(res);
      }
    });
  }
  
  addPaymentMethod(obj:AddPaymentMethodDto) {
    this.loaderService.show();

    this.financeProxy.addPaymentMethod(obj).subscribe( {
      next: (res) => {

        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('add-paymentMethod.add')
        );
        this.loaderService.hide();
        this.routerService.navigateTo('/masterdata/payment-method')
      },
      error: (err) => {
        this.loaderService.hide();
      },
    });
  
  }
  
  
  getPaymentMethodByID(id : number) {
    this.financeProxy.getPaymentMethodByID(id).subscribe(res=>{
      if(res) {
       this.sendPaymentMethodByID.next(res)
        
      }
    })
  }
  editPaymentMethod(obj : any) {
    this.financeProxy.editPaymentMethod(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('add-paymentMethod.edit')
        );
        this.routerService.navigateTo('/masterdata/payment-method')
        
      }
    })
  }
  addPaymentIn(obj:AddPaymentTermDto) {
    this.financeProxy.addPaymentIn(obj).subscribe({
      
      next:(res:any)=> {
        this.toasterService.showSuccess(
          this.languageService.transalte('PaymentIn.Success'),
          this.languageService.transalte('PaymentIn.PaymentInAddedSuccessfully')

        );      
        this.paymentSaved.next(res)  
      },
      error:(error)=>{
        this.toasterService.showError(
          this.languageService.transalte('PaymentIn.Error'),
          this.languageService.transalte('PaymentIn.addedError')
        ); 
      }
    })
  }
  getAllPayMethodsDropdown(BankId:number ,BankAccountId: number ) {
    this.financeProxy.GetAllPayMethodsDropdown(BankId , BankAccountId).subscribe(res=>{
      if(res) {
       this.AllPayMethodsDropdown.next(res)
        
      }
    })
  }
  GetAllTreasuriesPaymentMethodsDropdown() {
    this.financeProxy.GetAllTreasuriesPaymentMethodsDropdown().subscribe(res=>{
      if(res) {
       this.AllTreasuriesPayMethodsDropdown.next(res)
        
      }
    })
  }
  GetTreasuryBalance(id:number){
    this.financeProxy.GetTreasuryBalance(id).subscribe(res=>{
      if(res) {
        this.TreasuryBalance.next(res)        
      }
    })
  }
  GetAccountBalance(id:number){
    this.financeProxy.GetAccountBalance(id).subscribe(res=>{
      if(res) {
       this.AccountBalance.next(res)
      }
    })
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo) {
    return this.financeProxy.getAccountsHasNoChildren(quieries, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountsHasNoChildrenNew(quieries: string, pageInfo: PageInfo) {
    this.financeProxy.getAccountsHasNoChildrenNew(quieries, pageInfo).subscribe((res) => {
      this.childrenAccountDataSource.next(res.result);
      this.childrenAccountPageInfo.next(res.pageInfoResult);
    });
  }
  getAccountCurrencyRate(currentCurrency:number,accountCurrency:number){
    this.financeProxy.getAccountCurrencyRate(currentCurrency,accountCurrency).subscribe((response) => {
      this.accountCurrencyRateDataSource.next(response);
    });
  }
  getAllPaymentIn(quieries: string, pageInfo: PageInfo)  {
    this.financeProxy.getAllPymentIn(quieries, pageInfo).subscribe((response) => {
     this.paymentInDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }


  async deletePaymentIn(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.financeProxy.deletePaymentIn(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('payment-in.delete')
          );
          this.loaderService.hide();
          const currentPaymentIn = this.paymentInDataSource.getValue();
          const updatedcurrentPaymentIn = currentPaymentIn.filter((c : any) => c.id !== id);
          this.paymentInDataSource.next(updatedcurrentPaymentIn);
        },
        
      });
    }
  }



  getTaxDropDown() {
    this.financeProxy.getTaxDropDown().subscribe({
      next: (res : any) => {
         this.sendTaxDropDownDataSource.next(res);
      },
    });
  }
  postPaymentIn(id:number) {
    this.financeProxy.postPaymentIn(id).subscribe({
      
      next:(res:any)=> {
        this.toasterService.showSuccess(
          this.languageService.transalte('PaymentIn.Success'),
          this.languageService.transalte('PaymentIn.PaymentInPostedSuccessfully')

        );      
        this.paymentSaved.next(res)  
      },
      error:(error)=>{
        this.toasterService.showError(
          this.languageService.transalte('PaymentIn.Error'),
          this.languageService.transalte('PaymentIn.postedError')
        ); 
      }
    })
  }

  viewBank(id : number)  {
    return this.financeProxy.viewBank(id)
   }

   viewPaymentTerm(id : number)  {
    return this.financeProxy.viewPaymentTerm(id)
   }
}
