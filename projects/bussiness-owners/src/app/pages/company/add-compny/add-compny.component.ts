import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LanguageService,
  LoaderService,
  LogService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/dropdown';
import { AddCompanyDto } from '../../../models/company/addcompany';
import { combineLatest } from 'rxjs';
import { CountryDropDown } from '../../../models/company/countrydropdown';
import { MobileCodeDropdownDto } from '../../../models/company/mobilecodedropdown';
import { CompanyTypes } from '../../../enums/companytypes';
@Component({
  selector: 'app-add-compny',
  templateUrl: './add-compny.component.html',
  providers: [RouterService],

  styleUrls: ['./add-compny.component.css'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];
  subdoaminDropDown: DropdownItemDto[];
  CountryDropDown: CountryDropDown[];
  mobileCodeDropDown: MobileCodeDropdownDto[];
  planId: number;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private logService: LogService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private routerService: RouterService
  ) {
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      countryCode: ['', Validators.required],
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
    this.planId = this.routerService.currentId;
    this.logService.log(this.planId, 'recived add company id');

    this.getDropDowns();

    this.companyForm
      .get('countryCode')
      ?.valueChanges.subscribe((selectedCountryCode) => {
        const selectedCountry = this.mobileCodeDropDown.find(
          (mobile) => mobile.code === selectedCountryCode
        );

        if (selectedCountry) {
          this.companyForm.patchValue({
            mobileNumberCode: selectedCountry.code,
          });
        }
      });

    this.companyForm.get('countryCode')?.valueChanges;
  }

  onSubmit() {
    if (!this.companyForm.valid) {
      this.toasterService.showError(
        this.languageService.transalte('Company.Error'),
        this.languageService.transalte(
          'Company.Add.PleaseFillInAllTheRequiredFields'
        )
      );
      return;
    }
    this.addCompany();
  }

  getDropDowns() {
    combineLatest([
      this.companyService.getDropDown(),
      this.companyService.getMobileCodeDropDown(),
      this.companyService.getCountryDropDown(),
    ]).subscribe({
      next: ([resDropdown, resMobileCode, resCountry]) => {
        this.currencyDropDown = resDropdown.response.currencyDropdown;
        this.logService.log(this.currencyDropDown, 'currency Information:');
        this.industryDropDown = resDropdown.response.industryDropdown;
        this.logService.log(this.industryDropDown, 'industry Information:');
        this.mobileCodeDropDown = resMobileCode.response;
        this.logService.log(
          this.mobileCodeDropDown,
          'mobileCodeDropdownDto Information:'
        );
        this.CountryDropDown = resCountry.response;
        this.logService.log(
          this.CountryDropDown,
          'CountryDropDown Information:'
        );
      },
    });
  }

  addCompany() {
    this.loaderService.show();
    const request: AddCompanyDto = this.companyForm.value;
    request.planId = this.planId;
    request.companyType = CompanyTypes.Holding;
    this.logService.log(request, 'Checking the sending request:');

    this.companyService.addCompany(request).subscribe({
      next: (response) => {
        this.logService.log(response, 'Company added successfully:');
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
        this.routerService.navigateTo('company/' + this.planId);
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
