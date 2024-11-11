import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../../../finance.service';
import {
  customValidators,
  FormsService,
  LanguageService,
  lookupDto,
  LookupEnum,
  LookupsService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { AddPaymentTermDto, AddPaymentTermLinesDto } from '../../../models';

@Component({
  selector: 'app-add-payment-term',
  templateUrl: './add-payment-term.component.html',
  styleUrls: ['./add-payment-term.component.scss'],
})
export class AddPaymentTermComponent implements OnInit {
  paymentTermForm: FormArray;
  paymentTermGroup: FormGroup;
  afterPeriodLookup: { id: number; name: string }[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private routerService: RouterService,
    private formsService: FormsService,
    private lookupsService: LookupsService,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.paymentTermForm = this.fb.array([this.createPaymentTermFormGroup()]);
    this.paymentTermGroup = new FormGroup({
      code: new FormControl(''),
      name: new FormControl('', [customValidators.required, customValidators.length(0, 50)]),
    });

    this.getPeriodTypeLookup();
  }
  createPaymentTermFormGroup(): FormGroup {
    return this.fb.group({
      dueTermValue: new FormControl('', [
        customValidators.required,
        customValidators.range(0, 100),
      ]),
      note: new FormControl(''),
      afterValue: new FormControl('',[ customValidators.required ,customValidators.nonNegativeNumbers]),
      afterPeriod: new FormControl('', customValidators.required),
    });
  }
  getPeriodTypeLookup() {
    this.lookupsService.loadLookups([LookupEnum.PeriodType]);
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
  }

  public get items(): FormArray {
    return this.paymentTermForm as FormArray;
  }

  addLine() {
    if(!this.formsService.validForm(this.paymentTermForm , false))return
    this.items.push(this.createPaymentTermFormGroup());
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.paymentTermForm.length) {
      this.paymentTermForm.removeAt(index);
    }
  }

  onDelete(i: number) {

    this.items.removeAt(i);
  }

  discard() {
    this.routerService.navigateTo('/masterdata/paymentterm');
  }

  onSave() {
    if (!this.formsService.validForm(this.paymentTermGroup, false)) return;
    if (!this.formsService.validForm(this.items, false)) return;

    const totalDueTermValue = this.items.controls.reduce((sum, control) => {
      const value = parseFloat(control.get('dueTermValue')?.value) || 0;
      return sum + value;
    }, 0);

    console.log('totalDueTermValue', totalDueTermValue);

    if (totalDueTermValue != 100) {
      this.toasterService.showError(
        this.languageService.transalte('failure'),
        this.languageService.transalte('add-paymentterm.totalerror')
      );
      return;
    }

    const paymentTermLines: AddPaymentTermLinesDto[] = this.items.value;
    const formData: AddPaymentTermDto = {
      name: this.paymentTermGroup.get('name')?.value,
      paymentTermLines: paymentTermLines,
    };

    this.financeService.addPaymentTerm(formData);
  }
  

}
