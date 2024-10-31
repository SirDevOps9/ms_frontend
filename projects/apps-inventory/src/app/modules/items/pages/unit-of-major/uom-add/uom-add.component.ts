import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import {
  RouterService,
  FormsService,
  LanguageService,
  customValidators,
  PageInfo,
} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { UomCodeLookup } from '../../../models/uomCodeLookup';
import { UOMType } from '../../../models/enums';
import { AddUom, addUOM, UoM } from '../../../models/addUom';

@Component({
  selector: 'app-uom-add',
  templateUrl: './uom-add.component.html',
  styleUrl: './uom-add.component.scss',
})
export class UOMAddComponent implements OnInit {
  uomTableForm: FormArray;
  UOMFormGroup: FormGroup;
  lineStatus: boolean[] = [];

  list: any = [];
  systemUnitData: any = {};
  listOfUOM: { id: number; name: string }[] = [];
  listOfUOMCat: UomCodeLookup[] = [];
  listOfUomTypes: any[] = [];
  conversionUOMlist: any[] = [];
  sytemUnitLookup: {
    id: number;
    nameAr: string;
    nameEn: string;
    systemUnitOfMeasureCategoryId: number;
  }[];
  filteredSytemUnitLookup: {
    id: number;
    nameAr: string;
    nameEn: string;
    systemUnitOfMeasureCategoryId: number;
  }[];
  usersList: UserPermission[];
  isLastLineSaved: boolean = true;
  currentLang: string;
  get UOMType(): UOMType {
    return this.UOMType;
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
    private formService: FormsService
  ) {
    this.currentLang = this.languageService.getLang();
  }

  ngOnInit(): void {
    this.initUOMForm();
    this.getUOM_list1();
    this.getSendSystemUnitLookup();

    // Listen to UOMFormGroup value changes to set the first index
    this.UOMFormGroup.valueChanges.subscribe((res) => {
      if (res.baseUomEn) {
        let defaultBase = [
          { name: this.currentLang == 'en' ? res.baseUomEn : res.baseUomAr, id: res.shortName },
        ];
        this.list[0] = defaultBase; // Set the first index in the list
      }
      
    });

    // Listen to changes in the getUOMS form array to update the rest of the indices
    // Listen to changes in the getUOMS form array to update subsequent indices
    // Listen to changes in the getUOMS form array to update subsequent indices
    this.getUOMS.valueChanges.subscribe((res: any) => {
      // Ensure the list starts from index 1 if list[0] is already filled from UOMFormGroup
      res.forEach((item: any, i: number) => {
        if (i === 0) {
          // Skip index 0 because it's filled by UOMFormGroup
          return;
        }

        // Initialize an array to hold the names
        const currentData = [];

        // Add nameUom from UOMFormGroup
        currentData.push({
          name:
            this.currentLang == 'en'
              ? this.UOMFormGroup.get('baseUomEn')?.value
              : this.UOMFormGroup.get('baseUomAr')?.value,
          id: this.UOMFormGroup.get('shortName')?.value,
        });

        // Add nameAr of the current item
        // currentData.push({
        //   name: this.currentLang == 'en' ? item.nameEn : item.itemAr,
        //   id: item.shortName,
        // });

        // Iterate through all previous indexes and add their nameEn
        for (let j = 0; j < i; j++) {
          const previousItem = res[j];
          currentData.push({
            name: this.currentLang == 'en' ? previousItem.nameEn : previousItem.nameAr,
            id: previousItem.shortName,
          });
        }

        // Filter out any objects with an empty name
        const filteredData = currentData.filter(
          (data) => data.name !== '' && data.name !== undefined
        );

        // Update the list with the filtered data
        this.list[i] = filteredData;

        // Log the updated list array for verification
      });
    });

    // this.UOMFormGroup.valueChanges.subscribe(res=>{
    //   if(res.baseUomEn) {
    //     let defaultBase = [{name : res.baseUomEn}]
    //     this.list[0] = defaultBase
    //   }
    // })
  }

  shortNameChangedForGroup(e : any) {
    this.getUOMS.clear()
  }

  systemUnitChanged(event: any ) {
    let data = this.sytemUnitLookup.find((elem) => elem.id === event);
    this.systemUnitData = data;
    this.UOMFormGroup.get('baseUomAr')?.setValue(data?.nameAr);
    this.UOMFormGroup.get('baseUomEn')?.setValue(data?.nameEn);
    this.getUOMS.clear()
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
    this._itemService.systemUnitLookup();
    this._itemService.sendSystemUnitLookup$.subscribe((res) => {
      this.sytemUnitLookup = res;
      this.filteredSytemUnitLookup = res;
    });
  }

  // init the form
  initUOMForm() {
    this.UOMFormGroup = this.fb.group({
      code: [null],
      baseUomEn: ['', customValidators.required],
      baseUomAr: ['', customValidators.required],
      shortName: ['' , customValidators.required],
      uoMs: this.fb.array([]),
      nameEn: ['', customValidators.required],
      nameAr: ['', customValidators.required],
      systemUnitOfMeasureId: ['', customValidators.required],
    });

    this.UOMFormGroup.get('uomCodeCategory')?.valueChanges.subscribe((res: any) => {
      if (!res) return;

      this.Get_UOMs_ByUOM_CategoryId(res);
    });
  }

  get getUOMS() {
    return this.UOMFormGroup.get('uoMs') as FormArray;
  }

  // get the list of dropdown
  getUOM_list1() {
    this._itemService.UOMCategoryDropDown();
    this._itemService.UOMCategoryDropDownLookupObs.subscribe(
      (response: { id: number; name: string }[]) => {
        this.listOfUOM = response;
      }
    );
  }

  onCancel() {}

  // get data table by id
  Get_UOMs_ByUOM_CategoryId(id: any) {
    this._itemService.uomCodeDropDown(id);
    this._itemService.uomCodeLookup.subscribe((response: UomCodeLookup[]) => {
      this.listOfUOMCat = response;

      // Clear the existing form array
      this.uomTableForm.clear();

      // Add new form groups to the form array
      this.listOfUOMCat.forEach((uom) => {
        this.uomTableForm.push(this.create_UOM_FormGroup(uom));
      });
    });
  }

  // get the  uon types   dropdown
  getItemsDropdown() {
    this._itemService.itemTypeLookupData();
    this._itemService.itemTypeLookupObs.subscribe((res: any) => {
      this.listOfUomTypes = res;
    });
  }

  getFilteredConversionUOMOptions(index: number): any[] {
    const currentFormGroup = this.getUOMS.at(index) as FormGroup;
    const currentConversionUomName = currentFormGroup.get('nameEn')?.value;
    return this.conversionUOMlist.filter((option) => option.name !== currentConversionUomName);
  }

  public get items(): FormArray {
    return this.uomTableForm as FormArray;
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
      shortName: new FormControl(uomData?.shortName || '', customValidators.required),
      factor: new FormControl(uomData?.factor || null , customValidators.required),
      calculation: new FormControl(uomData?.calculation || null),
      BaseCalculation: new FormControl(uomData?.BaseCalculation || null),
      calculationShow: new FormControl(uomData?.calculationShow || null),
      BaseReversal: new FormControl(uomData?.BaseReversal || null),
      BaseReversalShow: new FormControl(uomData?.BaseReversalShow || null),
      reversal: new FormControl(uomData?.reversal || null),
      isBaseUnit: false,
      uomCategoryId: 0,
      systemUnitOfMeasureName: '',
      systemUnitOfMeasureId: new FormControl(uomData?.systemUnitOfMeasureId || null),
      fromUnitOfMeasureId: new FormControl(uomData?.fromUnitOfMeasureId || null , customValidators.required),
    });

    this.filteredSytemUnitLookup = this.filteredSytemUnitLookup.filter(
      (element) =>
        element.systemUnitOfMeasureCategoryId ==
          this.systemUnitData.systemUnitOfMeasureCategoryId &&
        element.nameEn !== this.systemUnitData.nameEn &&
        element.nameAr !== this.systemUnitData.nameAr
    );

    return formData;
  }

  addLine() {
    this.getUOMS.push(this.create_UOM_FormGroup());
  }

  deleteLine(index: number): void {
    this.getUOMS.removeAt(index);
  }

  nameUomEnChanged(e: string) {
    if (this.currentLang == 'en' && this.getUOMS.value.length) {
      this.getUOMS.clear();
    }
  }
  nameUomArChanged(e: string) {
    if (this.currentLang == 'Ar' && this.getUOMS.value.length) {
      this.getUOMS.clear();
    }
  }

  //display the name of the conversion rasio

  getConversionUOMName(id: number): string | undefined {
    const uom = this.conversionUOMlist.find((option) => option.id === id);
    return uom ? uom.name : '';
  }

  discard() {
    this.routerService.navigateTo('/masterdata/uom');
  }

  onDelete(i: number) {
    const formArray = this.getUOMS;

    // Remove elements starting from the given index up to the last element
    while (formArray.length > i) {
      formArray.removeAt(i);
    }
  }


  shortNameChanged(e : any , i : number){
     // Clear all entries below the specified index
     const itemsArray = this.getUOMS;

     while (itemsArray.length > i + 1) {
       itemsArray.removeAt(i + 1);
     }
  }
  // on save table

  factorChanged(event: any, uomTableForm: FormGroup, i: number, list: any) {
    const factorValue = uomTableForm.get('factor')?.value;
    const fromValue = uomTableForm.get('fromUnitOfMeasureId')?.value;


    if (
      this.UOMFormGroup.get('shortName')?.value === uomTableForm.get('fromUnitOfMeasureId')?.value
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
      uom.forEach((elem: any) => {
        console.log(elem);
        uom.forEach((elem: any) => {
          console.log(elem);
          if (fromValue == elem.shortName) {
            console.log(elem)
            uomTableForm.get('BaseCalculation')?.setValue((elem.BaseCalculation * factorValue));
            uomTableForm.get('calculation')?.setValue(elem.BaseCalculation * factorValue);
  
            uomTableForm
            .get('calculationShow')
            ?.setValue(`${elem.calculation} * ${factorValue} (${elem.calculation * factorValue})`);
  
            uomTableForm.get('BaseReversalShow')?.setValue(`1 / ${uomTableForm.get('BaseCalculation')?.value} (${1 / uomTableForm.get('BaseCalculation')?.value})`);
            uomTableForm.get('reversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
            uomTableForm.get('BaseReversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
          }
        });
      });
    }
  }


  fromUnitOfMeasureChanged(e: any, list: any, uomTableForm: FormGroup, i: number) {
    const factorValue = uomTableForm.get('factor')?.value;

    if (
      this.UOMFormGroup.get('shortName')?.value === uomTableForm.get('fromUnitOfMeasureId')?.value
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
      uom.forEach((elem: any) => {
        if (e == elem.shortName) {
          uomTableForm
          .get('calculationShow')
          ?.setValue(`${elem.BaseCalculation} * ${factorValue} (${elem.BaseCalculation * factorValue})`);

          uomTableForm.get('BaseCalculation')?.setValue((elem.BaseCalculation * factorValue));
          uomTableForm.get('calculation')?.setValue(elem.BaseCalculation * factorValue);

        
          uomTableForm.get('BaseReversalShow')?.setValue(`1 / ${uomTableForm.get('BaseCalculation')?.value} (${1 / uomTableForm.get('BaseCalculation')?.value})`);
          uomTableForm.get('reversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
          console.log(elem);
          uomTableForm.get('BaseReversal')?.setValue(1 / uomTableForm.get('BaseCalculation')?.value);
          console.log(elem);

        }
      });
    }
  }


  onSave() {
    if (!this.formService.validForm(this.getUOMS, false)) return;
    if (!this.formService.validForm(this.UOMFormGroup, false)) return;

    let base = {
      code: '',
      nameAr: this.UOMFormGroup.get('baseUomAr')?.value,
      nameEn: this.UOMFormGroup.get('baseUomEn')?.value,
      shortName: this.UOMFormGroup.get('shortName')?.value,
      isBaseUnit: true,
      factor: 1,
      BaseCalculation: 1,
      calculation: '1',
      reversal: '1',
      BaseReversal: 1,
      uomCategoryId: 0,
      systemUnitOfMeasureId: this.UOMFormGroup.get('systemUnitOfMeasureId')?.value,
      fromUnitOfMeasureId: ''
    };

    this.getUOMS.controls[0]
      .get('fromUnitOfMeasureId')
      ?.setValue(this.UOMFormGroup.get('shortName')?.value);

    const formArray = this.getUOMS;

    let unitOfMeasures = formArray.getRawValue();

    unitOfMeasures.unshift(base);
    unitOfMeasures = unitOfMeasures.map(elem=>{
      elem.calculation = elem.calculationShow ?? '1'
      elem.factor = Number( elem.factor)
      elem.reversal = elem.BaseReversalShow ?? '1'

      return elem
    })

    let uom = {
      nameAr: this.UOMFormGroup.get('nameAr')?.value,
      nameEn: this.UOMFormGroup.get('nameEn')?.value,
      unitOfMeasures: unitOfMeasures,
    };

    console.log(uom);

    this._itemService.addUOMCategory(uom);
  }
}
