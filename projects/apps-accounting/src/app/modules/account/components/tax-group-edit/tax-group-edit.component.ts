import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from '../../account.service';
import { customValidators } from 'shared-lib';
import { TaxGroupDto } from '../../models';
import { SalesService } from 'projects/erp-home/src/app/modules/Sales/sales.service';
import { CountryDto } from 'projects/apps-hr/src/app/modules/employee/models';

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
    private salesService: SalesService
  
  ) {}

  ngOnInit() {
    this.initializeTagForm();
    this.currentTaxGroup();
    this.loadCountries();
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
      countryCode: new FormControl('', customValidators.required)
        });
  }

  currentTaxGroup() {
    console.log('Id', this.Id);
    this.accountService.getTaxGroupById(parseInt(this.Id));
    this.accountService.currentTaxGroup.subscribe((response) => {
      this.taxGroupForm.patchValue({
        id: response.id,
        code: response.code,
        name: response.name,
        countryCode: response.countryCode
      });
  });
  }

  save() {
    if(!this.taxGroupForm.valid) return;
    const taxGroupDto :TaxGroupDto=this.taxGroupForm.value;
    this.accountService.editTaxGroup(taxGroupDto,this.ref);
  }

  loadCountries() {
    this.salesService.loadCountries();
    this.salesService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }

  close() {
    this.ref.close();
  }
}
