import { Injectable } from '@angular/core';
import { FinanceProxyService } from './finance-proxy.service';
import { HttpService, LanguageService, LoaderService, PageInfo, PageInfoResult, PaginationVm, RouterService, ToasterService } from 'shared-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreasureDefinitionDto } from './models/treasureDefinitionsDto';
import { AddPaymentTermDto, AddTreasuryDto, EditTreasuryDto, GetTreasuryDtoById, PaymentTermDto } from './models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BankDefinitionDto } from './models/BankDefinitionDto';
import { HttpClient } from '@angular/common/http';
import { AddBankDto } from './models/addBankDto';
import { UserPermission } from './models/user-permission';
import { bankByID } from './models/getBankByID';
import { GetPaymentTermById } from './models/get-payment-term-by-id-dto';

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



  getTreasureDefinitions(quieries: string, pageInfo: PageInfo)  {
    this.financeProxy.getTreasureDefinitions(quieries, pageInfo).subscribe((response) => {
     this.sendTreasuryDataSource.next(response.result)
     this.currentPageInfo.next(response.pageInfoResult)
    });
  }
  
  getTreasureDefinitionsByIdData(id : number)  {
   return this.financeProxy.getTreasureDefinitionsById(id)
  }


  EditTreasureDefinitionsById(model: EditTreasuryDto, dialogRef: DynamicDialogRef)  {
    this.loaderService.show();

    this.financeProxy.EditTreasureDefinitionsById(model).subscribe( {
      next: (res) => {

        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
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
          this.languageService.transalte('success'),
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
    this.financeProxy.addBankDefinition(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addBank.add')
        );
        this.routerService.navigateTo('/masterdata/bank-definition')
        
      }
    })
  }
  editBankDefinition(obj : bankByID) {
    this.financeProxy.editBankDefinition(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
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
  getUserPermissionLookupData() {
    this.financeProxy.getUserPermissionLookupData().subscribe(res=>{
      this.getUsersPermissionData.next(res)
    })
  }
  exportsBankList(searchTerm:string | undefined) {
    this.financeProxy.exportsBankList(searchTerm).subscribe({
      next: (res : any) => {
         this.exportedTreasuryListDataSource.next(res);
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
            this.languageService.transalte('deleteBank.success'),
            this.languageService.transalte('deleteBank.delete')
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
    this.financeProxy.addPaymentTerm(obj).subscribe(res=>{
      if(res) {
        this.toasterService.showSuccess(
          this.languageService.transalte('success'),
          this.languageService.transalte('addBank.add')
        );
        this.routerService.navigateTo('/masterdata/paymentterm')
        
      }
    })
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
          this.languageService.transalte('success'),
          this.languageService.transalte('editBank.edit')
        );
        this.routerService.navigateTo('/masterdata/paymentterm')
        
      }
    })
  }
}
