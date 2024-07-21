import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, customValidators } from 'shared-lib';
import { AddTaxGroupDto, CountryDto } from '../../models';

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
    private formsService: FormsService
  ) {}

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
      code: new FormControl('', customValidators.required),
      name: new FormControl('', customValidators.required),
      countryCode: new FormControl(null, customValidators.required),
    });
  }

  save() {
    if (!this.formsService.validForm(this.taxGroupForm, false)) return;
    const taxGroupDto: AddTaxGroupDto = this.taxGroupForm.value;
    this.accountService.addTaxGroup(taxGroupDto, this.ref);
  }

  close() {
    this.ref.close();
  }
}
