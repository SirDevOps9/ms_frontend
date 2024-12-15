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
  ToasterService,
} from 'shared-lib';
import { StockInDto } from '../../../../items/models';
import { SharedStock } from '../../../../items/models/sharedStockOutEnums';
import { TransactionsService } from '../../../transactions.service';
import { SequenceService } from 'apps-shared-lib';
import { SortTableEXport } from '../../../../items/models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LookupDto } from '../../../models';

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
  SortByAll: SortTableEXport;
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  checkDataPosted: string[] = [];
  filterForm: FormGroup;
  filterWarehouse: LookupDto[] = [];
  filterStatus: LookupDto[] = [];
  filterSourceType: LookupDto[] = [];

  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText: 'stockOut.code' },
    { name: 'receiptDate', headerText: 'stockOut.date' },
    { name: 'notes', headerText: 'stockOut.description' },
    { name: 'sourceDocumentId', headerText: 'stockOut.sourceDoc' },
    { name: 'warehouseName', headerText: 'stockOut.warehouse' },
    { name: 'stockInStatus', headerText: 'stockOut.status' },
    { name: 'journalCode', headerText: 'stockOut.journalCode' },
  ];
  ngOnInit() {
    this.initStockOutData();
    this.subscribes();
    this.initiateFilterForm();
    this.getLookup();
    this.lookupSubscriptions();
  }

  initiateFilterForm() {
    this.filterForm = new FormGroup({
      range: new FormControl([]),
      warehouse: new FormControl([]),
      status: new FormControl([]),
      sourceDocument: new FormControl([]),
    });
  }

  lookupSubscriptions() {
    this.transactionsService.wareHousesDropDownLookup$.subscribe((res) => {
      this.filterWarehouse = res;
    });

    this.transactionsService.statusLookupList$.subscribe((res) => {
      this.filterStatus = res;
    });

    this.transactionsService.sourceDocumentList$.subscribe((res) => {
      this.filterSourceType = res;
    });
  }

  getLookup() {
    this.getWarehouseDropDown();
    this.getStatusDropDown();
    this.getSourceDocumentsDropDown();
  }

  getWarehouseDropDown() {
    this.transactionsService.getWareHousesDropDown();
  }
  getStatusDropDown() {
    this.transactionsService.getStockOutStatus();
  }

  getSourceDocumentsDropDown() {
    this.transactionsService.getSourceDocumentType();
  }

  filter() {
    const filter = {
      FromDate: this.filterForm.get('range')!.value[0]
        ? new Date(this.filterForm.get('range')!.value[0]).toISOString().slice(0, 10)
        : '',
      ToDate: this.filterForm.get('range')!.value[1]
        ? new Date(this.filterForm.get('range')!.value[1]).toISOString().slice(0, 10)
        : '',
      Status: this.filterForm.get('status')!.value,
      SourceDocumentType: this.filterForm.get('sourceDocument')!.value,
      WarehouseId: this.filterForm.get('warehouse')!.value,
    };
    this.transactionsService.getAllStockIn('', new PageInfo(), filter);
  }

  subscribes() {
    this.transactionsService.stockInDataSourceeObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(this.tableData);
        this.checkDataPosted = this.tableData.map((item) => item.stockInStatus);
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
    this.transactionsService.exportStockInList(searchTerm, sortBy, sortColumn);
    const filteredColumns = this.columns.filter((col) => this.filteredColumns.includes(col.name));

    this.transactionsService.exportStockInListDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, filteredColumns);
    });
  }
  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }
  onFilterColumn(e: string[]) {
    this.filteredColumns = e;
  }
  onAdd() {
    this.sequenceService.isHaveSequence(
      this.sharedEnums.Pages.StockIn,
      '/transactions/stockin/add'
    );
  }
  onVeiw(data: any) {
    this.routerService.navigateTo(`transactions/stockin/view/${data}`);
  }

  onEdit(id: any) {
    this.routerService.navigateTo(`/transactions/stockin/edit/${id}`);
  }

  onSearchChange() {
    this.transactionsService.getAllStockIn(this.searchTerm, new PageInfo());
  }

  onDelete(id: number) {
    const selectedItem = this.tableData.find((item) => item.id === id);
    if (selectedItem && selectedItem.stockInStatus === 'Posted') {
      this.toasterService.showError(
        this.languageService.transalte('transactions.error'),
        this.languageService.transalte('transactions.cannotDeletePosted')
      );
    } else {
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
          next: () => {},
          error: (err: any) => {
            this.toasterService.showError(
              this.languageService.transalte('transactions.error'),
              this.languageService.transalte('transactions.cannotDelete')
            );
          },
        });
    }
  }

  constructor(
    private languageService: LanguageService,
    private toasterService: ToasterService,
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private exportService: ExportService,
    private transactionsService: TransactionsService,
    public sharedFinanceEnums: SharedStock,
    public sequenceService: SequenceService,
    public sharedEnums: SharedEnums
  ) {
  }
}
