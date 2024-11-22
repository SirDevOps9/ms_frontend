import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LanguageService, customValidators } from 'shared-lib';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-add-variant-popup',
  templateUrl: './add-variant-popup.component.html',
  styleUrl: './add-variant-popup.component.scss'
})
export class AddVariantPopupComponent implements OnInit {
  itemDefinitionForm: FormGroup;
  selectedModules: number[] = [];
  currentLang:string = ''
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
    public languageService: LanguageService,
  ) {
    this.currentLang = this.languageService.getLang();

  }

  ngOnInit() {
    this.initializeitemDefinition();
    this. attributeGroups();
    if(this.config?.data?.attributeGroupDetails) {

      this.itemDefinitionForm.get('attributeGroupId')?.setValue(this.config.data.attributeGroupId)
      this.attributeGroupsValue(this.config.data.attributeGroupId)
      let values = this.config.data.attributeGroupDetails.map((elem : any)=>Number(elem.attributeId) || elem.detailName )

      this.itemDefinitionForm.get('attributeGroupDetails')?.setValue(values)
    }

    this.itemDefinitionForm.get('attributeGroupId')?.valueChanges.subscribe(res=>{
      if(res) {
        this.itemDefinitionForm.get('attributeGroupDetails')?.setValue(null)
        this.attributeGroupsValue(res)
      }
    })






  }
  attributeGroups() {
    this.itemsService.attributeGroups()
    this.itemsService.attributeNameDropDownLookupObs.subscribe(res=>{
      this.attributeName = res
      if(this.config.data.formValue) {
        let formData =this.config.data.formValue
        formData =  formData.map((elem : any)=>elem.attributeGroupId)
        this.attributeName = this.attributeName.filter((item : any)=> !formData.includes(item.id))



      }
    })
  }
  attributeGroupsValue(id : number) {
    this.itemsService.attributeGroupsValue(id)
    this.itemsService.attributeValuesDropDownLookupObs.subscribe((res : any)=>{
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
    // this.itemsService.addVariantLine(data)
    // this.itemsService.addVariantLineDataObs.subscribe(res=>{
    //   if(res) {
   let attributeValues =  this.attributeValues.filter((elem : any)=> this.itemDefinitionForm.get('attributeGroupDetails')?.value.includes(elem.id)).map((item : any)=>item.nameEn)
        let attributeName : string = this.attributeName.find((elem : any)=>elem.id == this.itemDefinitionForm.value.attributeGroupId).nameEn
        this.ref.close({attributeName : attributeName , attributeDetails  :this.itemDefinitionForm.get('attributeGroupDetails')?.value , values :  attributeValues , attributeGroupId : this.itemDefinitionForm.get('attributeGroupId')?.value} )

    // })


  }
}


