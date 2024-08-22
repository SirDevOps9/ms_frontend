import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';
import { SharedJournalEnums } from '../../../models/sharedEnums';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
})
export class PaymentMethodComponent {
  addForm: FormGroup;
  paymentmethod:number
  ngOnInit() {
    if(this.config.data){
      this.paymentmethod=this.config.data
      console.log(this.paymentmethod);
      
    }
    this.initializeForm();
    }
  private initializeForm() {
    this.addForm = this.formBuilder.group({
      code: new FormControl('', [customValidators.required]),
    });
  }

  close() {
    this.ref.close();
  }
  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private config : DynamicDialogConfig,
    public SharedJournalEnums: SharedJournalEnums,

  ) {}
}
