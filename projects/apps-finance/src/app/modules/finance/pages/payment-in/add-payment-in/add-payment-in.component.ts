import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  FormsService,
  LanguageService,
  LookupsService,
  PageInfo,
  PageInfoResult,
  RouterService,
  customValidators,
} from 'shared-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PaymentMethodComponent } from '../../../components/payment-in/payment-method/payment-method.component';

@Component({
  selector: 'app-add-payment-in',
  templateUrl: './add-payment-in.component.html',
  styleUrl: './add-payment-in.component.scss',
})
export class AddPaymentInComponent {
  addForm: FormGroup;
  tableData: any[] = [];

  constructor(private formBuilder: FormBuilder, private dialog: DialogService) {
  }

  ngOnInit() {
    this.initializeForm();
  }
  private initializeForm() {
    this.addForm = this.formBuilder.group({
      code: new FormControl('', [customValidators.required]),
      journalDate: new FormControl('', [customValidators.required]),
      description: new FormControl('', [customValidators.required]),
      paymentHubId: new FormControl('', [customValidators.required]),
      paymentHubDetails: new FormControl('', [customValidators.required]),
      bankAccountId: new FormControl('', [customValidators.required]),
      currency: new FormControl('', [customValidators.required]),
      rate: new FormControl('', [customValidators.required]),
      sourceDocument: new FormControl('', [customValidators.required]),
      createdJournal: new FormControl('', [customValidators.required]),
      currentBalance: new FormControl('', [customValidators.required]),
      totalReceivedAmount: new FormControl('', [customValidators.required]),
      newBalance: new FormControl('', [customValidators.required]),
    });
  }
  ///
 

  openDialog() {
    const ref = this.dialog.open(PaymentMethodComponent, {
      width: '900px',
      height: '600px',
    });
  }


  paymentHubs: { id: number; name: string }[] = [
    { id: 1, name: 'Hub 1' },
    { id: 2, name: 'Hub 2' },
  ];

  bankAccounts: { id: number; name: string }[] = [
    { id: 1, name: 'Bank Account 1' },
    { id: 2, name: 'Bank Account 2' },
  ];
}
