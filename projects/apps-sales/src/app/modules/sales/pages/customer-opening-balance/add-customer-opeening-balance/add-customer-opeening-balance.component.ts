import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { customValidators } from 'shared-lib';
import { CustomerOpeningBalanceNoChildrenComponent } from '../../../components/customer-opening-Balance/customer-opening-balance-no-children/customer-opening-balance-no-children.component';
import { CustomerOpeningBalanceDistributeComponent } from '../../../components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';

@Component({
  selector: 'app-add-customer-opeening-balance',
  templateUrl: './add-customer-opeening-balance.component.html',
  styleUrl: './add-customer-opeening-balance.component.scss'
})
export class AddCustomerOpeeningBalanceComponent implements OnInit {
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

  openDialog(index: number) {
    const ref = this.dialog.open(CustomerOpeningBalanceNoChildrenComponent, {
      width : '60%',
      height : '600px'
      
    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.customerForm.at(index)?.get('accountName')?.setValue(r.name);
        this.customerForm.at(index)?.get('glAccountId')?.setValue(r.accountCode);
      
      }
    });
  }

  openDistribute() {
    const ref = this.dialog.open(CustomerOpeningBalanceDistributeComponent, {
      header : 'Due Date Distribution',
      width : '60%',
      height : '650px'
      
    });
    ref.onClose.subscribe((r) => {});
  }


}
