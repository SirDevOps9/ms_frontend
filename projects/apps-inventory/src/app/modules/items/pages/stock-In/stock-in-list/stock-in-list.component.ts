import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { AddItemDefinitionPopupComponent } from '../../../components/add-item-definition/add-item-definition-popup.component';
import { ItemsService } from '../../../items.service';
import {  StockInDto } from '../../../models';
import { from, switchMap, tap } from 'rxjs';
import { SharedStock } from '../../../models/sharedStockOutEnums';

@Component({
  selector: 'app-stock-in-list',
  templateUrl: './stock-in-list.component.html',
  styleUrl: './stock-in-list.component.scss'
})
export class StockInListComponent implements OnInit {
  SortBy?: number;
  SortColumn?: string
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
    this.itemsService.stockInDataSourceeObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

  }
  initStockOutData() {
    this.itemsService.getAllStockIn('', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getAllStockIn('', pageInfo);


  }

  exportBankData(searchTerm: string) {
    this.itemsService.exportStockInList(searchTerm);
    this.itemsService.exportStockInListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {

  }

  onEdit(data: any) {

  }
  onView(data: any) {
    this.routerService.navigateTo(`masterdata/stock-in/view/${data}`)

  }
  onSearchChange() {
    this.itemsService.getAllStockIn(this.searchTerm, new PageInfo());

  }

  onDelete(id: number) {
    from(this.itemsService.deleteStockIn(id)).pipe(
      switchMap(() => this.itemsService.sendStockInDataSourcesObs),
      tap((data: any) => {
        if (data) {
          this.initStockOutData();
        }
      })
    ).subscribe({
      error: (err: any) => {
      }
    });
  }

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  exportClick() {
    this.itemsService.exportStockInList(this.searchTerm, this.SortBy, this.SortColumn);
    this.itemsService.exportStockInListDataSourceObservable.subscribe((res) => {
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

  }
}

