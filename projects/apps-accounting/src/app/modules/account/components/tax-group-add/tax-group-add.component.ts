import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { AddTaxGroupDto, CountryDto } from '../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tax-group-add',
  templateUrl: './tax-group-add.component.html',
  styleUrls: ['./tax-group-add.component.scss'],
})
export class TaxGroupAddComponent implements OnInit {
  taxGroupForm: FormGroup;
  countries: CountryDto[] = [];

  constructor(
    private accountService: AccountService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private formsService: FormsService,
    private title: Title,
    private langService: LanguageService
  ) {
    this.title.setTitle(this.langService.transalte('TaxGroup.AddTaxGroup'));

  }

  ngOnInit() {
    this.initializeTagForm();
    this.loadCountries();
  }

  loadCountries() {
    this.accountService.loadCountries();
    this.accountService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  initializeTagForm() {
    this.taxGroupForm = this.fb.group({
      code: new FormControl('', [customValidators.required,customValidators.length(1,5)]),
      name: new FormControl('', customValidators.required),
      countryCode: new FormControl(null, customValidators.required),
    });
  }

  save() {
    if (!this.formsService.validForm(this.taxGroupForm, false)) return;
    const taxGroupDto: AddTaxGroupDto = this.taxGroupForm.value;
    //taxGroupDto.branchId = 'd69e6813-2646-41e7-a56c-538b7f91da39';
    //taxGroupDto.companyId = '98c91af6-16f4-477f-9b4a-db046a04b525';
    this.accountService.addTaxGroup(taxGroupDto, this.ref);
  }

  close() {
    this.ref.close();
  }
}
