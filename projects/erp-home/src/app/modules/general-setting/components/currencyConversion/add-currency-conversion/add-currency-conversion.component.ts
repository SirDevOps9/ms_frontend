import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto } from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-currency-conversion',
  templateUrl: './add-currency-conversion.component.html',
  styleUrl: './add-currency-conversion.component.scss'
})
export class AddCurrencyConversionComponent {
  currencies: CountryDto[]=[];
  addCurrencyForm: FormGroup;
  countries: CountryDto[] = [];
  accountsList: { id: number; name: string }[] = [];
  sameCurrency:boolean=false
  fromCurrency:number
  toCurrency:number

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService ,
    private generalSettingService :GeneralSettingService,

  ) {

  }
  ngOnInit() {
    this.getCurrencies();
    this.initializeTagForm();
    this.addCurrencyForm.controls['fromCurrencyRate'].valueChanges.subscribe(value => {
      this.updateReversedRate(value);
    });
    this.addCurrencyForm.controls['fromCurrencyId'].valueChanges.subscribe(value => {
      this.fromCurrency=value
      this.checkSameCurrency();
    });
    this.addCurrencyForm.controls['toCurrencyId'].valueChanges.subscribe(value => {
      this.toCurrency=value
      this.checkSameCurrency();
    });
  }

  initializeTagForm() {
    this.addCurrencyForm = this.fb.group({
      fromCurrencyId: new FormControl('',customValidators.required),
      fromCurrencyRate: new FormControl('',[customValidators.required, customValidators.nonZero,customValidators.nonNegativeNumbers]),
      toCurrencyId: new FormControl('',customValidators.required),
      note: new FormControl(''),
      reversedRate: [{ value: null, disabled: true }],
    });
  }

  save() {
    if(!this.sameCurrency){    
    if (!this.formsService.validForm(this.addCurrencyForm, false)) return;
       this.generalSettingService.addCurrencyConversion(this.addCurrencyForm.value , this.ref)
    }
  }

  close() {
    this.ref.close();
  }
  getCurrencies() {
    this.generalSettingService.getCurrencies('');
    this.generalSettingService.currencies.subscribe((res:any) => {
      this.currencies = res;
    });
  }
  updateReversedRate(fromCurrencyRate: number): void {
    if(fromCurrencyRate>0){
      const reversedRate = fromCurrencyRate ? (1 / fromCurrencyRate).toFixed(10) : null;
      this.addCurrencyForm.controls['reversedRate'].setValue(reversedRate);
    }else{
      this.addCurrencyForm.controls['reversedRate'].setValue(null);
    }
  }
  checkSameCurrency(){
    if (this.toCurrency == this.fromCurrency) {
      this.sameCurrency=true
    }else{
      this.sameCurrency=false

    }
  }
}
