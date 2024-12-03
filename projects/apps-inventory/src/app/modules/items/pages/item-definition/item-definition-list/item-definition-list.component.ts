import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { BankDefinitionDto } from 'projects/apps-finance/src/app/modules/finance/models/BankDefinitionDto';
import {
  RouterService,
  LanguageService,
  lookupDto,
  PageInfoResult,
  MenuModule,
  PageInfo,
} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { itemDefinitionDto } from '../../../models';
import { AddItemDefinitionPopupComponent } from '../../../components/add-item-definition/add-item-definition-popup.component';
import { EditItemDefinitionComponent } from '../../../components/edit-item-definition/edit-item-definition.component';
import { ViewItemDefinitionComponent } from '../../../components/view-item-definition/view-item-definition/view-item-definition.component';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { TranslateService } from '@ngx-translate/core';
import { SortTableEXport } from '../../../models/SortTable';

@Component({
  selector: 'app-item-definition-list',
  templateUrl: './item-definition-list.component.html',
  styleUrl: './item-definition-list.component.scss',
})
export class ItemDefinitionListComponent implements OnInit {
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private translate: TranslateService,
    private itemsService: ItemsService,
    private exportService:ExportService
  ) {}

  tableData: itemDefinitionDto[];
  SortByAll:SortTableEXport
  exportData: any[];
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText :('itemDefinition.code') },
    { name: 'name', headerText :('itemDefinition.name') },
    { name: 'typeName', headerText :('itemDefinition.type') },
    { name: 'itemCategoryName', headerText :('itemDefinition.category') },
    { name: 'uomName', headerText :('itemDefinition.uom') },

  ]
  exportColumns: any[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  ngOnInit() {
    this.initItemDefinitionData();
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

  exportClick() {
    this.exportBankData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportBankData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm, sortBy, sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));

    this.itemsService.exportedItemDefinitionListDataSourceObs.subscribe((res) => {
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
      } else {
      }
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddItemDefinitionPopupComponent, {
      width: '800px',
      height: '500px',
    });

    dialogRef.onClose.subscribe(() => {
      this.initItemDefinitionData();
    });


  }

  onEdit(data: any) {
    this.routerService.navigateTo(`masterdata/add-item-definition/general/${data.id}`);
  }

  onView(data: any) {
    this.dialog.open(ViewItemDefinitionComponent, {
      width: '800px',
      height: '700px',
      data: data,
    });
  }
  onSearchChange() {
    this.itemsService.getItemDefinition(this.searchTerm, new PageInfo());
  }

  onDelete(id: number) {
    this.itemsService.deleteItemDefinition(id);
  }
}
