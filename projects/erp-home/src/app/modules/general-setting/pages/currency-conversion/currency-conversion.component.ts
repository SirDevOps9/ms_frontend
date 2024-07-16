import { Component } from '@angular/core';
import { GeneralSettingService } from '../../general-setting.service';
import { customValidators, FormsService, PageInfo } from 'shared-lib';
import { CountryDto, CurrencyConversionDto } from '../../models';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-currency-conversion',
  templateUrl: './currency-conversion.component.html',
  styleUrl: './currency-conversion.component.scss'
})
export class CurrencyConversionComponent {
  tableData: CurrencyConversionDto[];
  currencies: CountryDto[]=[];
  editCurrencyForm: FormGroup;


  clonedProducts: { [s: string]: any } = {};

  constructor(
    private generalSettingService:GeneralSettingService,
    private fb: FormBuilder,
    private formsService: FormsService ,
    ) {}

  ngOnInit() {
    this.getCurrencyConversionList()
    this.getCurrencies()
  }

  onRowEditInit(product: any) {
    console.log(product ,"sssssssssssssss");
    
      this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: any) {
      if (product.price > 0) {
          delete this.clonedProducts[product.id as string];
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      } else {
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
      }
  }

  onRowEditCancel(product: any, index: number) {
      this.tableData[index] = this.clonedProducts[product.id as string];
      delete this.clonedProducts[product.id as string];
  }

  getSeverity(status: string) {
      switch (status) {
          case 'INSTOCK':
              return 'success';
          case 'LOWSTOCK':
              return 'warning';
          case 'OUTOFSTOCK':
              return 'danger';
      }
  }
  getCurrencyConversionList(){
    this.generalSettingService.getCurrencyConversionList('', new PageInfo())
    this.generalSettingService.currencyConversionDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    }
)}
getCurrencies() {
  this.generalSettingService.getCurrencies('');
  this.generalSettingService.currencies.subscribe((res:any) => {
    this.currencies = res;
  });
}
initializeTagForm() {
  this.editCurrencyForm = this.fb.group({
    fromCurrencyId: new FormControl(''),
    fromCurrencyRate: new FormControl(''),
    toCurrencyId: new FormControl(''),
    note: new FormControl(''),
    
      });
}
}

