import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { TranscationsProxyService } from './transcations-proxy.service';
import { BehaviorSubject, map } from 'rxjs';
import { AccountDto, AddPaymentMethodDto, AddPaymentTermDto, CurrencyRateDto, GetAllPaymentInDto, GetAllPaymentOutDto } from './models';
import { GetPaymentMethodByIdDto } from './models/get-payment-method-by-id-dto';

@Injectable({
  providedIn: 'root'
})
export class TranscationsService {

  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public paymentInDataSource = new BehaviorSubject<GetAllPaymentInDto[]>([])
  public exportedpaymentinListDataSource = new BehaviorSubject<GetAllPaymentInDto[]>([]);
  public sendPaymentMethodByID = new BehaviorSubject<GetPaymentMethodByIdDto>({} as GetPaymentMethodByIdDto)
  public getTreasuryDropDownData = new BehaviorSubject<any>([])
  public getBankDropDownData = new BehaviorSubject<any>([])
  public getCustomerDropdownData = new BehaviorSubject<any>([])
  public getVendorDropdownData = new BehaviorSubject<any>([])
  public AllPayMethodsDropdown = new BehaviorSubject<any>([])
  public AllTreasuriesPayMethodsDropdown = new BehaviorSubject<any>([])
  public AccountBalance = new BehaviorSubject<number|undefined>(0)
  public TreasuryBalance = new BehaviorSubject<number|undefined>(0)
  public childrenAccountDataSource = new BehaviorSubject<AccountDto[]>([]);
  public childrenAccountList = this.childrenAccountDataSource.asObservable();
  public childrenAccountPageInfo = new BehaviorSubject<PageInfoResult>({});
  public paymentDetails = new BehaviorSubject<any>({});
  private accountCurrencyRateDataSource = new BehaviorSubject<CurrencyRateDto>({rate:0});





  paymentDetailsnDataObservable = this.paymentDetails.asObservable()
  getVendorDropdownDataObservable = this.getVendorDropdownData.asObservable()
  getCustomerDropdownDataObservable = this.getCustomerDropdownData.asObservable()
  getBankDropDownDataObservable = this.getBankDropDownData.asObservable()
  getTreasuryDropDownDataObservable = this.getTreasuryDropDownData.asObservable()
  sendPaymentMethodByIDObservable = this.sendPaymentMethodByID.asObservable()
  AllPayMethodsDropdownObservable = this.AllPayMethodsDropdown.asObservable()
  AllTreasuriesPayMethodsDropdownObservable = this.AllTreasuriesPayMethodsDropdown.asObservable()
  AccountBalanceObservable = this.AccountBalance.asObservable()
  TreasuryBalanceObservable = this.TreasuryBalance.asObservable()
  accountCurrencyRate = this.accountCurrencyRateDataSource.asObservable();
  paymentInDataSourceObservable = this.paymentInDataSource.asObservable()
  exportedPaymentinDataSourceObservable = this.exportedpaymentinListDataSource.asObservable()


  public paymentOutDataSource = new BehaviorSubject<GetAllPaymentOutDto[]>([])
  public exportedpaymentOutListDataSource = new BehaviorSubject<GetAllPaymentOutDto[]>([]);
  paymentOutDataSourceObservable = this.paymentOutDataSource.asObservable()
  exportedPaymentOutDataSourceObservable = this.exportedpaymentOutListDataSource.asObservable()


  public paymentOutDetails = new BehaviorSubject<any>({});
  paymentOutDetailsDataObservable = this.paymentOutDetails.asObservable()

  public paymentOutCurrentPageInfo = new BehaviorSubject<PageInfoResult>({});


  constructor(private TranscationsProxy : TranscationsProxyService , private toasterService : ToasterService , private languageService : LanguageService , private loaderService : LoaderService, private http : HttpClient , private routerService : RouterService) { }
  
  BankAccountDropDown(id: number) {
    return this.TranscationsProxy.BankAccountDropDown(id)

  }
  BankDropDown() {
    return this.TranscationsProxy.BankDropDown()
  }

  bankDropDown() {
    this.TranscationsProxy.BankDropDown().subscribe((res) => {
      if (res) {
        this.getBankDropDownData.next(res);
      }
    });
  }

  treasuryDropDown() {
    this.TranscationsProxy.treasuryDropDown().subscribe((res) => {
      if (res) {
        this.getTreasuryDropDownData.next(res);
      }
    });
  }
  customerDropdown() {
    this.TranscationsProxy.CustomerDropdown().subscribe((res) => {
      if (res) {
        this.getCustomerDropdownData.next(res);
      }
    });
  }
  vendorDropdown() {
    this.TranscationsProxy.VendorDropdown().subscribe((res) => {
      if (res) {
        this.getVendorDropdownData.next(res);
      }
    });
  }
  
  addPaymentMethod(obj:AddPaymentMethodDto) {
    this.TranscationsProxy.addPaymentMethod(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('add-paymentMethod.add')
        );
        this.routerService.navigateTo('/masterdata/payment-method')
        
      }
    })
  }
  getPaymentMethodByID(id : number) {
    this.TranscationsProxy.getPaymentMethodByID(id).subscribe(res=>{
      if(res) {
       this.sendPaymentMethodByID.next(res)
        
      }
    })
  }
  editPaymentMethod(obj : any) {
    this.TranscationsProxy.editPaymentMethod(obj).subscribe(res=>{
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
    this.TranscationsProxy.addPaymentIn(obj).subscribe({
      
      next:(res)=> {
        this.toasterService.showSuccess(
          this.languageService.transalte('PaymentIn.Success'),
          this.languageService.transalte('PaymentIn.PaymentInAddedSuccessfully')
        );    
        this.routerService.navigateTo('/transcations/paymentin')
    
      },
      error:(error)=>{
        this.toasterService.showError(
          this.languageService.transalte('PaymentIn.Error'),
          this.languageService.transalte('PaymentIn.addedError')
        ); 
      }
    })
  }

  addPaymentOut(obj:AddPaymentTermDto) {
    this.TranscationsProxy.addPaymentOut(obj).subscribe({
      
      next:(res)=> {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('PaymentOut.add')
        );        
      },
      error:(error)=>{
        this.toasterService.showError(
          this.languageService.transalte('PaymentOut.Error'),
          this.languageService.transalte('PaymentOut.addedError')
        ); 
      }
    })
  }
  getAllPayMethodsDropdown(BankId:number ,BankAccountId: number ) {
    this.TranscationsProxy.GetAllPayMethodsDropdown(BankId , BankAccountId).subscribe(res=>{
      if(res) {
       this.AllPayMethodsDropdown.next(res)
        
      }
    })
  }
  GetAllTreasuriesPaymentMethodsDropdown() {
    this.TranscationsProxy.GetAllTreasuriesPaymentMethodsDropdown().subscribe(res=>{
      if(res) {
       this.AllTreasuriesPayMethodsDropdown.next(res)
        
      }
    })
  }
  GetTreasuryBalance(id:number){
    this.TranscationsProxy.GetTreasuryBalance(id).subscribe(res=>{
      if(res) {
        this.TreasuryBalance.next(res)        
      }
    })
  }
  GetAccountBalance(id:number){
    this.TranscationsProxy.GetAccountBalance(id).subscribe(res=>{
      if(res) {
       this.AccountBalance.next(res)
      }
    })
  }
  getAccountsHasNoChildren(quieries: string, pageInfo: PageInfo) {
    return this.TranscationsProxy.getAccountsHasNoChildren(quieries, pageInfo).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAccountsHasNoChildrenNew(quieries: string, pageInfo: PageInfo) {
    this.TranscationsProxy.getAccountsHasNoChildrenNew(quieries, pageInfo).subscribe((res) => {
      this.childrenAccountDataSource.next(res.result);
      this.childrenAccountPageInfo.next(res.pageInfoResult);
    });
  }
  getAccountCurrencyRate(currentCurrency:number,accountCurrency:number){
    this.TranscationsProxy.getAccountCurrencyRate(currentCurrency,accountCurrency).subscribe((response) => {
      this.accountCurrencyRateDataSource.next(response);
    });
  }
  getAllPaymentIn(quieries: string, pageInfo: PageInfo)  {
    this.TranscationsProxy.getAllPymentIn(quieries, pageInfo).subscribe((response) => {
     this.paymentInDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }

  exportsPaymentInList(searchTerm:string | undefined) {
    this.TranscationsProxy.exportsPaymentInList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedpaymentinListDataSource.next(res);
      },
    });
  }

  async deletePaymentIn(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.TranscationsProxy.deletePaymentIn(id).subscribe({
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
  getPaymentInById(id:number){
    this.TranscationsProxy.GetPaymentInById(id).subscribe(res=>{
      if(res) {
       this.paymentDetails.next(res)
      }
    })
  }
  
  editPaymentIn(obj : any) {
    this.TranscationsProxy.editPaymentIn(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('add-paymentMethod.edit')
        );
        this.routerService.navigateTo('/transcations/paymentin')
        
      }
    })
  }
  postPaymentIn(id:number) {
    this.TranscationsProxy.postPaymentIn(id).subscribe({
      next:(res:any)=> {
        this.toasterService.showSuccess(
          this.languageService.transalte('PaymentIn.Success'),
          this.languageService.transalte('PaymentIn.PaymentInPostedSuccessfully')
        );
        this.routerService.navigateTo('/transcations/paymentin')

      },
      error:(error)=>{
        this.toasterService.showError(
          this.languageService.transalte('PaymentIn.Error'),
          this.languageService.transalte('PaymentIn.postedError')
        );
      }
    })
  }  GetPaymentOutById(id:number){
    this.TranscationsProxy.GetPaymentOutById(id).subscribe(res=>{
      if(res) {
       this.paymentOutDetails.next(res)
      }
    })
  }
  
  editPaymentOut(obj : any) {
    this.TranscationsProxy.editPaymentOut(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('PaymentOut.edit')
        );
        this.routerService.navigateTo('/transcations/paymentout')
        
      }
    })
  }
  
  getAllPaymentOut(quieries: string, pageInfo: PageInfo)  {
    this.TranscationsProxy.getAllPymentOut(quieries, pageInfo).subscribe((response) => {
     this.paymentOutDataSource.next(response.result)
     this.paymentOutCurrentPageInfo.next(response.pageInfoResult)
    });
  }


  
  exportsPaymentOutList(searchTerm:string | undefined) {
    this.TranscationsProxy.exportsPaymentOutList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedpaymentOutListDataSource.next(res);
      },
    });
  }
  async deletePaymentOut(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.TranscationsProxy.deletePaymentOut(id).subscribe({
        next: (res) => {
          
          this.toasterService.showSuccess(
            this.languageService.transalte('success'),
            this.languageService.transalte('PaymentOut.delete')
          );
          this.loaderService.hide();
          const currentPaymentOut = this.paymentOutDataSource.getValue();
          const updatedcurrentPaymentOut = currentPaymentOut.filter((c : any) => c.id !== id);
          this.paymentOutDataSource.next(updatedcurrentPaymentOut);
        },
        
      });
    }
  }
}

