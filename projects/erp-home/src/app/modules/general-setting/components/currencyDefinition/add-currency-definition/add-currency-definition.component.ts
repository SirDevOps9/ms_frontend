import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto, CurrencyDefinitionDto } from '../../../models';
import { Title } from '@angular/platform-browser';
import { NoChildrenAccountsComponent } from '../../noChildrenAccounts/nochildaccounts.component';

@Component({
  selector: 'app-add-currency-definition',
  templateUrl: './add-currency-definition.component.html',
  styleUrl: './add-currency-definition.component.scss'
})
export class AddCurrencyDefinitionComponent   {
  addCurrencyForm: FormGroup;
  countries: CountryDto[] = [];
  accountsList: { id: number; name: string }[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService ,
    private generalSettingService :GeneralSettingService,
    private dialog: DialogService,
  ) {
  }
  ngOnInit() {
    this.getChildrenAccountsDropDown();
    this.loadCountries();
    this.initializeTagForm();
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
  openDialog() {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.addCurrencyForm.get('differenceAccount')?.setValue(r.id);
      }
    });
    }

}
