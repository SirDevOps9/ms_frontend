import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import { RouterService, FormsService, LanguageService, customValidators, PageInfo } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UomCodeLookup } from '../../../models/uomCodeLookup';
import { UOMType } from '../../../models/enums';
import { addUOM } from '../../../models/addUom';



@Component({
  selector: 'app-uom-add',
  templateUrl: './uom-add.component.html',
  styleUrl: './uom-add.component.scss'
})
export class UOMAddComponent implements OnInit {
  uomTableForm: FormArray;
  UOMFormGroup: FormGroup;
  lineStatus: boolean[] = [];

  listOfUOM: { id: number; name: string }[] = []
  listOfUOMCat: UomCodeLookup[] = []
  listOfUomTypes: any[] = []
  conversionUOMlist: any[] = []

  usersList: UserPermission[];
  isLastLineSaved: boolean = true
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
    private languageService: LanguageService,
    private title: Title,

  ) {
  }


  ngOnInit(): void {

    this.initUOMForm()
    this.getUOM_list1()
    this.conversionUomDD()

    this.addLine()

  }


  get categoryId(): number {
    return this.UOMFormGroup.get('uomCodeCategory')?.value;
  }


  // init the form 
  initUOMForm() {
    this.UOMFormGroup = this.fb.group({
      uomCategoryNameEn: [null, customValidators.required],
      code: [null],
      baseUom: [null],
      nameUom: [null],
      shortName: [null],
      uomCategoryNameAr : [null, customValidators.required],
      uoMs : this.fb.array([])
    });



    this.UOMFormGroup.get('uomCodeCategory')?.valueChanges.subscribe((res: any) => {
      if (!res) return

      this.Get_UOMs_ByUOM_CategoryId(res)
    })
  }

  get getUOMS() {
    return this.UOMFormGroup.get('uoMs') as FormArray
  }

  // get the list of dropdown
  getUOM_list1() {
    this._itemService.UOMCategoryDropDown()
    this._itemService.UOMCategoryDropDownLookupObs.subscribe((response: { id: number; name: string }[]) => {
      
      this.listOfUOM = response

    })
  }
  // get the list of dropdown
  conversionUomDD() {
    this._itemService.getUomDropDown()
    this._itemService.UOMDropDownLookupObs.subscribe((response: any[]) => {
      this.conversionUOMlist = response

    })
  }

  onCancel() {

  }


  // get data table by id 
  Get_UOMs_ByUOM_CategoryId(id: any) {
    this._itemService.uomCodeDropDown(id);
    this._itemService.uomCodeLookup.subscribe((response: UomCodeLookup[]) => {
      this.listOfUOMCat = response;

      // Clear the existing form array
      this.uomTableForm.clear();

      // Add new form groups to the form array
      this.listOfUOMCat.forEach(uom => {
        this.uomTableForm.push(this.create_UOM_FormGroup(uom));
      });
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



  public get items(): FormArray {
    return this.uomTableForm as FormArray;
  }

  




  create_UOM_FormGroup(uomData: any = {}): FormGroup {
    return this.fb.group({
      id: new FormControl(uomData?.id || null),
      code: new FormControl(uomData?.code || '', customValidators.required),
      nameAr: new FormControl(uomData?.nameAr || '', [customValidators.required, customValidators.onlyArabicLetters]),
      nameEn: new FormControl(uomData?.nameEn || '', [customValidators.required, customValidators.onlyEnglishLetters]),
      shortName: new FormControl(uomData?.shortName || '', customValidators.required),
      uomType: new FormControl(uomData?.uomType || '', customValidators.required),
      conversionRatio: new FormControl(uomData?.conversionRatio || null),
      conversionUOM: new FormControl(uomData?.conversionUOM || 1, customValidators.required),
    });
  }
  


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




  discard() {
    this.routerService.navigateTo('/masterdata/uom');
  }

  onDelete(i: number) {
    this.getUOMS.removeAt(i);


    // this._itemService.deleteUomCat(obj.id)
    // this.Get_UOMs_ByUOM_CategoryId(this.categoryId)

  }

  // on save table

  onSave() {

    

    this._itemService.addUOMCategory(this.UOMFormGroup.value)
    this._itemService.sendUOMCategory$.subscribe((res: any) => {
      // this.lineStatus[index] = true;

      // this.isLastLineSaved = true
      //     this.Get_UOMs_ByUOM_CategoryId(this.categoryId)

    })


  }
}
