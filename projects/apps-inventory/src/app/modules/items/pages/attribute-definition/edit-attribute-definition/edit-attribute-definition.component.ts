import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FormsService, LanguageService, RouterService, ToasterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';
import { ItemAttribute, itemAttributeValuesByID } from '../../../models/itemAttributeValues';
@Component({
  selector: 'app-edit-attribute-definition',
  templateUrl: './edit-attribute-definition.component.html',
  styleUrl: './edit-attribute-definition.component.scss',
})
export class EditAttributeDefinitionComponent implements OnInit {
  attrTableForm: FormArray;
  attrFormGroup: FormGroup;
  attributeName: { id: number; name: string }[] = [];
  attributeValues: itemAttributeValuesByID
  _routeid: number;
  lineStatus: boolean[] = [];
  duplicateLines:any[]=[]
  formsService = inject(FormsService);
  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private _route: ActivatedRoute,
    private toaserService: ToasterService,
    private languageService: LanguageService,
    private routerService: RouterService,

    private title: Title
  ) {
    this.title.setTitle(
      this.languageService.transalte('attributeDefinition.addattributeDefinition')
    );
  }
  ngOnInit(): void {
    this._routeid = this._route.snapshot.params['id'];
    this.attrTableForm = this.fb.array([this.create_Attr_FormGroup()]);
    this.attributeGroups();
    this.initAttrGroupForm();
    if (this._routeid) {
      this.attributeGroupsValue(this._routeid);
    }
  }
  // attr group dropdown
  attributeGroups() {
    this.itemsService.AttributeGroupDropDown();
    this.itemsService.attributeGroupeDropDownLookup$.subscribe((res) => {
      this.attributeName = res;
 
    });
  }
  attributeGroupsValue(id: number) {
    this.itemsService.attributeGroupsValue(id);
    this.itemsService.attributeValuesDropDownLookupObs.subscribe((res: any) => {
      this.attributeValues = res;
      this.attrTableForm.clear();
      this.attrFormGroup.patchValue(res)
      // Add new form groups to the form array
      this.attributeValues.itemAttributes?.forEach((attr: ItemAttribute) => {
        this.attrTableForm.push(this.create_Attr_FormGroup(attr));
      });
    });
  }
  // init the form
  initAttrGroupForm() {
    this.attrFormGroup = this.fb.group({
      id: [''],
            nameAr: ['', customValidators.required],
            nameEn: ['', customValidators.required],    });

  }
  get attrName(): number {
    return this.attrFormGroup.get('attrName')?.value;
  }
  public get items(): FormArray {
    return this.attrTableForm as FormArray;
  }
  create_Attr_FormGroup(attrData?: any): FormGroup {
    return this.fb.group({
      id: new FormControl(attrData?.id ?? 0),
      nameAr: new FormControl( attrData?.nameAr, customValidators.required),
      nameEn: new FormControl( attrData?.nameEn, customValidators.required),
      isActive: new FormControl(attrData?.isActive ?? false),

    });
  }
  isLastLineSaved: boolean = true;
  addLine() {
    this.items.push(this.create_Attr_FormGroup());
    this.isLastLineSaved = false;
  }
  async toggleAttrStatus(data: any, event: any) {
    const confirmed = await this.toaserService.showConfirm('ConfirmButtonTexttochangestatus');
    if (confirmed) {
      let obj = {
        id: data.id,
        isActive: event,
      };
      this.itemsService.ActivateAttrDefinition(obj);
    } else {
      return;
    }
  }

  deleteLineWithId(index: number): void {
    if (index >= 0 && index < this.attrTableForm.length) {
      this.attrTableForm.removeAt(index);
      this.isLastLineSaved = true;
      this.attributeGroups();
    }
  }

  async deleteLine(index: number): Promise<void> {
    const confirmed = await this.toaserService.showConfirm(
      this.languageService.transalte('ConfirmButtonTexttodelete')
    );

    if (confirmed) {
      if (index >= 0 && index < this.attrTableForm.length) {
        this.attrTableForm.removeAt(index);
        this.isLastLineSaved = true;
        this.updateDuplicateLines();
          this.attributeGroups();
      
      }
    }
  }

  private updateDuplicateLines(): void {
    let existingItems = this.attrTableForm.value;
    this.duplicateLines = existingItems.map((item: { nameAr: any; nameEn: any; }) =>
      existingItems.filter((existingItem: { nameAr: any; nameEn: any; }) =>
        existingItem.nameAr === item.nameAr || existingItem.nameEn === item.nameEn
      ).length > 1
    );
  }

onDeleteOrRemove(index: number): void {
  const formControl = this.attrTableForm.at(index);

  if (formControl.get('id')?.value) {
    this.onDelete(formControl.get('id')?.value, index);
    this.attributeGroups()
  } else {
    this.deleteLine(index);
        this.attributeGroups();
  }
}
onDelete(id: number, index: number): void {
  this.itemsService.deleteAttrDifinitionWithId(id );
  this.attributeGroups();
}


  shouldShowSaveButton(index: number): boolean | undefined {
    const formGroup = this.attrTableForm.at(index) as FormGroup;
    const otherFieldsDirty = formGroup.get('nameAr')?.dirty || formGroup.get('nameEn')?.dirty;
    return otherFieldsDirty && !formGroup.invalid && !this.lineStatus[index];
  }

  onSave() {
    if (!this.formsService.validForm(this.attrFormGroup, false)) {
      return;
    }

    if (this.attrTableForm.length === 0) {
      const errorTitle = this.languageService.transalte('Error');
      const errorMessage = this.languageService.transalte('attributeDefinition.noItems');
      this.toaserService.showError(errorMessage, errorTitle);
      return;
    }

    let existingItems = this.attrTableForm.value;
    this.duplicateLines = existingItems.map((item: { nameAr: any; nameEn: any; }) =>
      existingItems.filter((existingItem: { nameAr: any; nameEn: any; }) =>
        existingItem.nameAr === item.nameAr || existingItem.nameEn === item.nameEn
      ).length > 1
    );

    let formGroupVal = this.attrFormGroup.value;
    delete formGroupVal.isActive;

    let data: any = {
      ...formGroupVal,
      ItemAttributes: this.attrTableForm.value
    };

    this.itemsService.updateAttrDifinition(data);

    this.itemsService.updateAttrobj$.subscribe(
      (res: any) => {
        if (res.messageCode === 4001) {
          alert("Error occurred: " + res.message);
          if (res.validationErrors) {
            res.validationErrors.forEach((error: any) => {
              alert(`Field: ${error.key}, Error: ${error.errorMessages.join(', ')}`);
            });
          }



          return;
        } else {
          if (res === true) {
            this.routerService.navigateTo('/masterdata/attribute-definition');

          }
        }
      },
      (error) => {
        console.error('An unexpected error occurred:', error);
      }
    );
  }

    discard(){
      this.routerService.navigateTo('/masterdata/attribute-definition')

    }

}
