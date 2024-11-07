import { Component, inject, OnInit } from '@angular/core';
import { ItemsService } from '../../../../items.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FormsService, ToasterService, LanguageService, RouterService, customValidators } from 'shared-lib';
import { itemAttributeValuesByID, ItemAttribute } from '../../../../models/itemAttributeValues';

@Component({
  selector: 'app-attribute-definition-list-values',
  templateUrl: './attribute-definition-list-values.component.html',
  styleUrls: ['./attribute-definition-list-values.component.scss']
})
export class AttributeDefinitionListValuesComponent implements OnInit {
  attrTableForm: FormArray;
  attrFormGroup: FormGroup;
  attributeName: { id: number; name: string }[] = [];
  attributeValues: itemAttributeValuesByID
  _routeid: number;
  constructor(
    private fb: FormBuilder,
    private itemsService: ItemsService,
    private _route: ActivatedRoute,
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
      isActive: new FormControl( attrData?.isActive ?? false),

    });
  }

}
