import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, FormsService } from 'shared-lib';
import { SharedFinanceEnums } from '../../../../models/sharedEnumStockIn';

@Component({
  selector: 'app-tracking-stock-in',
  templateUrl: './tracking-stock-in.component.html',
  styleUrl: './tracking-stock-in.component.scss',
})
export class TrackingStockInComponent implements OnInit {
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums
  ) {}
  configData: any = {};
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
    if (this.config.data.expiry) {
      this.tracking.controls[0].get('expireDate')?.setValidators(customValidators.required);
      this.tracking.controls[0].get('expireDate')?.updateValueAndValidity();
    }
    if (this.config.data.tracking == this.sharedFinanceEnums.trackingType.Batch) {
      this.tracking.controls[0].get('vendorBatchNo')?.setValidators(customValidators.required);
      this.tracking.controls[0].get('vendorBatchNo')?.updateValueAndValidity();
    }
    if (this.config.data.tracking == this.sharedFinanceEnums.trackingType.Serial) {
      this.tracking.controls[0].get('serialId')?.setValidators(customValidators.required);
      this.tracking.controls[0].get('serialId')?.updateValueAndValidity();
    }
  }
  onCancel() {
    this.ref.close();
  }
  onSubmit() {
    if (!this.formService.validForm(this.tracking, false)) return;

    this.ref.close(this.tracking.controls[0].value);
  }

  createTracking(data?: any) {
    return this.fb.group({
      id: data?.id ? data?.id : 0,
      vendorBatchNo: data?.vendorBatchNo ?? null,
      expireDate: [data?.expireDate ?? null],
      systemPatchNo: data?.systemPatchNo ?? null,
      serialId: data?.serialId ?? null,
      trackingType: this.configData?.trackingType,
    });
  }

  get tracking() {
    return this.trackingForm.get('stockInTracking') as FormArray;
  }
}
