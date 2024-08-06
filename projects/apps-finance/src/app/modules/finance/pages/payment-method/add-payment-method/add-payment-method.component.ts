import { Component, OnInit } from '@angular/core';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { paymentplace } from '../../../models';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.scss']
})
export class AddPaymentMethodComponent implements OnInit {

  PaymentMethodForm: FormGroup;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  paymentPlaceOptions = [
    { label: 'Treasury', value: 'Treasury' },
    { label: 'Bank', value: 'Bank' }
  ];
  paymentMethodOptions = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Check', value: 'Check' },
    { label: 'Transfer', value: 'Transfer' },
    { label: 'Visa', value: 'Visa' },
    { label: 'Master', value: 'Master' },
    { label: 'Span', value: 'Span' }
  ];

  commissionTypeOptions = [
    { label: 'Amount', value: 'Amount' },
    { label: 'Percent', value: 'Percent' }
  ];



  constructor(private fb: FormBuilder ,
    private financeService : FinanceService ,
        private routerService : RouterService ,
         private formsService  : FormsService,
         private lookupsService: LookupsService,
          private toasterService : ToasterService, 
          private languageService : LanguageService ,
 ) {
  this.PaymentMethodForm = fb.group({
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

     });this.PaymentMethodForm = fb.group({
      code: new FormControl(null),
      name: new FormControl('', [customValidators.required]),
      paymentplace: new FormControl('', [customValidators.required]),
      paymentmethod: new FormControl('', [customValidators.required]),

      bankInfo: this.fb.group({
        relatedbank: new FormControl(null),
        bankaccount: new FormControl(null),
        currency: new FormControl(null),
      }),

      commissionInfo: this.fb.group({
        commissiontype: new FormControl(null),
        commissionvalue: new FormControl(null),
        commissionaccount: new FormControl(null),
        allowvat: new FormControl(null)
      })
    });
 }

  ngOnInit() {
  //  this.InitForm()
  }
  discard() {
    this.routerService.navigateTo('/masterdata/payment-method')
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
  }
  Subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }


  onSave() {}

}
