import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropDownDto, JournalLineDropdownDto, lookupDto, LookupEnum } from '../../../models';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, LanguageService, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { PurchaseService } from '../../../purchase.service';
import { SharedPurchaseEnums } from '../../../models/sharedenums';
import { VendorOpeningBalanceAddComponent } from '../vendor-opening-balance-add/vendor-opening-balance-add.component';
import { VendorOpeningBalanceDistributeComponent } from '../../../components/vendor-opening-balance-distribute/vendor-opening-balance-distribute.component';

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
  linesDropDown: JournalLineDropdownDto[];
  amount: string;
  debitOrCredit: string;
  openingJournalId: number;
  vendorDropDownByAccountId: DropDownDto[] | any;
  totalBalance: number;
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  amountNature: string;
  openingBalanceJournalEntryLineId: number;
  formChanged: boolean;


  constructor(private fb: FormBuilder,
    private dialog: DialogService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private formService: FormsService,
    public routerService: RouterService,
    private title: Title,
    private lookupsService: LookupsService,
    private purchaseService: PurchaseService,
    public enums: SharedPurchaseEnums,) { }

  ngOnInit() {
    this.languageService
    .getTranslation('openeingBalance.CustomerOpeningBalance')
    .subscribe((res) => this.title.setTitle(res));
  this.loadLookups();
  this.initializeMainFormGroup();

  this.subscribe();
  this.vendorLineFormGroup();
    this.getVendorOpeningBalance(this.vendorId());
    this.openingBalanceJournalEntryDropdown();


  }

  vendorId() {
    return this.routerService.currentId;
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

  getVendorOpeningBalance(id: number) {
    this.purchaseService.getVendorOpeningBalanceByID(id);
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
     // displayName: new FormControl(),
     balanceDueDates: new FormControl([]),
    });
  }

  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));

    this.purchaseService.vendorOpeningBalnceDataByIDObservable.subscribe((res: any) => {
      this.vendorForm.clear();
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
           // displayName: detail.displayName || '',
           balanceDueDates: detail.balanceDueDates || [],
          });
          this.vendorForm.push(formGroup);
          this.accountSelected(detail.customerId, index);
          this.calculateTotalBalance();
        });
      }
    });
    this.purchaseService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;
    });

    this.purchaseService.VendorDropDownByAccountIdObservable.subscribe((res) => {
      this.vendorDropDownByAccountId = res;
    });
    this.purchaseService.JournalLinesDropDownDataObservable.subscribe((res: any) => {
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

  cancel() {
    this.routerService.navigateTo('/masterdata/customer-opening-balance');
  }

  openingBalanceJournalEntryDropdown() {
    this.purchaseService.openingBalanceJournalEntryDropdown();
  }

  onOpeningJournalChange(event: any) {
    this.getLinesDropDown(event);
  }

  getLinesDropDown(id: number) {
    console.log('id', id);
    this.openingJournalId = id;
    this.purchaseService.getLinesDropDown(id);
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

  loadLookups() {
    this.lookupsService.loadLookups([LookupEnum.AccountNature]);
  }
  
  openDistribute(data: any, account: number, index: number, VendorGroup: FormGroup) {
    if (!this.formService.validForm(this.vendorForm, false)) return;

     if (data.balanceType != this.enums.BalanceType.Debit) {
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

  balanceTypeSelected(event: any, index: number) {
    const line = this.items.at(index);
    if (!line) {
      return;
    }

    const selectedVendorId = line.get('vendorId')?.value;

    if (!selectedVendorId) {
      return;
    }

    const isVendorAlreadySelected = this.items.controls.some((group, i) => {
      return group.get('vendorId')?.value === selectedVendorId && i !== index;
    });

    if (isVendorAlreadySelected) {
      const matchingGroup = this.items.controls.find(
        (group) => group.get('vendorId')?.value === selectedVendorId
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

  calculateTotalBalance() {
    this.totalBalance = this.vendorForm.controls.reduce((acc, control) => {
      const debitValue = parseFloat(control.get('balance')?.value) || 0;
      return acc + debitValue;
    }, 0);
  }

  accountSelected(event: any, index: number) {
    const line = this.items.at(index);
    if (!line) {
      return;
    }

    const selectedvendor = this.vendorDropDownByAccountId.find((c: any) => c.id === event);

    if (!selectedvendor) {
      return;
    }

    line.get('accountName')?.setValue(selectedvendor.name);
    line.get('vendorCode')?.setValue(selectedvendor.code);
    line.get('displayName')?.setValue(`${selectedvendor.code}`);

    line.get('vendorId')?.setValue(selectedvendor.id);
  }

  getVendorDropDownByAccountId(id: number) {
    this.purchaseService.getVendorDropDownByAccountId(id);
  }

  onLinesChange(event: any) {
    setTimeout(() => {
      this.linesDropDown?.forEach((element: any) => {
        if (element.id == event) {
          this.formGroup.patchValue({
            amount: element.amount,
            amountNature: element.amountNature,
          });
          this.getVendorDropDownByAccountId(element.accountId);
          this.openingBalanceJournalEntryLineId = element.id;
          this.amountNature = element.amountNature;
        }
      });
    }, 500);
  }
  
  onSubmit(){
    if (!this.formService.validForm(this.vendorForm, false)) return;

    this.vendorForm.updateValueAndValidity();
    this.formGroup.updateValueAndValidity();
    const body = {
      id: this.routerService.currentId,
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      customerOpeningBalanceDetails: this.items.value,
    };
    this.purchaseService.EditVendorOpeningBalance(body);

  }

}
