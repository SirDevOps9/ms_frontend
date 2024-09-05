import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTagDto } from 'projects/apps-purchase/src/app/modules/purchase/models';
import { MenuModule, FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-add-item-definition-popup',
  templateUrl: './add-item-definition-popup.component.html',
  styleUrl: './add-item-definition-popup.component.scss'
})
export class AddItemDefinitionPopupComponent implements OnInit {
  itemDefinitionForm: FormGroup;
  selectedModules: number[] = [];
  itemTypeLookupData : { id: number; nameAr: string; nameEn: string }[] = []
  ItemCategoryDropDown : { id: number; nameAr: string; nameEn: string }[] = []
  UOMCategoryDropDown : { id: number; nameEn: string }[] = []
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private itemsService : ItemsService,

  ) {

  }

  ngOnInit() {
    this.initializeitemDefinition();
    this.initItemTypeLookupData()
    this.ItemCategoryDropDownData()
    this.getUomDropDown()
  }
  initItemTypeLookupData() {
    this.itemsService.itemTypeLookupData()
    this.itemsService.itemTypeLookupObs.subscribe(res=>{
      this.itemTypeLookupData = res
    })
  }
  ItemCategoryDropDownData() {
    this.itemsService.ItemCategoryDropDown()
    this.itemsService.itemCategoryLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res
    })
  }
  getUomDropDown() {
    this.itemsService.getUomDropDown()
    this.itemsService.UOMDropDownLookup.subscribe(res=>{
      this.UOMCategoryDropDown = res
    })
  }


 

  initializeitemDefinition() {
    this.itemDefinitionForm = this.fb.group({
      name: new FormControl('' ,[customValidators.required]),
      typeId: new FormControl('', [customValidators.required]),
      categoryId: new FormControl([],  [customValidators.required]),
      uomId: new FormControl([],  [customValidators.required]),
    
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit(text : string) {
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;   
    this.itemsService.addItemDefinition(this.itemDefinitionForm.value , this.ref , text)

  }

  onSaveConinue(text : string){
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;   
    this.itemsService.addItemDefinition(this.itemDefinitionForm.value , this.ref , text)
  }
}

