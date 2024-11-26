import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SequenceService } from 'apps-shared-lib';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { StockInDto } from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { from, switchMap, tap } from 'rxjs';
import {
  lookupDto,
  PageInfoResult,
  MenuModule,
  PageInfo,
  RouterService,
  SharedEnums,
} from 'shared-lib';
import { AddManPopupComponent } from '../../../components/add-man-popup/add-man-popup.component';

@Component({
  selector: 'app-man-list',
  templateUrl: './man-list.component.html',
  styleUrl: './man-list.component.scss',
})
export class ManListComponent implements OnInit {
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
    // this.routerService.navigateTo(`/masterdata/man-sales/add`);

    const ref = this.dialog.open(AddManPopupComponent, {
      width: 'auto',
      height: '500px',
    });
    ref.onClose.subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    });
  }
  onVeiw(data: any) {
    this.routerService.navigateTo(`transactions/stock-in/view/${data}`);
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transactions/stock-in/edit-stock-in/${id}`);
  }

  onSearchChange() {
    // this.transactionsService.getAllStockIn(this.searchTerm, new PageInfo());
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
    private transactionsService: TransactionsService,
    public sharedFinanceEnums: SharedStock,
    public sequenceService: SequenceService,
    public sharedEnums: SharedEnums
  ) {
    console.log(this.routerService.getCurrentUrl());
  }
}
