import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';

@Component({
  selector: 'app-create-customer-category',
  templateUrl: './create-customer-category.component.html',
  styleUrl: './create-customer-category.component.scss'
})
export class CreateCustomerCategoryComponent implements OnInit {
  constructor(private fb :FormBuilder , private generalSettingService: GeneralSettingService, private formsService: FormsService , private routerService : RouterService){
  }

  formGroup  :FormGroup;
  accountsList: { id: number; name: string }[] = [];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  marketTypeList = [{label : 'B2B'}, {label :'B2C'} ]


  ngOnInit(): void {
  this.formGroup = this.fb.group({
    name: new FormControl(null,  customValidators.required),
    code : null,
    receivableAccountId : null,
    salesAccountId : null,
    salesReturnAccountId : null,
    discountAccountId : null,
    priceListId : null,
    paymentTermId : null,
    marketType : null,
   
  
  })

  this.generalSettingService.getChildrenAccountsDropDown()
  this.generalSettingService.sendChildrenAccountsDropDownDataObservable.subscribe(res=>{
    this.accountsList = res
  })

  this.generalSettingService.getpriceListDropDown()
  this.generalSettingService.sendPriceListsDropDownDataObservable.subscribe(res=>{
    this.priceList = res
  })
  this.generalSettingService.getpaymentTermsListDropDown()
  this.generalSettingService.sendPaymentTermsDropDownDataObservable.subscribe(res=>{
    this.paymentTermsList = res
  })

  }

 

  
  onSave() {
    if (!this.formsService.validForm(this.formGroup, false)) return;


  this.generalSettingService.addCustomerCategory(this.formGroup.value)
  this.generalSettingService.addCustomerCategoryDataObservable.subscribe(res=>{
    if(res) {
      this.routerService.navigateTo('customer-category')

    }

  })
  }

  
  
}