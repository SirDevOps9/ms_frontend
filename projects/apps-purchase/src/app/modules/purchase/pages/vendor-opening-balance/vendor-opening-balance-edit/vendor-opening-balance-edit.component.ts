import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AccountDto, DropDownDto, GetLineDropDownById, JournalLineDropdownDto, lookupDto, LookupEnum } from '../../../models';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, LanguageService, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { PurchaseService } from '../../../purchase.service';
import { SharedPurchaseEnums } from '../../../models/sharedenums';
import { VendorOpeningBalanceAddComponent } from '../vendor-opening-balance-add/vendor-opening-balance-add.component';
import { VendorOpeningBalanceDistributeComponent } from '../../../components/vendor-opening-balance-distribute/vendor-opening-balance-distribute.component';
import { AccountNature } from '../../../models/account-nature';

@Component({
  selector: 'app-vendor-opening-balance-edit',
  templateUrl: './vendor-opening-balance-edit.component.html',
  styleUrls: ['./vendor-opening-balance-edit.component.scss'],
  providers: [RouterService]

})
export class VendorOpeningBalanceEditComponent implements OnInit {
  formGroup: FormGroup;
  vendorForm: FormArray;
  openingJournalList: DropDownDto[];
  linesDropDown: GetLineDropDownById[];
  vendorDropDownByAccountId: DropDownDto[] | any;
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
    private PurchaseService: PurchaseService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private title: Title,
    public routerService: RouterService,
    private formService: FormsService,
    private lookupsService: LookupsService,
    public enums: SharedPurchaseEnums
  ) {}
  
  ngOnInit(): void {
    this.languageService
      .getTranslation('openeingBalance.CustomerOpeningBalance')
      .subscribe((res) => this.title.setTitle(res));
    this.loadLookups();
    this.initializeMainFormGroup();
    this.subscribe();
    this.vendorLineFormGroup();
    this.getVendorOpeningBalance(this.routerService.currentId);
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

    this.vendorForm = this.fb.array([this.vendorLineFormGroup()]);
  }

  public get items(): FormArray {
    return this.vendorForm as FormArray;
  }

  addLine() {
    if (!this.formService.validForm(this.vendorForm, false)) return;

    this.items.push(this.vendorLineFormGroup());
    this.vendorForm.updateValueAndValidity();
  }

  removeByFront(index: number) {
    this.vendorForm.removeAt(index);
    this.calculateTotalBalance();
  }

  onDelete(id: number, index: number): void {
    if (id == 0) {
      this.removeByFront(index);
    } else {
      this.PurchaseService.deletevendorOpeningBalance(id);
      this.PurchaseService.vendorDeletedObser.subscribe((res: boolean) => {
        if (res == true) {
          this.vendorForm.removeAt(index);
          this.calculateTotalBalance();
        }
      });
    }
  }

  vendorLineFormGroup(): FormGroup {
    return this.fb.group({
      id: 0,
      vendorId: new FormControl('', customValidators.required),
      accountName: new FormControl(),
      vendorCode: new FormControl(),
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
    if (!this.formService.validForm(this.vendorForm, false)) return;
    if (data.balanceType != this.enums.BalanceType.Credit) {
      this.toasterService.showError(
        this.languageService.transalte('Error'),
        this.languageService.transalte('Distribution')
      );
      return;
    } else {
      const ref = this.dialog.open(VendorOpeningBalanceDistributeComponent, {
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
    this.PurchaseService.openingBalanceJournalEntryDropdown();
  }

  onOpeningJournalChange(event: any) {
    this.getLinesDropDown(event);
  }

  getLinesDropDown(id: number) {
    this.openingJournalId = id;
    this.PurchaseService.getLinesDropDown(id);
  }

  onLinesChange(event: any) {
    setTimeout(() => {
      this.linesDropDown?.forEach((element: any) => {
        if (element.id == event) {
          this.formGroup.patchValue({
            amount: element.amount,
            amountNature: element.amountNature,
          });
          this.getvendorDropDownByAccountId(element.accountId);
          this.openingBalanceJournalEntryLineId = element.id;
          this.amountNature = element.amountNature;
        }
      });
    }, 500);
  }

  getvendorDropDownByAccountId(id: number) {
    this.PurchaseService.getVendorDropDownByAccountId(id);
  }


  accountSelected(event: any, index: number) {
    const line = this.items.at(index);
    if (!line) {
      return;
    }
    const selectedCustomer = this.vendorDropDownByAccountId.find((c: any) => c.id === event);

    if (!selectedCustomer) {
      return;
    }

    line.get('accountName')?.setValue(selectedCustomer.name);
    line.get('vendorCode')?.setValue(selectedCustomer.code);
    line.get('displayName')?.setValue(`${selectedCustomer.code}`);

    line.get('vendorId')?.setValue(selectedCustomer.id);
  }

  balanceTypeSelected(event: any, index: number) {
    const line = this.items.at(index);
    if (!line) {
      return;
    }

    const selectedCustomerId = line.get('vendorId')?.value;

    if (!selectedCustomerId) {
      return;
    }

    const isCustomerAlreadySelected = this.items.controls.some((group, i) => {
      return group.get('vendorId')?.value === selectedCustomerId && i !== index;
    });

    if (isCustomerAlreadySelected) {
      const matchingGroup = this.items.controls.find(
        (group) => group.get('vendorId')?.value === selectedCustomerId
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
    if (!this.formService.validForm(this.vendorForm, false)) return;
    this.vendorForm.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    const body = {
      id: this.routerService.currentId,
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      vendorOpeningBalanceDetails: this.items.value,
    };
    this.PurchaseService.EditVendorOpeningBalance(body);
  }

  getVendorOpeningBalance(id: number) {
    this.PurchaseService.getVendorOpeningBalanceByID(id);
  }

  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));
    this.PurchaseService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;
    });
    console.log("this.openingJournalList",this.openingJournalList)

    this.PurchaseService.vendorOpeningBalnceDataByIDObservable.subscribe((res: any) => {
      this.vendorForm.clear();
      if (res.length != 0) {
        this.formGroup?.patchValue(
          {
            OpeningJournal: res.openingBalanceJournalEntryId,
            JournalLine: res.openingBalanceJournalLineId,
            amount:res.amount,
            amountNature:res.amountNature
          },
          { emitEvent: true }
        );
        this.formGroup.controls['OpeningJournal'].updateValueAndValidity()
        this.formGroup.controls['JournalLine'].updateValueAndValidity()
        this.onOpeningJournalChange(res.openingBalanceJournalEntryId);
        this.onLinesChange(res.openingBalanceJournalLineId);
        this.editMode = false;
        this.formChanged = false;
      }
      if (res && res.vendorOpeningDetails && Array.isArray(res.vendorOpeningDetails)) {
        res.vendorOpeningDetails.forEach((detail: any, index: number) => {
          const formGroup = this.vendorLineFormGroup();
          formGroup.patchValue({
            id: detail.id,
            vendorId: detail.vendorId || '',
            accountName: detail.vendorName || '',
            vendorCode: detail.vendorCode || '',
            balance: detail.balance || 0,
            balanceType: detail.balanceType || '',
            displayName: detail.displayName || '',
            dueDates: detail.balanceDueDates || [],
          });
          this.vendorForm.push(formGroup);
          this.accountSelected(detail.vendorId, index);
          this.calculateTotalBalance();
        });
      }
    });
    

    this.PurchaseService.VendorDropDownByAccountIdObservable.subscribe((res) => {
      this.vendorDropDownByAccountId = res.map((x) => ({
        ...x,
        name: `${x.name} (${x.code})`,
      }));
    });
    this.PurchaseService.JournalLinesDropDownDataObservable.subscribe((res: any) => {
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
    this.totalBalance = this.vendorForm.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('balance')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }

  cancel() {
    this.routerService.navigateTo('/masterdata/vendor-opening-balance');
  }

  ngOnDestroy() {}

}
