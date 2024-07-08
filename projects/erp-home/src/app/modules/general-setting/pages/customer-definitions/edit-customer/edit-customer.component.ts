import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { FormsService, LookupsService, SharedLibraryEnums, RouterService, customValidators } from 'shared-lib';
import { lookupDto, LookupEnum, TagDropDownDto, CountryDto, CityDto, CurrencyDto, CategoryDropdownDto, AddCustomerDefinitionDto, EditCustomerDefintionsDto } from '../../../models';
import { GeneralSettingService } from '../../../general-setting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent implements OnInit {
  addCustomerForm:FormGroup;
  lookups: { [key: string]: lookupDto[] };
  LookupEnum = LookupEnum;
  selectedMobileCode: string;
  ContactPersonMobileCode: string;
  accountTags: TagDropDownDto[];
  countries: CountryDto[] = [];
  cities: CityDto[];
  currencies: CurrencyDto[];
  categoryList:CategoryDropdownDto[];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  accountsList: { id: number; name: string }[] = [];
  id : string




constructor(
  private fb :FormBuilder,
  private formsService: FormsService,
  public lookupsService: LookupsService,
  private GeneralSettingService: GeneralSettingService,
  public sharedLibEnums: SharedLibraryEnums,
  private router : RouterService,
  private route : ActivatedRoute


){
  this.addCustomerForm = fb.group({
    code: new FormControl(null),
    photo: new FormControl(null),
    name: new FormControl('',  customValidators.required),
    birthdate: new FormControl(null,[customValidators.invalidBirthDate]),
    categoryId: new FormControl(null),
    tagIds: new FormControl(null),
 
    contactInfo: this.fb.group({
      contactMobile: new FormControl(null,[customValidators.invalidBirthDate]),
      ContactMobileCode : new FormControl(null),

      contactPhone: new FormControl(null,[customValidators.invalidBirthDate]),
      contactWebsite: new FormControl(null),
      contactFax: new FormControl(null),
      contactEmail: new FormControl(null,[customValidators.email]),

      contactPersonName: new FormControl(null),
      contactPersonMobile: new FormControl(null,[customValidators.invalidBirthDate]),
      contactPersonPhone: new FormControl(null,[customValidators.invalidBirthDate]),
      ContactPersonMobileCode: new FormControl(null),
          
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
      priceListId: new FormControl(null),
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
  this.id = this.route.snapshot.params['id']
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
    setTimeout(() => {
      this.getAddResponse()
    }, 1000);

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
    this.GeneralSettingService.getCustomerCategoryDropdown()
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
getAddResponse() {
  this.GeneralSettingService.getCustomerDefinitionByID(this.id)
  this.GeneralSettingService.getCustomerDefinitionResByIDObservable.subscribe(res=>{
    console.log(res)
    if(res) {
      this.GeneralSettingService.loadCities(res.addressInfo.countryId);
      this.GeneralSettingService.cities.subscribe((res) => {
        console.log(res)
        this.cities = res;
      });
        this.addCustomerForm.patchValue({...res})

        this.selectedMobileCode = res.contactInfo.contactMobileCode
        this.ContactPersonMobileCode = res.contactInfo.contactPersonMobileCode
    
        console.log(this.ContactPersonMobileCode)
       
    
    
    
        this.addCustomerForm.get('birthdate')?.setValue(res.birthdate ? new Date(res.birthdate) : null )
    
    
   
    }
    
  })
}


editCustomer(){
  if (!this.formsService.validForm(this.addCustomerForm, true)) return;
    this.addCustomerForm.value.id = +this.id

      const customer:EditCustomerDefintionsDto =this.addCustomerForm.value;
      this.GeneralSettingService.editCustomerDefinition(customer)
      this.GeneralSettingService.editCustomerDefinitionResObservable.subscribe(res=>{
        if(res){
          this.router.navigateTo('/customer-definitions')

        }
      })
  
      
  
}

}

