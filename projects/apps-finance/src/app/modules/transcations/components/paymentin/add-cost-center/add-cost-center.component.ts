import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { SelectComponent } from 'libs/shared-lib/src/lib/form-components';
import { GeneralService } from 'libs/shared-lib/src/lib/services/general.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { costLookup } from 'projects/apps-accounting/src/app/modules/journal-entry/models';
import { FormsService, ToasterService, LanguageService, customValidators } from 'shared-lib';

@Component({
  selector: 'app-add-cost-center',
  templateUrl: './add-cost-center.component.html',
  styleUrl: './add-cost-center.component.scss'
})
export class AddCostCenterComponent {
  @ViewChild('select') select: SelectComponent;
  accountLookup: any = [];
  calcPercentage: number;
  calcAmount: number;
  lookupValues: any = [];
  allocationform: FormArray = this.fb.array([]);
  amountForm: FormGroup;
  disabled: boolean = false;
  constructor(
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private accountService: AccountService,
    private formsService: FormsService,
    private ref: DynamicDialogRef,
    private cdr: ChangeDetectorRef,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    public generalService: GeneralService
  ) {}
  ngAfterViewInit(): void {
    setTimeout(() => {    
    if (this.config.data?.paymentInDetailCostCenters?.length) {
      console.log(this.config.data?.paymentInDetailCostCenters,"this.config.data?.paymentInDetailCostCentersthis.config.data?.paymentInDetailCostCenters");
      
      this.allocationform.clear();
      this.config.data.paymentInDetailCostCenters.forEach((element: any) => {
        this.lookupValues.push(Number(element.costCenterId));
        this.cdr.detectChanges();
        this.allocationform.push(
          this.fb.group({
            ...element,
          })
        );
      });
    }
  }, 0);

  }

  close() {
    this.ref.close();
  }
  ngOnInit(): void {
    this.amountForm = this.fb.group({
      amount: 0,
    });
    console.log(this.config.data?.costCenters,"costCenters")

    const creditAmount = parseFloat(this.config.data.creditAmount || 0);
    const amount = parseFloat(this.config.data.amount || 0);
    
    if (this.config.data.viewdata) {
      console.log(this.config.data.viewdata ,"this.config.data.viewdata");
      
      this.disabled=this.config.data.viewdata;
    }
  
    if (creditAmount === 0) {
      this.amountForm.get('amount')?.setValue(amount);
    }
    if (amount === 0) {
      this.amountForm.get('amount')?.setValue(creditAmount);
    }
    
    if (this.config.data?.costCenters?.length) {
      this.allocationform.clear();
      this.config.data.costCenters.forEach((element: any) => {
        this.lookupValues.push(Number(element.costCenterId));
        this.allocationform.push(
          this.fb.group({
            ...element, // Patch existing data
          })
        );
      });
    } else {
      this.addItem();
    }
      this.allocationform.valueChanges.subscribe((res) => {
      this.initValueChangeHandlers();
  
      this.calcPercentage = res.reduce((accumulator: any, currentValue: any) => {
        return accumulator + Number(currentValue.percentage);
      }, 0);
      this.calcAmount = res.reduce((accumulator: any, currentValue: any) => {
        return accumulator + Number(currentValue.amount);
      }, 0);
    });
  
    // Load cost center lookup data
    this.accountService.getCostCenterLookup().subscribe((res: costLookup[]) => {
      this.accountLookup = res.map((costCenter) => ({
        ...costCenter,
        displayName: `${costCenter.name} (${costCenter.code})`,
      }));
    });
  }
  
  
  

  onRemove(i: number) {
    this.allocationform.removeAt(i);
  }

  initValueChangeHandlers() {
    this.allocationform.controls.forEach((control) => {
      const formGroup = control as FormGroup;
      this.subscribeToAmountChanges(formGroup);
      this.subscribeToPercentageChanges(formGroup);
    });
  }

  subscribeToAmountChanges(formGroup: FormGroup) {
    formGroup.get('amount')?.valueChanges.subscribe((amount) => {
      const percentageControl = formGroup.get('percentage');
      if (percentageControl && amount !== null && amount !== undefined && !isNaN(amount)) {
        const percentage = (amount / this.amountForm.get('amount')?.value) * 100;
        if (percentageControl.value !== percentage) {
          percentageControl.setValue(percentage, { emitEvent: false });
        }
      }
    });
  }

  subscribeToPercentageChanges(formGroup: FormGroup) {
    formGroup.get('percentage')?.valueChanges.subscribe((percentage) => {
      const amountControl = formGroup.get('amount');
      if (amountControl && percentage !== null && percentage !== undefined && !isNaN(percentage)) {
        const amount = (percentage * this.amountForm.get('amount')?.value) / 100;
        if (amountControl.value !== amount) {
          amountControl.setValue(amount, { emitEvent: false });
        }
      }
    });
  }


  createItem(): FormGroup {
    return this.fb.group({
      costCenterId: new FormControl('', customValidators.required),
      name: [''],
      amount: new FormControl('', customValidators.required),
      percentage: new FormControl('', customValidators.required),
    });
  }

  addItem() {
    this.allocationform.push(this.createItem());
  }

  validateInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    // Regular expression to match numbers and one decimal point
    const regex = /^\d*\.?\d*$/;

    // If the value does not match the regex, remove the invalid characters
    if (!regex.test(value)) {
      event.preventDefault();

      input.value = value.slice(0, -1);
    }
  }
  checkForDuplicateCostCenters(): boolean {
    const costCenterIds = this.allocationform.value.map((item: any) => item.costCenterId);
    const duplicateIds = costCenterIds.filter(
      (id: string, index: number) => costCenterIds.indexOf(id) !== index
    );
    return duplicateIds.length > 0;
  }
  onSave() {
    if (!this.formsService.validForm(this.allocationform, false)) return;
    if (this.checkForDuplicateCostCenters()) {
      this.toasterService.showError(
        this.languageService.transalte('Journal.Error'),
        this.languageService.transalte('Journal.cannotDuplicate')
      );

      return;
    }


    this.ref.close(this.allocationform.value);
  }
  clickSave(e: any) {
    this.onSave();
  }
  
}

