import { Component } from '@angular/core';
import { PageInfoResult, MenuModule, PageInfo, lookupDto, LanguageService } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CurrencyDefinitionDto, currencyListDto } from '../../../models';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-currency-definition',
  templateUrl: './currency-definition.component.html',
  styleUrl: './currency-definition.component.scss',
})
export class CurrencyDefinitionComponent {
  constructor(
    private generalSettingService: GeneralSettingService,
  ) {
  }
  exportColumns: lookupDto[];

  tableData: currencyListDto[];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  ref: DynamicDialogRef;
  exportData: CurrencyDefinitionDto[];
  columns: [
    {
      name: 'code';
      headerText: 'code';
    },
    {
      name: 'name';
      headerText: 'name';
    },

    {
      name: 'symbol';
      headerText: 'symbol';
    },
    {
      name: 'subUnit';
      headerText: 'subUnit';
    },
    {
      name: 'countryName';
      headerText: 'country Name';
    },

    {
      name: 'id';
      headerText: 'Actions';
    }
  ];

  ngOnInit() {
    this.getCurrencyList();
    this.exportColumns = this.columns?.map((col) => ({
      id: col.headerText,
      name: col.name,
    }));
  }
  exportClick(e?: Event) {
    this.exportcurrencyDefinitionData(this.searchTerm);
  }
  exportcurrencyDefinitionData(searchTerm: string) {
    this.generalSettingService.exportcurrencyDefinitionData(searchTerm);
    this.generalSettingService.exportcurrencyDefinitionDataSourceObservable.subscribe((res) => {
      this.exportData = res;
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
