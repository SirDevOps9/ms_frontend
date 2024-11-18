import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

import { ToasterService, LanguageService, RouterService, LoaderService, FormsService, PageInfo, PageInfoResult } from 'shared-lib';
import { FormGroup } from '@angular/forms';
import { TransactionsProxyService } from './transactions-proxy.service';
import { AddStockIn, StockInDetail } from './models/addStockIn';
import { StockInDto, OperationalStockIn, LatestItems, GetWarehouseList, StockOutDto } from './models';

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
  public sendlatestItemsList = new BehaviorSubject<LatestItems[]>([]);
  public stockInByIdData = new BehaviorSubject<StockInDto>({} as StockInDto);
  sendItemBarcode = new BehaviorSubject<StockInDetail>({} as StockInDetail);
  wareHousesDropDownLookup = new BehaviorSubject<GetWarehouseList[]>([]);


  public stockInDataViewSource = new BehaviorSubject<StockInDto[]>([]);

  stockInDataViewSourceeObservable = this.stockInDataViewSource.asObservable();

  sendStockInDataSourcesObs = this.sendStockInDataSources.asObservable();
  exportedStockInDataSourceObs = this.exportedStockInDataSource.asObservable();
  public sendAddStockIn$ = this.sendAddStockIn.asObservable();
  public sendOperationalTagDropDown$ = this.sendOperationalTagDropDown.asObservable();
  public sendlatestItemsList$ = this.sendlatestItemsList.asObservable();
  public sendItemBarcode$ = this.sendItemBarcode.asObservable();
  public wareHousesDropDownLookup$ = this.wareHousesDropDownLookup.asObservable();

  stockInByIdData$ = this.stockInByIdData.asObservable();



  constructor(
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private loaderService: LoaderService,
    private formsService:FormsService,
    private transactionsProxy  : TransactionsProxyService
  ) {}

  getStockIn(quieries: string, pageInfo: PageInfo) {
    this.loaderService.show();
    this.transactionsProxy.getStockIn(quieries, pageInfo).subscribe(
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
    this.transactionsProxy.exportsStockInList(searchTerm).subscribe({
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
        await firstValueFrom(this.transactionsProxy.deleteStockIn(id));

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
    this.transactionsProxy.getAllStockIn(quieries, pageInfo).subscribe((response) => {
      this.stockInDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  exportStockInList(searchTerm?: string ,SortBy?:number,SortColumn?:string) {
    this.transactionsProxy.exportStockInList(searchTerm ,SortBy,SortColumn).subscribe({
      next: (res: any) => {
        this.exportStockInListDataSource.next(res);
      },
    });
  }

  addStockIn(obj: AddStockIn,stockinForm : FormGroup) {
    this.transactionsProxy.addStockIn(obj).subscribe({
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

  editStockIn(obj: AddStockIn, stockinForm: FormGroup) {
    this.transactionsProxy.editStockIn(obj).subscribe({
      next: (res) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('stockIn.success'),
          this.languageService.transalte('stockIn.stockEdit')
        );
        this.router.navigateTo('/transactions/stock-in');
        this.loaderService.hide();
      },
      error: (err) => {
        this.formsService.setFormValidationErrors(stockinForm, err);
        this.loaderService.hide();
      },
    });
  }


  OperationalTagDropDown() {
    return this.transactionsProxy.operationTagDropdown().subscribe((res) => {
      this.sendOperationalTagDropDown.next(res);
    });
  }

  getItemBarcodeForItem(barcode : string) {
    this.transactionsProxy.getItemBarcodeForItem(barcode).subscribe(res=>{
      this.sendItemBarcode.next(res)

    })

  }


  getLatestItemsList() {
    return this.transactionsProxy.getLatestItemsList().subscribe((res) => {
      this.sendlatestItemsList.next(res);
    });
  }



  async deleteStockInLine(id: number) {
    try {
      const confirmed = await this.toasterService.showConfirm(
        this.languageService.transalte('ConfirmButtonTexttodelete')
      );

      if (confirmed) {
        await firstValueFrom(this.transactionsProxy.deleteStockInLine(id));

        // Show success message
        this.toasterService.showSuccess(
          this.languageService.transalte('stockIn.success'),
          this.languageService.transalte('stockIn.deleteStockInLine')
        );

        const currentData = this.stockInByIdData.getValue();

        if (currentData && currentData.stockInDetails) {
          const updatedStockInDetails = currentData.stockInDetails.filter(
            (detail: any) => detail.id !== id
          );

          const updatedData = {
            ...currentData,
            stockInDetails: updatedStockInDetails,
          };

          this.stockInByIdData.next(updatedData);
        }
      }
    } catch (error) {}
  }


  getStockInById(id: number) {
    this.transactionsProxy.getStockInById(id).subscribe((response: any) => {
      this.stockInByIdData.next(response);
    });
  }

  getWareHousesDropDown() {
    return this.transactionsProxy.getWareHousesDropDown().subscribe((res) => {
      this.wareHousesDropDownLookup.next(res);
    });
  }
  getViwStockInById(id:number) {
    this.transactionsProxy.getByIdViewStockIn(id).subscribe((response:any) => {
      this.stockInDataViewSource.next(response);
    });
  }


}
