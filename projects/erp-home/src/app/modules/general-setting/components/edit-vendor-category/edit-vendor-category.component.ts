import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-vendor-category',
  templateUrl: './edit-vendor-category.component.html',
  styleUrl: './edit-vendor-category.component.scss'
})
export class EditVendorCategoryComponent implements OnInit {
  constructor(private fb :FormBuilder , private generalSettingService: GeneralSettingService, private formsService: FormsService , private routerService : RouterService , private route : ActivatedRoute){
  }

  formGroup  :FormGroup;
  accountsList: { id: number; name: string }[] = [];
  priceList: { id: number; name: string }[] = [];
  paymentTermsList: { id: number; name: string }[] = [];
  marketTypeList = [{label : 'B2B'}, {label :'B2C'} ]
  id : number = this.route.snapshot.params['id']

  ngOnInit(): void {
  this.formGroup = this.fb.group({
    name: new FormControl('',  customValidators.required),
    code : '',
    payableAccountId : 0,
    purchaseAccountId : 0,
    purchaseReturnAccountId : 0,
    discountAccountId : 0,
    priceListId : 0,
    paymentTermId : 0,
    marketType : 0,
   
  
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

  this.generalSettingService.getVendorCategoryByID(this.id)
  this.generalSettingService.vendorCategoryDataByIDObservable.subscribe(res=>{
    this.formGroup.patchValue({...res})
  })

  }

 

  
  onSave() {
    if (!this.formsService.validForm(this.formGroup, false)) return;
    this.formGroup.value.id = this.id

  this.generalSettingService.EditVendorCategory(this.formGroup.value)
  this.generalSettingService.addVendorCategoryDataObservable.subscribe(res=>{
    if(res) {
      this.routerService.navigateTo('vendor-category')

    }

  })
  }

  
  
}