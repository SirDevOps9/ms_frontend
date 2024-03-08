import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  RouterService,
  customValidators,
  lookupDto,
} from 'shared-lib';
import {
  AddCompanyDto,
  CompanyTypes,
  MobileCodeDropdownDto,
} from '../../models';
import { CompanyService } from '../../company.service';
import { Title } from '@angular/platform-browser';
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
  LookupEnum = LookupEnum;
  mobileCodes: MobileCodeDropdownDto[];
  get subscriptionId(): string {
    return this.routerService.currentId;
  }

  ngOnInit() {
    this.loadLookups();
    this.titleService.setTitle('Add Company');
    this.initializeCompanyForm();

    this.Subscribe();
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.companyProxy.getMobileCodeDropDown().subscribe((res) => {
      this.mobileCodes = res.response;
    });
    this.lookupsService.loadLookups([
      LookupEnum.Currency,
      LookupEnum.Industry,
      LookupEnum.Country,
    ]);
  }

  onSubmit() {
    if (this.formsService.validForm(this.companyForm, true)) return;

    const request: AddCompanyDto = this.companyForm.value;

    request.subscriptionId = this.subscriptionId;

    request.companyType = CompanyTypes.Holding;

    this.companyService.addCompany(request);
  }

  private initializeCompanyForm() {
    this.companyForm = this.formBuilder.group({
      name: new FormControl('', [
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
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService,
    public lookupsService: LookupsService,
    private routerService: RouterService,
    private companyService: CompanyService,
    private titleService: Title,
    private companyProxy: CompanyProxy
  ) {}
}
