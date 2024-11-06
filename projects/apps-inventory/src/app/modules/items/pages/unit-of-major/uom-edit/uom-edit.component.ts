import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import { RouterService, LanguageService, customValidators, ToasterService, FormsService } from 'shared-lib';
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
  lineStatus: boolean[] = [];

  list : any = []
  id : number

  listOfUOM: { id: number; name: string }[] = []
  listOfUOMCat: UomCodeLookup[] = []
  listOfUomTypes: any[] = []
  conversionUOMlist: any[] = []
  sytemUnitLookup : { id: number; nameAr: string; nameEn: string }[]
  usersList: UserPermission[];
  isLastLineSaved: boolean = true
  currentLang : string
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
    private route: ActivatedRoute,
    private languageService: LanguageService,
    private title: Title,
    private formService : FormsService

  ) {
    this.currentLang = this.languageService.getLang()
    console.log(this.currentLang)
    this.id =  this.route.snapshot.params['id']
  }


  ngOnInit(): void {

    this.initUOMForm()
    this.getUOM_list1()
    this.getSendSystemUnitLookup()
    this.getUomById()

// Listen to UOMFormGroup value changes to set the first index
this.UOMFormGroup.valueChanges.subscribe((res) => {
  if (res.baseUomEn) {
    let defaultBase = [{ name: this.currentLang == 'en' ? res.baseUomEn : res.baseUomAr}];
    this.list[0] = defaultBase; // Set the first index in the list
  }
});

// Listen to changes in the getUOMS form array to update the rest of the indices
// Listen to changes in the getUOMS form array to update subsequent indices
// Listen to changes in the getUOMS form array to update subsequent indices
this.getUOMS.valueChanges.subscribe((res: any) => {
  // Ensure the list starts from index 1 if list[0] is already filled from UOMFormGroup
  if(res.length) {
    res?.forEach((item: any, i: number) => {
      if (i === 0) {
        // Skip index 0 because it's filled by UOMFormGroup
        return;
      }
  
      // Initialize an array to hold the names
      const currentData = [];
  
      // Add nameUom from UOMFormGroup
      currentData.push({ name:  this.currentLang == 'en' ? this.UOMFormGroup.get('baseUomEn')?.value :  this.UOMFormGroup.get('baseUomAr')?.value});
  
  
      // Add nameAr of the current item
      currentData.push({ name: this.currentLang == 'en' ? item.nameEn : item.itemAr });
  
      // Iterate through all previous indexes and add their nameEn
      for (let j = 0; j < i; j++) {
        const previousItem = res[j];
        currentData.push({ name: this.currentLang == 'en' ? previousItem.nameEn :  previousItem.nameAr});
      }
  
      // Filter out any objects with an empty name
      const filteredData = currentData.filter(data => data.name !== "" && data.name !== undefined);
  
      // Update the list with the filtered data
      this.list[i] = filteredData;
  
      // Log the updated list array for verification
      console.log(this.list);
    });
  }

});




    // this.UOMFormGroup.valueChanges.subscribe(res=>{
    //   if(res.baseUomEn) {
    //     let defaultBase = [{name : res.baseUomEn}]
    //     this.list[0] = defaultBase
    //   }
    // })

  }


  getUomById() {
  this._itemService.getUOMCategoryById(this.id)
  this._itemService.getUOMCategoryByIdData$.subscribe(res=>{
    console.log(res)
    if(res.uoMs?.length) {
      this.UOMFormGroup.patchValue({
        baseUomEn: res?.uoMs[0]?.nameEn,
        baseUomAr: res?.uoMs[0]?.nameAr,
        shortName: res?.uoMs[0]?.shortName,
        nameEn : res?.nameEn,
        nameAr : res?.nameAr,
        systemUnitOfMeasureId : res?.uoMs[0]?.systemUnitOfMeasureId
      });
      res?.uoMs.forEach((elem , i)=>{
        if(i == 0) return
        let formGroup = this.fb.group({
          code: elem.code,
          nameAr: elem.nameAr,
          nameEn: elem.nameEn,
          shortName: elem.shortName,
          factor: elem.factor,
          calculation: elem.calculation,
          reversal: elem.reversal,
          isBaseUnit: false,
          uomCategoryId: elem.uomCategoryId,
          systemUnitOfMeasureName: this.sytemUnitLookup.find(item=>item.id == Number(elem.systemUnitOfMeasureId))?.nameEn,
          systemUnitOfMeasureId:  elem.systemUnitOfMeasureId,
          fromUnitOfMeasureId: elem.fromUnitOfMeasureId,
          fromUnitOfMeasureName: this.currentLang == 'en' ? elem.fromUnitOfMeasureNameEn : elem.fromUnitOfMeasureNameAr,
          
        })
        this.getUOMS.push(formGroup)
      })
    }
   

  })
  }
  
  
  systemUnitChanged(event  :any) {
    let data  = this.sytemUnitLookup.find(elem=>elem.id === event)
    console.log(data)
    this.UOMFormGroup.get('baseUomAr')?.setValue(data?.nameAr)
    this.UOMFormGroup.get('baseUomEn')?.setValue(data?.nameEn)
  }
  systemUnitListChanged(event  :any , uomTableForm  :FormGroup) {
    let data  = this.sytemUnitLookup.find(elem=>elem.id === event)
    console.log(data)
    uomTableForm.get('baseUomEn')?.setValue(data?.nameEn)
    uomTableForm.get('nameEn')?.setValue(data?.nameEn)
    uomTableForm.get('nameAr')?.setValue(data?.nameAr)
    uomTableForm.get('systemUnitOfMeasureName')?.setValue(data?.nameEn)
  }


  get categoryId(): number {
    return this.UOMFormGroup.get('uomCodeCategory')?.value;
  }

  getSendSystemUnitLookup() {
    this._itemService.systemUnitLookup()
    this._itemService.sendSystemUnitLookup$.subscribe(res=>{
      this.sytemUnitLookup  = res
      console.log(res)
    })
  }


  // init the form 
  initUOMForm() {
    this.UOMFormGroup = this.fb.group({
      code: [null],
      baseUomEn: ['' , customValidators.required],
      baseUomAr: ['' ,  customValidators.required],
      shortName: [''],
      nameEn : ['' ,  customValidators.required],
      nameAr : ['' ,  customValidators.required],
      uoMs : this.fb.array([]),
      systemUnitOfMeasureId : ['' , customValidators.required]

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
      code: new FormControl(uomData?.code || ''),
      nameAr: new FormControl(uomData?.nameAr || '', [customValidators.required, customValidators.onlyArabicLetters]),
      nameEn: new FormControl(uomData?.nameEn || '', [customValidators.required, customValidators.onlyEnglishLetters]),
      shortName: new FormControl(uomData?.shortName || '', customValidators.required),
      factor: new FormControl(uomData?.factor || null),
      calculation: new FormControl(uomData?.calculation || null),
      reversal: new FormControl(uomData?.reversal || null),
      isBaseUnit: false,
      uomCategoryId: 0,
      systemUnitOfMeasureName: '',
      systemUnitOfMeasureId:  new FormControl(uomData?.systemUnitOfMeasureId || null),
      fromUnitOfMeasureId: new FormControl(uomData?.fromUnitOfMeasureId || null),

    });
  }
  


  addLine() {
    this.getUOMS.push(this.create_UOM_FormGroup());
  }


  deleteLine(index: number): void {
      this.getUOMS.removeAt(index);


  }

  nameUomEnChanged(e : string) {
    console.log(e)
    if(this.currentLang == 'en' && this.getUOMS.value.length) {
      this.getUOMS.clear()
    }
  }
  nameUomArChanged(e : string) {
    console.log(e)
    if(this.currentLang == 'Ar' && this.getUOMS.value.length) {
      this.getUOMS.clear()
    }
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

    if (!this.formService.validForm(this.getUOMS, false)) return;


    let base =  {
      code: '',
      nameAr: this.UOMFormGroup.get('baseUomAr')?.value,
      nameEn: this.UOMFormGroup.get('baseUomEn')?.value,
      shortName: this.UOMFormGroup.get('shortName')?.value,
      isBaseUnit: true,
      factor: 1,
      calculation: '1',
      reversal: '1',
      uomCategoryId: 0,
      systemUnitOfMeasureId: this.UOMFormGroup.get('systemUnitOfMeasureId')?.value,
      fromUnitOfMeasureId: ''
    }

    this.getUOMS.controls[0].get('fromUnitOfMeasureId')?.setValue(this.UOMFormGroup.get('shortName')?.value)


    const formArray = this.getUOMS;

    // Loop through the form array starting from the second item
    for (let i = 1; i < formArray.length; i++) {
      const currentGroup = formArray.at(i) as FormGroup;
      const previousGroup = formArray.at(i - 1) as FormGroup;
  
      // Set 'fromUnitOfMeasureId' of the current item to 'shortName' of the previous item
      const previousShortName = previousGroup.get('shortName')?.value;
      currentGroup.get('fromUnitOfMeasureId')?.setValue(previousShortName);
    }

    let unitOfMeasures = formArray.value


    

    unitOfMeasures.unshift(base);

    let uom = {
      nameAr: this.UOMFormGroup.get('nameAr')?.value,
      nameEn: this.UOMFormGroup.get('nameEn')?.value,
      unitOfMeasures : unitOfMeasures
    }
    



    

    this._itemService.addUOMCategory(uom)


  }
}
