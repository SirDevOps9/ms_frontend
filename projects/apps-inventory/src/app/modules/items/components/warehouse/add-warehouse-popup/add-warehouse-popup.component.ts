import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators, LanguageService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-warehouse-popup',
  templateUrl: './add-warehouse-popup.component.html',
  styleUrl: './add-warehouse-popup.component.scss'
})
export class AddWarehousePopupComponent implements OnInit {
  warehouseForm: FormGroup;

  // UOMCategoryDropDown : { id: number; nameEn: string }[] = []
  branchesDropDown : any = []
  warehouseType = [
    { label: this.LanguageService.instant('global.Physical') , value: 1 },
    { label: this.LanguageService.instant('global.Virtual') , value: 2 },
    { label: this.LanguageService.instant('global.VanSales') , value: 3 }

  ]
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private itemsService : ItemsService,
    private LanguageService:TranslateService

  ) {

  }

  ngOnInit() {
    this.initializeitemDefinition()
    this.getBranchesLookup()
  }

  getBranchesLookup(){
    this.itemsService.getBranchDropdown()
    this.itemsService.sendBranchesLookupObs.subscribe(res=>{
      this.branchesDropDown = res
    })

  }




  initializeitemDefinition() {
    this.warehouseForm = this.fb.group({
      name: new FormControl('' ,[customValidators.required]),
      branchWarehouses: new FormControl('', [customValidators.required]),
      warehouseType: new FormControl(this.warehouseType[0].value,[customValidators.required]),

    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit(text : string) {
    if (!this.formsService.validForm(this.warehouseForm)) return;
    this.itemsService.addWarehouse(this.warehouseForm.value , this.ref , text)

  }

  onSaveConinue(text : string){
    if (!this.formsService.validForm(this.warehouseForm)) return;
    this.itemsService.addWarehouse(this.warehouseForm.value , this.ref , text)
  }
}

