import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { DynamicDialogConfig, DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { customValidators, FormsService, MenuModule } from 'shared-lib';
import { CurrencyService } from '../../../general/currency.service';
import { FinanceService } from '../../finance.service';
import { BranchDto } from 'projects/bussiness-owners/src/app/modules/company/models';
import { CurrencyDto } from '../../../general/models/currencyDto';
import { AddTreasuryDto, EditTreasuryDto, GetTreasuryDtoById } from '../../models';
import { ConfirmComponent } from '../confirm/confirm.component';

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
      console.log(res);
      this.treasuryData = res;
      if (res) {
        res.branches = res?.branches?.map((elem) => {
          return elem.branchId;
        });
        this.treasuryForm.patchValue({ ...res });
        this.accountChange(res?.accountId);
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
      console.log(res);
    });
  }

  getChildrenAccountsDropDownLookup() {
    this.financeService.getChildrenAccountsDropDownLookup().subscribe((res) => {
      this.accountsLookup = res;
    });
  }
  GetAccountOpeningBalance(id: number) {
    this.financeService.GetAccountOpeningBalance(id).subscribe((res) => {
      this.OpeningBalanceData = res;
      this.treasuryForm.get('journalEntryLineId')?.setValue(res.journalId);
      this.treasuryForm.get('accountBalance')?.setValue(res.balance);
    });
  }

  accountChange(e: any) {
    console.log(e);
    this.GetAccountOpeningBalance(e);
  }

  initializeTreasuryForm() {
    this.treasuryForm = this.fb.group({
      code: '',
      name: [null, customValidators.required],
      currencyId: [null, customValidators.required],
      branches: [null, customValidators.required],
      accountId: [null],
      openingBalance: [null],
      journalEntryLineId: [null],
      accountBalance: [null],
    });
  }

  onCancel() {
    this.ref.close();
  }

  onSubmit() {
    if (!this.formsService.validForm(this.treasuryForm, true)) return;
    let accountBalance = this.treasuryForm.value.accountBalance;
    let openingBalance = +this.treasuryForm.value.openingBalance;
    this.treasuryForm.value.id = this.treasuryData.id;
    if (accountBalance !== openingBalance) {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        width: '400px',
        height: '250px',
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
}
