import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-tracking-stock-in',
  templateUrl: './tracking-stock-in.component.html',
  styleUrl: './tracking-stock-in.component.scss'
})
export class TrackingStockInComponent implements OnInit {
constructor(private ref : DynamicDialogRef , private config : DynamicDialogConfig , private fb : FormBuilder){}
configData : string
  ngOnInit(): void {
   this.trackingForm = this.fb.group({
    stockInTracking : this.fb.array([])
   })
   this.tracking.push(this.createTracking())
    this.configData = this.config.data
  }
trackingForm : FormGroup
  onCancel() {
    this.ref.close()
  }
  onSubmit() {
    this.ref.close(this.tracking.controls[0].value)
    }

  createTracking() {
    return this.fb.group({
      vendorBatchNo: '',
      expireDate: [null , customValidators.required],
      systemPatchNo: '',
      serialId: '',
      trackingType: this.config.data
    })
  }

  get tracking() {
    return this.trackingForm.get('stockInTracking') as FormArray;
  }
}
