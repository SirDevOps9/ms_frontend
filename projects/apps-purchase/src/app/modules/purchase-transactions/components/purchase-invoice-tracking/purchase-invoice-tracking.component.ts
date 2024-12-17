import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';
import { FormsService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-purchase-invoice-tracking',
  templateUrl: './purchase-invoice-tracking.component.html',
  styleUrl: './purchase-invoice-tracking.component.scss'
})
export class PurchaseInvoiceTrackingComponent implements OnInit {
  configData: any = {};
  trackingForm: FormGroup;

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    public sharedFinanceEnums: SharedFinanceEnums,
    private formService: FormsService
  ) {}
  ngOnInit(): void {
    this.trackingForm = this.fb.group({
      invoiceEntryMode: this.fb.array([]),
    });
    this.configData = this.config.data;
    console.log(this.configData)

    if (this.configData.id || this.configData.id == 0) {
      // this.tracking.clear();
      this.tracking.push(this.createTracking(this.configData));
      this.validationForm();
    } else {
      this.tracking.push(this.createTracking(this.configData?.trackingValue ?? null));
      this.validationForm();
    }
  }

  validationForm() {
    if (this.configData.expiry) {
      this.tracking.controls[0].get('expireDate')?.setValidators(customValidators.required);
      this.tracking.controls[0].get('expireDate')?.updateValueAndValidity();
    } else {
      this.tracking.controls[0].get('expireDate')?.clearValidators();
      this.tracking.controls[0].get('expireDate')?.updateValueAndValidity();
    }
    if (this.configData.trackingType == this.sharedFinanceEnums.trackingType.Batch) {
      this.tracking.controls[0].get('vendorBatchNo')?.setValidators(customValidators.required);
      this.tracking.controls[0].get('vendorBatchNo')?.updateValueAndValidity();
    }
    if (this.configData.trackingType == this.sharedFinanceEnums.trackingType.Serial) {
      this.tracking.controls[0].get('serialId')?.setValidators(customValidators.required);
      this.tracking.controls[0].get('serialId')?.updateValueAndValidity();
    }
    if (this.configData.trackingType == this.sharedFinanceEnums.trackingType.Serial) {
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
      id: data?.id ?? 0,
      vendorBatchNo: data?.vendorBatchNo ?? null,
      expireDate: [data?.expireDate ?? null, customValidators.required],
      systemPatchNo: data?.systemPatchNo ?? null,
      serialId: [data?.serialId ?? null],
      trackingType: this.configData?.trackingType,
    });
  }

  get tracking() {
    return this.trackingForm.get('invoiceEntryMode') as FormArray;
  }
}
