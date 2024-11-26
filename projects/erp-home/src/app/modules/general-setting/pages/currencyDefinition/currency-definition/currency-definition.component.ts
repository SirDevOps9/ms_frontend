import { Component } from '@angular/core';
import { PageInfoResult, MenuModule, PageInfo, lookupDto, LanguageService } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CurrencyDefinitionDto, currencyListDto } from '../../../models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';

@Component({
  selector: 'app-currency-definition',
  templateUrl: './currency-definition.component.html',
  styleUrl: './currency-definition.component.scss',
})
export class CurrencyDefinitionComponent {
  constructor(
    private generalSettingService: GeneralSettingService,
    private exportService:ExportService
  ) {
  }
  exportColumns: lookupDto[];

  tableData: currencyListDto[];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  ref: DynamicDialogRef;
  exportData: CurrencyDefinitionDto[];


  ngOnInit() {
    this.getCurrencyList();
  }
  exportClick(e?: Event) {
    this.exportcurrencyDefinitionData(this.searchTerm);
  }
  exportcurrencyDefinitionData(searchTerm: string) {
    this.generalSettingService.exportcurrencyDefinitionData(searchTerm);
    const columns = [
      { name: 'code', headerText:('currencyDefinition.code') },
      { name: 'name', headerText:('currencyDefinition.name') },
      { name: 'symbol', headerText:('currencyDefinition.sympol') },
      { name: 'subUnit', headerText:('currencyDefinition.Subunit') },
      { name: 'countryName', headerText:('currencyDefinition.country') },

    ];
    this.generalSettingService.exportcurrencyDefinitionDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);

    });
  }

  Edit(id: number) {
    this.generalSettingService.openCurrencyEdit(id);
  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getCurrencyList('', pageInfo);

    this.generalSettingService.currencyDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange(event: any) {
    this.generalSettingService.getCurrencyList(event, new PageInfo());

    this.generalSettingService.currencyDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deleteCurrency(id);
  }
  addNew() {
    this.generalSettingService.openCurrencyAdded();
  }
  getCurrencyList() {
    this.generalSettingService.getCurrencyList('', new PageInfo());

    this.generalSettingService.currencyDefinitionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
}
