import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrl: './edit-status.component.scss'
})
export class EditStatusComponent implements OnInit {
  statusForm: FormGroup;
  id: number;
  route = inject(ActivatedRoute);
  config = inject(DynamicDialogConfig);
  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private _subService: SubscriptionService
  ) {}

  get dataToPatch() {
    return this.config?.data;
  }
  ngOnInit() {
    this.initializeStatusForm();
  }

  initializeStatusForm() {
    this.statusForm = this.fb.group({
      id:[this.dataToPatch.id],
      name: new FormControl(this.dataToPatch.name, [customValidators.required]),
    });
  }

  onCancel() {
  
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.statusForm)) return;
    const obj: any = this.statusForm.value;
    this._subService.EditStatus( obj, this.ref);
  }
}
