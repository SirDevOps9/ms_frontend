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
    private langService: LanguageService,
    private itemsService: ItemsService
  ) {}

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
