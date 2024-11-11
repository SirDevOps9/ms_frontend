import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { customValidators, FormsService, LanguageService, ToasterService } from 'shared-lib';
import { DatePipe } from '@angular/common'; // Import DatePipe

@Component({
  selector: 'app-customer-opening-balance-distribute',
  templateUrl: './customer-opening-balance-distribute.component.html',
  styleUrl: './customer-opening-balance-distribute.component.scss',
})
export class CustomerOpeningBalanceDistributeComponent implements OnInit {
  formGroup: FormGroup;
  formGroupBalance: FormGroup;
  customerForm: FormArray;
  balance: number;
  totalBalance: number;
  totalBalanceSum: number = 0;
  error: boolean;

  balanceType: any = [
    { label: 'Debit', value: 'Debit' },
    { label: 'Credit', value: 'Credit' },
  ];

  constructor(
    private formsService: FormsService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    private toasterService: ToasterService,
    private langService: LanguageService,

    private translationService: TranslationService
  ) {}

  ngAfterViewInit(): void {
    this.balance = this.config.data.balance;
    this.customerForm.clear();

    if (this.config.data.dueDates) {
      this.config.data.dueDates.forEach((e: any) => {
        const dueDate =
          e.debit > 0 ? new Date(e.dueDate).toISOString().split('T')[0] : null; // Handle null dates
        console.log(this.config.data.dueDates, 'this.config.data.dueDates');

        this.customerForm.push(
          this.fb.group({
            id: e.id,
            dueDate: dueDate,
            credit: e.credit,
            debit: e.debit,
          })
        );
      });
      this.getTotalBalanceSum();

  
    } else {
      // this.addLine()
      this.items.push(this.createBankFormGroup());
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

    this.customerForm = this.fb.array([this.createBankFormGroup()]);

    this.createBankFormGroup();
  }

  public get items(): FormArray {
    return this.customerForm as FormArray;
  }

  addLine() {
    if (!this.formsService.validForm(this.customerForm, false)) return;

    this.items.push(this.createBankFormGroup());
  }

  onDelete(index: number): void {
    this.customerForm.removeAt(index);
    this.getTotalBalanceSum();
  }

  createBankFormGroup(): FormGroup {
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

  onSubmit() {
    if (!this.formsService.validForm(this.customerForm, false)) return;

    const formattedItems = this.items.value.map((item: any) => {
      return {
        ...item,
      };
    });

    let allValid = true;

    for (let i = 0; i < formattedItems.length; i++) {
      const element = formattedItems[i];
      const credit = element.credit;
      const debit = element.debit;
      console.log(element);

      if ((credit != 0 && debit != 0) || (credit == 0 && debit == 0)) {
        this.toasterService.showError(
          this.langService.transalte('Error'),
          this.langService.transalte('InvalidAmount')
        );
        console.log(allValid, i);

        allValid = false;
        break; // Exit the loop early if an invalid item is found
      }
    }

    if (!allValid) return;
    const totalCredit = this.getTotalCredit();
    const totalDebit = this.getTotalDebit();
    const totalSum = Math.round(this.getTotalDebit() - this.getTotalCredit());
    if (totalSum == this.balance) {
      this.error = false;
      this.ref.close(formattedItems);
    } else {
      this.error = true;
      this.toasterService.showError(
        this.langService.transalte('Error'),
        this.langService.transalte('errorSum')
      );
    }
  }
  getTotalCredit(): number {
    return this.customerForm.controls.reduce((total, control) => {
      const credit = Number(control.get('credit')?.value) || 0; // Convert to number
      return total + credit;
    }, 0);
  }

  getTotalDebit(): number {
    return this.customerForm.controls.reduce((total, control) => {
      const debit = Number(control.get('debit')?.value) || 0; // Convert to number
      return total + debit;
    }, 0);
  }
  getTotalBalanceSum() {
    this.totalBalanceSum = Math.round(this.getTotalDebit() - this.getTotalCredit());
    if (this.totalBalanceSum != this.balance) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
}
