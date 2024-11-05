import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddTagDto } from 'projects/apps-purchase/src/app/modules/purchase/models';
import { GeneralSettingService } from 'projects/erp-home/src/app/modules/general-setting/general-setting.service';
import { SubdomainModuleDto } from 'projects/erp-home/src/app/modules/general-setting/models';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrl: './add-workflow.component.scss'
})
export class AddWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  id: number;
  route = inject(ActivatedRoute);

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,    private _subService: SubscriptionService,

  ) {
    this.getId();

  }

  ngOnInit() {
    this.initializeWorkflowForm();
  }
  getId() {
    this.route.params
      .pipe(
        map((params) => {
          this.id = Number(params['id']);
        })
      )
      .subscribe();
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
