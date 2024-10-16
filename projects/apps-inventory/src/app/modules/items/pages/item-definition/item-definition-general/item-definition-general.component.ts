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

  ngOnInit(): void {
  this.ItemCategoryDropDownData()
  this.tagDropDropDown()
  this.itemDefinitionForm = this.fb.group({
    id : this.id,
    code : [''],
    name : ['' , [customValidators.required]],
    photo : [''],
    categoryId : ['' , [customValidators.required]],
    countryId : [''],
    tags : [''],
    defaultUOMCategoryId : ['' , [customValidators.required]],
    taxId : [''],
    shortName : [''],
    warranty : [''],
    isVatApplied : [''],
    specialCare : [''],
    lifeTime : [''],
    color : [''],
    uomId : ['' ],
    uom : this.fb.array([]),
    barcode : this.fb.array([]),
    attribute : this.fb.array([]),
    hasExpiryDate : [''],
    trackingId : [''],
    itemAccounting : this.fb.group({
      pAccount: 0,
      prAccount: 0,
      sAccount: 0,
      srAccount: 0
    })
  })
  }
  constructor(private _router : RouterService,private fb : FormBuilder , private formService : FormsService ,  public sharedLibEnums: SharedLibraryEnums,private dialog : DialogService , private route : ActivatedRoute , private toaserService : ToasterService , private itemService : ItemsService){
    this.id = this.route.snapshot.params['id']
  }
  ItemCategoryDropDownData() {
    this.itemService.ItemCategoryDropDown()
    this.itemService.itemCategoryLookupObs.subscribe(res=>{
      this.ItemCategoryDropDown = res
    })
  }
  tagDropDropDown() {
    this.itemService.tagDropDown()
    this.itemService.tagLookupObs.subscribe(res=>{
      this.tagDropDropDownLookup = res
    })
  }

  itemDefinitionForm : FormGroup = new FormGroup({})

}
