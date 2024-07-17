import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto } from '../../../models';

@Component({
  selector: 'app-edit-currency-conversion',
  templateUrl: './edit-currency-conversion.component.html',
  styleUrl: './edit-currency-conversion.component.scss'
})
export class EditCurrencyConversionComponent {
  currencies: CountryDto[]=[];

  olddata: any;
  editCurrencyForm: FormGroup;
  currencyId: number;
  countries: CountryDto[] = [];
  accountsList: { id: number; name: string }[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService ,
    private generalSettingService :GeneralSettingService,
    public config: DynamicDialogConfig,

  
  ) {}
  ngOnInit() {
    this.currencyId=this.currentCurrencyId()
    
     ///////////
     this.getCurrencies();
     this.getCurrencyConversionById(this.currencyId)
     this.initializeTagForm();


  }
  currentCurrencyId(): number {
    return this.config.data.Id;
  }
  initializeTagForm() {
    this.editCurrencyForm = this.fb.group({
      fromCurrencyId: new FormControl(''),
      fromCurrencyRate: new FormControl(''),
      toCurrencyId: new FormControl(''),
      note: new FormControl(''),
      symbol: new FormControl(''),
      
        });
  }

  save() {
    if (!this.formsService.validForm(this.editCurrencyForm, false)) return;
    const currencyEdited = {
      ...this.editCurrencyForm.value,
      id:this.currencyId
    } 
        this.generalSettingService.EditCurrency(currencyEdited, this.ref)      
       
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
  getCurrencyConversionById(id:number){
    this.generalSettingService.getCurrencyConversionById(id);
    this.generalSettingService.currencyConversionDataByIDObservable.subscribe(res=>{
        this.olddata = res;
        this.editCurrencyForm.patchValue({ ...res });
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

