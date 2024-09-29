import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, RouterService, ToasterService } from 'shared-lib';
import { DropDownDto, JournalLineDropdownDto } from '../../../models';
import { PurchaseService } from '../../../purchase.service';
import { SharedPurchaseEnums } from '../../../models/sharedenums';
import { VendorOpeningBalanceDistributeComponent } from '../../../components/vendor-opening-balance-distribute/vendor-opening-balance-distribute.component';

@Component({
  selector: 'app-vendor-opening-balance-add',
  templateUrl: './vendor-opening-balance-add.component.html',
  styleUrls: ['./vendor-opening-balance-add.component.scss']
})
export class VendorOpeningBalanceAddComponent implements OnInit {
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

  constructor( private fb: FormBuilder,
    private dialog: DialogService,
    private toasterService: ToasterService,
    private languageService: LanguageService,
    private formService: FormsService,
    public routerService: RouterService,
    private title: Title,
    private lookupsService: LookupsService,
    private purchaseService: PurchaseService,
    public enums: SharedPurchaseEnums,
  ) { }

  ngOnInit() {

    this.languageService
    .getTranslation('VendorOpeningBalance.vendorOpeningBalance')
    .subscribe((res) => this.title.setTitle(res));

  this.purchaseService.JournalLinesDropDownData.next([]);
  this.purchaseService.VendorDropDownByAccountId.next([]);
  this.loadLookups();
  this.vendorForm = this.fb.array([]);
  this.subscribe();
  this.vendorForm = this.fb.array([this.vendorLineFormGroup()]);
  this.openingBalanceJournalEntryDropdown();
  this.initializeMainFormGroup();
  this.vendorLineFormGroup();

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

  subscribe() {
    this.lookupsService.lookups.subscribe((l) => (this.lookups = l));

    this.purchaseService.openingBalanceJournalEntryDropdownDataObservable.subscribe((res) => {
      this.openingJournalList = res;
    });
    this.purchaseService.VendorDropDownByAccountIdObservable.subscribe((res) => {
      this.vendorDropDownByAccountId = res.map((x) => ({
        ...x,
        name: `${x.name} (${x.code})`,
      }));
    });
    this.purchaseService.JournalLinesDropDownDataObservable.subscribe((res: any) => {
      this.linesDropDown = res;
    });
  }
  cancel() {
    this.routerService.navigateTo('/masterdata/vendor-opening-balance');
  }        

  openingBalanceJournalEntryDropdown() {
    this.purchaseService.openingBalanceJournalEntryDropdown();
  }

  onOpeningJournalChange(event: any) {
   
    this.getLinesDropDown(event);
  }

  getLinesDropDown(id: number) {
    console.log('onOpeningJournalChange' ) 
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
      openingBalanceJournalEntryLineId: this.openingBalanceJournalEntryLineId,
      amountNature: this.amountNature,
      vendorOpeningBalanceDetails: this.items.value,
    };
    this.purchaseService.AddVendorOpeningBalance(body);
  }
  

}
