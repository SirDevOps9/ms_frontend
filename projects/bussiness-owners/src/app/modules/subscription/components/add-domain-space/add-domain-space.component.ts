import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormsService, customValidators } from 'shared-lib';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PlanService } from '../../subscription.service';
import { DomainSpaceDto, PurchasingPaymentPeriod } from '../../models';

@Component({
  selector: 'app-add-domain-space',
  templateUrl: './add-domain-space.component.html',
  styleUrls: ['./add-domain-space.component.scss'],
})
export class AddDomainSpaceComponent implements OnInit {
  subdomainForm: FormGroup;
  purchasingPaymentPeriod: PurchasingPaymentPeriod;
  count: number;
  period: string = 'Monthly';
  cost: number = 0;

  // need to get subdomain unit price
  unitPrice: number = 50;

  ngOnInit() {
    this.initializesubDomainForm();
    this.activeButton('Monthly');
    this.subdomainForm.controls[
      'purchasingPaymentCount'
    ].valueChanges.subscribe(() => {
      this.calculateCost();
    });
  }
  initializesubDomainForm() {
    this.subdomainForm = this.fb.group({
      purchasingPaymentCount: new FormControl(0),
      name: new FormControl('', [customValidators.required,customValidators.noSpecialChars]),
      purchasingPaymentPeriod: new FormControl([customValidators.required]),
    });
  }
  onSubmit() {
    if (!this.formService.validForm(this.subdomainForm, true)) return;
    const domainModel: DomainSpaceDto = {
      ...this.subdomainForm.value,
      purchasingPaymentPeriod: this.purchasingPaymentPeriod,
    };

    this.planService.addSubdomain(domainModel, this.ref);
  }
  onCancel() {
    this.ref.close();
  }

  activeButton(id: string) {
    this.purchasingPaymentPeriod =
      id === 'Monthly'
        ? PurchasingPaymentPeriod.Monthly
        : PurchasingPaymentPeriod.Yearly;
    this.period = id;
    this.setRangeValidator(id);
  }

  setRangeValidator(selectedOption: string) {
    const purchasingPaymentCountControl = this.subdomainForm.get(
      'purchasingPaymentCount'
    );

    if (selectedOption === 'Monthly') {
      purchasingPaymentCountControl?.setValidators([
        customValidators.required,
        customValidators.number,
        customValidators.range(0, 12),
      ]);
    } else {
      purchasingPaymentCountControl?.setValidators([
        customValidators.required,
        customValidators.number,
      ]);
    }

    purchasingPaymentCountControl?.updateValueAndValidity();
  }

  calculateCost() {
    const count = this.subdomainForm.controls['purchasingPaymentCount'].value;
    const isMonthly = this.period === 'Monthly';

    let totalDuration: number;

    if (isMonthly) {
      totalDuration = count;
    } else {
      totalDuration = count * 12;
    }

    this.cost = this.unitPrice * totalDuration;
  }

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private ref: DynamicDialogRef,
    private planService: PlanService
  ) {}
}
