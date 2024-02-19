import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService, LogService, ToasterService } from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/drop-down';
import { AddCompanyDto } from '../../../models/company/add-company';
import { MobileCodeDropdownDto } from '../../../models/company/mobile-code-drop-down';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-add-compny',
  templateUrl: './add-compny.component.html',
  styleUrls: ['./add-compny.component.css'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];
  mobileCodeDropDown: MobileCodeDropdownDto[];

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private logService: LogService,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {
    this.companyForm = this.formBuilder.group({
      subdomain: ['', Validators.required],
      companyName: ['', Validators.required],
      industry: ['', Validators.required],
      currency: ['', Validators.required],
      website: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      mobile: ['', Validators.required],
      MobileNumberCode: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getDropDown();
  }
  

  onSubmit() {
    if (!this.companyForm.valid) return;
    this.addCompany();
  }

  addCompanyInfo() {
    const companyInfo = this.companyForm.value;
    this.logService.log('Company Information:', companyInfo);
  }

  getDropDown(){
    combineLatest([
      this.companyService.getDropDown(),
      this.companyService.getMobileCodeDropDown()
    ]).subscribe({
      next: ([resDropdown, resMobileCode]) => {
        this.currencyDropDown = resDropdown.response.currencyDropdown;
        this.industryDropDown = resDropdown.response.industryDropdown;
        this.logService.log(
          this.industryDropDown,
          'industry Information:'
        );
        this.logService.log(
          this.currencyDropDown,
          'currency Information:'
        );

        this.mobileCodeDropDown = resMobileCode.response;
        this.logService.log(
          this.mobileCodeDropDown,
          'mobileCodeDropdownDto Information:'
        );
      },
    });
  }
  // getDropDown() {
  //   this.companyService.getDropDown().subscribe({
  //     next: (res) => {
  //       this.currencyDropDown = res.response.currencyDropdown;
  //       this.industryDropDown = res.response.industryDropdown;
  //       this.logService.log(
  //         res.response.industryDropdown,
  //         'industry Information:'
  //       );
  //       this.logService.log(
  //         res.response.currencyDropdown,
  //         'currency Information:'
  //       );
  //     }
  //   });
  // }

  // getMobileCodeDropDown(){
  //   this.companyService.getMobileCodeDropDown().subscribe({
  //     next: (res)=>{
  //       this.mobileCodeDropDown = res.response;
  //       this.logService.log(
  //         res.response,
  //         'mobileCodeDropdownDto Information:'
  //       );
  //     }
  //   })
  // }

  addCompany() {
    const request: AddCompanyDto = {
      name: this.companyForm.get('companyName')?.value,
      subdomain: this.companyForm.get('subdomain')?.value,
      website: this.companyForm.get('website')?.value,
      address: this.companyForm.get('address')?.value,
      mobileNumberCode: this.companyForm.get('MobileNumberCode')?.value,
      mobileNumber: this.companyForm.get('mobile')?.value,
      email: this.companyForm.get('companyEmail')?.value,
      industry: this.companyForm.get('industry')?.value,
      currency: this.companyForm.get('currency')?.value,
    };

    this.companyService.addCompany(request).subscribe({
      next: (response) => {
        this.logService.log(response, 'Company added successfully:');
        this.toasterService.showSuccess(
          'Success',
          this.languageService.transalte('Company.CompanyAddedSuccessfully')
        );
      }
    }

    );
  }


  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}
