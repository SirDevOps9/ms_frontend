import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { MenuModule, FormsService, customValidators, PageInfo } from 'shared-lib';
import { CurrencyService } from '../../../general/currency.service';
import { CurrencyDto } from '../../../general/models/currencyDto';

import { FinanceService } from '../../finance.service';
import { AccountDto, AddTreasuryDto } from '../../models';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NoChildrenAccountsComponent } from '../bank/no-children-accounts/no-children-accounts.component';

@Component({
  selector: 'app-add-treasury',
  templateUrl: './add-treasury.component.html',
  styleUrl: './add-treasury.component.scss',
})
export class AddTreasuryComponent implements OnInit {
  treasuryForm: FormGroup;
  modulelist: MenuModule[];
  selectedModules: number[] = [];
  OpeningBalanceData: any = {};
  currenciesList: CurrencyDto[];
  branchesLookup: { id: number; name: string }[];
  accountsLookup: { id: number; name: string }[];
  filteredAccounts: AccountDto[] = [];

  constructor(
    public config: DynamicDialogConfig,
    public dialogService: DialogService,
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private ref: DynamicDialogRef,
    private formsService: FormsService,
    private currencyService: CurrencyService,
    private financeService: FinanceService,
    private dialog: DialogService
  ) {}

  ngOnInit() {
    this.moudlelist();
    this.initializeTreasuryForm();
    this.getCurrencies();
    this.getBranchLookup();
    this.getAccounts();
    // this.treasuryForm.get('accountId')!.valueChanges.subscribe(value => {

    //   this.GetAccountOpeningBalance(value);
    // });
  }

  moudlelist() {
    this.modulelist = this.layoutService.getModules();
  }

  getCurrencies() {
    this.currencyService.getCurrencies('');
    this.currencyService.currencies.subscribe((res) => {
      this.currenciesList = res;
    });
  }
  getBranchLookup() {
    this.financeService.getBranchLookup().subscribe((res) => {
      this.branchesLookup = res;
    });
  }

  // getChildrenAccountsDropDownLookup() {
  //   this.financeService.getChildrenAccountsDropDownLookup().subscribe((res) => {
  //     this.accountsLookup = res;
  //   });
  // }

  onFilter(event: any) {
    this.financeService.getAccountsHasNoChildrenNew(event, new PageInfo());

    this.financeService.childrenAccountList.subscribe((res: any) => {
      if (res.length) {
        this.filteredAccounts = res.map((account: any) => ({
          ...account,
          displayName: `${account.name} (${account.accountCode})`,

        }));

      }
    });
  }

  getAccounts() {
    this.financeService.getAccountsHasNoChildren('', new PageInfo()).subscribe((r) => {
      this.filteredAccounts = r.result.map((account) => ({
        ...account,
        displayName: `${account.name} (${account.accountCode})`,
      }));
    });
  }

  GetAccountOpeningBalance(id: number) {
    this.financeService.GetAccountOpeningBalance(id).subscribe({
      next: (res) => {
        if (res) {
          this.OpeningBalanceData = res;
          this.treasuryForm.get('openingBalance')?.setValue(res.balance);
          this.treasuryForm.get('accountBalance')?.setValue(res.balance);
        } else {
          this.treasuryForm.get('openingBalance')?.setValue('');
          this.treasuryForm.get('accountBalance')?.setValue('');
        }
      },
    });
  }

  accountChange(e: any) {
    this.GetAccountOpeningBalance(e);
  }

  initializeTreasuryForm() {
    this.treasuryForm = this.fb.group({
      code: '',
      name: [null, customValidators.required],
      currencyId: [null, customValidators.required],
      branches: [null, customValidators.required],
      accountId: [null],
      openingBalance: new FormControl('', [
        customValidators.required,
        customValidators.nonNegativeNumbers,
      ]),
      journalEntryLineId: [null],
      accountBalance: [null],
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.treasuryForm, false)) return;
    let accountBalance = this.treasuryForm.value.accountBalance;
    let openingBalance = +this.treasuryForm.value.openingBalance;
    if (accountBalance !== openingBalance) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '400px',
        height: '250px',
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) {
          delete this.treasuryForm.value.code;
          const treasureDto: AddTreasuryDto = this.treasuryForm.value;
          treasureDto.openingBalance = +treasureDto.openingBalance;
          this.financeService.addTreasureDefinitions(treasureDto, this.ref);
        }
      });
    } else {
      delete this.treasuryForm.value.code;
      const treasureDto: AddTreasuryDto = this.treasuryForm.value;
      treasureDto.openingBalance = +treasureDto.openingBalance;
      this.financeService.addTreasureDefinitions(treasureDto, this.ref);
    }
  }

  openDialog() {
    const ref = this.dialog.open(NoChildrenAccountsComponent, {
      width: '900px',
      height: '600px',
    });
    ref.onClose.subscribe((r) => {
      if (r) {
        this.GetAccountOpeningBalance(r.id);
        this.treasuryForm.get('accountId')?.setValue(r.id);
      }
    });
  }
}
