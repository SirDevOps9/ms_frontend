import {  ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';
import { SharedJournalEnums } from '../../../models/sharedEnums';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
})
export class PaymentMethodComponent {
  addForm: FormGroup;
  paymentmethod?:string
  amount:number
  CommissionAmount:number=0

  
  // ngOnInit() {
   
  //   this.initializeForm();
  //   }
  ngOnInit() {
    this.initializeForm();
  
    if (this.config.data) {
      console.log(this.config.data ,"this.config.data");
      
      this.paymentmethod = this.config.data.paymentMethodType;
      this.amount = parseInt(this.config.data.amount);
  
      if (this.config.data?.paymentInMethodDetails) {
        const paymentDetails = this.config.data.paymentInMethodDetails;
  
        this.addForm.patchValue({
          paymentMethodId: paymentDetails.paymentMethodId || this.paymentmethod,
          chequeNumber: paymentDetails.chequeNumber || '',
          chequeDueDate: paymentDetails.chequeDueDate || new Date(),
          bankReference: paymentDetails.bankReference || '',
          VatAmount: paymentDetails.VatAmount || '',
          CommissionAmount: paymentDetails.CommissionAmount || '',
        });
      }
      console.log(this.config.data.selectedPayment.commissionType  ,"this.config.data.selectedPayment.commissionType ");
      console.log(this.SharedJournalEnums.commissionTypeString.Percent  ,"this.config.data.selectedPayment.commissionType ");
      console.log(this.amount,"11111111111111");
        if (this.config.data.selectedPayment.commissionType === this.SharedJournalEnums.commissionTypeString.Percent) {
          this.CommissionAmount = (this.amount* this.config.data.selectedPayment.commissionValue) / 100;
          console.log("11111111111111");
          console.log(this.amount,"11111111111111");
          console.log( this.config.data.selectedPayment.commissionValue, "11111111111111");

          
        } else if (this.config.data.selectedPayment.commissionType == this.SharedJournalEnums.commissionTypeString.Amount) {
          this.CommissionAmount = (this.config.data.selectedPayment.commissionValue);
        }
        console.log(this.CommissionAmount ,"this.CommissionAmount");
        
      }
    }
  
  
  private initializeForm() {
    this.addForm = this.formBuilder.group({
      paymentMethodId: new FormControl(this.paymentmethod),
      chequeNumber: new FormControl('', [customValidators.required]),
      chequeDueDate: new FormControl('',[customValidators.required]),
      bankReference: new FormControl('', [customValidators.required]),
      VatAmount: new FormControl(''),
      CommissionAmount: new FormControl(),
    });
    this.addForm.controls['chequeDueDate'].patchValue(new Date());

  }

  close() {
    this.ref.close();
  }
  save(){
    const formattedChequeDueDate = this.formatDate(this.addForm.controls['chequeDueDate'].value, 'yyyy-MM-dd');
    this.addForm.controls['chequeDueDate'].setValue(formattedChequeDueDate);

    this.ref.close(this.addForm.value);

  }
  formatDate(date: string, format: string): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(date, format) || '';
  }
  constructor(
    private formBuilder: FormBuilder,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,

    public config: DynamicDialogConfig,
    public SharedJournalEnums: SharedJournalEnums,

  ) {}
}
