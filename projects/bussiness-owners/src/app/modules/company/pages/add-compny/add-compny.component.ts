import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  LanguageService,
  LoaderService,
  LogService,
  RouterService,
  ToasterService,
  LookupsService,
  LookupEnum,
  lookupDto
} from 'shared-lib';
import { combineLatest } from 'rxjs';
import { AddCompanyDto, CompanyTypes, CountryDropDown, DropdownItemDto, MobileCodeDropdownDto } from '../../models';
import { CompanyProxy } from '../../company.proxy';
@Component({
  selector: 'app-add-compny',
  templateUrl: './add-compny.component.html',
  providers: [RouterService],

  styleUrls: ['./add-compny.component.scss'],
})
export class AddCompanyComponent implements OnInit {
  companyForm: FormGroup;
  currencyDropDown: DropdownItemDto[];
  industryDropDown: DropdownItemDto[];
  subdoaminDropDown: DropdownItemDto[];
  CountryDropDown: CountryDropDown[];
  mobileCodeDropDown: MobileCodeDropdownDto[];
  subscriptionId: string;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };

  constructor(
    private formBuilder: FormBuilder,
    private companyProxy: CompanyProxy,
    private logService: LogService,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    private languageService: LanguageService,
    private routerService: RouterService,
    public lookupsService: LookupsService
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
    this.subscriptionId = this.routerService.currentId;
    this.loadLookups();
    this.Subscribe();
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


  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  loadLookups() {
    this.lookupsService.loadLookups([
      LookupEnum.Country,
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.MobileCode,
      
    ]);
    
  }

  addCompany() {
    this.loaderService.show();
    const request: AddCompanyDto = this.companyForm.value;
    request.subscriptionId = this.subscriptionId;
    request.companyType = CompanyTypes.Holding;
    this.companyProxy.addCompany(request).subscribe({
      next: (response) => {
        this.logService.log(response, 'Company added successfully:');
        this.toasterService.showSuccess(
          this.languageService.transalte('Company.Success'),
          this.languageService.transalte('Company.Add.CompanyAddedSuccessfully')
        );
        this.loaderService.hide();
        this.routerService.navigateTo('company/' + this.subscriptionId);
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
