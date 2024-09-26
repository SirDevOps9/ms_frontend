import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from '../../../finance.service';
import { CurrencyService } from 'projects/apps-accounting/src/app/modules/general/currency.service';
import { CurrencyDto } from '../../../../general/models';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { AccountService } from 'projects/apps-accounting/src/app/modules/account/account.service';
import {
  customValidators,
  FormsService,
  LanguageService,
  lookupDto,
  PageInfo,
  RouterService,
} from 'shared-lib';
import { Balance } from '../../../models';
import { NoChildrenAccountsComponent } from '../../../components/bank/no-children-accounts/no-children-accounts.component';
import { UserPermission } from '../../../models/user-permission';
import { ConfirmOpeningBalanceComponent } from '../../../components/bank/confirm-opening-balance/confirm-opening-balance.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-add-bank-definition',
  templateUrl: './add-bank-definition.component.html',
  styleUrl: './add-bank-definition.component.scss',
})
export class AddBankDefinitionComponent implements OnInit {
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
    private languageService: LanguageService
  ) {}
  branchesLookup: { id: number; name: string }[];
  accountsLookup: { id: number; name: string }[];
  currenciesList: CurrencyDto[];
  filteredAccounts: AccountDto[] = [];
  usersList: UserPermission[];
  openingBalanceDataList: any = [];
  OpeningBalanceData: Balance;
  //branchId: number;
  selectedBranch = new BehaviorSubject<lookupDto | undefined>(undefined);

  ngOnInit(): void {
    this.getBranchLookup();
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

    this.bankForm = this.fb.array([]);

    this.getAccounts();
    this.getCurrencies();
    this.getUserPermissionLookupData();
    this.accountService.childrenAccountList.subscribe((r) => {
      this.filteredAccounts = r.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
    this.addLine();
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
        this.bankForm.at(index)?.get('displayName')?.setValue(r.accountCode);
        this.bankForm.at(index)?.get('currencyId')?.setValue(r.currencyId);
        let data: any = this.currenciesList.find((item) => item.id == r.currencyId);
        this.bankForm.at(index)?.get('currencyName')?.setValue(data.name);

        this.GetAccountOpeningBalance(r.id, index);
      }
    });
  }

  getAccounts() {
    this.accountService.getAccountChildrenList('', new PageInfo());
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
    bankLine.get('accountCode')?.setValue(accountData?.accountCode);
    bankLine.get('accountName')?.setValue(accountData.name);
    bankLine.get('displayName')?.setValue(accountData.accountCode);
    bankLine.get('currencyId')?.setValue(accountData.currencyId);
    let data: any = this.currenciesList.find((item) => item.id == accountData.currencyId);
    bankLine.get('currencyName')?.setValue(data.name);
    this.GetAccountOpeningBalance(event, id);
  }
  createBankFormGroup(): FormGroup {
    const line = this.fb.group({
      accountNumber: new FormControl('', customValidators.required),
      glAccountId: null,
      iban: null,
      currencyId: new FormControl('', customValidators.required),
      openingBalance: new FormControl('', [
        customValidators.required,
        customValidators.nonNegativeNumbers,
      ]),
      currentBalance: null,
      accountName: null,
      currencyName: null,
      branchName: new FormControl('', customValidators.required),
      displayName: null,
      userPermission: [],
      userPermissionName: '',
      branches: [],
    });
    return line;
  }

  addLine() {
    if (!this.formsService.validForm(this.bankForm, false)) return;

    const newline = this.createBankFormGroup();

    this.selectedBranch.subscribe((res) => {
      if (res != undefined) {
        newline.get('branches')?.setValue([res.id]);
        newline.get('branchName')?.setValue([res.name]);
      }
    });
    this.items.push(newline);
  }
  deleteLine(index: number): void {
    if (index >= 0 && index < this.bankForm.length) {
      this.bankForm.removeAt(index);
    }
  }
  branchSelected(event: any, bankForm: FormGroup, i: number) {
    let data = this.branchesLookup.filter((item) => event.includes(item.id));
    let branchName = data.map((elem) => elem.name);
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
      this.selectedBranch.next(res[0]);
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

  discard() {
    this.routerService.navigateTo('/masterdata/bank-definition');
  }

  onDelete(i: number) {
    this.items.removeAt(i);
  }

  onSave() {
    this.openingBalanceDataList = [];
    let data: any = { ...this.bankormGroup.value, bankAccounts: this.items.value };

    if (!this.formsService.validForm(this.bankormGroup, false)) return;
    if (!this.formsService.validForm(this.items, false)) return;
    let formData = this.items.value;
    formData.forEach((element: any) => {
      let accountBalance = element.currentBalance;
      let openingBalance = Number(element.openingBalance);
      if (accountBalance !== openingBalance) {
        this.openingBalanceDataList.push(element);

        const dialogRef = this.dialog.open(ConfirmOpeningBalanceComponent, {
          header: this.languageService.transalte('confirm.confirm'),
          width: '400px',
          height: '330px',
          data: this.openingBalanceDataList,
        });
        dialogRef.onClose.subscribe((res) => {
          if (res) {
            this.financeService.addBankDefinition(data);
          }
        });
      }
    });

    if (!this.openingBalanceDataList.length) {
      this.financeService.addBankDefinition(data);
    }
  }
}
