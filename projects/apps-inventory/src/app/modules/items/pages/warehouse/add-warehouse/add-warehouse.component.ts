import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { customValidators, FormsService, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrl: './add-warehouse.component.scss'
})
export class AddWarehouseComponent implements OnInit {
  glAccountLookup = []
  CashSalesLookup = []
  CreditSalesLookup = []
  SalesReturnLookup = []
  PurchaseAccountLookup = []
  SalesCostCenterLookup = []
  DiscountAccountLookup = []
  EvaluationAccountLookup = []
  AdjustmentAccountLookup = []
  AccountsDropDownLookup : { id: number; name: string }[] = []
  GoodsInTransitLookup = []
  CityLookup = []
  CompanyPhoneLookup = []
  constructor(private fb : FormBuilder , private formService : FormsService , private itemsService : ItemsService , private routerService : RouterService){}
  ngOnInit(): void {
   this.warehouseForm = this.fb.group({
    code: [''],
    name: [''],
    warehouseType: [''],
    branchId: [null],
    city: [''],
    addressLine: [''],
    phone: ['' , customValidators.phone],
    fax: ['' ],
    postalCode: [''],
    email: ['' , customValidators.email],
    longitude: [null],
    latitude: [null],
    radius: [null],
    glAccountId: [null],
    cashSalesAccountId: [null],
    creditSalesAccountId: [null],
    salesReturnAccountId: [null],
    salesCostAccountId: [null],
    discountAccountId: [null],
    purchaseAccountId: [null],
    evaluationAccountId: [null],
    goodsInTransitAccountId: [null],
    adjustmentAccountId: [null]
   })
   this.getAccount()
  }
  warehouseForm : FormGroup = new FormGroup({})

  onSubmit() {
    // this.itemsService.addWarehouse(this.warehouseForm.getRawValue())
   
  }
  onCancel() {
    this.routerService.navigateTo('/masterdata/warehouse')
  }
  getAccount() { 
  this.itemsService.AccountsDropDown()
  this.itemsService.AccountsDropDownLookupObs.subscribe(res=>{
    this.AccountsDropDownLookup = res
  })
}
  getWarehouseLookups() {
    // this.itemsService.sendGlAccountLookupObs.subscribe(res=>{
    //   this.glAccountLookup = res
    // })
    // // 
    // this.itemsService.sendCashSalesLookupObs.subscribe(res=>{
    //   this.CashSalesLookup = res
    // })
    // // 
    // this.itemsService.sendCreditSalesLookupObs.subscribe(res=>{
    //   this.CreditSalesLookup = res
    // })
    // // 
    // this.itemsService.sendSalesReturnLookupObs.subscribe(res=>{
    //   this.SalesReturnLookup = res
    // })
    // // 
    // this.itemsService.sendPurchaseAccountLookupObs.subscribe(res=>{
    //   this.PurchaseAccountLookup = res
    // })
    // // 
    // this.itemsService.sendSalesCostCenterLookupObs.subscribe(res=>{
    //   this.SalesCostCenterLookup = res
    // })
    // // 
    // this.itemsService.sendDiscountAccountLookupObs.subscribe(res=>{
    //   this.DiscountAccountLookup = res
    // })
    // // 
    // this.itemsService.sendEvaluationAccountLookupObs.subscribe(res=>{
    //   this.EvaluationAccountLookup = res
    // })
    // // 
    // this.itemsService.sendAdjustmentAccountLookupObs.subscribe(res=>{
    //   this.AdjustmentAccountLookup = res
    // })
    // // 
    // this.itemsService.sendGoodsInTransitLookupObs.subscribe(res=>{
    //   this.GoodsInTransitLookup = res
    // })
    // // 
    // this.itemsService.sendCityLookupObs.subscribe(res=>{
    //   this.CityLookup = res
    // })
    // // 
    // this.itemsService.sendCompanyPhoneLookupObs.subscribe(res=>{
    //   this.CompanyPhoneLookup = res
    // })
    // 
  }
}
