import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, LookupEnum, LookupsService, RouterService, SharedLibraryEnums, customValidators } from 'shared-lib';
import { CategoryDropdownDto, CityDto, CountryDto, CurrencyDto, TagDropDownDto, lookupDto } from '../../../models';
import { GeneralSettingService } from '../../../general-setting.service';
import { EditVendorCommand } from '../../../models/editVendorCommand';
import { GetVendorById } from '../../../models/getVendorById';

@Component({
  selector: 'app-edit-vendor-definitions',
  templateUrl: './edit-vendor-definitions.component.html',
  providers: [RouterService],
  styleUrl: './edit-vendor-definitions.component.scss'
})
export class EditVendorDefinitionsComponent  implements OnInit {
  editVendorForm:FormGroup;
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
  vendor:GetVendorById;
  selectedVendorCategory:string;
  tagValue:number[];
  selectedMobileContactCode:string;
  selectedMobilePersonContacCode:string;
  selectedCountry:string;
  selectedCity:number;
  selectedPaymentTerm:string;
  selectedPriceList:string;
  selectedCurrency:string;
  selectedPayableAccount:string;
  selectedPurchaseAccount:string;
  selectedPurchaseReturnAccount:string;
  selectedDiscountAccount:string;
  

constructor(
  private fb :FormBuilder,
  private formsService: FormsService,
  public lookupsService: LookupsService,
  private routerService: RouterService,
  private generalSettingService: GeneralSettingService,
  public sharedLibEnums: SharedLibraryEnums,
){
  this.editVendorForm = fb.group({
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
    this.intitializeFormData();
  }

  intitializeFormData(){
    this.generalSettingService.getVendorDefinitionByID(this.vendorId);
    this.generalSettingService.vendorDefinitionDataByIDObservable.subscribe((res ) => {
    

      if (res) {
        this.editVendorForm.patchValue({ ...res,
          birthDate: res.birthDate ? new Date(res.birthDate) : null, 
   });
        this.vendor= res;
        this.tagValue = res.vendorTags?.map((x:any)=>x.id) ?? '';
        this.selectedVendorCategory = res.vendorCategory?.id ?? '';
        // res.vendorInformation?.contactMobileCode
        this.selectedMobileContactCode = res.vendorInformation?.contactMobileCode ?? '';
        // res.vendorInformation?.contactPersonMobileCode
        this.selectedMobilePersonContacCode = res.vendorInformation?.contactPersonMobileCode ?? '';
        this.selectedCountry = res.vendorAddress?.countryCode ?? '';
        this.selectedCity = res.vendorAddress.cityId ?? '';
        this.selectedPaymentTerm = res.vendorFinancial?.paymentTermId ?? '';
        this.selectedPriceList = res.vendorFinancial?.priceListId ?? '';
        this.selectedCurrency = res.vendorFinancial?.currencyId ?? '';
        this.selectedPayableAccount = res.vendorAccounting?.payableAccountId ?? '';
        this.selectedPurchaseAccount = res.vendorAccounting?.purchaseAccountId ?? '';
        this.selectedPurchaseReturnAccount = res.vendorAccounting?.purchaseReturnAccountId ?? '';
        this.selectedDiscountAccount = res.vendorAccounting?.discountAccountId ?? '';
      }
      if(this.selectedCountry){
        this.onCountryChange(this.selectedCountry)
      }
      console.log(this.editVendorForm.value ,"000000000");
    });
  }

  loadCountries() {
    this.generalSettingService.loadCountries();
    this.generalSettingService.countries.subscribe({
      next: (res) => {
        this.countries = res;
      },
    });
  }
  getpriceListDropDown(){
    this.generalSettingService.getpriceListDropDown()
    this.generalSettingService.sendPriceListsDropDownDataObservable.subscribe(res=>{
      this.priceList = res
    })
  }
  getpaymentTermsListDropDown(){
    this.generalSettingService.getpaymentTermsListDropDown()
    this.generalSettingService.sendPaymentTermsDropDownDataObservable.subscribe(res=>{
      this.paymentTermsList = res
    })
  }
  getChildrenAccountsDropDown(){
    this.generalSettingService.getChildrenAccountsDropDown()
    this.generalSettingService.sendChildrenAccountsDropDownDataObservable.subscribe(res=>{
      this.accountsList = res
    })
  }

  getVendorCategoryDropdown(){
    this.generalSettingService.getVendorCategoryDropdown()
    this.generalSettingService.sendgetVendorCategoryDropdownDataObservable.subscribe(res=>{
    this.categoryList = res
    })
  }

  onCountryChange(event: any) {
    const countryId = event;
    if (!countryId) return;
    this.generalSettingService.loadCities(countryId);
    this.generalSettingService.cities.subscribe((res) => {
      this.cities = res;
    });
  }

  editVendor(){
   
    
    if (!this.formsService.validForm(this.editVendorForm, true)) return;
        const vendor: EditVendorCommand = {
          ...this.editVendorForm.value,
          vendorCategoryId: this.vendor?.vendorCategory?.id,
          vendorInformation: {
            ...this.editVendorForm.value.vendorInformation,
            id: this.vendor?.vendorInformation?.id
          },
          vendorAddress: {
            ...this.editVendorForm.value.vendorAddress,
            id: this.vendor?.vendorAddress?.id
          },
          vendorLegal: {
            ...this.editVendorForm.value.vendorLegal,
            id: this.vendor?.vendorLegal?.id
          },
          vendorFinancial: {
            ...this.editVendorForm.value.vendorFinancial,
            id: this.vendor?.vendorFinancial?.id
          },
          vendorAccounting: {
            ...this.editVendorForm.value.vendorAccounting,
            id: this.vendor?.vendorAccounting?.id
          },
        //  vendorTagIds: this.vendor?.vendorTags?.map(tag => tag.id)
        };
        
        vendor.id= this.vendorId;
        // console.log(this.editVendorForm.value);
        // return
        this.generalSettingService.editVendorDefinition(vendor)
  }

Subscribe() {
  this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
}

loadLookups() {
  this.lookupsService.loadLookups([LookupEnum.MobileCode]);
}

getTags() {
  this.generalSettingService.getTags();
  this.generalSettingService.tags.subscribe((res) => {
    this.accountTags = res;

  });
}
getCurrencies(){
  this.generalSettingService.getCurrencies('');
  this.generalSettingService.currencies.subscribe((res) => {
    this.currencies = res;
  });
}
get vendorId(): number {
  return this.routerService.currentId;
}



}
