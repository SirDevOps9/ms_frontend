import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  MaxLengthValidator,
  Validators,
} from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../../general-setting.service';
import { CountryDto } from '../../../models';
import { Title } from '@angular/platform-browser';
import { NoChildrenAccountsComponent } from '../../noChildrenAccounts/nochildaccounts.component';
@Component({
  selector: 'app-edit-currency-definition',
  templateUrl: './edit-currency-definition.component.html',
  styleUrl: './edit-currency-definition.component.scss',
})
export class EditCurrencyDefinitionComponent {

  olddata: any;
  editCurrencyForm: FormGroup;
  currencyId: number;
  countries: CountryDto[] = [];
  accountsList: { id: number; name: string }[] = [];

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService,
    private generalSettingService: GeneralSettingService,
    public config: DynamicDialogConfig,
    private dialog: DialogService,

  ) {
  }
  ngOnInit() {
    this.currencyId = this.currentCurrencyId();

    this.getChildrenAccountsDropDown();
    this.loadCountries();
    this.getCurrencyById(this.currencyId);

    this.initializeTagForm();
  }
  currentCurrencyId(): number {
    return this.config.data.Id;
  }
  initializeTagForm() {
    this.editCurrencyForm = this.fb.group({
      code: new FormControl(''),
      name: new FormControl('', [customValidators.required, customValidators.length(1, 50)]),
      symbol: new FormControl('', [customValidators.required, customValidators.length(1, 5)]),
      subUnit: new FormControl('', [customValidators.length(1, 25)]),
      countryCode: new FormControl('', [customValidators.required]),
      differenceAccount: new FormControl(null),
    });
  }

  save() {
    if (!this.formsService.validForm(this.editCurrencyForm, false)) return;
    const currencyEdited = {
      ...this.editCurrencyForm.value,
      id: this.currencyId,
    };
    this.generalSettingService.EditCurrency(currencyEdited, this.ref);
  }

  close() {
    this.ref.close();
  }
  loadCountries() {
    this.generalSettingService.loadCountries();
    this.generalSettingService.countries.subscribe({
      next: (res: any) => {
        this.countries = res;
      },
    });
  }
  getChildrenAccountsDropDown() {
    this.generalSettingService.getChildrenAccountsDropDown();
    this.generalSettingService.sendChildrenAccountsDropDownDataObservable.subscribe((res) => {
      this.accountsList = res;
    });
  }
  getCurrencyById(id: number) {
    this.generalSettingService.getCurrencyById(id);
    this.generalSettingService.currencyDataByIDObservable.subscribe((res) => {
      this.olddata = res;
      this.editCurrencyForm?.patchValue({ ...res });
    });
  }
  openDialog() {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.editCurrencyForm.get('differenceAccount')?.setValue(r.id);
      }
    });
    }
    
}
