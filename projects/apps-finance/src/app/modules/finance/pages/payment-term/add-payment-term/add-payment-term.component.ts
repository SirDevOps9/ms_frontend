import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FinanceService } from '../../../finance.service';
import { customValidators, FormsService, lookupDto, LookupEnum, LookupsService, RouterService } from 'shared-lib';
import { AddPaymentTermDto, AddPaymentTermLinesDto } from '../../../models';

@Component({
  selector: 'app-add-payment-term',
  templateUrl: './add-payment-term.component.html',
  styleUrls: ['./add-payment-term.component.scss']
})
export class AddPaymentTermComponent implements OnInit {
  paymentTermForm: FormArray;
  paymentTermGroup : FormGroup;
  afterPeriodLookup :   { id: number; name: string }[]
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };

  

  constructor(private fb: FormBuilder ,
     private financeService : FinanceService ,
         private routerService : RouterService ,
          private formsService  : FormsService,
          private lookupsService: LookupsService,
  ) {}

  ngOnInit() {
    this.paymentTermForm = this.fb.array([this.createPaymentTermFormGroup()]);
    this.paymentTermGroup = new FormGroup({
      code: new FormControl(''),
      name: new FormControl('', [customValidators.required,customValidators.length(0,50) ])
    });

    this.getafterPeriodLookup()

  }
  createPaymentTermFormGroup(): FormGroup {
    return this.fb.group({
      dueTermValue:  new FormControl('', customValidators.required),
      note:  new FormControl('', customValidators.required),
      afterValue: new FormControl('', customValidators.required),
      afterPeriod: new FormControl('', customValidators.required),
        });
  }
  getafterPeriodLookup() {
   
  }
  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.PeriodType]);
  }

  public get items(): FormArray {
    return this.paymentTermForm as FormArray;
  }

  addLine() {
    this.items.push(this.createPaymentTermFormGroup())
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.paymentTermForm.length) {
      this.paymentTermForm.removeAt(index);
    }
  }

  onDelete(i : number) {
    this.items.removeAt(i)
  }

  discard() {
    this.routerService.navigateTo('/masterdata/paymentterm')
  }

  onSave() {
    if (!this.formsService.validForm(this.paymentTermGroup, false)) return;
    if (!this.formsService.validForm(this.items, false)) return;
    const paymentTermLines: AddPaymentTermLinesDto[] = this.items.value;
    const formData: AddPaymentTermDto = {
      name: this.paymentTermGroup.get('name')?.value,
      paymentTermLines: paymentTermLines
    };
   // const formData = this.paymentTermGroup.value;
   //let formData =   this.items.value
   console.log("sandra : ",formData);
   this.financeService.addPaymentTerm(formData);

  }

}
