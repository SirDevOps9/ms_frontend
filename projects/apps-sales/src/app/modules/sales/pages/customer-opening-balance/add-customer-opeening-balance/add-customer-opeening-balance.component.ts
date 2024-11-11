import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountDto } from 'projects/apps-accounting/src/app/modules/account/models';
import {
  customValidators,
  FormsService,
  LanguageService,
  lookupDto,
  LookupEnum,
  LookupsService,
  RouterService,
  ToasterService,
} from 'shared-lib';
import { CustomerOpeningBalanceDistributeComponent } from '../../../components/customer-opening-balance-distribute/customer-opening-balance-distribute.component';
import { SalesService } from '../../../sales.service';
import {
  CategoryDropdownDto,
  CustomerDropDown,
  GetLineDropDownById,
  SharedSalesEnums,
} from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-customer-opeening-balance',
  templateUrl: './add-customer-opeening-balance.component.html',
  styleUrl: './add-customer-opeening-balance.component.scss',
})
export class AddCustomerOpeeningBalanceComponent implements OnInit {
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
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  openingBalanceJournalEntryLineId: number;
  amountNature: string;
  editMode: boolean;
  formChanged: boolean;

  constructor(
    private fb: FormBuilder,
    private dialog: DialogService,
    private SalesService: SalesService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private formService: FormsService,
    public routerService: RouterService,
    private lookupsService: LookupsService,
    public enums: SharedSalesEnums
  ) {}

  ngOnInit(): void {

    this.SalesService.LinesDropDownData.next([]);
    this.SalesService.CustomerDropDownByAccountId.next([]);
    this.loadLookups();
    this.customerForm = this.fb.array([]);
    this.subscribe();
    this.customerForm = this.fb.array([this.customerLineFormGroup()]);
    this.openingBalanceJournalEntryDropdown();
    this.initializeMainFormGroup();
    this.customerLineFormGroup();
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

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
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
    this.SalesService.openingBalanceJournalEntryDropdown();
  }

  onOpeningJournalChange(event: any) {
    this.getLinesDropDown(event);
  }

  getLinesDropDown(id: number) {
    this.openingJournalId = id;
    this.SalesService.getLinesDropDown(id);
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
    this.SalesService.getCustomerDropDownByAccountId(id);
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
    this.SalesService.AddCustomerOpeningBalance(body);
  }

  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));

    this.SalesService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;
    });

    this.SalesService.CustomerDropDownByAccountIdObservable.subscribe((res) => {
      this.customerDropDownByAccountId = res.map((x) => ({
        ...x,
        name: `${x.name} (${x.code})`,
      }));;
    });
    this.SalesService.LinesDropDownDataObservable.subscribe((res: any) => {
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
}
