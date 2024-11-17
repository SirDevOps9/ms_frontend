import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { StockOutDto, StockInDto, OperationalStockIn, AddStockIn, StockInDetail } from '../items/models';
import { ToasterService, LanguageService, RouterService, LoaderService, FormsService, PageInfo, PageInfoResult } from 'shared-lib';
import { ItemsProxyService } from '../items/items-proxy.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  
  public stockInDataSource = new BehaviorSubject<StockOutDto[]>([]);
  stockInDataSourceeObservable = this.stockInDataSource.asObservable();
  public editstockInDataSource = new BehaviorSubject<StockOutDto[]>([]);
  public exportStockInListDataSource = new BehaviorSubject<StockInDto[]>([]);
  exportStockInListDataSourceObservable = this.exportStockInListDataSource.asObservable();
  sendStockInDataSources = new BehaviorSubject<StockInDto[]>([]);
  public exportedStockInDataSource = new BehaviorSubject<StockInDto[]>([]);
  editstockInDataSourceeObservable = this.editstockInDataSource.asObservable();
  public sendOperationalTagDropDown = new BehaviorSubject<OperationalStockIn[]>([]);
  public sendAddStockIn = new BehaviorSubject<AddStockIn>({} as AddStockIn);



  sendStockInDataSourcesObs = this.sendStockInDataSources.asObservable();
  exportedStockInDataSourceObs = this.exportedStockInDataSource.asObservable();
  public sendAddStockIn$ = this.sendAddStockIn.asObservable();
  sendItemBarcode = new BehaviorSubject<StockInDetail>({} as StockInDetail);
  public sendOperationalTagDropDown$ = this.sendOperationalTagDropDown.asObservable();



  constructor(
    private itemProxy: ItemsProxyService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private loaderService: LoaderService,
    private formsService:FormsService
  ) {}

  getStockIn(quieries: string, pageInfo: PageInfo) {
    this.loaderService.show();
    this.itemProxy.getStockIn(quieries, pageInfo).subscribe(
      (response) => {
        this.sendStockInDataSources.next(response.result);
        this.currentPageInfo.next(response.pageInfoResult);
        this.loaderService.hide();
      },
      (erorr) => {
        this.loaderService.hide();
      }
    );
  }
  exportsStockInList(searchTerm: string | undefined) {
    this.itemProxy.exportsStockInList(searchTerm).subscribe({
      next: (res: any) => {
        console.log(res);
        this.exportedStockInDataSource.next(res);
      },
    });
  }

  async deleteStockIn(id: number) {
    try {
      const confirmed = await this.toasterService.showConfirm(
        this.languageService.transalte('ConfirmButtonTexttodelete')
      );

      if (confirmed) {
        await firstValueFrom(this.itemProxy.deleteStockIn(id));

        // Show success message
        this.toasterService.showSuccess(
          this.languageService.transalte('transactions.success'),
          this.languageService.transalte('transactions.deleteStockIn')
        );

        // const currentCostCenter = this.sendStockInDataSources.getValue();
        // const updatedCostCenter = currentCostCenter.filter((c) => c.id !== id);
        // this.sendStockInDataSources.next(updatedCostCenter);
      }
    } catch (error) {

    }
  }
  getAllStockIn(quieries: string, pageInfo: PageInfo) {
    this.itemProxy.getAllStockIn(quieries, pageInfo).subscribe((response) => {
      this.stockInDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  exportStockInList(searchTerm?: string ,SortBy?:number,SortColumn?:string) {
    this.itemProxy.exportStockInList(searchTerm ,SortBy,SortColumn).subscribe({
      next: (res: any) => {
        this.exportStockInListDataSource.next(res);
      },
    });
  }

  addStockIn(obj: AddStockIn,stockinForm : FormGroup) {
    this.itemProxy.addStockIn(obj).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('stockIn.success'),
          this.languageService.transalte('stockIn.stockAdded')
        );
        this.router.navigateTo('/masterdata/stock-in');
        this.loaderService.hide();
      },
      error: (err) => {
        
        this.formsService.setFormValidationErrors(stockinForm, err);
        this.loaderService.hide();
      },
    });
  
  }

}
