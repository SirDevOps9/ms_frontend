import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { CityDto, CountryDto, CurrencyDto, TagDropDownDto, lookupDto } from '../../../models';
import { EditVendorCommand } from '../../../models/editVendorCommand';
import { GetVendorById, VendorInformation } from '../../../models/getVendorById';
import { PurchaseService } from '../../../purchase.service';
import { CategoryDropdownDto } from '../../../models/CategoryDropdownDto';

@Component({
  selector: 'app-edit-vendor-definitions',
  templateUrl: './edit-vendor-definitions.component.html',
  providers: [RouterService],
  styleUrl: './edit-vendor-definitions.component.scss',
})
export class EditVendorDefinitionsComponent implements OnInit {
  vendorCode: string = 'Auto';
  editVendorForm: FormGroup;
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
  vendor: GetVendorById;
  selectedVendorCategory?: number;
  tagValue?: number[];
  selectedMobileContactCode?: string;
  selectedMobilePersonContacCode?: string;
  selectedCountry?: string;
  selectedCity?: number;
  selectedPaymentTerm?: number;
  selectedPriceList?: number;
  selectedCurrency?: number;
  selectedPayableAccount?: number;
  selectedPurchaseAccount?: number;
  selectedPurchaseReturnAccount?: number;
  selectedDiscountAccount?: number;
  returnedVendorInformation?: VendorInformation;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    public lookupsService: LookupsService,
    private routerService: RouterService,
    private purchaseService: PurchaseService,
    public sharedLibEnums: SharedLibraryEnums
  ) {
    this.editVendorForm = fb.group({
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
        ]),
        ContactMobileCode: new FormControl(null),
        contactMobile: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter

        ]),
        contactFax:  new FormControl(null, [
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
    this.purchaseService.vendorDefinitionDataByID.next(undefined);
    this.getVendorCategoryDropdown();
    this.getChildrenAccountsDropDown();
    this.getpaymentTermsListDropDown();
    this.getpriceListDropDown();
    this.getCurrencies();
    this.loadCountries();
    this.getTags();
    this.loadLookups();
    this.Subscribe();
    this.intitializeFormData();
  }

  intitializeFormData() {
    this.purchaseService.getVendorDefinitionByID(this.vendorId());
    this.purchaseService.vendorDefinitionDataByIDObservable.subscribe((res) => {
      if (res) {
        console.log(res, '135');

        this.vendor = res;
        this.vendorCode = res.code;
        this.selectedCountry = res.vendorAddress?.countryCode;
        this.selectedCity = res.vendorAddress?.cityId;
        this.vendor = res;
        this.onCountryChange(this.selectedCountry);

        this.tagValue = res.vendorTags;

        this.returnedVendorInformation = res.vendorInformation;
        this.selectedVendorCategory = res.vendorCategory?.id;
        this.selectedPaymentTerm = res.vendorFinancial?.paymentTermId;
        this.selectedPriceList = res.vendorFinancial?.pricePolicyId;
        this.selectedCurrency = res.vendorFinancial?.currencyId;
        this.selectedPayableAccount = res.vendorAccounting?.payableAccountId;
        this.selectedPurchaseAccount = res.vendorAccounting?.purchaseAccountId;
        this.selectedPurchaseReturnAccount = res.vendorAccounting?.purchaseReturnAccountId;
        this.selectedDiscountAccount = res.vendorAccounting?.discountAccountId;

        if (this.returnedVendorInformation) {
          this.selectedMobileContactCode = this.returnedVendorInformation.contactMobileCode ?? '';
          this.selectedMobilePersonContacCode =
            this.returnedVendorInformation.contactPersonMobileCode ?? '';
        }
        this.editVendorForm.patchValue({
          ...res,
          birthDate: res.birthDate ? new Date(res.birthDate) : null,
          vendorInformation: {
            ...res.vendorInformation,
            ContactMobileCode: res.vendorInformation?.contactMobileCode ?? null,
            ContactPersonMobileCode: res.vendorInformation?.contactPersonMobileCode ?? null,
          },
          vendorAddress: {
            ...res.vendorAddress,
            countryId: this.selectedCountry ?? null,
            cityId: this.selectedCity ?? null,
          },
          VendorTagIds: res.vendorTags,
        });
      }
    });
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

  editVendor() {
    if (!this.formsService.validForm(this.editVendorForm, false)) return;
    const vendor: EditVendorCommand = {
      ...this.editVendorForm.value,
      vendorCategoryId:
        this.editVendorForm.value.vendorCategoryId ?? this.vendor?.vendorCategory?.id,

      vendorInformation: {
        ...this.editVendorForm.value.vendorInformation,
        id: this.vendor?.vendorInformation?.id,
      },
      vendorAddress: {
        ...this.editVendorForm.value.vendorAddress,
        id: this.vendor?.vendorAddress?.id,
      },
      vendorLegal: {
        ...this.editVendorForm.value.vendorLegal,
        id: this.vendor?.vendorLegal?.id,
      },
      vendorFinancial: {
        ...this.editVendorForm.value.vendorFinancial,
        id: this.vendor?.vendorFinancial?.id,
      },
      vendorAccounting: {
        ...this.editVendorForm.value.vendorAccounting,
        id: this.vendor?.vendorAccounting?.id,
      },
    };

    vendor.id = this.vendorId();
    this.purchaseService.editVendorDefinition(vendor, this.editVendorForm);
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
  vendorId() {
    return this.routerService.currentId;
  }

  cancel() {
    //this.editEmployeeForm.reset();
    this.routerService.navigateTo(`/masterdata/vendor-definitions`);
  }
}
