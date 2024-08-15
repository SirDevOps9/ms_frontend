import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto } from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-currency-conversion',
  templateUrl: './edit-currency-conversion.component.html',
  styleUrl: './edit-currency-conversion.component.scss'
})
export class EditCurrencyConversionComponent {
  currencies: CountryDto[] = [];
  olddata: any;
  editCurrencyForm: FormGroup;
  currencyId: number;
  countries: CountryDto[] = [];
  accountsList: { id: number; name: string }[] = [];
  sameCurrency:boolean=false
  fromCurrency:number
  toCurrency:number
  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService,
    private generalSettingService: GeneralSettingService,
    public config: DynamicDialogConfig,

  ) {    
  }
  ngOnInit() {
    this.currencyId = this.currentCurrencyId()
    this.getCurrencies();
    this.getCurrencyConversionById(this.currencyId)
    this.initializeTagForm();
    this.editCurrencyForm.controls['fromCurrencyRate'].valueChanges.subscribe(value => {
      this.updateReversedRate(value);
    });
    this.editCurrencyForm.controls['fromCurrencyId'].valueChanges.subscribe(value => {
      this.fromCurrency=value
      this.checkSameCurrency();
    });
    this.editCurrencyForm.controls['toCurrencyId'].valueChanges.subscribe(value => {
      this.toCurrency=value
      this.checkSameCurrency();
    });

  }
  currentCurrencyId(): number {
    return this.config.data.Id;
  }
  initializeTagForm() {
    this.editCurrencyForm = this.fb.group({
      fromCurrencyId: new FormControl('',customValidators.required),
      fromCurrencyRate: new FormControl('',[customValidators.required, customValidators.nonZero,customValidators.nonNegativeNumbers]),
      toCurrencyId: new FormControl('',customValidators.required),
      note: new FormControl(''),
      reversedRate: [{ value: null, disabled: true }],
    });
  }

  save() {
    if(!this.sameCurrency){  
    if (!this.formsService.validForm(this.editCurrencyForm, false)) return;
    const currencyEdited = {
      ...this.editCurrencyForm.value,
      id: this.currencyId
    }
    this.generalSettingService.EditCurrencyConversion(currencyEdited, this.ref)
  }

  }

  close() {
    this.ref.close();
  }
  getCurrencyConversionById(id: number) {
    this.generalSettingService.getCurrencyConversionById(id);
    this.generalSettingService.currencyConversionDataByIDObservable.subscribe(res => {
      if (res) {
        this.olddata = res;
        this.editCurrencyForm?.patchValue({ ...res });
      }

    })
  }
  getCurrencies() {
    this.generalSettingService.getCurrencies('');
    this.generalSettingService.currencies.subscribe((res: any) => {
      this.currencies = res;
    });
  }
  updateReversedRate(fromCurrencyRate: number): void {
    if(fromCurrencyRate>0){
      const reversedRate = fromCurrencyRate ? (1 / fromCurrencyRate).toFixed(10) : null;
      this.editCurrencyForm.controls['reversedRate'].setValue(reversedRate);
    }else{
      this.editCurrencyForm.controls['reversedRate'].setValue(null);
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

