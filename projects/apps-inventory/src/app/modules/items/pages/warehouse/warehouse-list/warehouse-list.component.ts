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

  exportClick(e?: Event) {
    this.exportOperationalData(this.searchTerm);
  }

  exportOperationalData(searchTerm: string) {
    this.itemsService.exportsWayehouseList(searchTerm);

    const columns = [
      { name: 'code', headerText: this.translate.instant('warehouse.code') },
      { name: 'name', headerText: this.translate.instant('warehouse.name') },
      { name: 'warehouseType', headerText: this.translate.instant('warehouse.warehouseType') },
      { name: 'createdOn', headerText: this.translate.instant('warehouse.createdOn') }
    ];

    this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
    });
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

