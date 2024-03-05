import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FormsService,
  LanguageService,
  LoaderService,
  LogService,
  LookupsService,
  RouterService,
  ToasterService,
  customValidators,
} from 'shared-lib';
import { CompanyService } from '../../../services/company.httpservice';
import { DropdownItemDto } from '../../../models/company/dropdown';
import { AddCompanyDto } from '../../../models/company/addcompany';
import { CountryDropDown } from '../../../models/company/countrydropdown';
import { MobileCodeDropdownDto } from '../../../models/company/mobilecodedropdown';
import { CompanyTypes } from '../../../enums/companytypes';
@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  providers: [RouterService],
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnInit {
  companyForm: FormGroup;

  subDoamins: DropdownItemDto[];

  get planId(): number {
    return this.routerService.currentId;
  }

  ngOnInit() {
    this.initializeCompanyForm();

    this.loadLookups();

    // this.companyForm
    //   .get('countryCode')
    //   ?.valueChanges.subscribe((selectedCountryCode) => {
    //     const selectedCountry = this.mobileCodes.find(
    //       (mobile) => mobile.code === selectedCountryCode
    //     );

    //     if (selectedCountry) {
    //       this.companyForm.patchValue({
    //         mobileNumberCode: selectedCountry.code,
    //       });
    //     }
    //   });

    // this.companyForm.get('countryCode')?.valueChanges;
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      'currencies',
      'industries',
      'mobileCodes',
      'countries',
    ]);
    // combineLatest([
    //   this.companyService.getDropDown(),
    //   this.companyService.getMobileCodeDropDown(),
    //   this.companyService.getCountryDropDown(),
    // ]).subscribe({
    //   next: ([resDropdown, resMobileCode, resCountry]) => {
    //     this.currencies = resDropdown.response.currencyDropdown;
    //     this.industries = resDropdown.response.industryDropdown;
    //     this.mobileCodes = resMobileCode.response;
    //     this.countries = resCountry.response;
    //   },
    // });
  }

  onSubmit() {
    console.log(this.companyForm);
    if (this.formsService.validForm(this.companyForm, true)) return;

    this.loaderService.show();

    const request: AddCompanyDto = this.companyForm.value;

    request.planId = this.planId;

    request.companyType = CompanyTypes.Holding;

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

  private initializeCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('yass', [
        customValidators.required,
        Validators.maxLength(10),
        Validators.minLength(5),
      ]),
      countryCode: new FormControl('', [customValidators.required]),
      industryId: new FormControl('', [customValidators.required]),
      currencyId: new FormControl('', [customValidators.required]),
      website: new FormControl('', [customValidators.required]),
      address: new FormControl('', [
        customValidators.required,
        Validators.maxLength(100),
      ]),
      mobileNumber: new FormControl('', [customValidators.required]),
      mobileNumberCode: new FormControl('', [customValidators.required]),
      companyEmail: new FormControl('', [
        customValidators.required,
        customValidators.email,
      ]),
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private companyService: CompanyService,
    private logService: LogService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    public lookupsService: LookupsService,
    private languageService: LanguageService,
    private routerService: RouterService
  ) {}
}
