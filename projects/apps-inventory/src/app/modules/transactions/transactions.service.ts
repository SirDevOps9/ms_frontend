import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, map, throwError } from 'rxjs';

import {
  ToasterService,
  LanguageService,
  RouterService,
  LoaderService,
  FormsService,
  PageInfo,
  PageInfoResult,
} from 'shared-lib';
import { FormGroup } from '@angular/forms';
import { TransactionsProxyService } from './transactions-proxy.service';
import { AddStockIn, StockInDetail } from './models/addStockIn';
import {
  StockInDto,
  OperationalStockIn,
  LatestItems,
  GetWarehouseList,
  StockOutDto,
  AdvancedSearchDto,
  AddStockOutDto,
  itemDefinitionDto,
} from './models';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  public currentPageInfo = new BehaviorSubject<PageInfoResult>({});

  public stockInDataSource = new BehaviorSubject<StockOutDto[]>([]);
  public addedStockInData = new BehaviorSubject<AddStockIn>({} as AddStockIn);
  public updatedStockInData = new BehaviorSubject<AddStockIn>({} as AddStockIn);
  addedStockInData$ = this.addedStockInData.asObservable();
  updatedStockInData$ = this.updatedStockInData.asObservable();
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
  private itemsDataSource = new BehaviorSubject<AdvancedSearchDto[]>([]);
  public itemsList = this.itemsDataSource.asObservable();
  private itemsDataSourceForAdvanced = new BehaviorSubject<AdvancedSearchDto[]>([]);
  public itemsList$ = this.itemsDataSourceForAdvanced.asObservable();
  /////////////stock out ///////
  public stockOutDataSource = new BehaviorSubject<StockOutDto[]>([]);

  public stockOutDataSourceeObservable = this.stockOutDataSource.asObservable();
  public latestItemsListByWarehouse = new BehaviorSubject<LatestItems[]>([]);
  public latestItemsListByWarehouse$ = this.latestItemsListByWarehouse.asObservable();
  private itemsDataSourceByWarehouse = new BehaviorSubject<AdvancedSearchDto[]>([]);
  public itemsListByWarehouse = this.itemsDataSourceByWarehouse.asObservable();
  public stockOutByIdDataSource = new BehaviorSubject<StockOutDto[]>([]);
  public stockOutByIdDataSourceeObservable = this.stockOutByIdDataSource.asObservable();
  public perationalTagStockOutDropDown = new BehaviorSubject<OperationalStockIn[]>([]);
  public perationalTagStockOutDropDown$ = this.perationalTagStockOutDropDown.asObservable();
  public stockOutDataViewSource = new BehaviorSubject<StockOutDto[]>([]);
  public stockOutDataViewSourceeObservable = this.stockOutDataViewSource.asObservable();
  public exportedItemDefinitionListDataSource = new BehaviorSubject<itemDefinitionDto[]>([]);
  public exportStockOutListDataSource = new BehaviorSubject<StockOutDto[]>([]);
  public stockOutSaved = new BehaviorSubject<number | undefined>(0);

  exportStockOutListDataSourceObservable = this.exportStockOutListDataSource.asObservable();


  constructor(
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private router: RouterService,
    private loaderService: LoaderService,
    private formsService: FormsService,
    private transactionsProxy: TransactionsProxyService
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
    } catch (error) {}
  }
  getAllStockIn(quieries: string, pageInfo: PageInfo) {
    this.transactionsProxy.getAllStockIn(quieries, pageInfo).subscribe((response) => {
      this.stockInDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  exportStockInList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.transactionsProxy.exportStockInList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportStockInListDataSource.next(res);
      },
    });
  }

  addStockIn(obj: AddStockIn, stockinForm: FormGroup) {
    this.transactionsProxy
      .addStockIn(obj)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error('Bad Request Error:', error.error);
            this.toasterService.showError(
              this.languageService.transalte('Error'),
              this.languageService.transalte(error.error.message || 'Invalid request')
            );
          }
          // Re-throw the error so it can be handled by the `error` callback in subscribe
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res: any) => {
          this.loaderService.hide();

          this.toasterService.showSuccess(
            this.languageService.transalte('stockIn.success'),
            this.languageService.transalte('stockIn.stockAdded')
          );
          this.addedStockInData.next(res);

          // Navigate or perform additional actions
        },
        error: (error) => {
          this.loaderService.hide();
          if (error.messageCode != 4001) {
            this.toasterService.showError(
              this.languageService.transalte('Error'),
              this.languageService.transalte(error.message)
            );
          }
        },
      });
  }

  editStockIn(obj: AddStockIn, stockinForm: FormGroup) {
    this.transactionsProxy
      .editStockIn(obj)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error('Bad Request Error:', error.error);
            this.toasterService.showError(
              this.languageService.transalte('Error'),
              this.languageService.transalte(error.error.message || 'Invalid request')
            );
          }
          // Re-throw the error so it can be handled by the `error` callback in subscribe
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          this.loaderService.hide();

          this.toasterService.showSuccess(
            this.languageService.transalte('stockIn.success'),
            this.languageService.transalte('stockIn.stockEdit')
          );
          this.updatedStockInData.next(res);
          // this.router.navigateTo('/transactions/stock-in');
        },
        error: (error) => {
          this.loaderService.hide();
          if (error.messageCode != 4001) {
            this.toasterService.showError(
              this.languageService.transalte('Error'),
              this.languageService.transalte(error.message)
            );
          }
        },
      });
  }

  posteStockIn(id: number) {
    this.loaderService.show();

    this.transactionsProxy.posteStockIn(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('stockIn.success'),
          this.languageService.transalte('stockIn.stockAdded')
        );
        this.loaderService.hide();

        this.router.navigateTo('/transactions/stock-in');
      },
      error: (error) => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('stockIn.success'),
          this.languageService.transalte(error.message)
        );
      },
    });
  }

  OperationalTagDropDown() {
    return this.transactionsProxy.operationTagDropdown().subscribe({
      next: (res) => {
        this.sendOperationalTagDropDown.next(res);
      },
      error: (err) => {
        return;
      },
    });
  }

  getItemBarcodeForItem(barcode: string) {
    this.transactionsProxy.getItemBarcodeForItem(barcode).subscribe((res) => {
      this.sendItemBarcode.next(res);
    });
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
  getViwStockInById(id: number) {
    this.transactionsProxy.getByIdViewStockIn(id).subscribe((response: any) => {
      this.stockInDataViewSource.next(response);
    });
  }
  getItems(quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.transactionsProxy.getItems(quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSource.next(res.result);
      this.currentPageInfo.next(res.pageInfoResult);
    });
  }
  getItemsForAdvancedSearch(quieries: string, searchTerm: string, pageInfo: PageInfo) {
    this.transactionsProxy.getItems(quieries, searchTerm, pageInfo).subscribe((res) => {
      this.itemsDataSourceForAdvanced.next(res.result);
      this.currentPageInfo.next(res.pageInfoResult);
    });
  }
  ////////////////////stock out/////////////
  getByIdViewStockOut(id: number) {
    this.transactionsProxy.getByIdViewStockOut(id).subscribe((response: any) => {
      this.stockOutDataViewSource.next(response);
    });
  }
  operationTagStockOutDropdown() {
    return this.transactionsProxy.operationTagStockOutDropdown().subscribe({
      next: (res) => {
        this.perationalTagStockOutDropDown.next(res);
      },
      error: (err) => {
        return;
      },
    });
  }
  getLatestItemsListByWarehouse(SearchTerm: string, id: number) {
    return this.transactionsProxy.getLatestItemsListByWarehouse(SearchTerm, id).subscribe((res) => {
      this.latestItemsListByWarehouse.next(res);
    });
  }
  getItemsStockOutByWarehouse(queries: string, searchTerm: string, id: number, pageInfo: PageInfo) {
    this.transactionsProxy
      .getItemsStockOut(queries, searchTerm, id, pageInfo)
      .subscribe((res: any) => {
        // this.itemsDataSourceByWarehouse.next(res.result);
        this.itemsDataSourceByWarehouse.next(res.result);
        this.currentPageInfo.next(res.pageInfoResult);
      });
  }

  addStockOut(obj: AddStockOutDto, stockinForm: FormGroup) {
    this.loaderService.show();

    this.transactionsProxy.addStockOut(obj).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('messages.success'),
          this.languageService.transalte('stockOut.add')
        );
        this.loaderService.hide();
        this.stockOutSaved.next(res);

        // this.router.navigateTo('transactions/stock-out');
      },
      error: (err: any) => {
        this.loaderService.hide();
      },
    });
  }
  getItemByBarcodeStockOutQuery(barcode: string, warehouseId: number) {
    return this.transactionsProxy.GetItemByBarcodeStockOutQuery(barcode, warehouseId).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getStockOutById(id: number) {
    this.transactionsProxy.getByIdStockOut(id).subscribe((response: any) => {
      this.stockOutByIdDataSource.next(response);
    });
  }
  editStockOut(obj: any) {
    this.transactionsProxy.editStockOut(obj).subscribe({
      next: (res: any) => {
        this.editstockInDataSource.next(res);
        this.toasterService.showSuccess(
          this.languageService.transalte('messages.success'),
          this.languageService.transalte('messages.successfully')
        );
        this.router.navigateTo('transactions/stock-out');
      },
      error: (err: any) => {
        this.toasterService.showError(
          this.languageService.transalte('messages.error'),
          this.languageService.transalte('messages.noItemSelected')
        );
        this.loaderService.hide();
      },
    });
  }
  deleteRowStockOut(id: number) {
    return this.transactionsProxy.deleteRowStockOut(id).pipe(
      map((res) => {
        return res;
      })
    );
  }
  getAllStockOut(quieries: string, pageInfo: PageInfo) {
    this.transactionsProxy.getAllStockOut(quieries, pageInfo).subscribe((response) => {
      this.stockOutDataSource.next(response.result);
      this.currentPageInfo.next(response.pageInfoResult);
    });
  }

  async deleteStockOut(id: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {
      this.transactionsProxy.deleteStockOut(id).subscribe({
        next: (res) => {
          this.toasterService.showSuccess(
            this.languageService.transalte('transactions.success'),
            this.languageService.transalte('transactions.deleteStockOut')
          );

          this.getAllStockOut('', new PageInfo());
        },
      });
    }
  }
  exportStockOutList(searchTerm?: string, SortBy?: number, SortColumn?: string) {
    this.transactionsProxy.exportStockOutList(searchTerm, SortBy, SortColumn).subscribe({
      next: (res: any) => {
        this.exportStockOutListDataSource.next(res);
      },
    });
  }
  postStockOut(id: number) {
    this.loaderService.show();

    this.transactionsProxy.postStockOut(id).subscribe({
      next: (res: any) => {
        this.toasterService.showSuccess(
          this.languageService.transalte('messages.Success'),
          this.languageService.transalte('messages.stockOutPostedSuccessfully')
        );
        this.loaderService.hide();

        this.router.navigateTo('transactions/stock-out');
      },
      error: (error: any) => {
        this.loaderService.hide();
        this.toasterService.showError(
          this.languageService.transalte('messages.Error'),
          this.languageService.transalte(error.message)
        );
      },
    });
  }

}
