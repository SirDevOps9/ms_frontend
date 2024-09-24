import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import {
  ToasterService,
  LanguageService,
  FormsService,
  customValidators,
  RouterService,
  LookupsService,
  LookupEnum,
  lookupDto,
} from 'shared-lib';
import { CustomerOpeningBalanceDistributeComponent } from '../../../components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import {
  CategoryDropdownDto,
  GetLineDropDownById,
  CustomerDropDown,
  SharedSalesEnums,
} from '../../../models';
import { SalesService } from '../../../sales.service';
import { AccountNature } from 'projects/erp-home/src/app/modules/general-setting/models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-customer-opening-balance',
  templateUrl: './edit-customer-opening-balance.component.html',
  styleUrls: ['./edit-customer-opening-balance.component.scss'],
  providers: [RouterService],
})
export class EditCustomerOpeningBalanceComponent implements OnInit {
  formGroup: FormGroup;
  customerForm: FormArray;
  openingJournalList: CategoryDropdownDto[];
  linesDropDown: GetLineDropDownById[];
  customerDropDownByAccountId: CustomerDropDown[] | any;
  amount: string;
  balanceTypeSelect: string;
  debitOrCredit: string;
  openingJournalId: number;
  totalBalance: number;
  filteredAccounts: AccountDto[] = [];
  lookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  openingBalanceJournalEntryLineId: number;
  amountNature: AccountNature;
  editMode: boolean;
  formChanged: boolean;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private salesService: SalesService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    public routerService: RouterService,
    private formService: FormsService,
    private lookupsService: LookupsService,
    public enums: SharedSalesEnums
  ) {}
  
  ngOnInit(): void {
  
    this.loadLookups();
    this.initializeMainFormGroup();
    this.subscribe();
    this.customerLineFormGroup();
    this.getCustomerOpeningBalance(this.routerService.currentId);
    this.openingBalanceJournalEntryDropdown();
  }

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
  }

  private initializeMainFormGroup(): void {
    this.formGroup = this.fb.group({
      OpeningJournal: new FormControl('', customValidators.required),
      JournalLine: new FormControl('', customValidators.required),
      amount: '',
      amountNature: '',
    });

    this.customerForm = this.fb.array([this.customerLineFormGroup()]);
  }

  public get items(): FormArray {
    return this.customerForm as FormArray;
  }

  addLine() {
    if (!this.formService.validForm(this.customerForm, false)) return;

    this.items.push(this.customerLineFormGroup());
    this.customerForm.updateValueAndValidity();
  }

  removeByFront(index: number) {
    this.customerForm.removeAt(index);
    this.calculateTotalBalance();
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
  }

  customerLineFormGroup(): FormGroup {
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

  openDistribute(data: any, account: number, index: number, customerGroup: FormGroup) {
    let accountData = this.filteredAccounts.find((elem) => elem.id === account);
    if (!this.formService.validForm(this.customerForm, false)) return;
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
      this.linesDropDown?.forEach((element: any) => {
        if (element.id == event) {
          this.formGroup.patchValue({
            amount: element.amount,
            amountNature: element.amountNature,
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


  accountSelected(event: any, index: number) {
    const line = this.items.at(index);
    if (!line) {
      return;
    }
    const selectedCustomer = this.customerDropDownByAccountId.find((c: any) => c.id === event);

    if (!selectedCustomer) {
      return;
    }

    line.get('accountName')?.setValue(selectedCustomer.name);
    line.get('customerCode')?.setValue(selectedCustomer.code);
    line.get('displayName')?.setValue(`${selectedCustomer.code}`);

    line.get('customerId')?.setValue(selectedCustomer.id);
  }

  balanceTypeSelected(event: any, index: number) {
    const line = this.items.at(index);
    if (!line) {
      return;
    }

    const selectedCustomerId = line.get('customerId')?.value;

    if (!selectedCustomerId) {
      return;
    }

    const isCustomerAlreadySelected = this.items.controls.some((group, i) => {
      return group.get('customerId')?.value === selectedCustomerId && i !== index;
    });

    if (isCustomerAlreadySelected) {
      const matchingGroup = this.items.controls.find(
        (group) => group.get('customerId')?.value === selectedCustomerId
      );
      const existingBalanceType = matchingGroup?.get('balanceType')?.value;

      if (existingBalanceType && existingBalanceType !== event) {
        this.toasterService.showError(
          this.languageService.transalte('Error'),
          this.languageService.transalte('openeingBalance.natureMismatchWithDuplicateCustomer')
        );
        line.get('balanceType')?.reset();
        return;
      }
    }
    line.get('balanceType')?.setValue(event);
  }

  onSubmit() {
    if (!this.formService.validForm(this.customerForm, false)) return;
    this.customerForm.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    const body = {
      id: this.routerService.currentId,
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      customerOpeningBalanceDetails: this.items.value,
    };
    this.salesService.EditCustomerOpeningBalance(body);
  }

  getCustomerOpeningBalance(id: number) {
    this.salesService.getCustomerOpeningBalance(id);
  }

  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));

    this.salesService.CustomerOpeningBalancelistObservable.subscribe((res: any) => {
      this.customerForm.clear();
      if (res.length != 0) {
        this.formGroup?.patchValue(
          {
            OpeningJournal: res.openingBalanceJournalEntryId,
            JournalLine: res.openingBalanceJournalEntryLineId,
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
          const formGroup = this.customerLineFormGroup();
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
      this.customerDropDownByAccountId = res.map((x) => ({
        ...x,
        name: `${x.name} (${x.code})`,
      }));;
    });
    this.salesService.LinesDropDownDataObservable.subscribe((res: any) => {
      this.linesDropDown = res;
    });
    if (this.formGroup) {
      this.formGroup.get('OpeningJournal')?.valueChanges.subscribe((value) => {
        this.onOpeningJournalChange(value);
      });
      this.formGroup.get('JournalLine')?.valueChanges.subscribe((value) => {
        this.onLinesChange(value);
      });
    }
  }

  calculateTotalBalance() {
    this.totalBalance = this.customerForm.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('balance')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }

  cancel() {
    this.routerService.navigateTo('/masterdata/customer-opening-balance');
  }

  ngOnDestroy() {}
}
