import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-add-variable',
  templateUrl: './add-variable.component.html',
  styleUrl: './add-variable.component.scss',
})
export class AddVariableComponent implements OnInit {
  variableForm: FormGroup;
  workflowId: number;
  typesList: any[] = [];

  route = inject(ActivatedRoute);
  config = inject(DynamicDialogConfig);
  dialogService = inject(DialogService);
  fb = inject(FormBuilder);
  layoutService = inject(LayoutService);
  ref = inject(DynamicDialogRef);
  formsService = inject(FormsService);
  _subService = inject(SubscriptionService);

  ngOnInit() {
    this.initializevariableForm();
    this.typeList();
  }

  get dataToPatch() {
    return this.config?.data;
  }

  initializevariableForm() {
    this.variableForm = this.fb.group({
      name: new FormControl('', [customValidators.required]),
      type: new FormControl('', [customValidators.required]),
    });
  }
  typeList() {
    this._subService.lookupForVariables();
    this._subService.lookupForVariablesList$.subscribe({
      next: (res: any) => {
        debugger;
        this.typesList = res.items;
      },
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.variableForm)) return;
    const tagDto: any = this.variableForm.value;
    this._subService.addVariable(this.dataToPatch, tagDto, this.ref);
  }
}
