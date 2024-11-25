import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-edit-variable',
  templateUrl: './edit-variable.component.html',
  styleUrl: './edit-variable.component.scss',
})
export class EditVariableComponent implements OnInit {
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

    if (this.rowObj) {
      this.getVariableByid(this.rowObj.id);
    }
  }

  typeList() {
    this._subService.lookupForVariables();
    this._subService.lookupForVariablesList$.subscribe({
      next: (res: any) => {
        this.typesList = res.items;
      },
    });
  }

  getVariableByid(id: number) {
    this._subService.getVariableByID(id);
    this._subService.getvariableObj$.subscribe({
      next: (res: { workflowId: number; name: string; type: number; id: number }) => {
        debugger;
        if (res) {
          debugger;
          this.variableForm.patchValue({
            id: res.id,
            name: res.name,
            type: res.type?.toString() as string,
          });
        }
      },
    });
  }

  get rowObj() {
    return this.config?.data;
  }

  initializevariableForm() {
    this.variableForm = this.fb.group({
      id: new FormControl('', [customValidators.required]),
      name: new FormControl('', [customValidators.required]),
      type: new FormControl('', [customValidators.required]),
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.variableForm)) return;
    const formValue: any = this.variableForm.value;
    this._subService.EditVariables(formValue, this.ref);
  }
}
