import {  ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, FormsService } from 'shared-lib';
import { SharedJournalEnums } from '../../../models/sharedEnums';
import { DatePipe } from '@angular/common';
import { paymentMethodTypeString, paymentplaceString } from '../../../models';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
})
export class PaymentMethodComponent {
  addForm: FormGroup;
  paymentmethod?:string
  paymentmethodId?:number
  amount:number
  CommissionAmount:number=0
  paymentMethodTypeString:paymentMethodTypeString

  
  // ngOnInit() {
   
  //   this.initializeForm();
  //   }
  ngOnInit() {
    this.initializeForm();
    this.setValidation();
  
    if (this.config.data) {
      console.log(this.config.data ,"this.config.data");
      
      this.paymentmethod = this.config.data.paymentMethodType;
      this.paymentmethodId = this.config.data.paymentMethodId;
      this.amount = parseInt(this.config.data.amount);
  
      if (this.config.data?.paymentInMethodDetails) {
        const paymentDetails = this.config.data.paymentInMethodDetails;
  
        this.addForm.patchValue({
          paymentMethodId: paymentDetails.paymentMethodId || this.paymentmethodId,
          chequeNumber: paymentDetails.chequeNumber || null,
          chequeDueDate: paymentDetails.chequeDueDate || new Date(),
          bankReference: paymentDetails.bankReference ||null,
          VatAmount: paymentDetails.VatAmount || null,
          CommissionAmount: paymentDetails.CommissionAmount || null,
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
  setValidation(){
    if(this.paymentmethod == paymentMethodTypeString.Check ){
      this.addForm.get('chequeDueDate')?.addValidators(customValidators.required);
      this.addForm.get('chequeNumber')?.addValidators(customValidators.required);
    }else if(this.paymentmethod == paymentMethodTypeString.Transfer ){
      this.addForm.clearValidators()
    }
    else if(this.paymentmethod == paymentMethodTypeString.Span ){
      this.addForm.clearValidators()
    }
    else if(this.paymentmethod == paymentMethodTypeString.Master ){
      this.addForm.get('bankReference')?.addValidators(customValidators.required);
    }
    else if(this.paymentmethod == paymentMethodTypeString.Visa ){
      this.addForm.get('bankReference')?.addValidators(customValidators.required);
    }
  }
  
  private initializeForm() {
    this.addForm = this.formBuilder.group({
      paymentMethodId: new FormControl(this.paymentmethodId),
      chequeNumber: new FormControl(null),
      chequeDueDate: new FormControl(null),
      bankReference: new FormControl(null),
      VatAmount: new FormControl(null),
      CommissionAmount: new FormControl(null),
    });
    

  }

  close() {
    this.ref.close();
  }
  save(){
    if (!this.formsService.validForm(this.addForm, false)) return;

    if(this.addForm.controls['chequeDueDate'].value){
      const formattedChequeDueDate = this.formatDate(this.addForm.controls['chequeDueDate'].value, 'yyyy-MM-dd');
      this.addForm.controls['chequeDueDate'].setValue(formattedChequeDueDate);
    }

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
    private formsService: FormsService,


  ) {}
}
