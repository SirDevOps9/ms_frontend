import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../../../finance.service';
import { CurrencyService } from 'projects/apps-accounting/src/app/modules/general/currency.service';
import { CurrencyDto } from '../../../../general/models';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { customValidators, PageInfo, RouterService } from 'shared-lib';
import { Balance } from '../../../models';
import { NoChildrenAccountsComponent } from '../../../components/bank/no-children-accounts/no-children-accounts.component';

@Component({
  selector: 'app-add-bank-definition',
  templateUrl: './add-bank-definition.component.html',
  styleUrl: './add-bank-definition.component.scss'
})
export class AddBankDefinitionComponent implements OnInit {
  bankForm: FormArray;
  bankormGroup : FormGroup
  constructor(private fb: FormBuilder , private financeService : FinanceService , private currencyService : CurrencyService , private dialog : DialogService , private accountService : AccountService , private routerService : RouterService) {}
  branchesLookup :   { id: number; name: string }[]
  accountsLookup: { id: number; name: string }[];
  currenciesList: CurrencyDto[];
  filteredAccounts: AccountDto[] = [];
  usersList : any = []
  OpeningBalanceData : Balance
  ngOnInit(): void {
    this.bankForm = this.fb.array([this.createBankFormGroup()]);
    this.bankormGroup = new FormGroup({
      code: new FormControl(''),
      shortName: new FormControl('', customValidators.length(0,5)),
      contactName: new FormControl('' , customValidators.length(0,50)),
      phone: new FormControl(''),
      name: new FormControl('', [customValidators.required,customValidators.length(0,50) ]),
      bankAddress: new FormControl('' , customValidators.length(0,100)),
      bankEmail: new FormControl('', customValidators.email),
      fax: new FormControl(''),
    });
    this.getAccounts();
    this.getBranchLookup()
    this.getCurrencies()
  }

  public get items(): FormArray {
    return this.bankForm as FormArray;
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {});
    ref.onClose.subscribe((r) => {
      if (r) {
        // this.fa.at(index).get('account')?.setValue(r.id);
        console.log(r)
        this.bankForm.at(index)?.get('accountName')?.setValue(r.name);
        this.bankForm.at(index)?.get('glAccountId')?.setValue(r.accountCode);
        // var currencyData = this.currencies.find((c) => c.id == r.currencyId);
        // this.fa.at(index).get('currency')?.setValue(r.currencyId);
        // this.fa.at(index).get('currencyRate')?.setValue(currencyData?.ratePerUnit);
        // this.fa.at(index).get('currencyName')?.setValue(currencyData?.currencyName);
        // this.accountSelectedForDialog(r, index);
      }
    });
  }

  getAccounts() {
    this.accountService
      .getAccountsHasNoChildren('', new PageInfo())
      .subscribe((r) => {
        this.filteredAccounts = r.result.map(account => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`
        }));
      });
  }
  filterAccount(event: any) {
    let query = event.query;
    this.accountService
      .getAccountsHasNoChildren(query, new PageInfo())
      .subscribe((r) => (this.filteredAccounts = r.result));
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


 

    this.GetAccountOpeningBalance(event ,id)
  }
  createBankFormGroup(): FormGroup {
    return this.fb.group({
      
      accountNumber:  new FormControl('', Validators.required),
      glAccountId: null,
      iban: null,
      currencyId: null,
      openingBalance: null,
      currentBalance : null,
      accountName :null ,
      branchName : new FormControl('', Validators.required) ,
      displayName : null,
      userPermission: [
      ],
      userPermissionName : '',
      branches: [
      ]
        });
  }

  addLine() {
    this.items.push(this.createBankFormGroup())
  }

  deleteLine(index: number): void {
    if (index >= 0 && index < this.bankForm.length) {
      this.bankForm.removeAt(index);
    }
  }
  branchSelected(event : any , bankForm:FormGroup , i : number) {
    let data  = this.branchesLookup.filter(item=>event.includes(item.id) )
   let branchName = data.map(elem=>elem.name)
   bankForm.controls['branchName'].setValue(branchName)
  }

  userPermissionSelect(event : any , bankForm:FormGroup , i : number) {
    // let data  = this.usersList.filter(item=>event.includes(item.id) )
    // let userPermissionName = data.map(elem=>elem.name)
    // bankForm.controls['userPermissionName'].setValue(userPermissionName)
  }
  getBranchLookup() {
    this.financeService.getBranchLookup().subscribe((res) => {
      this.branchesLookup = res;
      console.log(res);
    });
  }

  getChildrenAccountsDropDownLookup() {
    this.financeService.getChildrenAccountsDropDownLookup().subscribe((res) => {
      this.accountsLookup = res;
    });
  }
  getCurrencies() {
    this.currencyService.getCurrencies('');
    this.currencyService.currencies.subscribe((res) => {
      this.currenciesList = res;
    });
  }
  GetAccountOpeningBalance(id: number , index : number) {
    const bankLine = this.items.at(index);

    this.financeService.GetAccountOpeningBalance(id).subscribe((res) => {
      if(res) {
        this.OpeningBalanceData = res;
        const currentBalance = bankLine.get('currentBalance');
        currentBalance?.setValue(res.balance)
        
      }
    
    });
  }

  discard() {
    this.routerService.navigateTo('/bank-definition')
  }

  onSave() {

  }
}