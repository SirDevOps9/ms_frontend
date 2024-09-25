import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { GeneralSettingService } from '../../general-setting.service';
import { AddTagDto, SubdomainModuleDto } from '../../models';
import { LayoutService } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.service';
@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.scss'],
})
export class TagAddComponent implements OnInit {
  tagForm: FormGroup;
  modulelist: SubdomainModuleDto[];
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
    this.generalSettingService.getUserSubDomainModules();
    this.generalSettingService.subdomainModuleDataSourceObservable.subscribe((res) => {
      this.modulelist = res;
    });
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
