import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { Balance } from 'projects/apps-finance/src/app/modules/finance/models';
import { UserPermission } from 'projects/apps-finance/src/app/modules/finance/models/user-permission';
import { CurrencyDto } from 'projects/apps-finance/src/app/modules/general/models';
import { LanguageService, ToasterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';
import { itemAttributeValues } from '../../../models/itemAttributeValues';
import { addAttributeDifintion } from '../../../models';

@Component({
  selector: 'app-edit-attribute-definition',
  templateUrl: './edit-attribute-definition.component.html',
  styleUrl: './edit-attribute-definition.component.scss',
})
export class EditAttributeDefinitionComponent implements OnInit {
  attrTableForm: FormArray;
  attrFormGroup: FormGroup;

  attributeName: { id: number; name: string }[] = [];
  attributeValues: itemAttributeValues[] = [];
  _routeid: number;
  lineStatus: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private _route: ActivatedRoute,
    private toaserService: ToasterService,
    private languageService: LanguageService,
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
      if (this._routeid) {
        this.attrFormGroup
          ?.get('attrName')
          ?.patchValue(res?.filter((x: any) => x.id == this._routeid)[0]?.id);
      }
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
      isActive: new FormControl(attrData?.isActive),

      attributeGroupId: new FormControl(attrData?.attributeGroupId || ''),
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

  deleteLine(index: number): void {
    if (index >= 0 && index < this.attrTableForm.length) {
      this.attrTableForm.removeAt(index);
      this.isLastLineSaved = true;
    }
  }

  onDelete(id: any) {
    this.itemsService.deleteAttrDifinition(id.id);
    this.attributeGroupsValue(this.attrName);
  }
  shouldShowSaveButton(index: number): boolean | undefined {
    const formGroup = this.attrTableForm.at(index) as FormGroup;

    const otherFieldsDirty = formGroup.get('nameAr')?.dirty || formGroup.get('nameEn')?.dirty;

    return otherFieldsDirty && !formGroup.invalid && !this.lineStatus[index];
  }

  onSave(obj: addAttributeDifintion, index: number) {
    obj.attributeGroupId = this.attrName;

    this.itemsService.updateAttrDifinition(obj);
    this.itemsService.updateAttrobj$.subscribe((res: any) => {
      this.lineStatus[index] = true; 

      this.isLastLineSaved = true;
      this.attributeGroupsValue(this.attrName);
    });
  }
}
