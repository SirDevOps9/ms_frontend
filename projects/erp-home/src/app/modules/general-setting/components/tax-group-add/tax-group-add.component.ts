import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { GeneralSettingService } from '../../general-setting.service';
import { CountryDto } from '../../models';
import { AddTaxGroupDto } from '../../models/add-tax-group-dto';

@Component({
  selector: 'app-tax-group-add',
  templateUrl: './tax-group-add.component.html',
  styleUrls: ['./tax-group-add.component.scss'],
})
export class TaxGroupAddComponent implements OnInit {
  taxGroupForm: FormGroup;
  countries: CountryDto[] = [];

  constructor(
    private generalSettingService: GeneralSettingService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('TaxGroup.AddTaxGroup'));

  }
  defaultCountry: {countryName :string}

  ngOnInit() {
    this.initializeTagForm();
    // this.loadCountries();
    this.GetCompanyCountry();
  }

  loadCountries() {
    this.generalSettingService.loadCountries();
    this.generalSettingService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  GetCompanyCountry() {
    this.generalSettingService.getCountry();
    this.generalSettingService.countryString$.subscribe({
      next: (res) => {
        this.defaultCountry = res;
        if(res){
          this.taxGroupForm.get('countryName')?.patchValue(res.countryName)
        }
        
      },
    });
  }
  initializeTagForm() {
    this.taxGroupForm = this.fb.group({
      code: new FormControl('', [customValidators.required,customValidators.length(1,5)]),
      name: new FormControl('', customValidators.required),
      countryName: new FormControl(''),
    });
  }

  save() {
    if (!this.formsService.validForm(this.taxGroupForm, false)) return;
    const taxGroupDto: AddTaxGroupDto = this.taxGroupForm.value;
    delete taxGroupDto?.countryName
    //taxGroupDto.branchId = 'd69e6813-2646-41e7-a56c-538b7f91da39';
    //taxGroupDto.companyId = '98c91af6-16f4-477f-9b4a-db046a04b525';
    this.generalSettingService.addTaxGroup(taxGroupDto, this.ref);
  }

  close() {
    this.ref.close();
  }
}
