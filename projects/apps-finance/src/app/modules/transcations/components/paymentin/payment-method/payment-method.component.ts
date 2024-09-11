import {  Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, FormsService } from 'shared-lib';
import { DatePipe } from '@angular/common';
import { paymentMethodTypeString, SharedFinanceTranscationEnums } from '../../../models';
@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent {
  addForm: FormGroup;
  paymentmethod?: string
  paymentmethodId?: number
  amount: number
  ratio: number
  vat: number
  commissionAmount: number = 0
  paymentMethodTypeString: paymentMethodTypeString
  disabled: boolean=false;

  ngOnInit() {
    if (this.config.data) {
      console.log(this.config.data);
      
      this.paymentmethod = this.config.data.paymentMethodType;
      this.paymentmethodId = this.config.data.paymentMethodId;
      this.ratio = this.config.data.ratio;
      this.amount = parseInt(this.config.data.amount);
      
      if (this.config.data?.paymentInMethodDetail) {
        const paymentDetails = this.config.data.paymentInMethodDetail;
        this.initializeForm();
        setTimeout(() => {
          this.addForm.patchValue({
            paymentMethodId: paymentDetails.paymentMethodId || this.paymentmethodId,
            chequeNumber: paymentDetails.chequeNumber || null,
            chequeDueDate: paymentDetails.chequeDueDate ? new Date(paymentDetails.chequeDueDate) : new Date(),
            bankReference: paymentDetails.bankReference || null,
            vatAmount: paymentDetails.vatAmount || null,
            commissionAmount: paymentDetails.CommissionAmount || null,
          });
        }, 100);
     

      }else  if (this.config.data?.paymentInMethodDetails) {
        const paymentDetails = this.config.data.paymentInMethodDetails;
        this.initializeForm();
        setTimeout(() => {
          this.addForm.patchValue({
            paymentMethodId: paymentDetails.paymentMethodId || this.paymentmethodId,
            chequeNumber: paymentDetails.chequeNumber || null,
            chequeDueDate: paymentDetails.chequeDueDate ? new Date(paymentDetails.chequeDueDate) : new Date(),
            bankReference: paymentDetails.bankReference || null,
            vatAmount: paymentDetails.vatAmount || null,
            commissionAmount: paymentDetails.CommissionAmount || null,
          });
        }, 100);
     
      }
      if (this.config.data.viewdata) {
        console.log(this.config.data.viewdata ,"this.config.data.viewdata");

        this.disabled=this.config.data.viewdata;
        console.log(this.disabled,"disabled");
      }
      if (this.config.data.selectedPayment.commissionType === this.sharedFinanceEnums.commissionTypeString.Percent) {
        this.commissionAmount = (this.amount * this.config.data.selectedPayment.commissionValue) / 100;


      } else if (this.config.data.selectedPayment.commissionType == this.sharedFinanceEnums.commissionTypeString.Amount) {
        this.commissionAmount = (this.config.data.selectedPayment.commissionValue);
      }
        if(this.config.data.selectedPayment.commissionType && this.config.data.ratio ){
          
          this.vat = (this.commissionAmount * this.config.data.ratio) / 100
        }else if(this.config.data.selectedPayment.commissionType && this.config.data.selectedPayment){
          this.vat = (this.commissionAmount * this.config.data.selectedPayment.ratio) / 100

        }
        


    }
    this.initializeForm();
  }

  private initializeForm() {
    this.addForm = this.formBuilder.group({
      paymentMethodId: new FormControl(this.paymentmethodId),
      chequeNumber: new FormControl(null),
      chequeDueDate: new FormControl(new Date()),
      bankReference: new FormControl(null),
      vatAmount: new FormControl(null),
      commissionAmount: new FormControl(null),
    });

    if (this.paymentmethod == paymentMethodTypeString.Check) {
      this.addForm.get('chequeDueDate')?.addValidators(customValidators.required);
      this.addForm.get('chequeNumber')?.addValidators(customValidators.required);
    } else if (this.paymentmethod == paymentMethodTypeString.Transfer) {
      this.addForm.clearValidators()
    }
    else if (this.paymentmethod == paymentMethodTypeString.Span) {
      this.addForm.clearValidators()
    }
    else if (this.paymentmethod == paymentMethodTypeString.Master) {
      this.addForm.get('bankReference')?.addValidators(customValidators.required);
    }
    else if (this.paymentmethod == paymentMethodTypeString.Visa) {
      this.addForm.get('bankReference')?.addValidators(customValidators.required);
    }

  }

  close() {
    this.ref.close();
  }
  save() {
    if (!this.formsService.validForm(this.addForm, false)) return;

    if (this.addForm.controls['chequeDueDate'].value) {
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
    public config: DynamicDialogConfig,
    public sharedFinanceEnums: SharedFinanceTranscationEnums,
    private formsService: FormsService,
  ) { }
}
