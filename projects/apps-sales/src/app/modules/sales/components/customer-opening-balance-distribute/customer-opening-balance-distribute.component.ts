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
  providers: [DatePipe] // Add DatePipe to providers

})
export class CustomerOpeningBalanceDistributeComponent implements OnInit {
  formGroup: FormGroup
  formGroupBalance: FormGroup
  customerForm: FormArray
  balance: number
  totalBalance: number
  totalBalanceSum: number = 0
  error:boolean

  balanceType: any = [{ label: "Debit", value: "Debit" }, { label: "Credit", value: "Credit" }]

  constructor(
    private formsService: FormsService,
    private fb: FormBuilder,
    private dialog: DialogService,
    private ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private cdr: ChangeDetectorRef,
    private datePipe: DatePipe,// Inject DatePipe
    private toasterService: ToasterService,
    private langService: LanguageService,


    private translationService: TranslationService) { }
  ngAfterViewInit(): void {
    this.balance = this.config.data.balance;
    this.customerForm.clear();

    if (this.config.data.dueDates) {
      this.config.data.dueDates.forEach((e: any) => {
        console.log(this.config.data.dueDates, "this.config.data.dueDates");

        this.customerForm.push(this.fb.group({
          id: e.id,
          dueDate: e.dueDate,
          credit: e.credit,
          debit: e.debit
        }));
      });
      this.getTotalBalanceSum();
    } else {
      // this.addLine()
      this.items.push(this.createBankFormGroup())
    }

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
    if (!this.formsService.validForm(this.customerForm, false)) return;

    this.items.push(this.createBankFormGroup())
  }

  onDelete(index: number): void {

    this.customerForm.removeAt(index);
    this.getTotalBalanceSum()
  }


  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      dueDate: new FormControl(this.getTodaysDate(), customValidators.required),
      credit: new FormControl(0, [customValidators.required , customValidators.number ,customValidators.hasSpaces]),
      debit: new FormControl(0, [customValidators.required , customValidators.number ,customValidators.hasSpaces ]),

    });
  }

  getTodaysDate() {
    var date = new Date();
    return date.toISOString().substring(0, 10);
  }
  onCancel() {
    this.ref.close()
  }
  // onSubmit() {
  //   if (!this.formsService.validForm(this.customerForm, false)) return;
  //   const formattedItems = this.items.value.map((item: any) => {
  //     return {
  //       ...item,
  //       duedate: this.datePipe.transform(item.duedate, 'yyyy-MM-dd') // Format due date
  //     };
  //   });
  //   console.log(formattedItems,"4444");
  //   let valid:boolean=false
  //   formattedItems.forEach((element:any) => {
  //     if (
  //       (element.credit!=0 && element.debit!=0) ||
  //       (!element.credit && !element.debit) ||
  //       (element.credit == 0 && element.debit == 0)
  //     ) {
  //       console.log(element.credit ,"credit" ,element.debit ,"formattedItems.debit");

  //       this.toasterService.showError(
  //         this.langService.transalte('Journal.Error'),
  //         this.langService.transalte('Journal.InvalidAmount')
  //       );
  //       valid=false
  //       return;
  //     }else{
  //       valid=true

  //     }

  //   }
  // );
  // if(valid){
  //   this.ref.close(formattedItems)

  // }
  // }
  onSubmit() {
    if (!this.formsService.validForm(this.customerForm, false)) return;

    const formattedItems = this.items.value.map((item: any) => {
      return {
        ...item,
        dueDate: this.datePipe.transform(item.dueDate, 'yyyy-MM-dd') // Format due date
      };
    });

    let allValid = true;

    for (let i = 0; i < formattedItems.length; i++) {
      const element = formattedItems[i];
      const credit = element.credit;
      const debit = element.debit;
      console.log(element);

      if (((credit != 0 && debit != 0) || (credit == 0 && debit == 0))) {
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
    const totalSum = Math.round(totalCredit + totalDebit);
    if (totalSum == this.balance) {
      console.log(totalCredit, "0000");
      console.log(totalDebit, "111111");
      console.log(totalSum, "22222");
      this.error=false

      this.ref.close(formattedItems);

    } else {
      this.error=true
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
    // if(this.getTotalCredit()>=this.getTotalDebit()){
    //   this.totalBalanceSum = Math.round(this.getTotalCredit() - this.getTotalDebit())

    // }else{
    //   this.totalBalanceSum = Math.round( this.getTotalDebit() - this.getTotalCredit())

    // }
    this.totalBalanceSum = Math.round(Math.abs(this.getTotalDebit() - this.getTotalCredit()));

    // this.totalBalanceSum = Math.round(this.getTotalCredit() + this.getTotalDebit())
    if(this.totalBalanceSum > this.totalBalance){
      this.error=true

    }else{
      this.error=false

    }
  }

}
