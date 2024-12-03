import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  RouterService,
  LanguageService,
  lookupDto,
  PageInfoResult,
  MenuModule,
  PageInfo,
  Pages,
  SharedEnums,
} from 'shared-lib';
import { StockInDto, StockOutDto } from '../../../models';
import { SharedStock } from '../../../models/sharedStockOutEnums';
import { ItemsService } from '../../../../items/items.service';
import { TransactionsService } from '../../../transactions.service';
import { SequenceService } from 'apps-shared-lib';
import { SortTableEXport } from '../../../../items/models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';

@Component({
  selector: 'app-stock-out-list',
  templateUrl: './stock-out-list.component.html',
  styleUrl: './stock-out-list.component.scss',
})
export class StockOutListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string;
  tableData: any[];
  exportData: StockOutDto[];
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText: ('stockOut.code') },
    { name: 'receiptDate', headerText: ('stockOut.date') },
    { name: 'notes', headerText: ('stockOut.description') },
    { name: 'sourceDocumentId', headerText: ('stockOut.sourceDoc') },
    { name: 'warehouseName', headerText: ('stockOut.warehouse') },
    { name: 'stockInStatus', headerText: ('stockOut.status') },
    { name: 'journalCode', headerText: ('stockOut.journalCode') },
    { name: 'isReserved', headerText: ('stockOut.reserve') },

  ]
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
    this.itemsService.stockOutDataSourceeObservable.subscribe({
      next: (res: any) => {
        this.tableData = res;
      },
    });
    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  initStockOutData() {
    this.itemsService.getAllStockOut('', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getAllStockOut('', pageInfo);
  }

  onAdd() {
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.StockOut,
      '/transactions/stock-out/add'
    );
  }

  onEdit(data: any) {
    this.routerService.navigateTo(`transactions/stock-out/edit/${data.id}`);
  }

  onVeiw(data: any) {
    this.routerService.navigateTo(`transactions/stock-out/view/${data}`);
  }

  onSearchChange() {
    this.itemsService.getAllStockOut(this.searchTerm, new PageInfo());
  }

  onDelete(id: number) {
    this.itemsService.deleteStockOut(id);
  }
  exportClick() {
    this.exportBankData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportBankData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.itemsService.exportStockOutList(searchTerm ,sortBy ,sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));
    this.itemsService.exportStockOutListDataSource.subscribe((res: any) => {
      this.exportData = this.exportService.formatCiloma(res, filteredColumns);
    });
  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }

/**
 * This function filters the columns based on the selected values.
 * @param e - An array of strings containing the names of the columns to be filtered.
 *
 * Steps:
 * 1. Logs the selected column names to the console for debugging purposes.
 * 2. Updates the `filteredColumns` property with the new filtered column names.
 * 3. Iterates through each selected column:
 *    - If the column exists in the original `columns` array, perform a specific action (logic can be added here).
 *    - If the column does not exist, perform a different action (logic can also be added here).
 */
onFilterColumn(e: string[]) {
  this.filteredColumns = e; // Update the filtered columns array
}

  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService: TransactionsService,
    public sharedFinanceEnums: SharedStock,
    public sequenceService: SequenceService,
    public sharedEnums: SharedEnums,
    private exportService:ExportService,

  ) {
    // this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));
  }
}
