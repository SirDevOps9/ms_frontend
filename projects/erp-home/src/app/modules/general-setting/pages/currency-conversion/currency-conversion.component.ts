import { Component } from '@angular/core';
import { PageInfoResult, MenuModule, PageInfo, lookupDto, LanguageService } from 'shared-lib';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralSettingService } from '../../general-setting.service';
import {
  CountryDto,
  CurrencyConversionDto,
  currencyListDto,
  ExportCurrencyConversionDto,
} from '../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent {
  SortBy?: number;
  SortColumn?: string;
  constructor(private generalSettingService: GeneralSettingService) {}
  tableData: CurrencyConversionDto[];
  currencies: CountryDto[] = [];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  ref: DynamicDialogRef;

  mappedExportData: CurrencyConversionDto[];

  exportData: ExportCurrencyConversionDto[];

  exportColumns: lookupDto[] = [
    {
      id: 'fromCurrencyName',
      name: 'Currency Name',
    },
    {
      id: 'fromCurrencyRate',
      name: 'Currency Rate',
    },

    {
      id: 'toCurrencyName',
      name: 'To Currency',
    },
    {
      id: 'reversedRate',
      name: 'Reversed Rate',
    },
    {
      id: 'note',
      name: 'Notes',
    },

    {
      id: 'id',
      name: 'Actions',
    },
  ];
  ngOnInit() {
    this.getCurrencyConversionList();
    this.getCurrencies();
  }
  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }

  exportClick(){
    this.generalSettingService.exportcurrencyData(this.searchTerm ,this.SortBy,this.SortColumn);
    this.generalSettingService.exportsCurrencyListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
  getCurrencyConversionList() {
    this.generalSettingService.getCurrencyConversionList('', new PageInfo());
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        this.mappedExportData = this.tableData.map((elem) => {
          let { id, ...args } = elem;
          return args;
        });
        console.log(this.mappedExportData);
      },
    });
    this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  getCurrencies() {
    this.generalSettingService.getCurrencies('');
    this.generalSettingService.currencies.subscribe((res: any) => {
      this.currencies = res;
    });
  }
  Edit(id: number) {
    this.generalSettingService.openCurrencyConversionEdit(id);
  }

  onPageChange(pageInfo: PageInfo) {
    this.generalSettingService.getCurrencyConversionList('', pageInfo);
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onSearchChange(event: any) {
    this.generalSettingService.getCurrencyConversionList(event, new PageInfo());
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.generalSettingService.deleteCurrencyConversion(id);
  }
  addNew() {
    this.generalSettingService.openCurrencyConversionAdded();
  }
}
