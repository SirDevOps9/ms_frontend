import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, FormsService, SharedLibraryEnums, ToasterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { Colors } from '../../../models';

@Component({
  selector: 'app-item-definition-general',
  templateUrl: './item-definition-general.component.html',
  styleUrl: './item-definition-general.component.scss'
})
export class ItemDefinitionGeneralComponent implements OnInit{
  id : number
  itemDefinitionForm : FormGroup = new FormGroup({})
  ItemCategoryDropDown : { id: number; name: string;  }[] = []
  tagDropDropDownLookup : { id: number; name: string }[] = []
  taxesDropDropDownLookup : { id: number; nameAr: string; nameEn: string }[] = []
  UOMCategoryDropDown : { id: number; name: string}[] = []
  countriesLookup : []
  colors =  Colors()
  ngOnInit(): void {
  this.ItemCategoryDropDownData()
  this.tagDropDropDown()
  this.getCcountriesDropdown()
  this.taxesDropDropDown()
  this.UOMCategoryDropDownData()

  this.itemDefinitionForm = this.fb.group({
    id : this.id,
    code : [''],
    name : ['' , [customValidators.required]],
    photo : [''],
    categoryId : ['' , [customValidators.required]],
    tags : [[]],
    countryId : [''],
    taxId : [null],
    shortName : [''],
    warranty : [''],
    isVatApplied : [true],
    specialCare : [''],
    lifeTime : [''],
    color : [''],
   
  });
  this.itemService.getItemDefinitionGeneral(this.id)
  this.itemService.getItemDefGeneral$.subscribe(data=>{
    if(data){
      this.itemDefinitionForm.patchValue({...data})
    }
  })

  this.itemDefinitionForm.get('isVatApplied')?.valueChanges.subscribe(res=>{
    if(res == false) {
      this.itemDefinitionForm.get('taxId')?.setValue(null);
      this.itemDefinitionForm.get('taxId')?.updateValueAndValidity()
    }
  })
  
  }
  constructor(private _router : RouterService,private fb : FormBuilder , private formService : FormsService ,  public sharedLibEnums: SharedLibraryEnums,private dialog : DialogService , private route : ActivatedRoute , private toaserService : ToasterService , private itemService : ItemsService){
    this.id = this.route.snapshot.params['id'];

  }
  taxesDropDropDown() {
    this.itemService.taxesDropDropDown()
    this.itemService.taxesLookupObs.subscribe(res=>{
      this.taxesDropDropDownLookup = res
    })
  } 


  UOMCategoryDropDownData() {
    this.itemService.UOMCategoryDropDown()
    this.itemService.UOMCategoryDropDownLookup.subscribe(res=>{
      this.UOMCategoryDropDown = res 
    })
  }
  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown()
    this.itemService.itemCategoryLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res
    })
  }
  getCcountriesDropdown() {
    this.itemService.getCcountriesDropdown()

    this.itemService.sendCountriesLookupObs.subscribe(res=>{
      this.countriesLookup = res
    })
  }
  tagDropDropDown() {
    this.itemService.tagDropDown()
    this.itemService.tagLookupObs.subscribe(res=>{
      this.tagDropDropDownLookup = res
    })
  }


  onCancel() {
    this._router.navigateTo('/masterdata/item-definition')
  }
  onSave() {
    if (!this.formService.validForm(this.itemDefinitionForm, false)) return;
    this.itemService.saveItemDefinitionGeneral(this.itemDefinitionForm.value)

  }

}
