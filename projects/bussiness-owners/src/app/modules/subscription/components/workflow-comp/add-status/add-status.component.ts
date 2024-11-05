import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsService, customValidators } from 'shared-lib';
import { SubscriptionService } from '../../../subscription.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrl: './add-status.component.scss',
})
export class AddStatusComponent implements OnInit {
  statusForm: FormGroup;
  id: any;
  route = inject(ActivatedRoute);
  config = inject(DynamicDialogConfig);
  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private _subService: SubscriptionService
  ) {}

  ngOnInit() {
    this.id = this.config.data.id;
    this.initializeStatusForm();
  }

  initializeStatusForm() {
    this.statusForm = this.fb.group({
      name: new FormControl('', [customValidators.required]),
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.statusForm)) return;
    const tagDto: any = this.statusForm.value;
    this._subService.addStatus(this.id, tagDto, this.ref);
  }
}
