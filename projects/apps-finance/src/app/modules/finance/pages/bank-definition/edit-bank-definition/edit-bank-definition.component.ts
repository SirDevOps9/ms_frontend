import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import {
  RouterService,
  FormsService,
  customValidators,
  PageInfo,
  LanguageService,
} from 'shared-lib';
import { CurrencyService } from '../../../../general/currency.service';
import { CurrencyDto } from '../../../../general/models';
import { ConfirmOpeningBalanceComponent } from '../../../components/bank/confirm-opening-balance/confirm-opening-balance.component';
import { NoChildrenAccountsComponent } from '../../../components/bank/no-children-accounts/no-children-accounts.component';
import { FinanceService } from '../../../finance.service';
import { Balance } from '../../../models';
import { UserPermission } from '../../../models/user-permission';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-bank-definition',
  templateUrl: './edit-bank-definition.component.html',
  styleUrl: './edit-bank-definition.component.scss',
})
export class EditBankDefinitionComponent implements OnInit {
  bankForm: FormArray;
  bankormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private financeService: FinanceService,
    private currencyService: CurrencyService,
    private dialog: DialogService,
    private accountService: AccountService,
    private routerService: RouterService,
    private formsService: FormsService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}
  branchesLookup: { id: number; name: string }[];
  accountsLookup: { id: number; name: string }[];
  currenciesList: CurrencyDto[];
  filteredAccounts: AccountDto[] = [];
  usersList: UserPermission[];
  openingBalanceDataList: any = [];
  OpeningBalanceData: Balance;
  id: number = this.route.snapshot.params['id'];
  disabled: boolean = false;

  ngOnInit(): void {
    this.bankForm = this.fb.array([this.createBankFormGroup()]);
    this.bankormGroup = new FormGroup({
      code: new FormControl(''),
      shortName: new FormControl('', customValidators.length(0, 5)),
      contactName: new FormControl('', customValidators.length(0, 50)),
      phone: new FormControl(''),
      name: new FormControl('', [customValidators.required, customValidators.length(0, 50)]),
      bankAddress: new FormControl('', customValidators.length(0, 100)),
      bankEmail: new FormControl('', customValidators.email),
      fax: new FormControl(''),
    });
    this.getAccounts();
    this.getBranchLookup();
    this.getCurrencies();
    this.getUserPermissionLookupData();
    this.getBankInfoById(this.id);
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
        this.bankForm.at(index)?.get('displayName')?.setValue(r.accountCode);
        this.bankForm.at(index)?.get('currencyId')!.setValue(r.currencyId);
        let data: any = this.currenciesList.find((item) => item.id == r.currencyId);
        this.bankForm.at(index)?.get('currencyName')?.setValue(data.name);
        this.GetAccountOpeningBalance(r.id, index);
      }     

    });
  }
  getBankInfoById(id: number) {
    this.financeService.getBankDefinitionByID(id);
    this.financeService.sendBankByIDObservable.subscribe((res) => {
      this.items.clear();
      this.bankormGroup.patchValue({ ...res });
      if (res?.bankAccounts?.length) {
        res.bankAccounts.forEach((elem, i) => {
          let bankGroup = this.fb.group({
            id: elem.id,
            accountNumber: new FormControl(elem.accountNumber, Validators.required),
            glAccountId: elem.glAccountId == 0 ? null : elem.glAccountId,
            iban: elem.iban,
            currencyId: elem.currencyId,
            openingBalance: elem.openingBalance,
            currentBalance: elem.currentBalance,
            accountName: elem.glAccountName,
            currencyName: null,
            branchName: null,
            accountCode: elem.glAccountCode,
            displayName:elem.glAccountCode,
            userPermission: [elem.userPermission],
            userPermissionName: '',
            branches: [elem.branches],
          });
          this.items.push(bankGroup);
          this.accountSelected(elem.glAccountId, i);
          this.branchSelected(elem.branches, bankGroup, i);
          this.userPermissionSelect(elem.userPermission, bankGroup, i);
          this.currencyselected(elem.currencyId, bankGroup, i);
        });
      }
    });
  }
  getAccounts() {
    this.accountService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
      this.filteredAccounts = r.result.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
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
    var accountData: any = this.filteredAccounts.find((c) => c.id == event);
    if (accountData) {
    
      bankLine.get('glAccountId')!.setValue(accountData.id);
     // bankLine.get('accountNumber')!.setValue(accountData.accountCode);
      bankLine.get('accountName')!.setValue(accountData.name);
      bankLine.get('currencyId')!.setValue(accountData.currencyId);
      bankLine.get('displayName')?.setValue(accountData.accountCode);
      let data: any = this.currenciesList.find((item) => item.id == accountData.currencyId);
      bankLine?.get('currencyName')?.setValue(data.name);
      this.GetAccountOpeningBalance(event, id);

    }
  }
  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      accountNumber: new FormControl('', customValidators.required),
      glAccountId: null,
      iban: new FormControl(null),
      currencyId: new FormControl('', customValidators.required),
      openingBalance: new FormControl('', [
        customValidators.required,
        customValidators.nonNegativeNumbers,
      ]),
      currentBalance: null,
      accountName: null,
      currencyName: null,
      branchName: new FormControl(''),
      displayName: null,
      userPermission: [],
      userPermissionName: '',
      branches: new FormControl('', customValidators.required),
    });
  }

  addLine() {
    if(!this.formsService.validForm(this.bankForm ,false)) return

    const newline = this.createBankFormGroup();
    newline.get('branches')?.setValue([this.branchesLookup[0].id.toString()]);
    newline.get('branchName')?.setValue([this.branchesLookup[0].name]);

    this.items.push(newline);
  }


  branchSelected(event: any, bankForm: FormGroup, i: number) {
    let data = this.branchesLookup?.filter((item) => event.includes(item.id));
    let branchName = data?.map((elem) => elem.name);
    bankForm.controls['branchName'].setValue(branchName);
  }

  currencyselected(event: any, bankForm: FormGroup, i: number) {
    let data: any = this.currenciesList.find((item) => item.id == event);

    bankForm.controls['currencyName'].setValue(data.name);
  }

  getUserPermissionLookupData() {
    this.financeService.getUserPermissionLookupData();
    this.financeService.getUsersPermissionDataObservable.subscribe((res) => {
      this.usersList = res;
    });
  }

  userPermissionSelect(event: any, bankForm: FormGroup, i: number) {
    let data = this.usersList.filter((item) => event.includes(item.id));
    let userPermissionName = data.map((elem) => elem.name);
    bankForm.controls['userPermissionName'].setValue(userPermissionName);
  }
  getBranchLookup() {
    this.financeService.getBranchLookup().subscribe((res) => {
      this.branchesLookup = res;
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
  GetAccountOpeningBalance(id: number, index: number) {
    const bankLine = this.items.at(index);

    this.financeService.GetAccountOpeningBalance(id).subscribe((res) => {
      if (res) {
        this.OpeningBalanceData = res;
        const currentBalance = bankLine.get('currentBalance');
        currentBalance?.setValue(res.balance);
      } else {
        const currentBalance = bankLine.get('currentBalance');
        currentBalance?.setValue('0');
      }
    });
  }

  validateBalance(id: number, currentBalance: any, openBalance: any) {
    if (id == 0) return false;
    if (!currentBalance) currentBalance = '';
    if (currentBalance !== openBalance) return true;

    return false;
  }
  discard() {
    this.routerService.navigateTo('/masterdata/bank-definition');
  }

  
  onDelete(id: number, index: number): void {
    if (id == 0) {
      this.items.removeAt(index);
    } else {
      this.financeService.deleteBankAccount(id);
      this.financeService.bankAccountDeletedObser.subscribe((res: boolean) => {
        if (res == true) {
          this.items.removeAt(index);
        }
      });
    }
  }
  onSave() {
    this.openingBalanceDataList = [];
    let data: any = { ...this.bankormGroup.value, bankAccounts: this.items.value };
    data.id = +this.id;

    if (!this.formsService.validForm(this.bankormGroup, false)) return;
    if (!this.formsService.validForm(this.items, false)) return;
    let formData = this.items.value;
    formData?.forEach((element: any) => {
      let accountBalance = element.currentBalance;
      let openingBalance = Number(element.openingBalance);
      if (accountBalance !== openingBalance) {
        this.openingBalanceDataList.push(element);

        const dialogRef = this.dialog.open(ConfirmOpeningBalanceComponent, {
          header: 'Confirm',
          width: '400px',
          height: '330px',
          data: this.openingBalanceDataList,
        });
        dialogRef?.onClose.subscribe((res) => {
          if (res) {
            this.financeService.editBankDefinition(data);
          }
        });
      }
    });

    if (!this.openingBalanceDataList.length) {
      this.financeService.editBankDefinition(data);
    }
  }
  
}
