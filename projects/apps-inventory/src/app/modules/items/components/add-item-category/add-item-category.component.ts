import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTagDto } from 'projects/apps-purchase/src/app/modules/purchase/models';
import { MenuModule, FormsService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-add-item-category',
  templateUrl: './add-item-category.component.html',
  styleUrl: './add-item-category.component.scss'
})
export class AddItemCategoryComponent implements OnInit {
  tagForm: FormGroup;
  modulelist: MenuModule[];
  selectedModules: number[] = [];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
  ) {

  }

  ngOnInit() {
    this.moudlelist();
    this.initializeTagForm();
  }

  moudlelist() {
    this.modulelist = this.layoutService.getModules();
    console.log(this.modulelist);
  }

  initializeTagForm() {
    this.tagForm = this.fb.group({
      code: new FormControl({ value: '', disabled: true }),
      name: new FormControl('', [customValidators.required]),
      moduleIds: new FormControl([],  [customValidators.required]),
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.tagForm)) return;   
     const tagDto: AddTagDto = this.tagForm.value;
  }
}

