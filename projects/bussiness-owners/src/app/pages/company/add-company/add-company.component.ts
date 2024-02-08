import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogService } from 'shared-lib';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyOptions = [
    { value: '1', label: 'USD' },
    { value: '2', label: 'EUR' },
    { value: '4', label: 'EGP' },
    { value: '5', label: 'SAR' },
  ];
  industryOptions = [
    { value: '1', label: 'Technology' },
    { value: '2', label: 'Finance' },
    { value: '4', label: 'Healthcare' },
    { value: '5', label: 'Retail' },
  ];

  constructor(
    private formBuilder: FormBuilder,
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

  ngOnInit() {}

  onSubmit() {
    if (!this.companyForm.valid) this.companyForm.markAllAsTouched();
    this.addCompanyInfo();
  }

  addCompanyInfo() {
    if (this.companyForm.valid) {
      const companyInfo = this.companyForm.value;
      this.logService.log('Company Information:', companyInfo);
    }
  }
  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}
