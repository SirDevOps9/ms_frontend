import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslationService } from 'projects/adminportal/src/app/modules/i18n';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import { ToasterService, LanguageService, FormsService, customValidators } from 'shared-lib';
import { CustomerOpeningBalanceDistributeComponent } from '../../../components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import {
  CategoryDropdownDto,
  GetLineDropDownById,
  CustomerDropDown,
  SharedSalesEnums,
} from '../../../models';
import { SalesService } from '../../../sales.service';

@Component({
  selector: 'app-edit-customer-opening-balance',
  templateUrl: './edit-customer-opening-balance.component.html',
  styleUrls: ['./edit-customer-opening-balance.component.css'],
})
export class EditCustomerOpeningBalanceComponent implements OnInit {
  formGroup: FormGroup;
  customerForm: FormArray;
  openingJournalList: CategoryDropdownDto[];
  LinesDropDown: GetLineDropDownById[];
  CustomerDropDownByAccountId: CustomerDropDown[] | any;
  amount: string;
  balanceTypeSelect: string;
  debitOrCredit: string;
  openingJournalId: number;
  totalBalance: number;
  filteredAccounts: AccountDto[] = [];
  balanceType: any = [
    { label: 'Debit', value: 'Debit' },
    { label: 'Credit', value: 'Credit' },
  ];
  openingBalanceJournalEntryLineId: number;
  amountNature: string;
  editMode: boolean;
  formChanged: boolean;
  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private translationService: TranslationService,
    private salesService: SalesService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private formService: FormsService,
    public enums: SharedSalesEnums
  ) {}
  ngOnInit(): void {
    this.customerForm = this.fb.array([]);
    this.subscribe();

    this.getCustomerOpeningBalance();
    this.customerForm = this.fb.array([this.createBankFormGroup()]);
    this.openingBalanceJournalEntryDropdown();
    this.formGroup = this.fb.group({
      open: new FormControl('', customValidators.required),
      open2: new FormControl('', customValidators.required),
      name1: '',
      name2: '',
    });
    this.customerForm = this.fb.array([this.createBankFormGroup()]);
    this.createBankFormGroup();
  }
  public get items(): FormArray {
    return this.customerForm as FormArray;
  }
  addLine() {
    if (!this.formService.validForm(this.customerForm, false)) return;

    this.items.push(this.createBankFormGroup());
    this.customerForm.updateValueAndValidity();
  }
  async removeByFront(index: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');

    if (confirmed) {
      this.toasterService.showSuccess(
        this.languageService.transalte('deleteCustomerDefinition.success'),
        this.languageService.transalte('DeletedSuccessfully')
      );
      this.customerForm.removeAt(index);
      this.calculateTotalBalance();
    }
  }
  onDelete(id: number, index: number): void {
    if (id == 0) {
      this.removeByFront(index);
    } else {
      this.salesService.deleteCustomerOpeningBalance(id);
      this.salesService.customerDeletedObser.subscribe((res: boolean) => {
        if (res == true) {
          this.customerForm.removeAt(index);
          this.calculateTotalBalance();
        }
      });
    }
    this.calculateTotalBalance();
  }
  createBankFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      customerId: new FormControl('', customValidators.required),
      accountName: new FormControl(),
      customerCode: new FormControl(),
      balance: new FormControl(0, [
        customValidators.required,
        customValidators.number,
        customValidators.hasSpaces,
        customValidators.nonZero,
      ]),
      balanceType: new FormControl('', [customValidators.required]),
      displayName: new FormControl(),
      dueDates: new FormControl([]),
    });
  }

  accountSelected(event: any, index: number) {
    const isCustomerAlreadySelected = this.items.controls.some((group, i) => {
      return group.get('customerId')?.value === event && i !== index;
    });

    if (isCustomerAlreadySelected) {
      this.toasterService.showError(
        this.languageService.transalte('Error'),
        this.languageService.transalte('AlreadySelected')
      );
      // Reset the selected customerId in the current row
      const bankLine = this.items.at(index);
      if (bankLine) {
        bankLine.get('customerId')?.reset();
      }
      return;
    }

    // If not already selected, proceed as usual
    const bankLine = this.items.at(index);
    if (bankLine) {
      var accountData: any = this.CustomerDropDownByAccountId.find((c: any) => c.id == event);
      if (accountData) {
        bankLine.get('accountName')?.setValue(accountData?.name);
        bankLine.get('customerCode')?.setValue(accountData?.code);
        bankLine.get('displayName')?.setValue(`${accountData.code}`);
      }
    } else {
      console.error(`No FormGroup found at index ${index}`);
    }
  }

  openDistribute(data: any, account: number, index: number, customerGroup: FormGroup) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);

    if (data.balanceType != this.enums.BalanceType.Debit) {
      this.toasterService.showError(
        this.languageService.transalte('Error'),
        this.languageService.transalte('Distribution')
      );
      return;
    } else {
      const ref = this.dialog.open(CustomerOpeningBalanceDistributeComponent, {
        width: '750px',
        height: '600px',
        data: data,
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          data.dueDates = res;
        } else {
          data.dueDates = [];
        }
      });
    }
  }
  openingBalanceJournalEntryDropdown() {
    this.salesService.openingBalanceJournalEntryDropdown();
  }
  onOpeningJournalChange(event: any) {
    this.getLinesDropDown(event);
  }
  getLinesDropDown(id: number) {
    this.openingJournalId = id;
    this.salesService.getLinesDropDown(id);
  }
  onLinesChange(event: any) {
    setTimeout(() => {
      this.LinesDropDown?.forEach((element: any) => {
        if (element.id == event) {
          this.formGroup.patchValue({
            name1: element.amount,
            name2: element.amountNature,
          });
          this.getCustomerDropDownByAccountId(element.accountId);
          this.openingBalanceJournalEntryLineId = element.id;
          this.amountNature = element.amountNature;
        }
      });
    }, 500);
  }
  getCustomerDropDownByAccountId(id: number) {
    this.salesService.getCustomerDropDownByAccountId(id);
  }
  balanceTypeSelected(event: any) {
    this.balanceTypeSelect = event;
  }
  onSubmit() {
    if (!this.formService.validForm(this.customerForm, false)) return;

    this.customerForm.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    const body = {
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      customerOpeningBalanceDetails: this.items.value,
    };
    this.salesService.AddCustomerOpeningBalance(body);
  }
  getCustomerOpeningBalance() {
    this.salesService.getCustomerOpeningBalance();
  }
  subscribe() {
    this.salesService.CustomerOpeningBalancelistObservable.subscribe((res: any) => {
      this.customerForm.clear();
      if (res.length != 0) {
        this.formGroup?.patchValue(
          {
            open: res.openingBalanceJournalEntryId,
            open2: res.openingBalanceJournalEntryLineId,
            // name1: res.amount,
            // name2: res.amountNature
          },
          { emitEvent: true }
        );
        this.onOpeningJournalChange(res.openingBalanceJournalEntryId);
        this.onLinesChange(res.openingBalanceJournalEntryLineId);
        this.editMode = true;
        this.formChanged = false;
      }
      if (res && res.customerOpeningDetails && Array.isArray(res.customerOpeningDetails)) {
        res.customerOpeningDetails.forEach((detail: any, index: number) => {
          const formGroup = this.createBankFormGroup();
          formGroup.patchValue({
            id: detail.id,
            customerId: detail.customerId || '',
            accountName: detail.customerName || '',
            customerCode: detail.customerCode || '',
            balance: detail.balance || 0,
            balanceType: detail.balanceType || '',
            displayName: detail.displayName || '',
            dueDates: detail.balanceDueDates || [],
          });
          this.customerForm.push(formGroup);
          this.accountSelected(detail.customerId, index);
          this.calculateTotalBalance();
        });
      }
    });
    this.salesService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;
    });

    this.salesService.CustomerDropDownByAccountIdObservable.subscribe((res) => {
      this.CustomerDropDownByAccountId = res;
    });
    this.salesService.LinesDropDownDataObservable.subscribe((res: any) => {
      this.LinesDropDown = res;
    });
    if (this.formGroup) {
      this.formGroup.get('open')?.valueChanges.subscribe((value) => {
        this.onOpeningJournalChange(value);
      });
      this.formGroup.get('open2')?.valueChanges.subscribe((value) => {
        this.onLinesChange(value);
      });
    }
  }

  calculateTotalBalance() {
    this.totalBalance = this.customerForm.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('balance')?.value) || 0;
      console.log('2222222222');

      return acc + debitValue;
    }, 0);
  }
  cancel() {
    this.getCustomerOpeningBalance();
  }
}
