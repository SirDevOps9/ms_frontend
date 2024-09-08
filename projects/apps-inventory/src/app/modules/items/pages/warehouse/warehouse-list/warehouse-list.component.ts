import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { AddItemDefinitionPopupComponent } from '../../../components/add-item-definition/add-item-definition-popup.component';
import { ItemsService } from '../../../items.service';
import { itemDefinitionDto } from '../../../models';

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
    this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));

  }

  tableData: itemDefinitionDto[];

  exportData: itemDefinitionDto[];
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
    this.initItemDefinitionData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initItemDefinitionData() {
    this.itemsService.getItemDefinition('', new PageInfo());

    this.itemsService.sendItemDefinitionDataSourceObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemDefinition('', pageInfo);

  
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm);
    this.itemsService.exportedItemDefinitionListDataSource.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
   this.routerService.navigateTo('/masterdata/add-warehouse')
  }

  onEdit(data: any) {
    // const dialogRef = this.dialog.open(EditItemDefinitionComponent, {
    
    //   width: '800px',
    //   height : '700px',
    //   data : data
  
    // });

    // dialogRef.onClose.subscribe(() => {
    // this.initItemDefinitionData()
    // });

  }

  onSearchChange() {
    this.itemsService.getItemDefinition(this.searchTerm, new PageInfo());
    
  }

  onDelete(id: number) {
     this.itemsService.deleteItemDefinition(id)
  }
}

