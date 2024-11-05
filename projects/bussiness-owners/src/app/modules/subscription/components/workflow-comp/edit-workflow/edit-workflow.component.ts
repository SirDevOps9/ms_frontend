import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SubdomainModuleDto } from 'projects/erp-home/src/app/modules/general-setting/models';
import { customValidators, FormsService } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrl: './edit-workflow.component.scss'
})
export class EditWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  get Id(): string {
    return this.config?.data?.id;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,    private _subService: SubscriptionService,

  ) {
  }

  ngOnInit() {
    this.initializeworkflowForm();
    this.getWorkflowById();
  }

  getWorkflowById() {
    this._subService.getWorkFlowByID(parseInt(this.Id));
    this._subService.workflowObjByID$.subscribe((response) => {
      this.workflowForm.patchValue({
        id: response.id,
        name: response.name,
        isActive: response.isActive ,
        serviceId: response.serviceId,
       
      
      });
    });
  }

 

  initializeworkflowForm() {
    this.workflowForm = this.fb.group({
      id: ['', customValidators.required],
      name: ['', customValidators.required],
      isActive: [false, ],
      serviceId: [0],
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.workflowForm)) return;   
    const tagDto: any = this.workflowForm.value;
    this._subService.editWorkflow(tagDto, this.ref);
  }
}