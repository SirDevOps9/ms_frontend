import { Component, inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { customValidators, FormsService, RouterService } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-edit-workflow',
  templateUrl: './edit-workflow.component.html',
  styleUrl: './edit-workflow.component.scss',
})
export class EditWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  @Input() workflowId: number = 0;

  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private _route: RouterService,
    private formsService: FormsService,
    private _subService: SubscriptionService
  ) {}

  ngOnInit() {
    this.initializeworkflowForm();
    if (this.workflowId) {
      this.getWorkflowById(this.workflowId);
    }
  }

  getWorkflowById(id: number) {
    debugger;
    this._subService.getWorkFlowByID(id);
    this._subService.workflowObjByID$.subscribe((response) => {
      this.workflowForm.patchValue({
        id: response.id,
        name: response.name,
        isActive: response.isActive,
        serviceId: response.serviceId,
      });
    });
  }

  initializeworkflowForm() {
    this.workflowForm = this.fb.group({
      id: ['', customValidators.required],
      name: ['', customValidators.required],
      isActive: [false],
      serviceId: [0],
    });
  }
  _router = inject(RouterService);
  onCancel() {
    this._router.navigateTo('/workflow');
  }

  onSubmit() {
    if (!this.formsService.validForm(this.workflowForm)) return;
    const tagDto: any = this.workflowForm.value;
    this._subService.editWorkflow(tagDto);
  }
}
