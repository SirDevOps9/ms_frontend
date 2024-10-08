import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddOperatioalTag, GetWarehouseList } from '../../../models';
import { OperationType } from '../../../models/enums';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-operation-tag-edit',
  templateUrl: './operation-tag-edit.component.html',
  styleUrl: './operation-tag-edit.component.scss'
})
export class OperationTagEditComponent implements OnInit {
  formGroup: FormGroup;
  warhouseLookupData :GetWarehouseList[] =[]
  AccountsDropDownLookup : { id: number; name: string }[] = []


  get operationType(): OperationType {
    return this.operationType
  }
  operationTypeList = [
    { id: OperationType.StockIn, name: OperationType.StockIn },
    { id: OperationType.StockOut, name:  OperationType.StockOut },
  
  ];
  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private itemsService : ItemsService,
    private routerService: RouterService,
    private _route : ActivatedRoute,

    private formService: FormsService

  ) {

  }

  ngOnInit() {
    const id =this._route.snapshot.params['id']

    this.initForm();
    this.initWareHouseLookupData()

    if(id){

      this.getOperationalTagById(id)
    }
  }
 
  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown()
    this.itemsService.wareHousesDropDownLookup$.subscribe(res=>{
      this.warhouseLookupData = res
    })
  }

  getAccount() { 
    this.itemsService.AccountsDropDown()
    this.itemsService.AccountsDropDownLookupObs.subscribe(res=>{
      this.AccountsDropDownLookup = res
    })
  }

 
  getOperationalTagById(id: number){
    this.itemsService.getOperationalTagById(id)
    this.itemsService.getOperationalTagItemsById$.subscribe(
(res : AddOperatioalTag)=>{
  this.formGroup.patchValue(res)
}
    )

  }

  initForm() {
      this.formGroup = this.fb.group({
        id: new FormControl(),
        code: new FormControl('', ),
        name: new FormControl('', customValidators.required),
        operationType: new FormControl('', customValidators.required),
        warehouseId: new FormControl('', customValidators.required),
        glAccountId: new FormControl('', customValidators.required),
      });
  }

  discard() {
    this.routerService.navigateTo('/masterdata/operational-tag')
    
  }

  onSave() {

    if (!this.formService.validForm(this.formGroup, false)) return;
    let val = this .formGroup.value

    this.itemsService.editOperationalTag(val);
    this.itemsService.editOperationTag$.subscribe((res: any) => {
      if(res == true){

        this.routerService.navigateTo('/masterdata/operational-tag')
      }else{
        return
      }
    });
  }


}

