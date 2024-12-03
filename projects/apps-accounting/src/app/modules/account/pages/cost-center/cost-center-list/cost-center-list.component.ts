import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PageInfoResult,
  MenuModule,
  RouterService,
  PageInfo,
  ToasterService,
  lookupDto,
  LanguageService,
} from 'shared-lib';
import { AccountService } from '../../../account.service';
import {
  SharedCostEnums,
  costCenterActivation,
  costCenterList,
} from '../../../models';
import { Title } from '@angular/platform-browser';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-cost-center-list',
  templateUrl: './cost-center-list.component.html',
  styleUrl: './cost-center-list.component.scss',
})
export class CostCenterListComponent implements OnInit {
  tableData: costCenterList[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: costCenterList[];
  SortByAll:SortTableEXport
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'code', headerText: 'TaxGroup.Code' },
      { name: 'name', headerText: 'TaxGroup.Name' },
      { name: 'parentCostCenter', headerText: 'TaxGroup.parent' },
      { name: 'type', headerText: 'TaxGroup.type' },
      { name: 'status', headerText: 'TaxGroup.status' },
  ]
  constructor(
    private routerService: RouterService,
    private accountService: AccountService,
    public authService: AuthService,
    private toaserService: ToasterService,
    public sharedCostEnums: SharedCostEnums,
    private dialog: DialogService,
    private title: Title,
    private exportService:ExportService,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('costCenter.CostCenterList'));
  }

  ngOnInit() {
    this.initTaxGroupData();
  }

  initTaxGroupData() {
    this.accountService.getAllCostCenter('', new PageInfo());
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.accountService.getAllCostCenter('', pageInfo);
    this.accountService.costCenterListView.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange(e: any) {
    this.accountService.getAllCostCenter(e.target.value, new PageInfo());
  }

  async confirmChange(event: any, user: any) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      const command: costCenterActivation = {
        id: user.id,
        status: user.isActive,
      };
      this.accountService.costCenterActivation(command);
    } else {
      user.isActive = !user.isActive;
    }
  }
  exportClick() {
    this.exportCostCentersData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportCostCentersData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.accountService.exportCostCentersData(searchTerm , sortBy , sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));
    this.accountService.exportsCostCentersDataSourceObservable.subscribe((res) => {
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

}
