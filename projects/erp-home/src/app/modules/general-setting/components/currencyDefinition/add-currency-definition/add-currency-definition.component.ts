import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto } from '../../../models';

@Component({
  selector: 'app-add-currency-definition',
  templateUrl: './add-currency-definition.component.html',
  styleUrl: './add-currency-definition.component.scss'
})
export class AddCurrencyDefinitionComponent   {
  addCurrencyForm: FormGroup;
  countries: CountryDto[] = [];
  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService ,
    private generalSettingService :GeneralSettingService
  
  ) {}
  ngOnInit() {
    this.initializeTagForm();
    this.loadCountries();
  }

  initializeTagForm() {
    this.addCurrencyForm = this.fb.group({
      code: new FormControl(''),
      name: new FormControl('', customValidators.required),
      symbol: new FormControl('', customValidators.required),
      subUnit: new FormControl('', customValidators.required),
      countryCode: new FormControl('', customValidators.required),
      differenceAccount: new FormControl('', customValidators.required),
        });
  }

  save() {
    if (!this.formsService.validForm(this.addCurrencyForm, false)) return;
       console.log(this.addCurrencyForm);
       
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

}
