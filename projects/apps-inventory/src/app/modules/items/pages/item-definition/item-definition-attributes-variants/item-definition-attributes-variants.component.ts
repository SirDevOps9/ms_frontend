import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import {
  RouterService,
  FormsService,
  SharedLibraryEnums,
  ToasterService,
  customValidators,
  LanguageService,
} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddVariantPopupComponent } from '../../../components/add-variant-popup/add-variant-popup.component';
import { ViewVariantPopupComponent } from '../../../components/view-variant-popup/view-variant-popup.component';
import { AttributesVariants, EditAttributes } from '../../../models';

@Component({
  selector: 'app-item-definition-attributes-variants',
  templateUrl: './item-definition-attributes-variants.component.html',
  styleUrl: './item-definition-attributes-variants.component.scss',
})
export class ItemDefinitionAttributesVariantsComponent implements OnInit {
  id: any;
  itemDefinitionForm: FormGroup = new FormGroup({});
  ItemVariantsByItemIdDropDown: { id: number; nameEn: string }[] = [];
  dataItemVariantsById:AttributesVariants[] = []
  currentLang:string = ''
  constructor(
    private _router: RouterService,
    private fb: FormBuilder,
    private formService: FormsService,
    public sharedLibEnums: SharedLibraryEnums,
    private dialog: DialogService,
    private route: ActivatedRoute,
    private toaserService: ToasterService,
    private itemService: ItemsService,
    public languageService: LanguageService,
  ) {
    this.id = this.route.snapshot.params['id'];
    this.currentLang = this.languageService.getLang();
  }
  ngOnInit(): void {
    this.getItemVariants()
    this.itemDefinitionForm = this.fb.group({
      id: this.id,
      code: [''],
      name: ['', [customValidators.required]],
      photo: [''],
      categoryId: ['', [customValidators.required]],
      tags: [''],

      countryId: [''],
      defaultUOMCategoryId: ['', [customValidators.required]],
      taxId: [''],
      shortName: [''],
      warranty: [''],
      isVatApplied: [''],
      specialCare: [''],
      lifeTime: [''],
      color: [''],
      uomId: [''],
      uom: this.fb.array([]),
      barcode: this.fb.array([]),
      attribute: this.fb.array([]),
      hasExpiryDate: [''],
      trackingId: [''],
      itemAccounting: this.fb.group({
        pAccount: 0,
        prAccount: 0,
        sAccount: 0,
        srAccount: 0,
      }),
    });

    this.itemService.ItemGetItemUomByIdObs.subscribe(res=>{
      if(!!res ){
        this.AttributeForm.clear()

        this.getItemVariants()
      }
    });


  }
  generateVariant() {
    this.itemService.generateVariant({ itemId: this.id });
  }
  addLineAttribute() {
    const dialogRef = this.dialog.open(AddVariantPopupComponent, {
      width: '50%',
      height: '430px',
      data: {id:this.id , formValue : this.AttributeForm.value},
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        this.AttributeForm.push(this.createAttributeFormGroup(res));

      }
    });
  }
  get AttributeForm() {
    return this.itemDefinitionForm.get('attribute') as FormArray;
  }
  createAttributeFormGroup(res: any): FormGroup {
    return this.fb.group({
      id: 0,
      name: res.attributeName || '',  // Use default if attributeName is undefined
      attributeGroupId: res.attributeGroupId ,  // Optional, use default 0 if undefined
      isActive: true,
      attributeGroupDetails:  this.fb.array(
        res.attributeDetails.map((detail: any) =>
          this.fb.group({
            detailName: detail || '',
          })
        )
      ),
      attributeName: this.fb.array(
        res.values.map((detail: any) =>
          this.fb.group({
            detailName: detail || '',
          })
        )
      ),
    });
  }

    getItemVariants(){
          this.itemService.getItemAttributes(this.id)
          this.itemService.ItemAttributesById$.subscribe(data => {
            if (!!data) {
              this.AttributeForm?.clear()

              this.dataItemVariantsById = data;

              data.forEach(element => {
                const nameAttribute= this.currentLang === 'en' ? element.nameEn : element.nameAr;

                const fg = this.fb.group({
                  id: element.id,

                  name: nameAttribute || '',  // Use default if attributeName is undefined
                  attributeGroupId: element.attributeGroupId || 0,  // Use default 0 if undefined
                  isActive: element.isActive,
                  attributeGroupDetails: this.fb.array([]),
                  attributeName: this.fb.array([]),
                });

                this.AttributeForm.push(fg);

                element.itemAttributeGroupDetails.forEach(item => {
                  const attributeNameGroup = this.fb.group({
                      detailName: item.attributeId || '',
                   attributeId : item.attributeId,

                  });

                  // Cast to FormArray before pushing to avoid TypeScript errors
                  (fg.get('attributeGroupDetails') as FormArray).push(attributeNameGroup);
                });
                element.itemAttributeGroupDetails.forEach(item => {
                  const nameAttributeValues = this.currentLang === 'en' ? item.nameEn : item.nameAr;

                  const attributeValues = this.fb.group({
                    detailName: nameAttributeValues || '',
                    attributeId: item.attributeId || null,
                  });

                  // Cast to FormArray before pushing to avoid TypeScript errors
                  (fg.get('attributeName') as FormArray).push(attributeValues);
                });
              });
            }
          });

          // data.itemAttributeGroupDetails?.map((detail: any) =>
          //   this.fb.group({
          //     detailName: detail.nameEn || '',
          //     attributeId : detail.attributeId,

          //   })
          // )
    }

  getItemVariantsByItemIdDropDown() {
    this.itemService.getItemVariantsByItemIdDropDown(this.id);
    this.itemService.ItemVariantsByItemIdDropDownObs.subscribe((res) => {
      this.ItemVariantsByItemIdDropDown = res;
    });
  }

  // async confirmChange(event: any, itemDefAttributeGroup: FormGroup) {
  //   const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
  //   if (confirmed) {
  //     const command = {
  //       id: itemDefAttributeGroup.get('id')?.value,
  //     };
  //     this.itemService.ActivateVairiantGroup(command);
  //   } else {
  //     // Properly toggle the status value
  //     const currentStatus = itemDefAttributeGroup.get('status')?.value;
  //     itemDefAttributeGroup.get('status')?.setValue(!currentStatus);
  //   }
  // }

  onEditAttribute(form: FormGroup) {
    const dialogRef = this.dialog.open(AddVariantPopupComponent, {
      width: '50%',
      height: '430px',
      data: form.value,
    });

    dialogRef.onClose.subscribe((res) => {
      if (res) {
        // Clear the form array only once before adding new items
        const attributeNameArray = form.get('attributeGroupDetails') as FormArray;
        attributeNameArray.clear();
        const attributeNamesArray = form.get('attributeName') as FormArray;
        attributeNamesArray.clear();

        // Iterate over attributeDetails and push each item
        res.attributeDetails.forEach((item: any) => {
          const attributeValues = this.fb.group({
            detailName: item || '',
            attributeId: item.attributeId || null,
            // attributeGroupId

          });
          attributeNameArray.push(attributeValues);
        });
        res.values.forEach((element : any) => {
         const attributeValuesNames = this.fb.group({
          detailName: element || '',
          // attributeId: element || null,
        });
        attributeNamesArray.push(attributeValuesNames)
        });




        form.get('name')?.setValue(res.attributeName)
        form.get('attributeGroupId')?.setValue(res.attributeGroupId)
      }
    });

  }

  onDeleteAttribute(itemDefAttributeGroup: FormGroup , i : number) {
    if(itemDefAttributeGroup.get('id')?.value !== 0) {
      this.itemService.deleteVariant(itemDefAttributeGroup.get('id')?.value);

    }else{
      this.AttributeForm.removeAt(i)
    }
  }

  onSave() {
    let formData = this.AttributeForm.value;
    formData = formData.map((elem : any)=> {
      elem.attributeGroupDetails =  elem.attributeGroupDetails.map((item : any)=>item.detailName)
      return elem
    })

    let obj : EditAttributes = {
      id : +this.id,
      itemAttributeGroups : formData
    }
    this.itemService.EditItemAttributes(obj)
  }
}
