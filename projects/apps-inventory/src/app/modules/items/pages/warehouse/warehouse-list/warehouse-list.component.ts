import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { GetWarehouseList, itemDefinitionDto } from '../../../models';
import { AddWarehousePopupComponent } from '../../../components/warehouse/add-warehouse-popup/add-warehouse-popup.component';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { TranslateService } from '@ngx-translate/core';
import { SortTableEXport } from '../../../models/SortTable';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss',

})
export class WarehouseListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private itemsService : ItemsService,
    private exportService:ExportService,
    private translate: TranslateService,
  ) {
  }
  exportColumns: any[];
  tableData: GetWarehouseList[];
  exportData: GetWarehouseList[];
  exportSelectedCols: string[] = [];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  SortBy?: number;
  SortColumn?: string;
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText:('warehouse.code') },
    { name: 'name', headerText:('warehouse.name') },
    { name: 'warehouseType', headerText:('warehouse.warehouseType') },
    { name: 'createdOn', headerText:('warehouse.createdOn') }

  ]
  ngOnInit() {
    this.initItemDefinitionData();
  }

  initItemDefinitionData() {
    this.itemsService.getWarehouseList('', new PageInfo());

    this.itemsService.sendWarehouseDataSourceObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getWarehouseList('', pageInfo);
  }

  exportClick() {
    this.exportOperationalData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportOperationalData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.itemsService.exportsWayehouseList(searchTerm, sortBy, sortColumn);

    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

    this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
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


  onAdd() {
      const dialogRef = this.dialog.open(AddWarehousePopupComponent, {
      width: '650px',
      height : '420px',
    });
    dialogRef.onClose.subscribe(() => {
    this.initItemDefinitionData()
    });

  }

  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/warehouse/edit-warehouse/${data.id}`)
  }

  onView(data: any) {

    this.routerService.navigateTo(`/masterdata/warehouse/view-warehouse/${data.id}`)

  }



  // onSearchChange() {
  //   this.itemsService.getWarehouseList(this.searchTerm, new PageInfo());

  // }


  onSearchChange(event: any) {
    this.itemsService.getWarehouseList(event, new PageInfo());
    this.itemsService.sendWarehouseDataSource.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  onDelete(id: number) {
     this.itemsService.deleteWareHouse(id)
  }
}

