import { Component } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { customValidators } from 'shared-lib';

@Component({
  selector: 'app-vendor-opening-balance',
  templateUrl: './vendor-opening-balance.component.html',
  styleUrl: './vendor-opening-balance.component.scss'
})
export class VendorOpeningBalanceComponent {
  formGroup : FormGroup
  customerForm : FormArray
  filteredAccounts: AccountDto[] = [];
  balanceType : any = [{label : "Debit" , value : "Debit"} , {label : "Credit" , value : "Credit"}]

  constructor(private fb : FormBuilder , private dialog : DialogService , private translationService : TranslationService ){}
  ngOnInit(): void {
   this.formGroup = this.fb.group({
    open :  new FormControl('', customValidators.required),
    open2 : new FormControl('', customValidators.required),
    name1 : '',
    name2 : '',
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


    var accountData : any = this.filteredAccounts.find((c) => c.id == event);

    console.log('Selectec', accountData);

    const accountName = bankLine.get('accountName');
    accountName?.setValue(accountData?.name);

    bankLine.get('accountCode')?.setValue(accountData?.accountCode);
    bankLine.get('displayName')?.setValue(`${accountData.name} (${accountData.accountCode})`);


 

    // this.GetAccountOpeningBalance(event ,id)
  }

  // openDialog(index: number) {
  //   const ref = this.dialog.open(CustomerOpeningBalanceNoChildrenComponent, {
  //     width : '60%',
  //     height : '600px'
      
  //   });
  //   ref.onClose.subscribe((r) => {
  //     if (r) {
  //       this.customerForm.at(index)?.get('accountName')?.setValue(r.name);
  //       this.customerForm.at(index)?.get('glAccountId')?.setValue(r.accountCode);
      
  //     }
  //   });
  // }

  openDistribute() {
    // const ref = this.dialog.open(CustomerOpeningBalanceDistributeComponent, {
    //   header : 'Due Date Distribution',
    //   width : '60%',
    //   height : '650px'
      
    // });
    // ref.onClose.subscribe((r) => {});
  }


}
