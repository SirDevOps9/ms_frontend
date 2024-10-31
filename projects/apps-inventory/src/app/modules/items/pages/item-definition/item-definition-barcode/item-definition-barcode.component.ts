import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService, PageInfo, lookupDto, MenuModule, PageInfoResult } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { itemDefinitionDto } from '../../../models';

@Component({
  selector: 'app-item-definition-barcode',
  templateUrl: './item-definition-barcode.component.html',
  styleUrl: './item-definition-barcode.component.scss'
})
export class ItemDefinitionBarcodeComponent {
  tableData: any[] = []
  exportColumns: lookupDto[];
  exportSelectedCols: string[] = [];
  exportData: itemDefinitionDto[];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService: ItemsService
  ) {}


  onSearchChange() {
    this.itemsService.getItemDefinition(this.searchTerm, new PageInfo());
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }
  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemDefinition('', pageInfo);
  }
  exportBankData(searchTerm: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm);
    this.itemsService.exportedItemDefinitionListDataSource.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd(){
    alert('d')
  }
}
