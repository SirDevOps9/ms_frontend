import { Injectable } from '@angular/core';
import { FinanceProxyService } from './finance-proxy.service';
import { LanguageService, LoaderService, PageInfo, PageInfoResult, PaginationVm, ToasterService } from 'shared-lib';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreasureDefinitionDto } from './models/treasureDefinitionsDto';
import { AddTreasuryDto, EditTreasuryDto, GetTreasuryDtoById } from './models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

  constructor(private financeProxy : FinanceProxyService , private toasterService : ToasterService , private languageService : LanguageService , private loaderService : LoaderService) { }
  sendTreasuryDataSource  = new BehaviorSubject<TreasureDefinitionDto[]>([])
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});
  public treasureDefinitions = new BehaviorSubject<AddTreasuryDto>({} as AddTreasuryDto);
  public getTreasureDefinitionsByID = new BehaviorSubject<GetTreasuryDtoById>({} as GetTreasuryDtoById);
  public exportedTreasuryListDataSource = new BehaviorSubject<TreasureDefinitionDto []>([]);
  public confirmSendTreasuryData = new BehaviorSubject<boolean>(false);


  sendTreasuryDataSourceObservable = this.sendTreasuryDataSource.asObservable()
  addTreasureDefinitionsObservable = this.treasureDefinitions.asObservable()
  getTreasureDefinitionsByIDObservable = this.getTreasureDefinitionsByID.asObservable()
  exportedTreasuryListDataSourceObservable = this.exportedTreasuryListDataSource.asObservable()
  confirmSendTreasuryDataObservable = this.confirmSendTreasuryData.asObservable()

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
}
