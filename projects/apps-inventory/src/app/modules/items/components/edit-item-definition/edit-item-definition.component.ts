import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-edit-item-definition',
  templateUrl: './edit-item-definition.component.html',
  styleUrl: './edit-item-definition.component.scss'
})
export class EditItemDefinitionComponent implements OnInit {
  itemDefinitionForm: FormGroup;
  selectedModules: number[] = [];
  itemTypeLookupData : any[] = []
  ItemCategoryDropDown : { id: number; name: string }[] = []
  UOMCategoryDropDown : { id: number; name: string;}[] = []
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
    this.getItemDefinitionById();
    // this.initItemTypeLookupData()
    // this.ItemCategoryDropDownData()
    // this.UOMCategoryDropDownData()
  }
  getItemDefinitionById() {
    this.itemsService.getItemDefinitionById(this.config.data.id)
    this.itemsService.sendDataDefinitionByIdObs.subscribe(res=>{
      this.itemDefinitionForm.patchValue({...res})
    })
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
  UOMCategoryDropDownData() {
    this.itemsService.UOMCategoryDropDown()
    this.itemsService.UOMCategoryDropDownLookup.subscribe(res=>{
      this.UOMCategoryDropDown = res
    })
  }


 

  initializeitemDefinition() {
    this.itemDefinitionForm = this.fb.group({
      name: new FormControl(''),
      typeId: new FormControl('', [customValidators.required]),
      categoryId: new FormControl([],  [customValidators.required]),
      uomId: new FormControl([],  [customValidators.required]),
    
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;   
    // this.itemsService.editItemDefinition(this.config.data.id ,this.itemDefinitionForm.value )

  }
}

