import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, lookupDto, PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { AddItemDefinitionPopupComponent } from '../../../components/add-item-definition/add-item-definition-popup.component';
import { ItemsService } from '../../../items.service';
import { itemDefinitionDto, StockInDto } from '../../../models';

@Component({
  selector: 'app-stock-in-list',
  templateUrl: './stock-in-list.component.html',
  styleUrl: './stock-in-list.component.scss'
})
export class StockInListComponent implements OnInit {
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

  tableData: StockInDto[];

  exportData: StockInDto[];
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
    this.initStockInData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initStockInData() {
    this.itemsService.getStockIn('', new PageInfo());

    this.itemsService.sendStockInDataSourcesObs.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getStockIn('', pageInfo);

  
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm);
    this.itemsService.sendStockOutDataSourcesObs.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddItemDefinitionPopupComponent, {
    
      width: '800px',
      height : '700px'
  
    });

    dialogRef.onClose.subscribe(() => {
    this.initStockInData()
    });
  }

  onEdit(data: any) {

    this.routerService.navigateTo(`masterdata/add-item-definition/${data.id}`)

  }

  onSearchChange() {
    this.itemsService.getStockIn(this.searchTerm, new PageInfo());
    
  }

  onDelete(id: number) {
     this.itemsService.deleteStockIn(id)
  }
}

