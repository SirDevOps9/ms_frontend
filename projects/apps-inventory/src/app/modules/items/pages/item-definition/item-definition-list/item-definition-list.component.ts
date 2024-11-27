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
import { ActivatedRoute, Router } from '@angular/router';
import { HelpPageService } from 'libs/apps-shared-lib/src/lib/pages/help-page/help-page.service';

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
    private exportService: ExportService,
    private helpPageService: HelpPageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  tableData: itemDefinitionDto[];

  exportData: any[];
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
  exportColumns: any[];
  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  hasHelpPage: Boolean = false;
  servicePage: number;
  ngOnInit() {
    this.initItemDefinitionData();
    const state = history.state;
    this.hasHelpPage = JSON.parse(state?.hashelppage || 'false'); // Default to 'false' if no state found
    this.servicePage = state.servicePage;
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
  navigateHelpPageComponent() {
    window.open(
      this.router.serializeUrl(
        this.router.createUrlTree(['/erp/home-help-page/help-page', this.servicePage])
      ),
      '_blank'
    );
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemDefinition('', pageInfo);
  }

  exportClick(e?: Event) {
    this.exportBankData(this.searchTerm);
  }

  exportBankData(searchTerm: string) {
    this.itemsService.exportsItemsDefinitionList(searchTerm);
    const columns = [
      { name: 'code', headerText : this.translate.instant('itemDefinition.code') },
      { name: 'name', headerText : this.translate.instant('itemDefinition.name') },
      { name: 'typeName', headerText : this.translate.instant('itemDefinition.type') },
      { name: 'itemCategoryName', headerText : this.translate.instant('itemDefinition.category') },
      { name: 'uomName', headerText : this.translate.instant('itemDefinition.uom') },

    ];
    this.itemsService.exportedItemDefinitionListDataSourceObs.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
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
