import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, LanguageService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { CountryDto } from '../../models';
import { GeneralSettingService } from '../../general-setting.service';
import { TaxGroupDto } from '../../models/tax-group-dto';

@Component({
  selector: 'app-tax-group-edit',
  templateUrl: './tax-group-edit.component.html',
  styleUrls: ['./tax-group-edit.component.scss'],
})
export class TaxGroupEditComponent implements OnInit {
  taxGroupForm: FormGroup;
  countries: CountryDto[] = [];
  get Id(): string {
    return this.config?.data;
  }
  defaultCountry: {countryName :string}

  constructor(
    private generalSettingService: GeneralSettingService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('TaxGroup.EditTaxGroup'));

  }

  ngOnInit() {
    this.initializeTagForm();
    this.currentTaxGroup();
    // this.loadCountries();
    this.GetCompanyCountry();

  }
  // loadCountries() {
  //   this.generalSettingService.loadCountries();
  //   this.generalSettingService.countries.subscribe({
  //     next: (res) => {
  //       this.countries = res;
  //     },
  //   });
  // }
  GetCompanyCountry() {
    this.generalSettingService.getCountry();
    this.generalSettingService.countryString$.subscribe({
      next: (res) => {
        this.defaultCountry = res;
        if(res){
          this.taxGroupForm.get('CountryName')?.patchValue(res.countryName)
        }
        
      },
    });
  }
  initializeTagForm() {
    this.taxGroupForm = this.fb.group({
      id: new FormControl('', customValidators.required),
      code: new FormControl('', [customValidators.required,customValidators.length(1,5)]),
      name: new FormControl('', customValidators.required),
      countryName: new FormControl(null,),
    });
  }

  currentTaxGroup() {
    this.generalSettingService.getTaxGroupById(parseInt(this.Id));
    this.generalSettingService.currentTaxGroup.subscribe((response) => {
      
      
      this.taxGroupForm.patchValue(response);
    });
  }

  save() {
    if (!this.taxGroupForm.valid) return;
    const taxGroupDto: TaxGroupDto = this.taxGroupForm.value;
    this.generalSettingService.editTaxGroup(taxGroupDto, this.ref);
  }

  close() {
    this.ref.close();
  }
}
