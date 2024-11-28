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

  SharedEnums,

} from 'shared-lib';
import { StockInDto } from '../../../../items/models';
import { SharedStock } from '../../../../items/models/sharedStockOutEnums';
import { TransactionsService } from '../../../transactions.service';
import { SequenceService } from 'apps-shared-lib';
import { SortTableEXport } from '../../../../items/models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';


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
  SortByAll:SortTableEXport
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
    this.transactionsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  initStockOutData() {
    this.transactionsService.getAllStockIn('', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.transactionsService.getAllStockIn('', pageInfo);
  }
  exportClick() {
    this.exportBankData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportBankData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.transactionsService.exportStockInList(searchTerm ,sortBy ,sortColumn);
    const columns = [
      { name: 'code', headerText: ('stockOut.code') },
      { name: 'receiptDate', headerText: ('stockOut.date') },
      { name: 'notes', headerText: ('stockOut.description') },
      { name: 'sourceDocumentId', headerText: ('stockOut.sourceDoc') },
      { name: 'warehouseName', headerText: ('stockOut.warehouse') },
      { name: 'stockInStatus', headerText: ('stockOut.status') },
      { name: 'journalCode', headerText: ('stockOut.journalCode') },
    ];
    this.transactionsService.exportStockInListDataSourceObservable.subscribe((res) => {
      this.exportData =this.exportService.formatCiloma(res, columns);
    });
  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }
  onAdd() {
    this.sequenceService.isHaveSequence( this.sharedEnums.Pages.StockIn , '/transactions/stock-in/add-stock-in')

  }
  onVeiw(data:any){
    this.routerService.navigateTo(`transactions/stock-in/view/${data}`)
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



  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private exportService:ExportService,
    private transactionsService: TransactionsService,
    public sharedFinanceEnums: SharedStock,
    public sequenceService: SequenceService,
    public sharedEnums: SharedEnums,


  ) {
    console.log(this.routerService.getCurrentUrl());
  }
}
