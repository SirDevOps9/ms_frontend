import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-customer-opening-balance-distribute',
  templateUrl: './customer-opening-balance-distribute.component.html',
  styleUrl: './customer-opening-balance-distribute.component.scss'
})
export class CustomerOpeningBalanceDistributeComponent implements OnInit {
  formGroup : FormGroup
  formGroupBalance : FormGroup
  customerForm : FormArray

  balanceType : any = [{label : "Debit" , value : "Debit"} , {label : "Credit" , value : "Credit"}]

  constructor(private fb : FormBuilder , private dialog : DialogService , private translationService : TranslationService ){}
  ngOnInit(): void {
   this.formGroup = this.fb.group({
    balance : ''
   })
   this.formGroupBalance = this.fb.group({
    balance : ''
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
      
      accountNumber:  new FormControl('', customValidators.required),
      glAccountId: null,
      iban: null,
      currencyId: null,
      openingBalance: null,
      currentBalance : null,
      accountName :null ,
      currencyName : null ,
      balance : null,
      balanceType : new FormControl('', customValidators.required),
      branchName : new FormControl('', customValidators.required) ,
      displayName : null,
      userPermission: [],
      userPermissionName : '',
      branches: new FormControl('', customValidators.required) 
        });
  }

  
  accountSelected(event: any, id: number) {

    console.log(event)
  
    const bankLine = this.items.at(id);


    // var accountData : any = this.filteredAccounts.find((c) => c.id == event);

    // console.log('Selectec', accountData);

    // const accountName = bankLine.get('accountName');
    // accountName?.setValue(accountData?.name);

    // bankLine.get('accountCode')?.setValue(accountData?.accountCode);
    // bankLine.get('displayName')?.setValue(`${accountData.name} (${accountData.accountCode})`);


 

    // this.GetAccountOpeningBalance(event ,id)
  }


  onCancel() {
    
  }
  onSubmit() {

  }


}
