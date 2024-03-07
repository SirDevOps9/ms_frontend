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
import { AddCompanyDto } from '../../../models/company/addcompany';
import { CompanyTypes } from '../../../enums/companytypes';
@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  providers: [RouterService],
  styleUrls: ['./new-company.component.css'],
})
export class NewCompanyComponent implements OnInit {
  companyForm: FormGroup;

  get subscriptionId(): string {
    return this.routerService.currentId;
  }

  ngOnInit() {
    this.initializeCompanyForm();

    this.loadLookups();
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
    console.log(this.companyForm);
    if (this.formsService.validForm(this.companyForm, true)) return;

    this.loaderService.show();

    const request: AddCompanyDto = this.companyForm.value;

    request.subscriptionId = this.subscriptionId;

    request.companyType = CompanyTypes.Holding;

    this.companyService.addCompany(request).subscribe({
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
        customValidators.required,
        customValidators.length(10, 100),
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
