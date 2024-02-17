import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/drop-down';
@Component({
  selector: 'app-add-compny',
  templateUrl: './add-compny.component.html',
  styleUrls: ['./add-compny.component.css']
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private logService: LogService
  ) {
    this.companyForm = this.formBuilder.group({
      subdomain: ['', Validators.required],
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      currency: ['', Validators.required],
      website: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getDropDown();
  }

  onSubmit() {
    if (!this.companyForm.valid) return;
    this.addCompanyInfo();
  }

  addCompanyInfo() {
      const companyInfo = this.companyForm.value;
      this.logService.log('Company Information:', companyInfo);
    
  }
  getDropDown() {
    this.companyService.getDropDown().subscribe((res) => {
      this.currencyDropDown = res.response.currencyDropdown;
      this.industryDropDown = res.response.industryDropdown;
      this.logService.log(
        res.response.industryDropdown,
        'industry Information:'
      );
      this.logService.log(
        res.response.currencyDropdown,
        'currency Information:'
      );
    });
  }
  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}

