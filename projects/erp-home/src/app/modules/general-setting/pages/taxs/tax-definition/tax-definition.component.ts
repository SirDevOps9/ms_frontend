import { TaxDefinitionAddComponent } from './../../../components/tax-definition-add/tax-definition-add.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { TaxDefinitionEditComponent } from '../../../components/tax-definition-edit/tax-definition-edit.component';
import { GeneralSettingService } from '../../../general-setting.service';
import { TaxDto } from '../../../models/tax-dto';
import { ExportTaxDto } from '../../../models/export-tax-dto';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-tax-definition',
  templateUrl: './tax-definition.component.html',
  styleUrl: './tax-definition.component.scss',
})
export class TaxDefinitionComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private generalSettingService: GeneralSettingService,
    private exportService:ExportService
  ) {}

  tableData: TaxDto[];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  SortBy?: number
  SortByAll:SortTableEXport

  SortColumn?:string
  exportData: ExportTaxDto[];
  exportColumns: lookupDto[] = [
  ];

  ngOnInit() {
    this.initTaxData();
  }

  initTaxData() {
    this.generalSettingService.getAllTaxes('', new PageInfo());

    this.generalSettingService.taxesDefintionList.subscribe((res) => {
      this.tableData = res;
    });
    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getAllTaxes('', pageInfo);

    this.generalSettingService.taxesDefintionList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(TaxDefinitionAddComponent, {
      width: '800px',
      height: '500px',
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxData();
    });
  }

  onEdit(data: TaxDto) {
    const dialogRef = this.dialog.open(TaxDefinitionEditComponent, {
      width: '600px',
      height: '550px',
      data: data,
    });
    dialogRef.onClose.subscribe(() => {
      this.initTaxData();
    });
  }

  onSearchChange(e: any) {
    this.generalSettingService.getAllTaxes(e.target.value, new PageInfo());
    this.generalSettingService.taxesDefintionList.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deleteTax(id);
  }
  exportClick() {
    this.exportTaxesData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }
  exportTaxesData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.generalSettingService.exportTaxesData(searchTerm , sortBy , sortColumn);

    const columns = [
      { name: 'code', headerText:('Tax.Id') },
      { name: 'name', headerText:('Tax.Name') },
      { name: 'ratio', headerText:('Tax.Ratio') },
      { name: 'accountName', headerText:('Tax.Account') },
      { name: 'taxGroupName', headerText:('Tax.TaxGroup') },
    ];
    this.generalSettingService.exportsTaxesDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);

    });
  }
  exportClickBySort(e:{SortBy: number; SortColumn: string}){
     this.SortByAll={
      SortBy: e.SortBy,
      SortColumn:e.SortColumn
     }
  }
}
