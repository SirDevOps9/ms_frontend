import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  Modules,
  RouterService,
  SharedLibraryEnums,
  customValidators,
  lookupDto,
} from 'shared-lib';

import { Router } from '@angular/router';
import { SalesService } from '../../../sales.service';
import { TagDropDownDto } from '../../../../general-setting/models';
import { CountryDto, CityDto, CurrencyDto, AddCustomerDefinitionDto } from '../../../models';
import { CategoryDropdownDto } from '../../../models/CategoryDropdownDto';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss',
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  selectedMobileCode: string;
  accountTags: TagDropDownDto[];
  countries: CountryDto[] = [];
  cities: CityDto[];
  currencies: CurrencyDto[];
  categoryList: CategoryDropdownDto[];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  accountsList: { id: number; name: string }[] = [];

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    public lookupsService: LookupsService,
    private salesService: SalesService,
    public sharedLibEnums: SharedLibraryEnums,
    private router: RouterService
  ) {
    this.addCustomerForm = fb.group({
      code: new FormControl(null),
      photo: new FormControl(null),
      name: new FormControl('',[customValidators.required] ,),
      birthdate: new FormControl(null, [customValidators.invalidBirthDate]),
      categoryId: new FormControl(null),
      tagIds: new FormControl(null),

      contactInfo: this.fb.group({
        contactMobile: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter
        ]),
        contactMobileCode: new FormControl(null),
        contactPhone: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter
        ]),
        contactWebsite: new FormControl(null),
        contactFax:  new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter,
        ]),
        contactEmail: new FormControl(null, [customValidators.email]),

        contactPersonName: new FormControl(null),
        contactPersonMobile: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter
        ]),
        contactPersonPhone: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter

        ]),
        contactPersonMobileCode: new FormControl(null),
      }),
      addressInfo: this.fb.group({
        state: new FormControl(null),
        street: new FormControl(null),
        longitude: new FormControl(null),
        latitude: new FormControl(null),
        errorRadius: new FormControl(null),
        countryId: new FormControl(null),
        cityId: new FormControl(null),
      }),
      legalInfo: this.fb.group({
        taxId: new FormControl(null),
        commercialId: new FormControl(null),
      }),

      financialInfo: this.fb.group({
        paymentTermId: new FormControl(null),
        pricePolicyId: new FormControl(null),
        creditLimit: new FormControl(null),
        currencyId: new FormControl(null),
      }),
      accountingInfo: this.fb.group({
        receivableAccountId: new FormControl(null),
        salesAccountId: new FormControl(null),
        salesReturnAccountId: new FormControl(null),
        discountAccountId: new FormControl(null),
      }),
    });
  }
  ngOnInit(): void {
    this.getVendorCategoryDropdown();
    this.getChildrenAccountsDropDown();
    this.getpaymentTermsListDropDown();
    this.getpriceListDropDown();
    this.getCurrencies();
    this.loadCountries();

    this.getTags();
    this.loadLookups();
    this.Subscribe();
    this.getAddResponse();
  }
  loadCountries() {
    this.salesService.loadCountries();
    this.salesService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  getpriceListDropDown() {
    this.salesService.getpriceListDropDown();
    this.salesService.sendPriceListsDropDownDataObservable.subscribe((res) => {
      this.priceList = res;
    });
  }
  getpaymentTermsListDropDown() {
    this.salesService.getpaymentTermsListDropDown();
    this.salesService.sendPaymentTermsDropDownDataObservable.subscribe((res) => {
      this.paymentTermsList = res;
    });
  }
  getChildrenAccountsDropDown() {
    this.salesService.getChildrenAccountsDropDown();
    this.salesService.sendChildrenAccountsDropDownDataObservable.subscribe((res) => {
      this.accountsList = res;
    });
  }
  getVendorCategoryDropdown() {
    this.salesService.getCustomerCategoryDropdown();
    this.salesService.sendgetVendorCategoryDropdownDataObservable.subscribe((res) => {
      this.categoryList = res;
    });
  }
  onCountryChange(event: any) {
    const countryId = event;
    if (!countryId) return;
    this.salesService.loadCities(countryId);
    this.salesService.cities.subscribe((res) => {
      this.cities = res;
    });
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }
  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.MobileCode]);
  }
  getTags() {
    this.salesService.getTags(Modules.Sales);
    this.salesService.tags.subscribe((res) => {
      if(res){
        this.accountTags = res;

      }
    });
  }
  getCurrencies() {
    this.salesService.getCurrencies('');
    this.salesService.currencies.subscribe((res) => {
      this.currencies = res;
    });
  }
  getAddResponse() {
    this.salesService.customerDefinitionObservable.subscribe((res) => {
      console.log(res);
      // if(res) {
      //   this.router.navigateTo('/customer-definitions')
      // }
    });
  }
  convertDateFormat(data: Date) {
    const date = new Date(data);

    // Extract the year, month, and day
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
    const day = String(date.getDate()).padStart(2, '0');

    // Format the date into YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  AddCustomer() {
    if (!this.formsService.validForm(this.addCustomerForm, false)) return;
    this.addCustomerForm.value.birthdate = this.addCustomerForm.value.birthdate
      ? this.convertDateFormat(this.addCustomerForm.value.birthdate)
      : null;

    const customer: AddCustomerDefinitionDto = this.addCustomerForm.value;
    this.salesService.addNewCustomerDefinition(customer, this.addCustomerForm);
  }
  onDiscard() {
    //this.editEmployeeForm.reset();
    this.router.navigateTo(`/masterdata/customer-definitions`);
  }
}
