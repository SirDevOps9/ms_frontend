import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, FormsService, SharedLibraryEnums, ToasterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';

@Component({
  selector: 'app-item-definition-general',
  templateUrl: './item-definition-general.component.html',
  styleUrl: './item-definition-general.component.scss'
})
export class ItemDefinitionGeneralComponent implements OnInit{
  id : number
  ItemCategoryDropDown : { id: number; name: string;  }[] = []
  tagDropDropDownLookup : { id: number; name: string }[] = []
  taxesDropDropDownLookup : { id: number; nameAr: string; nameEn: string }[] = []
  UOMCategoryDropDown : { id: number; name: string}[] = []

  colors = [
    { label: 'Red', value: '#FF0000', icon: 'pi pi-circle' },
    { label: 'Green', value: '#008000', icon: 'pi pi-circle' },
    { label: 'Blue', value: '#0000FF', icon: 'pi pi-circle' },
    { label: 'Yellow', value: '#FFFF00', icon: 'pi pi-circle' },
    { label: 'Orange', value: '#FFA500', icon: 'pi pi-circle' },
    { label: 'Purple', value: '#800080', icon: 'pi pi-circle' },
    { label: 'Cyan', value: '#00FFFF', icon: 'pi pi-circle' },
    { label: 'Magenta', value: '#FF00FF', icon: 'pi pi-circle' },
    { label: 'Lime', value: '#00FF00', icon: 'pi pi-circle' },
    { label: 'Pink', value: '#FFC0CB', icon: 'pi pi-circle' },
    { label: 'Teal', value: '#008080', icon: 'pi pi-circle' },
    { label: 'Lavender', value: '#E6E6FA', icon: 'pi pi-circle' },
    { label: 'Brown', value: '#A52A2A', icon: 'pi pi-circle' },
    { label: 'Beige', value: '#F5F5DC', icon: 'pi pi-circle' },
    { label: 'Maroon', value: '#800000', icon: 'pi pi-circle' },
    { label: 'Mint', value: '#98FF98', icon: 'pi pi-circle' },
    { label: 'Olive', value: '#808000', icon: 'pi pi-circle' },
    { label: 'Coral', value: '#FF7F50', icon: 'pi pi-circle' },
    { label: 'Navy', value: '#000080', icon: 'pi pi-circle' },
    { label: 'Grey', value: '#808080', icon: 'pi pi-circle' },
    { label: 'White', value: '#FFFFFF', icon: 'pi pi-circle' },
    { label: 'Black', value: '#000000', icon: 'pi pi-circle' },
    { label: 'Violet', value: '#EE82EE', icon: 'pi pi-circle' },
    { label: 'Indigo', value: '#4B0082', icon: 'pi pi-circle' },
    { label: 'Gold', value: '#FFD700', icon: 'pi pi-circle' },
    { label: 'Silver', value: '#C0C0C0', icon: 'pi pi-circle' },
    { label: 'Charcoal', value: '#36454F', icon: 'pi pi-circle' },
    { label: 'Peach', value: '#FFE5B4', icon: 'pi pi-circle' },
    { label: 'Salmon', value: '#FA8072', icon: 'pi pi-circle' },
    { label: 'Chocolate', value: '#D2691E', icon: 'pi pi-circle' },
    { label: 'Tomato', value: '#FF6347', icon: 'pi pi-circle' },
    { label: 'Khaki', value: '#F0E68C', icon: 'pi pi-circle' },
    { label: 'Turquoise', value: '#40E0D0', icon: 'pi pi-circle' },
    { label: 'Plum', value: '#DDA0DD', icon: 'pi pi-circle' },
    { label: 'Crimson', value: '#DC143C', icon: 'pi pi-circle' },
    { label: 'Sienna', value: '#A0522D', icon: 'pi pi-circle' },
    { label: 'Orchid', value: '#DA70D6', icon: 'pi pi-circle' },
    { label: 'Azure', value: '#F0FFFF', icon: 'pi pi-circle' },
    { label: 'Ivory', value: '#FFFFF0', icon: 'pi pi-circle' },
    { label: 'Rust', value: '#B7410E', icon: 'pi pi-circle' },
    { label: 'Fuchsia', value: '#FF00FF', icon: 'pi pi-circle' },
    { label: 'Ruby', value: '#E0115F', icon: 'pi pi-circle' },
    { label: 'Amethyst', value: '#9966CC', icon: 'pi pi-circle' },
    { label: 'Pearl', value: '#EAE0C8', icon: 'pi pi-circle' },
    { label: 'Periwinkle', value: '#CCCCFF', icon: 'pi pi-circle' },
    { label: 'Sky Blue', value: '#87CEEB', icon: 'pi pi-circle' },
    { label: 'Mauve', value: '#E0B0FF', icon: 'pi pi-circle' },
    { label: 'Honeydew', value: '#F0FFF0', icon: 'pi pi-circle' },
    { label: 'Azure', value: '#007FFF', icon: 'pi pi-circle' },
  ];
  countriesLookup : []

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
    tags : [''],

    countryId : [''],
    taxId : [''],
    shortName : [''],
    warranty : [''],
    isVatApplied : [''],
    specialCare : [''],
    lifeTime : [''],
    color : [''],
   
  })
  }
  constructor(private _router : RouterService,private fb : FormBuilder , private formService : FormsService ,  public sharedLibEnums: SharedLibraryEnums,private dialog : DialogService , private route : ActivatedRoute , private toaserService : ToasterService , private itemService : ItemsService){
    this.id = this.route.snapshot.params['id']
  }
  taxesDropDropDown() {
    this.itemService.taxesDropDropDown()
    this.itemService.taxesLookupObs.subscribe(res=>{
      this.taxesDropDropDownLookup = res
    })
  } 

  uomCategoryChanged(e : any) {
  
    // this.getDefaultUnit(e)
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

  itemDefinitionForm : FormGroup = new FormGroup({})

  onCancel() {

  }
  onSave() {

  }

}
