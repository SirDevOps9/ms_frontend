import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { from, switchMap, tap } from 'rxjs';
import {
  RouterService,
  LanguageService,
  lookupDto,
  PageInfoResult,
  MenuModule,
  PageInfo,
} from 'shared-lib';
import { StockInDto } from '../../../../items/models';
import { SharedStock } from '../../../../items/models/sharedStockOutEnums';
import { TransactionsService } from '../../../transactions.service';


@Component({
  selector: 'app-stock-in-list',
  templateUrl: './stock-in-list.component.html',
  styleUrl: './stock-in-list.component.scss',
})
export class StockInListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string;
  tableData: any[];
  exportData: StockInDto[];

  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initStockOutData();
    this.subscribes();
  }
  subscribes() {
    this.transactionsService.stockInDataSourceeObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  initStockOutData() {
    this.transactionsService.getAllStockIn('', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.transactionsService.getAllStockIn('', pageInfo);
  }

  exportBankData(searchTerm: string) {
    this.transactionsService.exportStockInList(searchTerm);
    this.transactionsService.exportStockInListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
    this.routerService.navigateTo('/transactions/stock-in/add-stock-in');
  }
  onVeiw(data:any){
    this.routerService.navigateTo(`masterdata/stock-in/view/${data}`)
  }


  onEdit(id: any) {
    this.routerService.navigateTo(`/transactions/stock-in/edit-stock-in/${id}`);
  }

  onSearchChange() {
    this.transactionsService.getAllStockIn(this.searchTerm, new PageInfo());
  }

  onDelete(id: number) {
    from(this.transactionsService.deleteStockIn(id))
      .pipe(
        switchMap(() => this.transactionsService.sendStockInDataSourcesObs),
        tap((data: any) => {
          if (data) {
            this.initStockOutData();
          }
        })
      )
      .subscribe({
        error: (err: any) => {},
      });
  }

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  exportClick() {
    this.transactionsService.exportStockInList(this.searchTerm, this.SortBy, this.SortColumn);
    this.transactionsService.exportStockInListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private transactionsService: TransactionsService,
    public sharedFinanceEnums: SharedStock
  ) {
    console.log(this.routerService.getCurrentUrl());
  }
}
