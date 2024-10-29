import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, PageInfo, PageInfoResult, RouterService, SharedLibraryEnums, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { GetItemUom } from '../../../models/GetItemUom';

@Component({
  selector: 'app-item-definition-uom',
  templateUrl: './item-definition-uom.component.html',
  styleUrl: './item-definition-uom.component.scss'
})
export class ItemDefinitionUomComponent {
  itemUomForm: FormGroup;
  id : number
  currentPageInfo: PageInfoResult = {}
  ItemCategoryDropDown:any[]=[
    {id: 1 , name:"test"}
  ]
  tagDropDropDownLookup:any[]=[
    {id:1 , name:"test1"}
  ]
  dataUom: any[] = [];



  tableData:any[]=[]
  constructor(private _router : RouterService,private fb : FormBuilder , private formService : FormsService ,  public sharedLibEnums: SharedLibraryEnums,private dialog : DialogService , private route : ActivatedRoute , private toaserService : ToasterService , private itemService : ItemsService){
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {

    this.getDataUomBtId();

this.createFormUom()

  }


  createFormUom(){
    this.itemUomForm = this.fb.group({
      uomCategoryId: [''],
      name: ['', Validators.required],
      uoms: this.fb.array([]) // Initialize FormArray here

    });
  }
  get uoms(): FormArray {
    return this.itemUomForm.get('uoms') as FormArray;
  }

  addUom() {
    const uomFormGroup = this.fb.group({
      conversionRatio: [''], // Add the necessary controls here
      // ... any other controls you need
    });
    this.uoms.push(uomFormGroup);
  }




  onPageChange(pageInfo: PageInfo) {
    // this.itemsService.getItemDefinition('', pageInfo);
  }


  async getDataUomBtId() {
    await this.itemService.getItemGetItemUomById(this.id);

    this.itemService.ViewDataItemUomByIdObs.subscribe((data: any) => {
      if (data && Array.isArray(data.uoms)) {
        this.tableData = data.uoms; // Set tableData to the uoms array
        this.setUoms(data.uoms); // Populate the FormArray with data
      } else {
        this.tableData = [];
      }
    })
  }
  setUoms(uoms: any[]) {
    const formArray = this.uoms;
    uoms.forEach(uom => {
      formArray.push(this.fb.group({
        uomId: [uom.uomId, Validators.required],
        conversionRatio: [uom.conversionRatio, Validators.required],
        unitUsages: [uom.unitUsages] // Add any other fields as necessary
      }));
    });
  }

}
