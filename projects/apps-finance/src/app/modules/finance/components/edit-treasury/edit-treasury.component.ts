import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, FormsService, MenuModule } from 'shared-lib';
import { CurrencyService } from '../../../general/currency.service';
import { FinanceService } from '../../finance.service';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { EditTreasuryDto, GetTreasuryDtoById } from '../../models';
import { ConfirmComponent } from '../confirm/confirm.component';
import { NoChildrenAccountsComponent } from '../bank/no-children-accounts/no-children-accounts.component';

@Component({
  selector: 'app-edit-treasury',
  templateUrl: './edit-treasury.component.html',
  styleUrl: './edit-treasury.component.scss',
})
export class EditTreasuryComponent implements OnInit {
  treasuryForm: FormGroup;
  modulelist: MenuModule[];
  selectedModules: number[] = [];
  OpeningBalanceData: any = {};
  currenciesList: CurrencyDto[];
  branchesLookup: { id: number; name: string }[];
  accountsLookup: { id: number; name: string }[];
  treasuryData: GetTreasuryDtoById;
  disabled: boolean = false;
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
    this.initializeTreasuryForm();
    this.getCurrencies();
    this.getBranchLookup();
    this.getChildrenAccountsDropDownLookup();
    this.getTreasuryById();
  }

  getTreasuryById() {
    this.financeService.getTreasureDefinitionsByIdData(this.config.data.id).subscribe((res) => {
      this.treasuryData = res;
      if (res) {
        res.branches = res?.branches?.map((elem) => {
          return elem.branchId;
        });
        this.treasuryForm.patchValue({ ...res });
        if (res.accountId != null) {
          this.accountChange(res?.accountId);
          this.GetTreasuryCurrentBalance(res.id);
        }
      }
    });
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

  getChildrenAccountsDropDownLookup() {
    this.financeService.getChildrenAccountsDropDownLookup().subscribe((res) => {
      this.accountsLookup = res;
    });
  }
  GetAccountOpeningBalance(id: number) {
    this.financeService.GetAccountOpeningBalance(id).subscribe({
      next: (res) => {
        if (res) {
          this.OpeningBalanceData = res;
          this.treasuryForm.get('accountOpeningBalance')?.setValue(res.balance);
        } else {
          this.treasuryForm.get('accountOpeningBalance')?.setValue('');
        }
      },
    });
  }

  GetTreasuryCurrentBalance(id: number) {
    this.financeService.GetTreasuryBalance(id);
    this.financeService.TreasuryBalanceObservable.subscribe((res) => {
      this.treasuryForm.get('treasuryCurrentBalance')?.setValue(res);
      if (this.treasuryForm.get('openingBalance')?.value != res) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
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
      accountOpeningBalance: [0],
      journalEntryLineId: [null],
      openingBalance: new FormControl('', [
        customValidators.required,
        customValidators.nonNegativeNumbers,
      ]),
      treasuryCurrentBalance: '',
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.treasuryForm, true)) return;
    let accountBalance = this.treasuryForm.value.openingBalance;
    let openingBalance = +this.treasuryForm.value.openingBalance;
    this.treasuryForm.value.id = this.treasuryData.id;
    if (accountBalance !== openingBalance) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '500px',
        height: '300px',
      });
      dialogRef.onClose.subscribe((res) => {
        if (res) {
          delete this.treasuryForm.value.code;
          const treasureDto: EditTreasuryDto = this.treasuryForm.value;
          treasureDto.openingBalance = +treasureDto.openingBalance;
          this.financeService.EditTreasureDefinitionsById(treasureDto, this.ref);
        }
      });
    } else {
      delete this.treasuryForm.value.code;
      const treasureDto: EditTreasuryDto = this.treasuryForm.value;
      treasureDto.openingBalance = +treasureDto.openingBalance;
      this.financeService.EditTreasureDefinitionsById(treasureDto, this.ref);
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
