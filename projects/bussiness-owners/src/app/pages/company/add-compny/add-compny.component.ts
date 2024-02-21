import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LanguageService,
  LoaderService,
  LogService,
  ToasterService,
} from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/dropdown';
import { AddCompanyDto } from '../../../models/company/addcompany';
import { MobileCodeDropdownDto } from '../../../models/company/mobilecodedropdown';
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
  subdoaminDropDown: DropdownItemDto[];

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private logService: LogService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private languageService: LanguageService
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      subdomainName: ['', Validators.required],
      industryId: ['', Validators.required],
      currencyId: ['', Validators.required],
      website: [
        '',
        Validators.required,
        // Validators.pattern("^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$"),
      ],
      address: ['', [Validators.required, Validators.maxLength(100)]],
      mobileNumber: ['', Validators.required],
      mobileNumberCode: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getDropDowns();
  }

  onSubmit() {
    if (!this.companyForm.valid) return;
    this.addCompany();
  }

  getDropDowns() {
    combineLatest([
      this.companyService.getDropDown(),
      this.companyService.getMobileCodeDropDown(),
    ]).subscribe({
      next: ([resDropdown, resMobileCode]) => {
        this.currencyDropDown = resDropdown.response.currencyDropdown;
        this.logService.log(this.currencyDropDown, 'currency Information:');

        this.industryDropDown = resDropdown.response.industryDropdown;
        this.logService.log(this.industryDropDown, 'industry Information:');

        this.mobileCodeDropDown = resMobileCode.response;
        this.logService.log(
          this.mobileCodeDropDown,
          'mobileCodeDropdownDto Information:'
        );

      },
    });
  }

  addCompany() {
    this.loaderService.show();
    const request: AddCompanyDto = this.companyForm.value;
    this.logService.log(request, 'Checking the sending request:');

    this.companyService.addCompany(request).subscribe({
      next: (response) => {
        this.logService.log(response, 'Company added successfully:');
        this.toasterService.showSuccess(
          'Success',
          this.languageService.transalte('Company.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
      },
      error: () => {
        this.loaderService.hide();
      },
    });
  }

  hasError(field: string, errorType: string): boolean {
    const control = this.companyForm.get(field);
    return (control?.hasError(errorType) && control?.touched) ?? false;
  }
}
