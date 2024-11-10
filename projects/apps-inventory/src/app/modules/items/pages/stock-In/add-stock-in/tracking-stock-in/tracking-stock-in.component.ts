import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tracking-stock-in',
  templateUrl: './tracking-stock-in.component.html',
  styleUrl: './tracking-stock-in.component.scss'
})
export class TrackingStockInComponent implements OnInit {
constructor(private ref : DynamicDialogRef , private config : DynamicDialogConfig , private fb : FormBuilder){}
  ngOnInit(): void {
   this.trackingForm = this.fb.group({

   })
  }
trackingForm : FormGroup
  onCancel() {
    this.ref.close()
  }
  onSubmit() {

  }

  get tracking() {
    return this.trackingForm.get('stockInTracking') as FormArray;
  }
}
