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
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {}
  configData: any = {};
  ngOnInit(): void {
    this.trackingForm = this.fb.group({
      stockInTracking: this.fb.array([]),
    });

    this.configData = this.config.data;
    console.log(this.configData);
    if (this.configData.id) {
      console.log(this.configData);

      this.tracking.clear();
      this.tracking.push(this.createTracking(this.configData));
    } else {
      this.tracking.push(this.createTracking(this.configData?.trackingValue ?? null));
    }
  }
  trackingForm: FormGroup;
  onCancel() {
    this.ref.close();
  }
  onSubmit() {
    this.ref.close(this.tracking.controls[0].value);
  }

  createTracking(data?: any) {
    return this.fb.group({
      id: data?.id ? data?.id : null,
      vendorBatchNo: data?.vendorBatchNo ?? null,
      expireDate: [data?.expireDate ?? null, customValidators.required],
      systemPatchNo: data?.systemPatchNo ?? null,
      serialId: data?.serialId ?? null,
      trackingType: this.configData?.tracking,
    });
  }

  get tracking() {
    return this.trackingForm.get('stockInTracking') as FormArray;
  }
}
