import { Component } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import { RouterService, LanguageService, FormsService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UomCodeLookup } from '../../../models';
import { UoM } from '../../../models/addUom';
import { UOMType } from '../../../models/enums';

@Component({
  selector: 'app-uom-view',
  templateUrl: './uom-view.component.html',
  styleUrl: './uom-view.component.scss'
})
export class UomViewComponent {
  uomTableForm: FormArray;
  UOMFormGroup: FormGroup;
  lineStatus: boolean[] = [];

  list : any = []
  id : number
  systemUnitData : any = {}

  listOfUOM: { id: number; name: string }[] = []
  listOfUOMCat: UomCodeLookup[] = []
  listOfUomTypes: any[] = []
  uomsData : UoM[] | any = []
  conversionUOMlist: any[] = []
  sytemUnitLookup : { id: number; nameAr: string; nameEn: string ; systemUnitOfMeasureCategoryId : number }[]
  filteredSytemUnitLookup : { id: number; nameAr: string; nameEn: string ; systemUnitOfMeasureCategoryId : number }[];
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
  ) {
    this.currentLang = this.languageService.getLang()
    this.id =  this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    this.getSendSystemUnitLookup()

    this.initUOMForm()
    this.getUOM_list1()
    setTimeout(() => {
      this.getUomById()
    }, 1000);
  this.UOMFormGroup.valueChanges.subscribe((res) => {
    if (res.baseUomEn) {
      let defaultBase = [{ name: this.currentLang == 'en' ? res.baseUomEn : res.baseUomAr, id : res.shortName}];
      this.list[0] = defaultBase;
    }
  });

this.getUOMS.valueChanges.subscribe((res: any) => {
  res.forEach((item: any, i: number) => {
    if (i === 0) {
      return;
    }
    const currentData = [];

    currentData.push({ name:  this.currentLang == 'en' ? this.UOMFormGroup.get('baseUomEn')?.value :  this.UOMFormGroup.get('baseUomAr')?.value , id : this.UOMFormGroup.get('shortName')?.value});

    for (let j = 0; j < i; j++) {
      const previousItem = res[j];
      currentData.push({ name: this.currentLang == 'en' ? previousItem.nameEn :  previousItem.nameAr , id : previousItem.shortName});
    }
    const filteredData = currentData.filter(data => data.name !== "" && data.name !== undefined);
    this.list[i] = filteredData;
  });
});

  }


  getUomById() {
  this._itemService.getUOMCategoryById(this.id)
  this._itemService.getUOMCategoryByIdData$.subscribe(res=>{
    this.getUOMS.clear()
    this.uomsData = res.uoMs

    if(res.uoMs?.length) {
      res?.uoMs.forEach((elem : any , i)=>{
        if(i == 0) return
        let formGroup = this.fb.group({
          id : elem.id,
          code: elem.code,
          nameAr: elem.nameAr,
          nameEn: elem.nameEn,
          shortName: elem.shortName,
          factor: elem.factor,
          calculation: elem.baseCalculation,
          BaseCalculation: elem.baseCalculation,
          calculationShow: elem.calculation,
          BaseReversal : elem.baseReversal,
          reversalShow: elem.reversal,
          reversal: elem.baseReversal,
          BaseReversalShow: elem.reversal,
          systemUnitOfMeasureCategoryId: elem.systemUnitOfMeasureCategoryId,
          isBaseUnit: false,
          uomCategoryId: elem.uomCategoryId,
          systemUnitOfMeasureName: this.sytemUnitLookup.find(item=>item.id == Number(elem?.systemUnitOfMeasureId))?.nameEn,
          systemUnitOfMeasureId:  elem?.systemUnitOfMeasureId ?? null,
          fromUnitOfMeasureId: elem.fromUnitOfMeasureId,
          fromUnitOfMeasureName: this.currentLang == 'en' ? elem.fromUnitOfMeasureNameEn : elem.fromUnitOfMeasureNameAr

        })

        this.systemUnitChanged(formGroup.get('systemUnitOfMeasureId')?.value)
       if(elem?.systemUnitOfMeasureCategoryId){
        this.filteredSytemUnitLookup = this.filteredSytemUnitLookup.filter(element=>element?.systemUnitOfMeasureCategoryId == elem?.systemUnitOfMeasureCategoryId && element.nameEn !== elem.nameEn && element.nameAr !== elem.nameAr)
       }
       this.filteredSytemUnitLookup = this.filteredSytemUnitLookup.filter(element=> element?.systemUnitOfMeasureCategoryId == this.uomsData[0].systemUnitOfMeasureCategoryId && element.nameEn !== this.uomsData[0].nameEn && element.nameAr !== this.uomsData[0].nameAr)

        this.getUOMS.push(formGroup)

      })

      this.UOMFormGroup.patchValue({
        baseUomEn: res?.uoMs[0]?.nameEn,
        baseUomAr: res?.uoMs[0]?.nameAr,
        shortName: res?.uoMs[0]?.shortName,
        nameEn : res?.nameEn,
        nameAr : res?.nameAr,
        systemUnitOfMeasureId : res?.uoMs[0]?.systemUnitOfMeasureId
      });
    }

  })
  }


  systemUnitChanged(event: any ) {
    let data = this.sytemUnitLookup.find((elem) => elem.id === event);
    this.systemUnitData = data;
    this.UOMFormGroup.get('baseUomAr')?.setValue(data?.nameAr);
    this.UOMFormGroup.get('baseUomEn')?.setValue(data?.nameEn);
  }
  systemUnitListChanged(event: any, uomTableForm: FormGroup  , list : any) {
    let data: any = this.sytemUnitLookup.find((elem) => elem.id === event);
    uomTableForm.get('baseUomEn')?.setValue(data?.nameEn);
    uomTableForm.get('nameEn')?.setValue(data?.nameEn);
    uomTableForm.get('nameAr')?.setValue(data?.nameAr);
    uomTableForm.get('systemUnitOfMeasureName')?.setValue(data?.nameEn);

    this.filteredSytemUnitLookup = this.filteredSytemUnitLookup.filter(
      (elem) => elem.id !== data.id
    );

  }


  get categoryId(): number {
    return this.UOMFormGroup.get('uomCodeCategory')?.value;
  }

  getSendSystemUnitLookup() {
    this._itemService.systemUnitLookup()
    this._itemService.sendSystemUnitLookup$.subscribe(res=>{
      this.sytemUnitLookup  = res
      this.filteredSytemUnitLookup  = res
    })
  }


  initUOMForm() {
    this.UOMFormGroup = this.fb.group({
      code: [null],
      baseUomEn: ['', customValidators.required],
      baseUomAr: ['', customValidators.required],
      shortName: ['' ,[customValidators.length(0,5) , customValidators.required]],
      uoMs: this.fb.array([]),
      nameEn: ['', customValidators.required],
      nameAr: ['', customValidators.required],
      systemUnitOfMeasureId: ['', customValidators.required],
    });
  }

  get getUOMS() {
    return this.UOMFormGroup.get('uoMs') as FormArray
  }

  getUOM_list1() {
    this._itemService.UOMCategoryDropDown()
    this._itemService.UOMCategoryDropDownLookupObs.subscribe((response: { id: number; name: string }[]) => {

      this.listOfUOM = response

    })
  }
  conversionUomDD() {
    this._itemService.getUomDropDown()
    this._itemService.UOMDropDownLookupObs.subscribe((response: any[]) => {
      this.conversionUOMlist = response

    })
  }
  Get_UOMs_ByUOM_CategoryId(id: any) {
    this._itemService.uomCodeDropDown(id);
    this._itemService.uomCodeLookup.subscribe((response: UomCodeLookup[]) => {
      this.listOfUOMCat = response;
      this.uomTableForm.clear();
      this.listOfUOMCat.forEach(uom => {
        this.uomTableForm.push(this.create_UOM_FormGroup(uom));
      });
    });
  }

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

  shortNameChangedForGroup(e : any) {
  }

  shortNameChanged(e : any , i : number){
    const itemsArray = this.getUOMS;

    while (itemsArray.length > i + 1) {
      itemsArray.removeAt(i + 1);
    }
 }

 factorChanged(event: any, uomTableForm: FormGroup, i: number, list: any) {
  const factorValue = uomTableForm.get('factor')?.value;
  const fromValue = uomTableForm.get('fromUnitOfMeasureId')?.value;

  let selectedItem = list.find((elem : any)=>elem.id == fromValue)

  if (
    this.UOMFormGroup.get('baseUomEn')?.value === selectedItem?.name
  ) {
    if (factorValue !== null && factorValue !== undefined) {
      const calculationResult = 1 * factorValue;
      uomTableForm.get('calculationShow')?.setValue(`1 * ${factorValue} (${calculationResult})`);
      uomTableForm.get('BaseCalculation')?.setValue((1 * calculationResult));
      uomTableForm.get('BaseReversalShow')?.setValue(`1 / ${uomTableForm.get('BaseCalculation')?.value} (${1 / uomTableForm.get('BaseCalculation')?.value})`);
      uomTableForm.get('BaseReversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
      list[i].currentShortName = uomTableForm.get('shortName')?.value;
    }
  } else {
    let uom = this.getUOMS.value;
    uom.forEach((elem: any , index : any) => {
      if (list[i].name == elem.nameEn) {
        uomTableForm
        .get('calculationShow')
        ?.setValue(`${elem.BaseCalculation} * ${factorValue} (${elem.BaseCalculation * factorValue})`);

        uomTableForm.get('BaseCalculation')?.setValue((elem.BaseCalculation * factorValue));
        uomTableForm.get('calculation')?.setValue(elem.BaseCalculation * factorValue);


        uomTableForm.get('BaseReversalShow')?.setValue(`1 / ${uomTableForm.get('BaseCalculation')?.value} (${1 / uomTableForm.get('BaseCalculation')?.value})`);
        uomTableForm.get('reversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
        uomTableForm.get('BaseReversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);

      }
    });
  }
  let itemsArray = this.getUOMS

  while (itemsArray.length > i + 1) {
    itemsArray.removeAt(i + 1);

      this.filteredSytemUnitLookup = this.sytemUnitLookup
   }

}

fromUnitOfMeasureChanged(e: any, list: any, uomTableForm: FormGroup, i: number) {
  const factorValue = uomTableForm.get('factor')?.value;
  const fromValue = uomTableForm.get('fromUnitOfMeasureId')?.value;

  let selectedItem = list.find((elem : any)=>elem.id == fromValue)

  if (
    this.UOMFormGroup.get('baseUomEn')?.value === selectedItem?.name
  ){
    if (factorValue !== null && factorValue !== undefined) {
      const calculationResult = 1 * factorValue;
      uomTableForm.get('calculationShow')?.setValue(`1 * ${factorValue} (${calculationResult})`);
      uomTableForm.get('BaseCalculation')?.setValue((1 * calculationResult));
      uomTableForm.get('BaseReversalShow')?.setValue(`1 / ${uomTableForm.get('BaseCalculation')?.value} (${1 / uomTableForm.get('BaseCalculation')?.value})`);
      uomTableForm.get('BaseReversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
      list[i].currentShortName = uomTableForm.get('shortName')?.value;
    }
  } else {
    let uom = this.getUOMS.value;
    uom.forEach((elem: any) => {
      if (list[i].name == elem.nameEn) {
        uomTableForm
        .get('calculationShow')
        ?.setValue(`${elem.BaseCalculation} * ${factorValue} (${elem.BaseCalculation * factorValue})`);

        uomTableForm.get('BaseCalculation')?.setValue((elem.BaseCalculation * factorValue));
        uomTableForm.get('calculation')?.setValue(elem.BaseCalculation * factorValue);


        uomTableForm.get('BaseReversalShow')?.setValue(`1 / ${uomTableForm.get('BaseCalculation')?.value} (${1 / uomTableForm.get('BaseCalculation')?.value})`);
        uomTableForm.get('reversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
        uomTableForm.get('BaseReversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);

      }
    });
  }
}


create_UOM_FormGroup(uomData: any = {}): FormGroup {
  let formData = this.fb.group({
    code: new FormControl(uomData?.code || ''),
    nameAr: new FormControl(uomData?.nameAr || '', [
      customValidators.required,
      customValidators.onlyArabicLetters,
    ]),
    nameEn: new FormControl(uomData?.nameEn || '', [
      customValidators.required,
      customValidators.onlyEnglishLetters,
    ]),
    shortName: new FormControl(uomData?.shortName || ''),
    factor: new FormControl(uomData?.factor || null ),
    calculation: new FormControl(uomData?.calculation || null),
    BaseCalculation: new FormControl(uomData?.BaseCalculation || null),
    calculationShow: new FormControl(uomData?.calculationShow || null),
    BaseReversal: new FormControl(uomData?.BaseReversal || null),
    BaseReversalShow: new FormControl(uomData?.BaseReversalShow || null),
    reversal: new FormControl(uomData?.reversal || null),
    isBaseUnit: false,
    uomCategoryId: this.uomsData[0]?.uomCategoryId,
    systemUnitOfMeasureName: '',
    systemUnitOfMeasureId: new FormControl(uomData?.systemUnitOfMeasureId || null),
    fromUnitOfMeasureId: new FormControl(uomData?.fromUnitOfMeasureId || null , customValidators.required),
  });
  this.filteredSytemUnitLookup = this.filteredSytemUnitLookup.filter(
    (element) =>
      element?.systemUnitOfMeasureCategoryId ==
    this.uomsData[0].systemUnitOfMeasureCategoryId &&
      element.nameEn !== this.uomsData[0]?.nameEn &&
      element.nameAr !== this.uomsData[0]?.nameAr
  );

  let uom = this.getUOMS.value

  uom.forEach((item : any) => {
   this.filteredSytemUnitLookup = this.filteredSytemUnitLookup.filter(elem=> elem.id !== item.systemUnitOfMeasureId)
 });

  return formData;
}

  nameUomEnChanged(e : string) {
    if(this.currentLang == 'en' && this.getUOMS.value.length) {
      this.getUOMS.clear()
    }
  }
  nameUomArChanged(e : string) {
    if(this.currentLang == 'Ar' && this.getUOMS.value.length) {
      this.getUOMS.clear()
    }
  }

  getConversionUOMName(id: number): string | undefined {
    const uom = this.conversionUOMlist.find(option => option.id === id);
    return uom ? uom.name : '';
  }

}
