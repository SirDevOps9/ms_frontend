import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-add-variant-popup',
  templateUrl: './add-variant-popup.component.html',
  styleUrl: './add-variant-popup.component.scss'
})
export class AddVariantPopupComponent implements OnInit {
  itemDefinitionForm: FormGroup;
  selectedModules: number[] = [];

  attributeName : any = []
  attributeValues : any = []

  
 
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
    this. attributeGroups();

    this.itemDefinitionForm.get('attributeGroupId')?.valueChanges.subscribe(res=>{
      if(res) {
        this.attributeGroupsValue(res)
      }
    })

    console.log(this.config.data)

  }
  attributeGroups() {
    this.itemsService.attributeGroups()
    this.itemsService.attributeNameDropDownLookupObs.subscribe(res=>{
      this.attributeName = res
    })
  }
  attributeGroupsValue(id : number) {
    this.itemsService.attributeGroupsValue(id)
    this.itemsService.attributeValuesDropDownLookupObs.subscribe((res : any)=>{
      console.log(res)
      this.attributeValues = res.itemAttributes
    })
  }
 


 

  initializeitemDefinition() {
    this.itemDefinitionForm = this.fb.group({
      attributeGroupId: new FormControl(''),
      attributeGroupDetails: new FormControl('', [customValidators.required]),
    
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.itemDefinitionForm)) return;   
    let data = {...this.itemDefinitionForm.value , itemId : this.config.data}
    this.itemsService.addVariantLine(data)
    this.itemsService.addVariantLineDataObs.subscribe(res=>{
      if(res) {
        let attributeName : string = this.attributeName.find((elem : any)=>elem.id == this.itemDefinitionForm.value.attributeGroupId).nameEn
        console.log(attributeName)
        this.ref.close(attributeName)
      }
    })
    

  }
}


