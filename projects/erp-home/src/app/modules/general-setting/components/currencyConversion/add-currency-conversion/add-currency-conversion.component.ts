import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto } from '../../../models';

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

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService ,
    private generalSettingService :GeneralSettingService
  
  ) {}
  ngOnInit() {
    this.getChildrenAccountsDropDown();
    this.loadCountries();
    this.initializeTagForm();
    ///////////
    this.getCurrencies();
  }

  initializeTagForm() {
    this.addCurrencyForm = this.fb.group({
      code: new FormControl(''),
      name: new FormControl('', [customValidators.required,customValidators.length(1,50)]),
      symbol: new FormControl('', [customValidators.required,customValidators.length(1,5)]),
      subUnit: new FormControl('',[customValidators.length(1,25)] ),
      countryCode: new FormControl('', [customValidators.required]),
      differenceAccount: new FormControl(null),
        });
  }

  save() {
    if (!this.formsService.validForm(this.addCurrencyForm, false)) return;
       console.log(this.addCurrencyForm);
       
       this.generalSettingService.addCurrency(this.addCurrencyForm.value , this.ref)
       
  }

  close() {
    this.ref.close();
  }
  loadCountries() {
    this.generalSettingService.loadCountries();
    this.generalSettingService.countries.subscribe({
      next: (res:any) => {
        this.countries = res;
      },
    });
  }
  getChildrenAccountsDropDown(){
    this.generalSettingService.getChildrenAccountsDropDown()
    this.generalSettingService.sendChildrenAccountsDropDownDataObservable.subscribe(res=>{
      this.accountsList = res

    })
  }
  ///////////
  getCurrencies() {
    this.generalSettingService.getCurrencies('');
    this.generalSettingService.currencies.subscribe((res:any) => {
      this.currencies = res;
    });
  }

}
