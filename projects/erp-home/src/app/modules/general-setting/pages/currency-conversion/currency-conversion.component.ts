import { Component } from '@angular/core';
import { PageInfoResult, MenuModule, PageInfo, lookupDto } from 'shared-lib';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralSettingService } from '../../general-setting.service';
import { CountryDto, CurrencyConversionDto, currencyListDto, ExportCurrencyConversionDto } from '../../models';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss'
})
export class CurrencyConversionComponent {
  constructor(
    private generalSettingService: GeneralSettingService,


  ) {}
  tableData : CurrencyConversionDto[];
  currencies: CountryDto[]=[];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  ref: DynamicDialogRef;
  exportColumns: lookupDto[];
  mappedExportData: CurrencyConversionDto[];

  exportData: ExportCurrencyConversionDto[];

  columns: [
                   
    {
      name: 'fromCurrencyName',
      headerText: 'Currency Name',
    },
    {
      name: 'fromCurrencyRate',
      headerText: 'Currency Rate',
    },
  
    {
      name: 'toCurrencyName',
      headerText: 'To Currency',
    },
    {
      name: 'reversedRate',
      headerText: 'Reversed Rate' ,
    },
    {
      name: 'note',
      headerText: 'Notes' ,
    },

    {
      name: 'id',
      headerText: 'Actions',

    },
  ]
  ngOnInit() {
    this.getCurrencyConversionList()
    this.getCurrencies()
    this.exportColumns = this.columns?.map((col) => ({
      id: col.headerText,
      name: col.name,
    }));

  }
  exportClick(e?: Event){
    this.exportcurrencyData(this.searchTerm);
    
  }
  exportcurrencyData(searchTerm: string) {
    this.generalSettingService.exportcurrencyData(searchTerm);
    this.generalSettingService.exportsCurrencyListDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
  getCurrencyConversionList(){
    this.generalSettingService.getCurrencyConversionList('', new PageInfo())
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        this.mappedExportData = this.tableData.map(elem=>{
          let {id , ...args} = elem
          return args
          
        })
        console.log(this.mappedExportData)
      },
    }
)
this.generalSettingService.currentPageInfo.subscribe((currentPageInfo) => {
  this.currentPageInfo = currentPageInfo;
});}
getCurrencies() {
  this.generalSettingService.getCurrencies('');
  this.generalSettingService.currencies.subscribe((res:any) => {
    this.currencies = res;
  });
}
  Edit(id : number) {
  this.generalSettingService.openCurrencyConversionEdit(id)

  }

 
  onPageChange(pageInfo: PageInfo) {
  
    this.generalSettingService.getCurrencyConversionList('',pageInfo)
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    })
  }



  onSearchChange(event : any) {
    this.generalSettingService.getCurrencyConversionList(event, new PageInfo())
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    }
)

  }


  onDelete(id: number) {
    this.generalSettingService.deleteCurrencyConversion(id);
  }
  addNew(){
    this.generalSettingService.openCurrencyConversionAdded()
  }



 
}