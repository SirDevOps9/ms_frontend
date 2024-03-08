import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LanguageService,
  LoaderService,
  LookupsService,
  RouterService,
  ToasterService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import { AddCompanyDto, CompanyTypes } from '../../models';
import { CompanyProxy } from '../../company.proxy';
@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  providers: [RouterService],
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnInit {
  companyForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };

  get subscriptionId(): string {
    return this.routerService.currentId;
  }

  ngOnInit() {
    this.loadLookups();

    this.initializeCompanyForm();

    this.Subscribe();
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([
      'currencies',
      'industries',
      'mobileCodes',
      'countries',
    ]);
  }

  onSubmit() {
    if (!this.formsService.validForm(this.companyForm, true)) return;

    this.loaderService.show();

    const request: AddCompanyDto = this.companyForm.value;

    request.subscriptionId = this.subscriptionId;

    request.companyType = CompanyTypes.Holding;

    this.companyProxy.addCompany(request).subscribe({
      next: (response) => {
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

  private initializeCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('yass', [
        customValidators.required,
        customValidators.length(5, 100),
      ]),
      countryCode: new FormControl('', [customValidators.required]),
      industryId: new FormControl('', [customValidators.required]),
      currencyId: new FormControl('', [customValidators.required]),
      website: new FormControl('', [customValidators.required]),
      address: new FormControl('', [
        customValidators.length(10, 100),
        customValidators.required,
        customValidators.number,
      ]),
      mobileNumber: new FormControl('', [customValidators.required]),
      mobileNumberCode: new FormControl('', [customValidators.required]),
      companyEmail: new FormControl('', [
        customValidators.required,
        customValidators.email,
      ]),
      file: new FormControl('', [customValidators.required]),
    });
  }
  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    private companyProxy: CompanyProxy,
    private toasterService: ToasterService,
    private loaderService: LoaderService,
    public lookupsService: LookupsService,
    private languageService: LanguageService,
    private routerService: RouterService
  ) {}
}
