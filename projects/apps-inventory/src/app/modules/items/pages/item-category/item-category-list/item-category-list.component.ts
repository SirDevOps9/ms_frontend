import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { GetItemCategoryDto, ItemTypeDto } from '../../../models';
import { AddItemCategoryComponent } from '../../../components/add-item-category/add-item-category.component';

@Component({
  selector: 'app-item-category-list',
  templateUrl: './item-category-list.component.html',
  styleUrl: './item-category-list.component.scss'
})
export class ItemCategoryListComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
  
    private itemsService : ItemsService
  ) {

  }

  tableData: GetItemCategoryDto[];

  exportData: GetItemCategoryDto[];
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
   
  ];
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initItemTypeData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initItemTypeData() {

    this.itemsService.getItemCategory('', new PageInfo());

    this.itemsService.sendItemCategoryDataSourceObs.subscribe({
      next: (res) => {
        console.log(res)
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

  exportItemClick(e: any) {
    this.exportItemData(this.searchTerm);
  }

  exportItemData(searchTerm: string) {
    this.itemsService.exportsItemCategoryList(searchTerm);
    this.itemsService.exportedItemCategoryDataSourceObs.subscribe((res) => {
      console.log(res)
      this.exportData = res;
    });
  }

  onAdd() {
    this.dialog.open(AddItemCategoryComponent, {
      width: '647px',
      height: 'auto',
    });
  }

  onEdit(data: any) {
          // this.routerService.navigateTo(`/masterdata/bank-definition/edit-bank-definition/${data.id}`);


  }

  onSearchChange(e : any) {
    console.log(e)
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

