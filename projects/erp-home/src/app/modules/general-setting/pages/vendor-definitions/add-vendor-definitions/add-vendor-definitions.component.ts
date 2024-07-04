import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, LookupEnum, LookupsService, SharedLibraryEnums, customValidators } from 'shared-lib';
import { AddVendorCommand, CategoryDropdownDto, CityDto, CountryDto, CurrencyDto, TagDropDownDto, lookupDto } from '../../../models';
import { GeneralSettingService } from '../../../general-setting.service';

@Component({
  selector: 'app-add-vendor-definitions',
  templateUrl: './add-vendor-definitions.component.html',
  styleUrl: './add-vendor-definitions.component.scss'
})
export class AddVendorDefinitionsComponent implements OnInit {
  addVendorForm:FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  selectedMobileCode: string;
  accountTags: TagDropDownDto[];
  countries: CountryDto[] = [];
  cities: CityDto[];
  currencies: CurrencyDto[];
  categoryList:CategoryDropdownDto[];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  accountsList: { id: number; name: string }[] = [];

constructor(
  private fb :FormBuilder,
  private formsService: FormsService,
  public lookupsService: LookupsService,
  private GeneralSettingService: GeneralSettingService,
  public sharedLibEnums: SharedLibraryEnums,
){
  this.addVendorForm = fb.group({
    code: new FormControl(null),
    photo: new FormControl(null),
    name: new FormControl('', [ customValidators.required]),
    birthDate: new FormControl(null),
    vendorCategoryId: new FormControl(null),
    VendorTagIds: new FormControl(null),
 
    vendorInformation: this.fb.group({
      contactPhone: new FormControl(null),
      ContactMobileCode : new FormControl(null),
      contactMobile: new FormControl(null),
      contactFax: new FormControl(null),
      contactEmail: new FormControl(null,[customValidators.email]),
      contactWebsite: new FormControl(null),
      contactPersonName: new FormControl(null),
      contactPersonMobile: new FormControl(null),
      ContactPersonMobileCode : new FormControl(null),
      contactPersonPhone: new FormControl(null),
      contactPersonEmail: new FormControl(null,[customValidators.email]),
          
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
      priceListId: new FormControl(null),
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
    this. getVendorCategoryDropdown();
    this. getChildrenAccountsDropDown();
    this. getpaymentTermsListDropDown();
    this.getpriceListDropDown();
    this.getCurrencies();
    this.loadCountries();

    this.getTags();
    this.loadLookups();
    this.Subscribe();
  }
  loadCountries() {
    this.GeneralSettingService.loadCountries();
    this.GeneralSettingService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  getpriceListDropDown(){
    this.GeneralSettingService.getpriceListDropDown()
    this.GeneralSettingService.sendPriceListsDropDownDataObservable.subscribe(res=>{
      this.priceList = res
    })
  }
  getpaymentTermsListDropDown(){
    this.GeneralSettingService.getpaymentTermsListDropDown()
    this.GeneralSettingService.sendPaymentTermsDropDownDataObservable.subscribe(res=>{
      this.paymentTermsList = res
    })
  }
  getChildrenAccountsDropDown(){
    this.GeneralSettingService.getChildrenAccountsDropDown()
    this.GeneralSettingService.sendChildrenAccountsDropDownDataObservable.subscribe(res=>{
      this.accountsList = res

    })
  }
  getVendorCategoryDropdown(){
    this.GeneralSettingService.getVendorCategoryDropdown()
    this.GeneralSettingService.sendgetVendorCategoryDropdownDataObservable.subscribe(res=>{
    this.categoryList = res


    })
  }
  onCountryChange(event: any) {
    const countryId = event;
    if (!countryId) return;
    this.GeneralSettingService.loadCities(countryId);
    this.GeneralSettingService.cities.subscribe((res) => {
      this.cities = res;
    });
  }
  AddVendor(){
    if (!this.formsService.validForm(this.addVendorForm, true)) return;
    
        const vendor:AddVendorCommand =this.addVendorForm.value;
        this.GeneralSettingService.addNewVendorDefinition(vendor)
  }

Subscribe() {
  this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
}

loadLookups() {
  this.lookupsService.loadLookups([LookupEnum.MobileCode]);
}

getTags() {
  this.GeneralSettingService.getTags();
  this.GeneralSettingService.tags.subscribe((res) => {
    this.accountTags = res;

  });
}
getCurrencies(){
  this.GeneralSettingService.getCurrencies('');
  this.GeneralSettingService.currencies.subscribe((res) => {
    this.currencies = res;
  });
}

}
