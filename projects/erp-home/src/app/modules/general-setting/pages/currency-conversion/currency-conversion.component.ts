import { Component } from '@angular/core';
import { PageInfoResult, MenuModule, PageInfo } from 'shared-lib';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralSettingService } from '../../general-setting.service';
import { CountryDto, CurrencyConversionDto, currencyListDto } from '../../models';

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

  ngOnInit() {
    this.getCurrencyConversionList()
    this.getCurrencies()

  }
  getCurrencyConversionList(){
    this.generalSettingService.getCurrencyConversionList('', new PageInfo())
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
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