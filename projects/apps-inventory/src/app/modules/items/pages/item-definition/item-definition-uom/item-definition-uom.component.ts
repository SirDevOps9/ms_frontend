import { UoM } from './../../../models/addUom';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ItemsService } from '../../../items.service';
import { LanguageService, ToasterService } from 'shared-lib';
import { EditCategoryUomComponent } from './edit-category/edit-category-uom/edit-category-uom.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-item-definition-uom',
  templateUrl: './item-definition-uom.component.html',
  styleUrls: ['./item-definition-uom.component.scss'],
})
export class ItemDefinitionUomComponent implements OnInit, OnDestroy {
  itemUomForm: FormGroup;
  id: number;
  unitUsagesName: [];
  uerSubDomainModulesLookupData: { id: number; name: string }[] = [];
  userSubDomainModulesLookupData: { id: number; name: string }[] = [];
  private subscription: Subscription;
  currentLang: string = '';
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private itemService: ItemsService,
    private toaster: ToasterService,
    private dialog: DialogService,
    public languageService: LanguageService
  ) {
    this.id = this.route.snapshot.params['id'];
    this.currentLang = this.languageService.getLang();
  }

  ngOnInit(): void {
    this.createFormUom();
    this.getDataUomById();
    this.getAlluserSubDomainModules();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  onChanged(selectedValue: any) {}

  createFormUom() {
    this.itemUomForm = this.fb.group({
      itemId: [0],
      uomCategoryId: [0],
      uoms: this.fb.array([]),
    });
  }

  get uoms(): FormArray {
    return this.itemUomForm.get('uoms') as FormArray;
  }
  nameBaseUnit: string = '';
  createUomFormGroup(item: any): FormGroup {
    const initialUnitUsagesNames = this.userSubDomainModulesLookupData.filter((element: any) =>
      item.unitUsages.includes(element.id)
    );

    return this.fb.group({
      uomId: [item.uomId || ''],
      nameEn: [item.nameEn || ''],
      nameAr: [item.nameAr || ''],
      conversionRatio: [item.conversionRatio],
      isActive: [item.isActive || false],
      isBaseUnit: [item.isBaseUnit || false],
      shortName: [item.shortName || ''],
      unitUsages: [item.unitUsages || null],
      unitUsagesName: [initialUnitUsagesNames],
    });
  }

  getUnitUsages(uom: AbstractControl): FormArray {
    return uom.get('unitUsages') as FormArray;
  }
  nameCategory: string = '';
  getDataUomById() {
    this.subscription = this.itemService.ItemGetItemUomByIdObs.subscribe(
      (data: any) => {
        if (data && data.uoms && Array.isArray(data.uoms)) {
          if (this.currentLang === 'en') this.nameCategory = data.uomCategoryNameEn;
          else this.nameCategory = data.uomCategoryNameAr;
          this.itemUomForm.patchValue({
            itemId: data.itemId,
            uomCategoryId: data.uomCategoryId,
            name: data.name,
          });
          this.itemUomForm.updateValueAndValidity();
          this.uoms.clear();
          data.uoms.forEach((uom: any) => {
            this.uoms.push(this.createUomFormGroup(uom));
          });
          if (this.uoms.length > 0) {
            const firstUom = this.uoms.at(0);
            if (firstUom) {
              this.nameBaseUnit =
                this.currentLang === 'en'
                  ? firstUom.get('nameEn')?.value
                  : firstUom.get('nameAr')?.value;
            }
          }
        }
      },
      (error) => {
        console.error('Error fetching UOM data:', error);
      }
    );

    this.itemService.getItemGetItemUomById(this.id);
  }

  getAlluserSubDomainModules() {
    this.itemService.getUserSubDomainModules();
    this.itemService.userSubDomainModules.subscribe((res) => {
      this.userSubDomainModulesLookupData = res;
    });
  }
  accountSelected(event: any) {}

  onEdit(data: any) {
    const dialogRef = this.dialog.open(EditCategoryUomComponent, {
      width: '800px',
      height: '600px',
      data: this.nameCategory,
    });

    dialogRef.onClose.subscribe((data) => {
      if (data) {
        this.uoms.clear();
         if (this.currentLang === 'en') {
          this.nameCategory = data.uomCategoryNameEn;  
         } else {
          this.nameCategory = data.uomCategoryNameAr;
          this.nameBaseUnit = data.nameEn
         } 

        console.log("heeey" , data)
        let baseUnit = data?.uoMs.find((elem : any)=>elem.isBaseUnit == true)
        let nonBaseUnit = data?.uoMs.filter((elem : any)=> !elem.isBaseUnit)

         this.itemUomForm.patchValue({...baseUnit});
         nonBaseUnit.forEach((item : any) => {
          let itemFormGroup = this.fb.group({...item})
            this.uoms.push(itemFormGroup)
         });
        

        // this.uoms.controls.forEach(item=>{
        // })

        // this.uoms.patchValue(data.uoMs);
        // this.nameBaseUnit = this.uoms.at(0).get('nameEn')?.value;

        // if (this.currentLang === 'en') {
        //   this.nameCategory = data.uomCategoryNameEn;
        // } else {
        //   this.nameCategory = data.uomCategoryNameAr;
        // }
        // this.itemUomForm.patchValue({
        //   uomCategoryId: data.uomCategoryId,
        //   name: data.name,
        // });
        // this.itemUomForm.updateValueAndValidity();
      } else {
        this.getDataUomById();
      }
    });
  }

  uomss: any[] = [];

  handleFetchedData(data: any) {
    this.uomss = data.uoMs;
    if (data) return data.uoMs;
  }

  usercHN(e: any, fb: FormGroup) {
    let data = this.userSubDomainModulesLookupData.filter((element: any) => e.includes(element.id));

    fb.get('unitUsages')?.setValue(e);
    fb.get('unitUsagesName')?.setValue(data);
  }

  submit() {
    const payload = this.itemUomForm.value;
    this.itemService.updatetemGetItemUomById(payload);
  }
}
