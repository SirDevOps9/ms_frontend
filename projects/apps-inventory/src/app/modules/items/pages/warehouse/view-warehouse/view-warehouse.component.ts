import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import {  PageInfoResult, PageInfo, PrintService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';
import { GetWarehouseItems } from '../../../models/GetWarehouseItem';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { TranslateService } from '@ngx-translate/core';
import { SortTableEXport } from '../../../models/SortTable';


@Component({
  selector: 'app-view-warehouse',
  templateUrl: './view-warehouse.component.html',
  styleUrl: './view-warehouse.component.scss'
})
export class ViewWarehouseComponent {
id:any
  constructor(
    private route : ActivatedRoute,
    public authService: AuthService,
    private title: Title,
    private Print_Service: PrintService,
    private itemsService : ItemsService,
    private translate: TranslateService,
    private exportService:ExportService
  ) {
    this.id = this.route.snapshot.params['id']
  }
  tableData: GetWarehouseItems[]=[];
  exportData: GetWarehouseItems[];
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  SortBy?: number;
  SortColumn?: string;
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'itemCode', headerText: this.translate.instant('warehouse.itemCode') },
    { name: 'unitOfMeasureEn', headerText: this.translate.instant('warehouse.uom') },
    { name: 'variantEn', headerText: this.translate.instant('warehouse.variant') },
    { name: 'availableQuantity', headerText: this.translate.instant('warehouse.availableQuantity') },
  ]
  ngOnInit() {
this.initItemDefinitionData()
  }

  initItemDefinitionData() {
    const pageInfo = new PageInfo();
    this.itemsService.getWarehouseListView('', this.id,new PageInfo());
     this.itemsService.WarehouseViewDataSourceObs.subscribe({
        next: (res: GetWarehouseItems[]) => {
          this.tableData = res;
        },
      })
      this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
        this.currentPageInfo = currentPageInfo;
      });
    };

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getWarehouseList('', pageInfo);
  }

  onSearchChange(event: any) {
    const warehouseId = this.id
    this.itemsService.getWarehouseListView(event, warehouseId, new PageInfo());

    this.itemsService.WarehouseViewDataSourceObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  exportClick(e?: Event) {
    this.exportOperationalData(this.searchTerm);
  }

  exportOperationalData(data:any) {
  data =this.id, this.SortBy, this.SortColumn
      this.itemsService.exportsWayehouseItemView(data);
      const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

      this.itemsService.exportedWarehouseDataItemSource.subscribe((res) => {
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
    console.log('new new', e);
    this.filteredColumns = e;
    e.forEach(selectedColumn => {
      const columnExists = this.columns.some(column => column.name === selectedColumn);
      if (columnExists) {
        // console.log(`${selectedColumn} exists in predefined columns`);
      } else {
        // console.log(`${selectedColumn} does not exist in predefined columns`);
      }
    });
  }

  printTable(id: string) {
    this.Print_Service.print(id);
  }

}
