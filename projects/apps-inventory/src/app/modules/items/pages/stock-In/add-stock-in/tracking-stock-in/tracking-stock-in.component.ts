import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-tracking-stock-in',
  templateUrl: './tracking-stock-in.component.html',
  styleUrl: './tracking-stock-in.component.scss',
})
export class TrackingStockInComponent implements OnInit {
  configData: any = {};
  trackingForm: FormGroup;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.trackingForm = this.fb.group({
      stockInTracking: this.fb.array([]),
    });

    this.configData = this.config.data;
    if (this.configData.id || this.configData.id == 0) {
      this.tracking.clear();
      this.tracking.push(this.createTracking(this.configData));
    } else {
      this.tracking.push(this.createTracking(this.configData?.trackingValue ?? null));
    }
  }
  onCancel() {
    this.ref.close();
  }
  onSubmit() {
    this.ref.close(this.tracking.controls[0].value);
  }

  createTracking(data?: any) {
    return this.fb.group({
      id: data?.id ? data?.id : 0,
      vendorBatchNo: data?.vendorBatchNo ?? null,
      expireDate: [data?.expireDate ?? null, customValidators.required],
      systemPatchNo: data?.systemPatchNo ?? null,
      serialId: data?.serialId ?? null,
      trackingType: this.configData?.trackingType,
    });
  }

  get tracking() {
    return this.trackingForm.get('stockInTracking') as FormArray;
  }
}
