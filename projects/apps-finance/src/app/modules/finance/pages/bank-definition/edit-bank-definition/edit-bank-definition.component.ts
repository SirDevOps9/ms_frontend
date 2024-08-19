import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { RouterService, FormsService, customValidators, PageInfo } from 'shared-lib';
import { CurrencyService } from '../../../../general/currency.service';
import { CurrencyDto } from '../../../../general/models';
import { ConfirmOpeningBalanceComponent } from '../../../components/bank/confirm-opening-balance/confirm-opening-balance.component';
import { NoChildrenAccountsComponent } from '../../../components/bank/no-children-accounts/no-children-accounts.component';
import { FinanceService } from '../../../finance.service';
import { Balance } from '../../../models';
import { UserPermission } from '../../../models/user-permission';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-bank-definition',
  templateUrl: './edit-bank-definition.component.html',
  styleUrl: './edit-bank-definition.component.scss'
})
export class EditBankDefinitionComponent implements OnInit {
  bankForm: FormArray;
  bankormGroup : FormGroup
  constructor(private fb: FormBuilder , private financeService : FinanceService , private currencyService : CurrencyService , private dialog : DialogService , private accountService : AccountService , private routerService : RouterService , private formsService  : FormsService , private route : ActivatedRoute) {}
  branchesLookup :   { id: number; name: string }[]
  accountsLookup: { id: number; name: string }[];
  currenciesList: CurrencyDto[];
  filteredAccounts: AccountDto[] = [];
  usersList : UserPermission[]
  openingBalanceDataList :    any = []
  OpeningBalanceData : Balance
  id: number = this.route.snapshot.params['id']
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
    this.getUserPermissionLookupData()
    this.getBankInfoById(this.id)
  }

  public get items(): FormArray {
    return this.bankForm as FormArray;
  }

  openDialog(index: number) {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((r) => {
      if (r) {

        this.bankForm.at(index)?.get('glAccountId')?.setValue(r.id);
        this.bankForm.at(index)?.get('accountName')?.setValue(r.name);
        this.bankForm.at(index)?.get('accountCode')?.setValue(r.accountCode);
      
      }
    });
  }
  getBankInfoById(id:number) {
    this.financeService.getBankDefinitionByID(id)
    this.financeService.sendBankByIDObservable.subscribe(res=>{
      console.log(res)
      this.items.clear()
      this.bankormGroup.patchValue({...res})
      if(res?.bankAccounts?.length) {
        res.bankAccounts.forEach((elem , i)=>{
          let bankGroup = this.fb.group({
            id : elem.id,
            accountNumber:  new FormControl(elem.accountNumber, Validators.required),
            glAccountId: elem.glAccountId,
            iban: elem.iban,
            currencyId: elem.currencyId,
            openingBalance: elem.openingBalance,
            currentBalance : null,
            accountName : elem.glAccountName,
            currencyName : null ,
            branchName : null,
            accountCode : elem.glAccountCode,
            userPermission: [elem.userPermission],
            userPermissionName : '',
            branches: [elem.branches]
              })
          this.items.push(bankGroup)  
          setTimeout(() => {
            this.accountSelected(elem.glAccountId , i)
            this.branchSelected(elem.branches , bankGroup , i)
            this.userPermissionSelect(elem.userPermission , bankGroup , i)
            this.currencyselected(elem.currencyId , bankGroup , i)
          }, 1000);
             
          })
      }
    
      
    })
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
    const bankLine = this.items.at(id);
    var accountData : any = this.filteredAccounts.find((c) => c.id == event);
    console.log(accountData)
    if(accountData!=null)
    {
      bankLine.get('glAccountId')?.setValue(accountData?.id);
      bankLine.get('accountCode')?.setValue(accountData?.accountCode);
      bankLine.get('accountName')?.setValue(accountData?.name);
    }
    this.GetAccountOpeningBalance(event ,id)
    console.log(this.items.value)
  }
  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id : 0 ,
      accountNumber:  new FormControl('', Validators.required),
      glAccountId: null,
      iban: new FormControl('', Validators.required),
      currencyId: null,
      openingBalance: new FormControl('', Validators.required),
      currentBalance : null,
      accountName :null ,
      currencyName : null ,
      branchName : new FormControl('') ,
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

  currencyselected(event : any , bankForm:FormGroup , i : number) {
    let data : any  = this.currenciesList.find(item=>item.id == event )

    bankForm.controls['currencyName'].setValue(data.name)
  }


  getUserPermissionLookupData() {
    this.financeService.getUserPermissionLookupData()
    this.financeService.getUsersPermissionDataObservable.subscribe(res=>{
      this.usersList = res
    })
  }

  userPermissionSelect(event : any , bankForm:FormGroup , i : number) {
    let data  = this.usersList.filter(item=>event.includes(item.id) )
    let userPermissionName = data.map(elem=>elem.name)
    bankForm.controls['userPermissionName'].setValue(userPermissionName)
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
    this.routerService.navigateTo('/masterdata/bank-definition')
  }

  onDelete(i : number) {
    this.items.removeAt(i)
  }

  onSave() {
    this.openingBalanceDataList = []
    let data : any = {...this.bankormGroup.value , bankAccounts :this.items.value}
    data.id = +this.id
 

    if (!this.formsService.validForm(this.bankormGroup, false)) return;
    if (!this.formsService.validForm(this.items, false)) return;
   let formData =   this.items.value
  formData.forEach((element : any) => {
    let accountBalance = element.currentBalance;
    let openingBalance = Number( element.openingBalance);
    if (accountBalance !== openingBalance) {
      this.openingBalanceDataList.push(element)

      const dialogRef = this.dialog.open(ConfirmOpeningBalanceComponent, {
        header : 'Confirm',
            width: '400px',
            height: '330px',
            data : this.openingBalanceDataList
          });
          dialogRef.onClose.subscribe((res) => {
            if (res) {
               this.financeService.editBankDefinition(data)
            }
          });
        }
      
    
 });

 if( !this.openingBalanceDataList.length) {
  this.financeService.editBankDefinition(data)

}
 
 
   



   
  }
}
