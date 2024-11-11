import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import {
  FormsService,
  LookupsService,
  SharedLibraryEnums,
  RouterService,
  customValidators,
  LookupEnum,
  lookupDto,
  Modules,
} from 'shared-lib';
import { ActivatedRoute } from '@angular/router';
import { SalesService } from '../../../sales.service';
import {
  AddCustomerDefinitionDto,
  CityDto,
  CountryDto,
  CurrencyDto,
  EditCustomerDefintionsDto,
} from '../../../models';
import { CategoryDropdownDto } from '../../../models/CategoryDropdownDto';
import { TagDropDownDto } from 'projects/apps-accounting/src/app/modules/account/models/tagDropDownDto';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss',
})
export class EditCustomerComponent implements OnInit {
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
  id: string;

  constructor(
    private fb: FormBuilder,
    private formsService: FormsService,
    public lookupsService: LookupsService,
    private salesService: SalesService,
    public sharedLibEnums: SharedLibraryEnums,
    private router: RouterService,
    private route: ActivatedRoute
  ) {
    this.addCustomerForm = fb.group({
      code: new FormControl(null),
      photo: new FormControl(null),
      name: new FormControl('', customValidators.required),
      birthdate: new FormControl(null, [customValidators.invalidBirthDate]),
      categoryId: new FormControl(null),
      tagIds: new FormControl(null),

      contactInfo: this.fb.group({
        contactMobile: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter,
        ]),
        contactMobileCode: new FormControl(null),

        contactPhone: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter,
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
          customValidators.noAlphabeticCharacter,
        ]),
        contactPersonPhone: new FormControl(null, [
          customValidators.hasSpaces,
          customValidators.noSpecialChars,
          customValidators.noAlphabeticCharacter,
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
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.salesService.getCustomerDefinitionResByID.next({} as AddCustomerDefinitionDto);
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
    // setTimeout(() => {
    //   this.getAddResponse()
    // }, 1000);
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
      this.accountTags = res;
    });
  }
  getCurrencies() {
    this.salesService.getCurrencies('');
    this.salesService.currencies.subscribe((res) => {
      this.currencies = res;
    });
  }
  getAddResponse() {
    this.salesService.getCustomerDefinitionByID(this.id);
    this.salesService.getCustomerDefinitionResByIDObservable.subscribe((res) => {
      console.log(res, '135');
      if (res) {
        this.addCustomerForm.patchValue({ ...res ,
          birthdate : new Date(res.birthdate)

        });
        this.addCustomerForm.get('birthdate')?.setValue(new Date(res?.birthdate));

        // this.addCustomerForm
        //   .get('birthdate')
        //   ?.setValue(new Date(res.birthdate).toISOString().split('T')[0]);
        this.onCountryChange(res?.addressInfo?.countryId);
      }
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

  editCustomer() {
    if (!this.formsService.validForm(this.addCustomerForm, true)) return;
    this.addCustomerForm.value.id = +this.id;
    // this.addCustomerForm.value.birthdate = this.addCustomerForm.value.birthdate
    //   ? this.addCustomerForm.value.birthdate
    //   : null;

    const customer: EditCustomerDefintionsDto = this.addCustomerForm.value;
    this.salesService.editCustomerDefinition(customer, this.addCustomerForm);

  }

  onCancel() {
    this.router.navigateTo('/masterdata/customer-definitions');
  }
}
