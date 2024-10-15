import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import { RouterService, LanguageService, customValidators, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UomCodeLookup } from '../../../models';
import { ActivatedRoute } from '@angular/router';
import { UOMType } from '../../../models/enums';
import { addUOM } from '../../../models/addUom';

@Component({
  selector: 'app-uom-edit',
  templateUrl: './uom-edit.component.html',
  styleUrl: './uom-edit.component.scss'
})
export class UOMEditComponent implements OnInit {
  uomTableForm: FormArray;
  UOMFormGroup: FormGroup;

  listOfUOM: { id: number; name: string }[] = []
  listOfUOMCat: UomCodeLookup[] = []
  listOfUomTypes: any[] = []
  conversionUOMlist: any[] = []

  isLastLineSaved : boolean = true
  get UOMType(): UOMType {
    return this.UOMType
  }

  uomTypeList = [
    { id: UOMType.LowerType, name: 'LowerType' },
    { id: UOMType.DefaultType, name: 'DefaultType' },
    { id: UOMType.UpperType, name: 'UpperType' },
  ];
  constructor(
    private fb: FormBuilder,
    private _itemService: ItemsService,  
    private routerService: RouterService,
    private _route : ActivatedRoute,
    private toaserService: ToasterService,

    private languageService: LanguageService,
    private title: Title,

  ) {
  
  }


  ngOnInit(): void {
    const id =this._route.snapshot.params['id']
  
    // console.log(this.categoryId);
    
    this.uomTableForm = this.fb.array([this.create_UOM_FormGroup()]);

    this.initUOMForm()
    this.getUOM_list1()
    this.conversionUomDD()
    // console.log(id);
    // if(id){

    //   this.UOMFormGroup.get('uomCodeCategory')?.setValue(id)
      
    // }
    this.Get_UOMs_ByUOM_CategoryId(id)

  }


  get categoryId(): number {
    return this.UOMFormGroup.get('uomCodeCategory')?.value;
  }

  
  // init the form 
  initUOMForm() {
    this.UOMFormGroup = this.fb.group({
      id : '',
      uomCategoryNameEn: [null, customValidators.required],
      uomCategoryNameAr : [null, customValidators.required],
      uoMs : this.fb.array([])

    });

    this.UOMFormGroup.get('uomCodeCategory')?.valueChanges.subscribe((res: any) => {
      if (!res) return

      this.Get_UOMs_ByUOM_CategoryId(res)
    })
  }

  // get the list of dropdown
  getUOM_list1() {
    this._itemService.UOMCategoryDropDown()
    this._itemService.UOMCategoryDropDownLookupObs.subscribe((response: { id: number; name: string }[]) => {
      
      this.listOfUOM = response
      // let id 
      this.UOMFormGroup.get('uomCodeCategory')?.setValue(this.listOfUOM[0]?.id)

    })
  }
  // get the list of dropdown
  conversionUomDD() {
    this._itemService.getUomDropDown()
    this._itemService.UOMDropDownLookupObs.subscribe((response: any[]) => {
      if(response.length){
        this.conversionUOMlist = response
        console.log(response)
      }
    

    })
  }

  // get data table by id 
  Get_UOMs_ByUOM_CategoryId(id: any) {
    this._itemService.getUOMByCategoryID(id);
    this._itemService.getuomByIdObs.subscribe((response) => {
      if(!!response ) {
        console.log(response)

        this.UOMFormGroup.patchValue({...response})

        this.getUOMS.clear();

        //  new form groups to the form array
        if(response?.uoMs?.length){
          response.uoMs.forEach(uom => {
            this.getUOMS.push(this.create_UOM_FormGroup(uom));
          });
        }
   
      }
      // del the  form array
    
    });
  }

  // get the  uon types   dropdown 
  getItemsDropdown() {
    this._itemService.itemTypeLookupData()
    this._itemService.itemTypeLookupObs.subscribe((res: any) => {
      this.listOfUomTypes = res
    })
  }

  getFilteredConversionUOMOptions(index: number): any[] {
    
    const currentFormGroup = this.getUOMS.at(index) as FormGroup;
    const currentConversionUomName = currentFormGroup.get('nameEn')?.value;
      return this.conversionUOMlist.filter(option => option.name !== currentConversionUomName);
  }
  






  create_UOM_FormGroup(uomData?: any): FormGroup {
    console.log(uomData)
    return this.fb.group({
      id: new FormControl(uomData?.id ?? 0, customValidators.required),
      code: new FormControl(uomData?.code ?? '', customValidators.required),
      nameAr: new FormControl(uomData?.nameAr ?? '', customValidators.required),
      nameEn: new FormControl(uomData?.nameEn ?? '', customValidators.required),
      shortName: new FormControl(uomData?.shortName ?? '', customValidators.required),
      uomType: new FormControl(uomData?.uomType ?? '', customValidators.required),
      isActive: new FormControl(uomData?.isActive ?? ''),
      conversionRatio: new FormControl(uomData?.conversionRatio ?? '',),
      conversionUOM: new FormControl(uomData?.conversionUOM ?? '', customValidators.required),
      uomCategoryId : uomData?.uomCategoryId ?? 0
    });

  }


  lineStatus: boolean[] = [];

    addLine() {
      this.getUOMS.push(this.create_UOM_FormGroup());
    }
  

  deleteLine(index: number): void {
      this.getUOMS.removeAt(index);

    
  }

  //display the name of the conversion rasio

  getConversionUOMName(id: number): string | undefined {
    const uom = this.conversionUOMlist.find(option => option.id === id);
    return uom ? uom.name : '';
  }
  uomCodeCategory(id: any): string | undefined {
    
    const uomCat = this.listOfUOM.find(option => option.id == id)?.name;
    return uomCat 
  }


  get getUOMS() {
    return this.UOMFormGroup.get('uoMs') as FormArray
  }


 

  discard() {
    this.routerService.navigateTo('/masterdata/uom');
  }

  onDelete(obj: any) {
    this._itemService.deleteUomCat(obj.id)

    this.Get_UOMs_ByUOM_CategoryId(this.categoryId)
  }


  onCancel() {

  }



  shouldShowSaveButton(index: number): boolean {
    const formGroup = this.uomTableForm.at(index) as FormGroup;
    const anyFieldDirty = Object.keys(formGroup.controls).some(controlName => 
      controlName !== 'isActive' && formGroup.get(controlName)?.dirty
    );    return anyFieldDirty && !this.lineStatus[index];
  }

  onSave() {


    this._itemService.updateUOM(this.UOMFormGroup.value)
 

   
  }
  toggleCurrencyVisibility(i: any , event: any){
    console.log(i , event);
    
  }

  async toggleAttrStatus(data: any, event: any) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');

    if (confirmed) {
      let obj = {
        id: data.id,
      };
      this._itemService.ActivateUOM(obj);
      // this.attributeGroupsValue(this.attrName)1
    } else {
      return;
    }
  }

}
