import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { FormsService, LoaderService, customValidators } from 'shared-lib';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddDomainSpaceDto, PurchasingPaymentPeriod } from '../../models';
import { SubscriptionService } from '../../subscription.service';
import { catchError, map, of } from 'rxjs';

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
  subdomainValid: boolean = false;
  subdomainInValid: boolean = false;

  // need to get subdomain unit price
  unitPrice: number = 50;

  ngOnInit() {
    this.initializesubDomainForm();
    this.activeButton('Yearly');
    this.subdomainForm.controls['purchasingPaymentCount'].setValue(1);
    this.calculateCost();
    this.subdomainForm.controls['purchasingPaymentCount'].valueChanges.subscribe(() => {
      this.calculateCost();
    });
  }
  initializesubDomainForm() {
    this.subdomainForm = this.fb.group({
      purchasingPaymentCount: new FormControl('', customValidators.required),
      name: new FormControl('', [customValidators.required, customValidators.noSpecialChars]),
      purchasingPaymentPeriod: new FormControl([customValidators.required]),
    });
  }
  onSubmit() {
    if (!this.formService.validForm(this.subdomainForm, true)) return;
    const domainModel: AddDomainSpaceDto = {
      ...this.subdomainForm.value,
      purchasingPaymentPeriod: this.purchasingPaymentPeriod,
    };

    this.subscriptionService.addSubdomain(domainModel, this.ref);
  }
  onCancel() {
    this.ref.close();
  }

  activeButton(id: string) {
    this.purchasingPaymentPeriod =
      id === 'Monthly' ? PurchasingPaymentPeriod.Monthly : PurchasingPaymentPeriod.Yearly;
    this.period = id;
    this.setRangeValidator(id);
  }

  setRangeValidator(selectedOption: string) {
    const purchasingPaymentCountControl = this.subdomainForm.get('purchasingPaymentCount');

    if (selectedOption === 'Monthly') {
      purchasingPaymentCountControl?.setValidators([
        customValidators.required,
        customValidators.number,
        customValidators.range(1, 12),
      ]);
    } else {
      purchasingPaymentCountControl?.setValidators([
        customValidators.required,
        customValidators.number,
        customValidators.nonZero,
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

  onNameInputKeyUp(event: any) {
    const subdomainName = event.target.value;
    if (subdomainName.length > 3) {
      this.subscriptionService.checkSubdomian(subdomainName).subscribe((exists: boolean) => {
        if (exists) {
          this.subdomainInValid = true;
          this.subdomainValid = false;
        } else {
          this.subdomainInValid = false;
          this.subdomainValid = true;
        }
      });
    } else {
      this.subdomainInValid = false;
      this.subdomainValid = false;
    }
  }
  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    private formService: FormsService,
    private ref: DynamicDialogRef,
    private subscriptionService: SubscriptionService,
    private LoaderService: LoaderService
  ) {}
}
