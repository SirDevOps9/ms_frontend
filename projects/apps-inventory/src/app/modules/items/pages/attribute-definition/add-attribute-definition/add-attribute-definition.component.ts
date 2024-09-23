import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { Balance } from 'projects/apps-finance/src/app/modules/finance/models';
import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import { CurrencyDto } from 'projects/apps-finance/src/app/modules/general/models';
import { LanguageService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { addAttributeDifintion } from '../../../models';
import { itemAttributeValues } from '../../../models/itemAttributeValues';

@Component({
  selector: 'app-add-attribute-definition',
  templateUrl: './add-attribute-definition.component.html',
  styleUrl: './add-attribute-definition.component.scss',
})
export class AddAttributeDefinitionComponent implements OnInit {
  attrTableForm: FormArray;
  attrFormGroup: FormGroup;

  attributeName: { id: number; name: string }[] = [];
  attributeValues: itemAttributeValues[] = [];
  isLastLineSaved: boolean = true;
  lineStatus: boolean[] = [];
  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,

    private languageService: LanguageService,
    private title: Title
  ) {
    this.title.setTitle(
      this.languageService.transalte('attributeDefinition.addattributeDefinition')
    );
  }



  ngOnInit(): void {
    this.attrTableForm = this.fb.array([]);

    this.attributeGroups();
    this.initAttrGroupForm();
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

      // Add new form groups to the form array
      this.attributeValues.forEach((attr: any) => {
        this.attrTableForm.push(this.create_Attr_FormGroup(attr));
      });
    });
  }

  // init the form
  initAttrGroupForm() {
    this.attrFormGroup = this.fb.group({
      attrName: [null, customValidators.required],
    });

    this.attrFormGroup.get('attrName')?.valueChanges.subscribe((res: any) => {
      debugger;
      if (!res) return;

      this.attributeGroupsValue(res);
    });
  }

  get attrName(): number {
    return this.attrFormGroup.get('attrName')?.value;
  }

  public get items(): FormArray {
    return this.attrTableForm as FormArray;
  }

  create_Attr_FormGroup(attrData?: any): FormGroup {
    return this.fb.group({
      id: new FormControl(attrData?.id),
      nameAr: new FormControl(attrData?.nameAr || '', customValidators.required),
      nameEn: new FormControl(attrData?.nameEn || '', customValidators.required),

      attributeGroupId: new FormControl(attrData?.attributeGroupId || ''),
    });
  }

  addLine() {
    this.items.push(this.create_Attr_FormGroup());

    this.lineStatus.push(false);
    this.isLastLineSaved = false;
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.attrTableForm.length) {
      this.attrTableForm.removeAt(index);
      this.isLastLineSaved = true;
    }
  }

  onDelete(id: any) {
    this.itemsService.deleteAttrDifinition(id.id);
  }
  // Check if the save button should be shown for a specific row
  shouldShowSaveButton(index: number): boolean {
    const formGroup = this.attrTableForm.at(index) as FormGroup;

    const hasId = !!formGroup.get('id')?.value;

    return formGroup.dirty && !formGroup.invalid && !this.lineStatus[index] && !hasId;
  }

  
  onSave(obj: addAttributeDifintion, index: number) {
    obj.attributeGroupId = this.attrName;

    this.itemsService.addAttrDifintion(obj);
    this.itemsService.sendAttrDefinition$.subscribe((res: any) => {
      this.lineStatus[index] = true;

      this.isLastLineSaved = true;
      this.attributeGroupsValue(this.attrName);
    });
  }
}
