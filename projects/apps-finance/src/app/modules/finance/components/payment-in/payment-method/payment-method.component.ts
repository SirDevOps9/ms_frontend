import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss',
})
export class PaymentMethodComponent {
  addForm: FormGroup;
  ngOnInit() {
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
  constructor(private formBuilder: FormBuilder,private ref: DynamicDialogRef,) {}
}
