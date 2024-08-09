import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { customValidators, FormsService } from 'shared-lib';

@Component({
  selector: 'app-customer-opening-balance-distribute',
  templateUrl: './customer-opening-balance-distribute.component.html',
  styleUrl: './customer-opening-balance-distribute.component.scss'
})
export class CustomerOpeningBalanceDistributeComponent implements OnInit {
  formGroup: FormGroup
  formGroupBalance: FormGroup
  customerForm: FormArray
  balance:string

  balanceType: any = [{ label: "Debit", value: "Debit" }, { label: "Credit", value: "Credit" }]

  constructor(
    private formsService: FormsService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private ref : DynamicDialogRef ,
    public config : DynamicDialogConfig ,
    private cdr : ChangeDetectorRef,
    private translationService: TranslationService) { }
    ngAfterViewInit(): void {
      // console.log(this.config.data ,"this.config.data")
      // this.balance=this.config.data.balance
      // this.formGroup.patchValue(this.config.data.dueDates)
      console.log(this.config.data, "this.config.data");
      this.balance = this.config.data.balance;
      this.customerForm.clear();

      this.config.data.dueDates.forEach((dueDate: any) => {
        this.customerForm.push(this.fb.group({
          id: dueDate.id,
          duedate: dueDate.dueDate,
          credit: dueDate.credit,
          debit: dueDate.debit
        }));
      });
    
      // Trigger change detection manually
      this.cdr.detectChanges();
    }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      balance: ''
    })
    this.formGroupBalance = this.fb.group({
      balance: ''
    })

    this.customerForm = this.fb.array([this.createBankFormGroup()]);

    this.createBankFormGroup()
  }

  public get items(): FormArray {
    return this.customerForm as FormArray;
  }

  addLine() {
    this.items.push(this.createBankFormGroup())
  }

  onDelete(index: number): void {
    this.customerForm.removeAt(index);

  }

  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id:0,
      duedate: new FormControl('', customValidators.required),
      credit: new FormControl('', customValidators.required),
      debit: new FormControl('', customValidators.required),

    });
  }


  onCancel() {

  }
  onSubmit() {
    if (!this.formsService.validForm(this.formGroup, false)) return;
    this.ref.close(this.items.value)
    console.log(this.items.value ,"66666666");
    
  }


}
