import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { StockInDto } from 'projects/apps-inventory/src/app/modules/items/models';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import {
  lookupDto,
  PageInfoResult,
  MenuModule,
  PageInfo,
  RouterService,
  SharedEnums,
} from 'shared-lib';
import { ViewMenInTeamComponent } from '../../../components/view-men-in-team/view-men-in-team.component';

@Component({
  selector: 'list-sales-team',
  templateUrl: './list-sales-team.component.html',
  styleUrl: './list-sales-team.component.scss',
})
export class ListSalesTeamComponent implements OnInit {
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

  onAdd() {
    this.routerService.navigateTo(`/masterdata/sales-team/add`);
  }
  onVeiw(data: any) {
    const ref = this.dialog.open(ViewMenInTeamComponent, {
      width: 'auto',
      height: '400px',
    });
    ref.onClose.subscribe((res: any) => {
      if (res) {
        console.log(res);
      }
    });
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transactions/stock-in/edit-stock-in/${id}`);
  }

  onSearchChange() {
    // this.transactionsService.getAllStockIn(this.searchTerm, new PageInfo());
  }

  onDelete(id: number) {}

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
    private transactionsService: TransactionsService
  ) {
    console.log(this.routerService.getCurrentUrl());
  }
}
