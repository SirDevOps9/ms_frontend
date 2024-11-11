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
import { ActivatedRoute } from '@angular/router';
import {
  GetPaymentTermById,
  GetPaymentTermLineById,
} from '../../../models/get-payment-term-by-id-dto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-payment-term',
  templateUrl: './edit-payment-term.component.html',
  styleUrls: ['./edit-payment-term.component.scss'],
})
export class EditPaymentTermComponent implements OnInit {
  paymentTermForm: FormArray;
  paymentTermGroup: FormGroup;
  afterPeriodLookup: { id: number; name: string }[];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  id: number = this.route.snapshot.params['id'];

  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private routerService: RouterService,
    private formsService: FormsService,
    private lookupsService: LookupsService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private languageService: LanguageService
  ) {

  }

  ngOnInit() {
    this.paymentTermForm = this.fb.array([this.createPaymentTermFormGroup()]);
    this.paymentTermGroup = new FormGroup({
      id: new FormControl(''),
      code: new FormControl(''),
      name: new FormControl('', [customValidators.required, customValidators.length(0, 50)]),
    });

    this.getPeriodTypeLookup();
    this.getPaymentTermInfoById(this.id);
  }

  getPaymentTermInfoById(id: number) {
    this.financeService.getPaymentTermByID(id);
    this.financeService.sendPaymentTermByIDObservable.subscribe((res) => {
      this.items.clear();
      console.log('res', res);

      // Patch values to the paymentTermGroup
      this.paymentTermGroup.patchValue({
        id: res.id,
        code: res.code,
        name: res.name,
      });

      if (res?.paymentTermLines?.length) {
        res.paymentTermLines.forEach((elem, i) => {
          // Create a new FormGroup for each bank account
          let paymentTerm = this.fb.group({
            id: [elem.id],
            dueTermValue: [elem.dueTermValue, Validators.required],
            note: [elem.note],
            afterValue: [elem.afterValue, Validators.required],
            afterPeriod: [elem.afterPeriod, Validators.required],
          });
          // Add the FormGroup to the FormArray
          this.items.push(paymentTerm);
        });
      }
    });
  }

  createPaymentTermFormGroup(): FormGroup {
    return this.fb.group({
      id: new FormControl(0),
      dueTermValue: new FormControl('', customValidators.required),
      note: new FormControl(''),
      afterValue: new FormControl('', customValidators.required),
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
    const paymentTermLines: GetPaymentTermLineById[] = this.items.value;
    const formData = {
      id: this.paymentTermGroup.get('id')?.value,
      name: this.paymentTermGroup.get('name')?.value,
      paymentTermLines: paymentTermLines,
    };

    console.log('formData', formData);
    this.financeService.editPaymentTerm(formData);
  }

   // if thw form array is not valid
   isFormArrayInvalid(): boolean {
    return this.paymentTermForm.controls.some(control => control.invalid);
  }
}
