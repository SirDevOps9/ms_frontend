import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { PurchaseService } from '../../../purchase.service';

@Component({
  selector: 'app-create-vendor-category',
  templateUrl: './create-vendor-category.component.html',
  styleUrl: './create-vendor-category.component.scss'
})
export class CreateVendorCategoryComponent implements OnInit {
  constructor(private fb :FormBuilder , private purchaseService: PurchaseService, private formsService: FormsService , private routerService : RouterService){
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
    payableAccountId : null,
    purchaseAccountId : null,
    purchaseReturnAccountId : null,
    discountAccountId : null,
    pricePolicyId : null,
    paymentTermId : null,
    marketType : null,
   
  
  })

  this.purchaseService.getChildrenAccountsDropDown()
  this.purchaseService.sendChildrenAccountsDropDownDataObservable.subscribe(res=>{
    this.accountsList = res
  })

  this.purchaseService.getpriceListDropDown()
  this.purchaseService.sendPriceListsDropDownDataObservable.subscribe(res=>{
    this.priceList = res
  })
  this.purchaseService.getpaymentTermsListDropDown()
  this.purchaseService.sendPaymentTermsDropDownDataObservable.subscribe(res=>{
    this.paymentTermsList = res
  })

  }

 

  
  onSave() {
    if (!this.formsService.validForm(this.formGroup, false)) return;


  this.purchaseService.addVendorCategory(this.formGroup.value)
  this.purchaseService.addVendorCategoryDataObservable.subscribe(res=>{
    if(res) {
      this.routerService.navigateTo('masterdata/vendor-category')

    }

  })
  }

  
  
}