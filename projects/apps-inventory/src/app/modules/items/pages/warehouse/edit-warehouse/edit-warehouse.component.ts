import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsService, RouterService, customValidators ,LanguageService} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
  currentLang:string = ''
  warehouseType = [
    { label: this.LanguageService.instant('global.Physical') , value: 1 },
    { label: this.LanguageService.instant('global.Virtual') , value: 2 },
    { label: this.LanguageService.instant('global.VanSales') , value: 3 }


  ]
  CityDropDownLookup : any = []
  CityLookup = []
  CompanyPhoneLookup = []
  id : number
  constructor(private fb : FormBuilder ,
    private formService : FormsService ,
    private itemsService : ItemsService ,
    public languageService: LanguageService,
     private routerService : RouterService ,
     private route : ActivatedRoute ,
         private LanguageService:TranslateService,


    ){
    this.id = this.route.snapshot.params['id']
    this.currentLang = this.languageService.getLang();

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
  this.showWarehouseType()
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
        city: res?.addressWarehouse?.city ?? null,
        addressLine: res?.addressWarehouse?.addressLine ?? null,
        phone: res?.addressWarehouse?.phone ?? null,  // Mapping phone to the correct form control
        countryCode: res?.addressWarehouse?.countryCode ?? null,  // Mapping phone to the correct form control
        fax: res?.addressWarehouse?.fax ?? null,
        postalCode: res?.addressWarehouse?.postalCode ?? null,
        email: res?.addressWarehouse?.email ?? null,
        longitude: res?.addressWarehouse?.longitude ?? null,
        latitude: res?.addressWarehouse?.latitude ?? null,
        radius: res?.addressWarehouse?.radius ?? null
      },
      warehouseAccount: {
        glAccountId: res?.warehouseAccount?.glAccountId ?? null,
        cashSalesAccountId: res?.warehouseAccount?.cashSalesAccountId ?? null,
        creditSalesAccountId: res?.warehouseAccount?.creditSalesAccountId ?? null,
        salesReturnAccountId: res?.warehouseAccount?.salesReturnAccountId ?? null,
        salesCostAccountId: res?.warehouseAccount?.salesCostAccountId ?? null,
        discountAccountId: res?.warehouseAccount?.discountAccountId ?? null,
        purchaseAccountId: res?.warehouseAccount?.purchaseAccountId ?? null,
        evaluationAccountId: res?.warehouseAccount?.evaluationAccountId ?? null,
        goodsInTransitAccountId: res?.warehouseAccount?.goodsInTransitAccountId ?? null,
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

  getAccount() {
    this.itemsService.AccountsDropDown()
    this.itemsService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
  }


  onSubmit() {
    if (!this.formService.validForm(this.warehouseForm, false)) return;
    let warehouseData = {...this.warehouseForm.getRawValue()}
    let WarehouseCheck = Object.values(warehouseData.addressWarehouse).every(elem => elem == undefined || elem == null || elem == 0);
    let warehouseAccountCheck = Object.values(warehouseData.warehouseAccount).every(elem => elem == undefined || elem == null || elem == 0);
    if(WarehouseCheck) {
      warehouseData.addressWarehouse = null;
    }
    if(warehouseAccountCheck) {
      warehouseData.warehouseAccount = null;
    }
    this.itemsService.editWarehouse(warehouseData)

  }
  onCancel() {
    this.routerService.navigateTo('/masterdata/warehouse')
  }

  account:boolean=true
  showaddress:boolean=false
  showWarehouseType(){
    if(this.warehouseForm.get('warehouseType')?.value == 1){
      this.showaddress=true
    }
  }
  findRouteAddress() {
    if(this.warehouseForm.get('warehouseType')?.value == 1){
      this.account = false
      this.showaddress=true
    }
  }
  findRouteAccount() {
    if(this.warehouseForm.get('warehouseType')?.value == 1){
      this.account = true
      this.showaddress=false
    }
  }
}
