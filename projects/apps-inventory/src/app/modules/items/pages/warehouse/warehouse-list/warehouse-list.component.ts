import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { AddItemDefinitionPopupComponent } from '../../../components/add-item-definition/add-item-definition-popup.component';
import { ItemsService } from '../../../items.service';
import { GetWarehouseList, itemDefinitionDto } from '../../../models';
import { AddWarehousePopupComponent } from '../../../components/warehouse/add-warehouse-popup/add-warehouse-popup.component';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss'
})
export class WarehouseListComponent implements OnInit {

  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService : ItemsService
  ) {

  }

  tableData: GetWarehouseList[];

  exportData: GetWarehouseList[];
  cols = [

    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    },
    {
      field: 'Short Name',
      header: 'shortName',
    },
    {
      field: 'Item Category Name',
      header: 'itemCategoryName',
    },
    {
      field: 'UOM Name',
      header: 'uomName',
    },

  ];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  SortBy?: number;
  SortColumn?: string;
  ngOnInit() {
    this.initItemDefinitionData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
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

  // exportClick(e?: Event) {
  //   console.log(e)
  //   this.exportWarehouseData(this.searchTerm);
  // }


  // exportClick(){
  //   this.itemsService.exportsWayehouseList(this.searchTerm ,this.SortBy,this.SortColumn);
  //   this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
  //     this.exportData = res;
  //   });
  // }

  // exportWarehouseData(searchTerm: string) {
  //   this.itemsService.exportsWayehouseList(this.searchTerm ,this.SortBy,this.SortColumn);
  //   this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
  //     this.exportData = res;
  //   });
  // }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportClick(){
    this.itemsService.exportsWayehouseList(this.searchTerm ,this.SortBy,this.SortColumn);


    this.itemsService.exportedWarehouseDataSourceObs.subscribe((res) => {
      this.exportData = res;
    });
  }
  onAdd() {
      const dialogRef = this.dialog.open(AddWarehousePopupComponent, {
      width: '800px',
      height : '550px',
    });
    dialogRef.onClose.subscribe(() => {
    this.initItemDefinitionData()
    });

  }

  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/warehouse/edit-warehouse/${data.id}`)


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

