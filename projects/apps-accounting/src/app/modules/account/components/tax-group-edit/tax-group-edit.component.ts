import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from '../../account.service';
import { customValidators, LanguageService } from 'shared-lib';
import { CountryDto, TaxGroupDto } from '../../models';
import { Title } from '@angular/platform-browser';

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

  constructor(
    private accountService: AccountService,
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
      id: new FormControl('', customValidators.required),
      code: new FormControl('', customValidators.required),
      name: new FormControl('', customValidators.required),
      countryCode: new FormControl(null, customValidators.required),
    });
  }

  currentTaxGroup() {
    console.log('Id', this.Id);
    this.accountService.getTaxGroupById(parseInt(this.Id));
    this.accountService.currentTaxGroup.subscribe((response) => {
      this.taxGroupForm.patchValue(response);
    });
  }

  save() {
    if (!this.taxGroupForm.valid) return;
    const taxGroupDto: TaxGroupDto = this.taxGroupForm.value;
    this.accountService.editTaxGroup(taxGroupDto, this.ref);
  }

  close() {
    this.ref.close();
  }
}
