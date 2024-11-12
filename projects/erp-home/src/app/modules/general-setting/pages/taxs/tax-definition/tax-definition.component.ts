import { TaxDefinitionAddComponent } from './../../../components/tax-definition-add/tax-definition-add.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { TaxDefinitionEditComponent } from '../../../components/tax-definition-edit/tax-definition-edit.component';
import { GeneralSettingService } from '../../../general-setting.service';
import { TaxDto } from '../../../models/tax-dto';
import { ExportTaxDto } from '../../../models/export-tax-dto';

@Component({
  selector: 'app-tax-definition',
  templateUrl: './tax-definition.component.html',
  styleUrl: './tax-definition.component.scss',
})
export class TaxDefinitionComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private generalSettingService: GeneralSettingService
  ) {}

  tableData: TaxDto[];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  SortBy?: number
  SortColumn?:string
  exportData: ExportTaxDto[];
  exportColumns: lookupDto[] = [
    {
      id: 'code',
      name: 'Id',
    },

    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'ratio',
      name: 'Ratio',
    },
    {
      id: 'accountName',
      name: 'Account',
    },
    {
      id: 'taxGroupName',
      name: 'Tax Group',
    },
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
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  exportTaxesData() {
    this.generalSettingService.exportTaxesData(this.searchTerm,this.SortBy,this.SortColumn);
    this.generalSettingService.exportsTaxesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}
