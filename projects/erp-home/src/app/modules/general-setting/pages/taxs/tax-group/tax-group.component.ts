import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, PageInfo, lookupDto, LanguageService } from 'shared-lib';
import { TaxGroupAddComponent } from '../../../components/tax-group-add/tax-group-add.component';
import { TaxGroupEditComponent } from '../../../components/tax-group-edit/tax-group-edit.component';
import { Title } from '@angular/platform-browser';
import { TaxGroupDto } from '../../../models/tax-group-dto';
import { GeneralSettingService } from '../../../general-setting.service';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-tax-group',
  templateUrl: './tax-group.component.html',
  styleUrl: './tax-group.component.scss'
})
export class TaxGroupComponent implements OnInit {
  tableData: TaxGroupDto[];
  currentPageInfo: PageInfoResult;
  modulelist: MenuModule[];
  searchTerm: string;
  exportColumns: lookupDto[];
  exportData: TaxGroupDto[];
  SortByAll:SortTableEXport
  constructor(
    private routerService: RouterService,
    private generalSettingService: GeneralSettingService,
    public authService: AuthService,
    private dialog: DialogService,
    private exportService:ExportService
  ) {

  }

  ngOnInit() {
    this.initTaxGroupData();
  }

  initTaxGroupData() {
    this.generalSettingService.getAllTaxGroupPaginated('',new PageInfo());
    this.generalSettingService.taxGroupList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      console.log("currentPageInfo",currentPageInfo)
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getAllTaxGroupPaginated(this.searchTerm,pageInfo);
    this.generalSettingService.taxGroupList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  Add() {
    const dialogRef = this.dialog.open(TaxGroupAddComponent, {
      width: '600px',
      height : '500px'

    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxGroupData();
    });
  }

  Edit(Id:any) {
    const dialogRef = this.dialog.open(TaxGroupEditComponent, {
      width: '600px',
      height : '500px',
      data : Id

    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxGroupData();
    });
  }

  onSearchChange(e : any) {
    this.generalSettingService.getAllTaxGroupPaginated(e.target.value,new PageInfo());
    this.generalSettingService.taxGroupList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }
  exportClick() {
    this.exportTaxGroupData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportTaxGroupData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.generalSettingService.exportTaxGroupData(searchTerm , sortBy , sortColumn);

    const columns = [
      { name: 'code', headerText:('TaxGroup.Code') },
      { name: 'name', headerText:('TaxGroup.Name') },
      { name: 'countryName', headerText:('TaxGroup.CountryName') },
    ];
    this.generalSettingService.exportsTaxGroupDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);

    });
  }

  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }
 async Delete(id: number) {
    const deleted =await this.generalSettingService.deleteTaxGroup(id);
    if( deleted)
      {
        const index = this.tableData.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.tableData.splice(index, 1);
    }
      }
  }
}
