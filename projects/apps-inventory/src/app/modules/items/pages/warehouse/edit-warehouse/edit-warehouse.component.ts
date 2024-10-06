import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-warehouse',
  templateUrl: './edit-warehouse.component.html',
  styleUrl: './edit-warehouse.component.scss'
})
export class EditWarehouseComponent implements OnInit {
  glAccountLookup = []
  CashSalesLookup = []
  warehouseForm : FormGroup = new FormGroup({})

  CreditSalesLookup = []
  SalesReturnLookup = []
  PurchaseAccountLookup = []
  SalesCostCenterLookup = []
  DiscountAccountLookup = []
  EvaluationAccountLookup = []
  AdjustmentAccountLookup = []
  AccountsDropDownLookup : { id: number; name: string }[] = []
  GoodsInTransitLookup = []
  BranchDropDownLookup : any = []
  branchesDropDown : any = []
  citiesDropDown : any = []
  countriesDropDown : any = []
  warehouseType = [
    { label: 'Physical', value: 1 },
    { label: 'Virtual', value: 2 },
    { label: 'VanSales ', value: 3 }
  
  ]
  CityDropDownLookup : any = []
  CityLookup = []
  CompanyPhoneLookup = []
  id : number
  constructor(private fb : FormBuilder , private formService : FormsService , private itemsService : ItemsService , private routerService : RouterService , private route : ActivatedRoute){
    this.id = this.route.snapshot.params['id']
  }
  ngOnInit(): void {
   this.warehouseForm = this.fb.group({
    id: this.id,
    code: [''],
    name: ['', [customValidators.required]],
    warehouseType: ['', [customValidators.required]],
    branchWarehouses: [0, [customValidators.required]],
    addressWarehouse: this.fb.group({
      city: [''],
      addressLine: [''],
      countryCode : [''],
      phone: [''],
      fax: [''],
      postalCode: [''],
      email: [''],
      longitude: [0],
      latitude: [0],
      radius: [0],

    }),
    warehouseAccount: this.fb.group({
      glAccountId: [0],
      cashSalesAccountId: [0],
      creditSalesAccountId: [0],
      salesReturnAccountId: [0],
      salesCostAccountId: [0],
      discountAccountId: [0],
      purchaseAccountId: [0],
      evaluationAccountId: [0],
      goodsInTransitAccountId: [0],
      adjustmentAccountId: [0]
    })
  });
  this.getWarehouseById()
  this.getAccount()
  this.getBranchesLookup()
  this.getCcountriesDropdown()
}

getWarehouseById() {
  this.itemsService.getWarehouseById(this.id)
  this.itemsService.sendWarehouseByIdObs.subscribe((res : any)=>{
    this.getCitiesDropdown(res?.addressWarehouse?.countryCode)

    this.warehouseForm.patchValue({
      code: res.code,
      name: res.name,
      warehouseType: this.warehouseType.find(elem=>elem.label == res.warehouseType)?.value,
      branchWarehouses: res?.branchWarehouses?.map((bw : any) => bw.branchId), // Assuming you want to patch warehouseId
      addressWarehouse: {
        city: res?.addressWarehouse?.city,
        addressLine: res?.addressWarehouse?.addressLine,
        phone: res?.addressWarehouse?.phone, // Mapping phone to the correct form control
        countryCode: res?.addressWarehouse?.countryCode, // Mapping phone to the correct form control
        fax: res?.addressWarehouse?.fax,
        postalCode: res?.addressWarehouse?.postalCode,
        email: res?.addressWarehouse?.email,
        longitude: res?.addressWarehouse?.longitude,
        latitude: res?.addressWarehouse?.latitude,
        radius: res?.addressWarehouse?.radius
      },
      warehouseAccount: {
        glAccountId: res?.warehouseAccount?.glAccountId,
        cashSalesAccountId: res?.warehouseAccount?.cashSalesAccountId,
        creditSalesAccountId: res?.warehouseAccount?.creditSalesAccountId,
        salesReturnAccountId: res?.warehouseAccount?.salesReturnAccountId,
        salesCostAccountId: res?.warehouseAccount?.salesCostAccountId,
        discountAccountId: res?.warehouseAccount?.discountAccountId,
        purchaseAccountId: res?.warehouseAccount?.purchaseAccountId,
        evaluationAccountId: res?.warehouseAccount?.evaluationAccountId,
        goodsInTransitAccountId: res?.warehouseAccount?.goodsInTransitAccountId,
        adjustmentAccountId: res?.warehouseAccount?.adjustmentAccountId
      }
    });
    console.log(res)
  })
}
  

  getBranchesLookup(){
    this.itemsService.getBranchDropdown()
    this.itemsService.sendBranchesLookupObs.subscribe(res=>{
      this.branchesDropDown = res
    })

  }
  getCitiesDropdown(id : string){
    this.itemsService. getCitiesDropdown(id)
    this.itemsService.sendCitiesLookupObs.subscribe(res=>{
      this.citiesDropDown = res
    })
  }
  countriesChanged(e: string) {
    this.getCitiesDropdown(e)
  }
  getCcountriesDropdown(){
    this.itemsService. getCcountriesDropdown()
    this.itemsService.sendCountriesLookupObs.subscribe(res=>{
      this.countriesDropDown = res
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
  getAccount() { 
    this.itemsService.AccountsDropDown()
    this.itemsService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
  }

  onSubmit() {
    if (!this.formService.validForm(this.warehouseForm, false)) return;

    let warehouseData = this.warehouseForm.getRawValue();

    // Safely check for addressWarehouse
    if (!!warehouseData.addressWarehouse  ) {
      warehouseData.addressWarehouse = null;
    }
    
    // Safely check for warehouseAccount
    if (!!warehouseData.warehouseAccount ) {
      warehouseData.warehouseAccount = null;
    }
    this.itemsService.editWarehouse(warehouseData)
   
  }
  onCancel() {
    this.routerService.navigateTo('/masterdata/warehouse')
  }


}
