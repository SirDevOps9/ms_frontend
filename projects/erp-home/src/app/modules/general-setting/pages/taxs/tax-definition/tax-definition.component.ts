import { TaxDefinitionAddComponent } from './../../../components/tax-definition-add/tax-definition-add.component';
import { Component, OnInit, Signal, computed, effect, signal } from '@angular/core';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PageInfoResult,
  MenuModule,
  RouterService,
  PageInfo,
  lookupDto,
  LanguageService,
} from 'shared-lib';
import { TaxDefinitionEditComponent } from '../../../components/tax-definition-edit/tax-definition-edit.component';
import { Title } from '@angular/platform-browser';
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
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private generalSettingService: GeneralSettingService,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('Tax.Title'));
  }

  tableData: TaxDto[];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

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

  exportTaxesData(searchTerm: string) {
    this.generalSettingService.exportTaxesData(searchTerm);
    this.generalSettingService.exportsTaxesDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}
