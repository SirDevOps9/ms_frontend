import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTagDto } from 'projects/apps-purchase/src/app/modules/purchase/models';
import { GeneralSettingService } from 'projects/erp-home/src/app/modules/general-setting/general-setting.service';
import { SubdomainModuleDto } from 'projects/erp-home/src/app/modules/general-setting/models';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrl: './add-workflow.component.scss'
})
export class AddWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  modulelist: SubdomainModuleDto[];
  selectedModules: number[] = [];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private generalSettingService: GeneralSettingService,
    private formsService: FormsService,    private _subService: SubscriptionService,

  ) {

  }

  ngOnInit() {
    this.moudlelist();
    this.initializeWorkflowForm();
  }

  moudlelist() {
    this.generalSettingService.getUserSubDomainModules();
    this.generalSettingService.subdomainModuleDataSourceObservable.subscribe((res) => {
      this.modulelist = res;
    });
  }

  initializeWorkflowForm() {
    this.workflowForm = this.fb.group({
      name: new FormControl('', [customValidators.required]),
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.workflowForm)) return;   
     const tagDto: AddTagDto = this.workflowForm.value;
    this._subService.addWorkflow(tagDto, this.ref);
  }
}
