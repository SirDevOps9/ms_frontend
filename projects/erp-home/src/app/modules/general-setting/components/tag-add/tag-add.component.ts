import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, LanguageService, MenuModule, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { AddTagDto } from '../../models';
import { LayoutService } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss'],
})
export class TagAddComponent implements OnInit {
  tagForm: FormGroup;
  modulelist: MenuModule[];
  selectedModules: number[] = [];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private generalSettingService: GeneralSettingService,
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
    this.generalSettingService.addTag(tagDto, this.ref);
  }
}
