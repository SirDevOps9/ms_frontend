import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-vendor-opening-balance-distribute-view',
  templateUrl: './vendor-opening-balance-distribute-view.component.html',
  styleUrls: ['./vendor-opening-balance-distribute-view.component.css']
})
export class VendorOpeningBalanceDistributeViewComponent implements OnInit {

  formGroup: FormGroup;
  formGroupBalance: FormGroup;
  vendorForm: FormArray;
  balance: number;
  totalBalance: number;
  totalBalanceSum: number = 0;
  error: boolean;

  balanceType: any = [
    { label: 'Debit', value: 'Debit' },
    { label: 'Credit', value: 'Credit' },
  ];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.balance = this.config.data.balance;
    this.vendorForm.clear();
    if (this.config.data.balanceDueDates) {
      this.config.data.balanceDueDates.forEach((e: any) => {
        this.vendorForm.push(
          this.fb.group({
            dueDate: e.dueDate,
            credit: e.credit,
            debit: e.debit,
          })
        );
      });
      this.getTotalBalanceSum();
    } else {
      this.items.push(this.distributionFromGroup());
    }

    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      balance: '',
    });
    this.formGroupBalance = this.fb.group({
      balance: '',
    });

    this.vendorForm = this.fb.array([this.distributionFromGroup()]);

    this.distributionFromGroup();
  }

  public get items(): FormArray {
    return this.vendorForm as FormArray;
  }

  distributionFromGroup(): FormGroup {
    const group = this.fb.group({
      id: 0,
      dueDate: new FormControl(this.getTodaysDate()),
      credit: new FormControl(0, [
        customValidators.required,
        customValidators.number,
        customValidators.hasSpaces,
      ]),
      debit: new FormControl(0, [
        customValidators.required,
        customValidators.number,
        customValidators.hasSpaces,
      ]),
    });
    group.get('credit')?.valueChanges.subscribe((value) => {
      if (value != 0) {
        group.get('dueDate')?.setValue(null); // Set dueDate to null
      }
    });

    return group;
  }

  getTodaysDate() {
    var date = new Date();
    return date.toISOString().split('T')[0]
  }
  onCancel() {
    this.ref.close();
  }
  formatDate(date: string, format: string): string {
    const pipe = new DatePipe('en-US');
    return pipe.transform(date, format) || '';
  }

  getTotalCredit(): number {
    return this.vendorForm.controls.reduce((total, control) => {
      const credit = Number(control.get('credit')?.value) || 0; // Convert to number
      return total + credit;
    }, 0);
  }

  getTotalDebit(): number {
    return this.vendorForm.controls.reduce((total, control) => {
      const debit = Number(control.get('debit')?.value) || 0; // Convert to number
      return total + debit;
    }, 0);
  }
  getTotalBalanceSum() {
    this.totalBalanceSum = Math.round(this.getTotalCredit()-this.getTotalDebit());
    if (this.totalBalanceSum != this.balance) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
  resetDate(e: any) {}

}
