import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTagDto } from 'projects/apps-purchase/src/app/modules/purchase/models';
import { MenuModule, FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../items.service';
import { UomCodeLookup } from '../../models';

@Component({
  selector: 'app-add-item-definition-popup',
  templateUrl: './add-item-definition-popup.component.html',
  styleUrl: './add-item-definition-popup.component.scss'
})
export class AddItemDefinitionPopupComponent implements OnInit {
  itemDefinitionForm: FormGroup;
  selectedModules: number[] = [];
  itemTypeLookupData : { id: number;  name: string }[] = []
  ItemCategoryDropDown : { id: number;  name: string }[] = []
  UOMCategoryDropDown : UomCodeLookup[] = []
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

  }
  uomCategoryChanged(e : any) {
    this.getUomDropDown(e)
    console.log(e);


  }
  initItemTypeLookupData() {
    this.itemsService.ItemCategoryDropDown()
    this.itemsService.itemCategoryLookupObs.subscribe(res=>{
      this.itemTypeLookupData = res


    })
  }
  getUomDropDown(id : number) {
    this.itemsService.uomCodeDropDown(id)
    this.itemsService.uomCodeLookupObs.subscribe(res=>{
      this.UOMCategoryDropDown = res

      console.log( this.UOMCategoryDropDown)

      let defaultUnit =  this.UOMCategoryDropDown.find(elem=>elem.isDefault)
      console.log(defaultUnit?.id)

        this.itemDefinitionForm.get('uomId')?.setValue(defaultUnit?.id)



    })
  }

  UOMCategoryDropDownChanged(event: any) {
    this.itemDefinitionForm.get('uomId')?.setValue(event)
  }
  ItemCategoryDropDownData() {
    this.itemsService.UOMCategoryDropDown()
    this.itemsService.UOMCategoryDropDownLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res



    })
  }






  initializeitemDefinition() {
    this.itemDefinitionForm = this.fb.group({
      name: new FormControl('', [customValidators.required]),
      categoryId: new FormControl([], [customValidators.required]),
      uomCategoryId: new FormControl('', [customValidators.required])
    });
  }


  onCancel() {
    this.ref.close();
  }

  close() {
    this.ref.close();
  }

  onSubmit(text : string) {
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;
    const { typeId, ...arg } = this.itemDefinitionForm.value;
    this.itemsService.addItemDefinition(arg , this.ref , text)

  }

  onSaveConinue(text : string){
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;
    const { typeId, ...arg } = this.itemDefinitionForm.value;

    this.itemsService.addItemDefinition(arg , this.ref , text)
    
  }
}

