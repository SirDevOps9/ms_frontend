import { Component, OnInit } from '@angular/core';
import { customValidators, FormsService, LanguageService, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  PaymentMethodForm: FormGroup;


  constructor(private fb: FormBuilder ,
    private financeService : FinanceService ,
        private routerService : RouterService ,
         private formsService  : FormsService,
         private lookupsService: LookupsService,
          private toasterService : ToasterService, 
          private languageService : LanguageService ,
 ) {}

  ngOnInit() {
  }
  discard() {
    this.routerService.navigateTo('/masterdata/payment-method')
  }

  InitForm(){
    this.PaymentMethodForm = this.fb.group({
      code: new FormControl(null),
      name: new FormControl('',[customValidators.required] ,),
      paymentplace: new FormControl('', [customValidators.required]),
      paymentmethod: new FormControl('', [customValidators.required]),

       bankInfo: this.fb.group({
        relatedbank: new FormControl(null),
        bankaccount: new FormControl(null),
        }),

        commissionInfo: this.fb.group({
          commissiontype: new FormControl(null),
          commissiontvalue: new FormControl(null),
          commissiontaccount: new FormControl(null),
          allawvat: new FormControl(null)
       })

       });
  }

  onSave() {}

}
