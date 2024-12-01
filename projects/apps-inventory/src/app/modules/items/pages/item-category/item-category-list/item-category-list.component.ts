import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { GetItemCategoryDto, ItemTypeDto } from '../../../models';
import { AddItemCategoryComponent } from '../../../components/add-item-category/add-item-category.component';
import { SortTableEXport } from '../../../models/SortTable';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrl: './item-category-list.component.scss'
})
export class ItemCategoryListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService : ItemsService,
    private exportService:ExportService,
  ) {

  }

  tableData: GetItemCategoryDto[];

  exportData: GetItemCategoryDto[];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];
  SortByAll:SortTableEXport
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initItemTypeData();
  }

  initItemTypeData() {

    this.itemsService.getItemCategory('', new PageInfo());

    this.itemsService.sendItemCategoryDataSourceObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemCategory('', pageInfo);
  }

  exportItemClick() {
    this.exportItemData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportItemData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.itemsService.exportsItemCategoryList(searchTerm, sortBy, sortColumn);

    let columns = [
      { name: 'id', headerText: ('itemsCategory.code') },
      { name: 'name', headerText: ('itemsCategory.name') },
      { name: 'parentCategoryName', headerText: ('itemsCategory.parentCategory') },
      { name: 'isDetailed', headerText: ('itemsCategory.isDetails') },
      { name: 'isActive', headerText: ('itemsCategory.status') },
      { name: 'categoryType', headerText: ('itemsCategory.categoryType') },



    ];


    this.itemsService.exportedItemCategoryDataSourceObs.subscribe((res) => {
      this.exportData = this.exportService.formatItemAttributes(res, columns);
      // console.log('Export data:', this.exportData);
    });
  }




  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }
  onAdd() {
    this.dialog.open(AddItemCategoryComponent, {
      width: '647px',
      height: 'auto',
    });
  }

  onEdit(data: any) {


  }

  onSearchChange(e : any) {
    this.searchTerm = e
    this.itemsService.getItemCategory(this.searchTerm, new PageInfo());

  }

  onDelete(id: number) {
    this.itemsService.deleteItemCategory(id);
    this.itemsService.itemsCategoryDeletedObs.subscribe(res=>{
      if(res) {
        this.initItemTypeData();

      }
    })
  }
}

