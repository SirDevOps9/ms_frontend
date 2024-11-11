import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GeneralSettingService } from '../../general-setting.service';
import {  customValidators } from 'shared-lib';
import { LayoutService } from 'libs/apps-shared-lib/src/lib/modules/layout/layout.service';
import { SubdomainModuleDto, TagDto } from '../../models';

@Component({
  selector: 'app-tag-edit',
  templateUrl: './tag-edit.component.html',
  styleUrls: ['./tag-edit.component.scss'],
})
export class TagEditComponent implements OnInit {
  tagForm: FormGroup;
  modulelist: SubdomainModuleDto[];
  selectedModules?: number[] = [];
  get Id(): string {
    return this.config?.data?.id;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private generalSettingService: GeneralSettingService,
  ) {
  }

  ngOnInit() {
    this.initializeTagForm();
    this.moudlelist();
    this.getCurruntTag();
  }

  getCurruntTag() {
    this.generalSettingService.getTagById(parseInt(this.Id));
    this.generalSettingService.currentTag.subscribe((response) => {
      this.tagForm.patchValue({
        Id: response.id,
        Code: response.code,
        Name: response.name,
        ModulesId: response.modulesId,
        IsActive: response.isActive,
      });
      this.selectedModules = response.modulesId;
    });
  }

  moudlelist() {
    this.generalSettingService.getUserSubDomainModules();
    this.generalSettingService.subdomainModuleDataSourceObservable.subscribe((res) => {
      this.modulelist = res;
    });
    console.log(this.modulelist);
  }

  initializeTagForm() {
    this.tagForm = this.fb.group({
      Id: ['', customValidators.required],
      Code: ['', customValidators.required],
      Name: ['', customValidators.required],
      ModulesId: [[], customValidators.required],
      IsActive: [false, customValidators.required],
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.tagForm.valid) return;
    const tagDto: TagDto = this.tagForm.value;
    this.generalSettingService.editTag(tagDto, this.ref);
  }
}
