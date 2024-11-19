import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { StockInDto, StockOutDto } from '../../../models';
import { SharedStock } from '../../../models/sharedStockOutEnums';
import { ItemsService } from '../../../../items/items.service';

@Component({
  selector: 'app-stock-out-list',
  templateUrl: './stock-out-list.component.html',
  styleUrl: './stock-out-list.component.scss'
})
export class StockOutListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string
  tableData: any[];
  exportData: StockOutDto[];

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
    this.itemsService.stockOutDataSourceeObservable.subscribe({
      next: (res:any) => {
        this.tableData = res;
      },
    });




  }
  initStockOutData() {
    this.itemsService.getAllStockOut('', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getAllStockOut('', pageInfo);


  }

  exportBankData(searchTerm: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm);
    this.itemsService.sendStockOutDataSourcesObs.subscribe((res:any) => {
      this.exportData = res;
    });
  }

  onAdd() {
    this.routerService.navigateTo(`transactions/stock-out/add`)

  }

  onEdit(data: any) {
    this.routerService.navigateTo(`transactions/stock-out/edit/${data.id}`)

  }

  onVeiw(data:any){
    this.routerService.navigateTo(`transactions/stock-out/view/${data}`)
  }

  onSearchChange() {
    this.itemsService.getAllStockOut(this.searchTerm, new PageInfo());

  }

  onDelete(id: number) {
    this.itemsService.deleteStockOut(id)
  }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  exportClick() {
    this.itemsService.exportStockOutList(this.searchTerm, this.SortBy, this.SortColumn);
    this.itemsService.exportStockOutListDataSource.subscribe((res:any) => {
      this.exportData = res;
    });
  }
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService: ItemsService,
    public sharedFinanceEnums: SharedStock
  ) {
    // this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));

  }
}

