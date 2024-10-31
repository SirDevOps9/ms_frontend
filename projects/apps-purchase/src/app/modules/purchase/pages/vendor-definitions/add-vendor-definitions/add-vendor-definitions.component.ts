import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  FormsService,
  LookupEnum,
  LookupsService,
  Modules,
  RouterService,
  SharedLibraryEnums,
  customValidators,
} from 'shared-lib';

import { AddVendorCommand } from '../../../models/AddVendorCommand';
import { CityDto } from '../../../models/CityDto';
import { CountryDto } from '../../../models/CountryDto';
import { CurrencyDto } from '../../../models/CurrencyDto';
import { TagDropDownDto } from '../../../models/TagDropDownDto';
import { lookupDto } from '../../../models';
import { PurchaseService } from '../../../purchase.service';
import { CategoryDropdownDto } from '../../../models/CategoryDropdownDto';

@Component({
  selector: 'app-add-vendor-definitions',
  templateUrl: './add-vendor-definitions.component.html',
  providers: [RouterService],
  styleUrl: './add-vendor-definitions.component.scss',
})
export class AddVendorDefinitionsComponent implements OnInit {
  addVendorForm: FormGroup;
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
    private routerService: RouterService,
    private purchaseService: PurchaseService,
    public sharedLibEnums: SharedLibraryEnums
  ) {
    this.addVendorForm = fb.group({
      code: new FormControl(null),
      photo: new FormControl(null),
      name: new FormControl('', [customValidators.required]),
      birthDate: new FormControl(null, [customValidators.invalidBirthDate]),
      vendorCategoryId: new FormControl(null),
      VendorTagIds: new FormControl(null),

      vendorInformation: this.fb.group({
        contactPhone: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter
        ]),
        ContactMobileCode: new FormControl(null),
        contactMobile: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter

        ]),
        contactFax: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter,
        ]),
        contactEmail: new FormControl(null, [customValidators.email]),
        contactWebsite: new FormControl(null),
        contactPersonName: new FormControl(null),
        contactPersonMobile: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter

        ]),
        ContactPersonMobileCode: new FormControl(null),
        contactPersonPhone: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter

        ]),
        contactPersonEmail: new FormControl(null, [customValidators.email]),
      }),
      vendorAddress: this.fb.group({
        state: new FormControl(null),
        street: new FormControl(null),
        longitude: new FormControl(null),
        latitude: new FormControl(null),
        radius: new FormControl(null),
        countryId: new FormControl(null),
        cityId: new FormControl(null),
      }),
      vendorLegal: this.fb.group({
        taxId: new FormControl(null),
        commercialId: new FormControl(null),
      }),

      vendorFinancial: this.fb.group({
        paymentTermId: new FormControl(null),
        pricePolicyId: new FormControl(null),
        creditLimit: new FormControl(null),
        currencyId: new FormControl(null),
      }),
      vendorAccounting: this.fb.group({
        payableAccountId: new FormControl(null),
        purchaseAccountId: new FormControl(null),
        purchaseReturnAccountId: new FormControl(null),
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
  }
  loadCountries() {
    this.purchaseService.loadCountries();
    this.purchaseService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  getpriceListDropDown() {
    this.purchaseService.getpriceListDropDown();
    this.purchaseService.sendPriceListsDropDownDataObservable.subscribe((res) => {
      this.priceList = res;
    });
  }
  getpaymentTermsListDropDown() {
    this.purchaseService.getpaymentTermsListDropDown();
    this.purchaseService.sendPaymentTermsDropDownDataObservable.subscribe((res) => {
      this.paymentTermsList = res;
    });
  }
  getChildrenAccountsDropDown() {
    this.purchaseService.getChildrenAccountsDropDown();
    this.purchaseService.sendChildrenAccountsDropDownDataObservable.subscribe((res) => {
      this.accountsList = res;
    });
  }
  getVendorCategoryDropdown() {
    this.purchaseService.getVendorCategoryDropdown();
    this.purchaseService.sendgetVendorCategoryDropdownDataObservable.subscribe((res) => {
      this.categoryList = res;
    });
  }
  onCountryChange(event: any) {
    const countryId = event;
    if (!countryId) return;
    this.purchaseService.loadCities(countryId);
    this.purchaseService.cities.subscribe((res) => {
      this.cities = res;
    });
  }
  AddVendor() {
    if (!this.formsService.validForm(this.addVendorForm, false)) return;

    const vendor: AddVendorCommand = this.addVendorForm.value;
    this.purchaseService.addNewVendorDefinition(vendor, this.addVendorForm);
  }

  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.MobileCode]);
  }

  getTags() {
    this.purchaseService.getTags(Modules.Purchase);
    this.purchaseService.tags.subscribe((res) => {
      this.accountTags = res;
    });
  }
  getCurrencies() {
    this.purchaseService.getCurrencies('');
    this.purchaseService.currencies.subscribe((res) => {
      this.currencies = res;
    });
  }
  onDiscard() {
    //this.editEmployeeForm.reset();
    this.routerService.navigateTo(`/masterdata/vendor-definitions`);
  }
}
