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
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss',
})
export class CurrencyConversionComponent {
  SortBy?: number;
  SortColumn?: string;
  constructor(private generalSettingService: GeneralSettingService,
    private exportService:ExportService
  ) {}
  tableData: CurrencyConversionDto[];
  currencies: CountryDto[] = [];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  ref: DynamicDialogRef;
  exportColumns:any[]
  mappedExportData: CurrencyConversionDto[];
  SortByAll:SortTableEXport
  exportData: ExportCurrencyConversionDto[];



  ngOnInit() {
    this.getCurrencyConversionList();
    this.getCurrencies();
  }
  exportClick() {
    this.exportcurrencyConversionData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportcurrencyConversionData(searchTerm: string, sortBy?: number, sortColumn?: string){
    this.generalSettingService.exportcurrencyData(searchTerm , sortBy , sortColumn);
    const columns = [
      { name: 'fromCurrencyName', headerText:('currencyConversion.FromCurrency') },
      { name: 'fromCurrencyRate', headerText:('currencyConversion.CurrencyRate') },
      { name: 'toCurrencyName', headerText:('currencyConversion.ToCurrency') },
      { name: 'reversedRate', headerText:('currencyConversion.ReversedRate') },
      { name: 'note', headerText:('currencyConversion.Notes') },

    ];
    this.generalSettingService.exportsCurrencyListDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, columns);
    });
  }

  exportClickBySort(e:{SortBy: number; SortColumn: string}){
    this.SortByAll={
     SortBy: e.SortBy,
     SortColumn:e.SortColumn
    }
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
