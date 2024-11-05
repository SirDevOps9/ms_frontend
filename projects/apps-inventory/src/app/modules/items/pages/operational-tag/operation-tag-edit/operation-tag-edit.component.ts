import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { FormsService, RouterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddOperatioalTag, GetWarehouseList } from '../../../models';
import { OperationType } from '../../../models/enums';
import { ActivatedRoute } from '@angular/router';
import { ItemsProxyService } from '../../../items-proxy.service';

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
    { id: OperationType.StockIn, name: 'StockIn' },
    { id: OperationType.StockOut, name: 'StockOut' }
  ];


  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private itemsService : ItemsService,
    private routerService: RouterService,
    private _route : ActivatedRoute,
  private itemProxy : ItemsProxyService,
    private formService: FormsService

  ) {

  }

  ngOnInit() {
    const id = this._route.snapshot.params['id'];
    this.initForm();
    this.initWareHouseLookupData();
    this.getAccount();

    if (id) {
      this.getOperationalTagById(id);
    }
  }

  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown()
    this.itemsService.wareHousesDropDownLookup$.subscribe(res=>{
      this.warhouseLookupData = res
    })
  }
  initWarehouseLookupData() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup$.subscribe(res => {
      this.warhouseLookupData = res;
    });
  }
  getAccount() {
    this.itemsService.AccountsDropDown()
    this.itemsService.AccountsDropDownLookupObs.subscribe(res=>{
      if(res.length) {
        this.AccountsDropDownLookup = res
        console.log(res)

      }
    })
  }

  getOperationalTagById(id: number) {
    this.itemProxy.getOperationalTagById(id).subscribe(
      (res: AddOperatioalTag) => {
        console.log(res);
        if (res) {

          const operationTypeValue = this.operationTypeList.find(
            type => type.name === res.operationType
          )?.id || '';

          this.formGroup.patchValue({
            id: res.id,
            code: res.code,
            name: res.name,
            operationType: operationTypeValue,
            warehouseId: res.warehouseId,
            glAccountId: String(res.glAccountId)
          });
        }
      },
      (error: any) => {
      }
    );
  }





  initForm() {
      this.formGroup = this.fb.group({
        id: new FormControl(),
        code: new FormControl('', ),
        name: ['', Validators.required],
        operationType: ['', Validators.required],
        warehouseId: ['', Validators.required],
        glAccountId: ['', Validators.required],
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

