import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FormsService, LanguageService, RouterService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
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

  fb = inject(FormBuilder);
  itemsService = inject(ItemsService);
  formsService = inject(FormsService);
  languageService = inject(LanguageService);
  title = inject(Title);
  routerService = inject(RouterService);
  constructor() {
    this.title.setTitle(
      this.languageService.transalte('attributeDefinition.addattributeDefinition')
    );
  }

  ngOnInit(): void {
    this.attrTableForm = this.fb.array([this.create_Attr_FormGroup()]);

    this.initAttrGroupForm();
  }

  // attr group dropdown

  

  // init the form
  initAttrGroupForm() {
    this.attrFormGroup = this.fb.group({
      attributeId: [''],
      nameAr: ['', customValidators.required],
      nameEn: ['', customValidators.required],
    });

  }

  get attrName(): number {
    return this.attrFormGroup.get('attrName')?.value;
  }

  public get items(): FormArray {
    return this.attrTableForm as FormArray;
  }

  create_Attr_FormGroup(): FormGroup {
    return this.fb.group({
      nameAr: new FormControl('', customValidators.required),
      nameEn: new FormControl('', customValidators.required),
      isActive: new FormControl(true),
    });
  }

  addLine() {
    if (!this.formsService.validForm(this.attrTableForm, false)) return;

    this.items.push(this.create_Attr_FormGroup());
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

  onSave() {

    if (!this.formsService.validForm(this.attrFormGroup, false)) return;
    if (!this.formsService.validForm(this.attrTableForm, false)) return;
    if(this.attrTableForm.length == 0)return
    let formGroupVal = this.attrFormGroup.value;
    delete formGroupVal.attributeId;
    let data: any = {
      ...formGroupVal,
      itemAttributeDtos: this.attrTableForm.value,
    };
    this.itemsService.addAttrDifintion(data)

    this.itemsService.sendAttrDefinition$.subscribe((res: any) => {
      if(res ){

        this.routerService.navigateTo('/masterdata/attribute-definition')
      }else{
        return
      }
    });
  }

  discard() {
    this.routerService.navigateTo('/masterdata/attribute-definition')

  }
}
