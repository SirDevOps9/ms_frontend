import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';

import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';
import { EMPTY, skip, take } from 'rxjs';
import {
  MenuModule,
  customValidators,
  RouterService,
  LanguageService,
  FormsService,
  ToasterService,
} from 'shared-lib';
import { TransactionService } from '../../../transaction.service';
import {
  AddSalesReturnDto,
  customerDto,
  SalesInvoiceLookup,
} from '../../../models/return-sales-dto';

@Component({
  selector: 'app-add-sales-return-invoice',
  templateUrl: './add-sales-return-invoice.component.html',
  styleUrl: './add-sales-return-invoice.component.scss',
})
export class AddSalesReturnInvoiceComponent implements OnInit {
  salesReturnForm: FormGroup = new FormGroup({});
  totalQuantity: number = 0;
  totalOriginalQuantity: number = 0;
  totalDiscountAmount: number;
  totalPrice: number;
  totalReturnQuantity: number = 0;
  savedDataId: number = 0;
  dataToReadOnly: boolean = false;
  modulelist: MenuModule[];
  searchTerm: string;
  wearhouseSearch: string;
  warhouseLookupData: any[] = [];
  paymentLookupData: { id: number; name: string }[] = [];
  vendorItems: any[];
  uomLookup: any = [];
  currentLang: string;
  showError: boolean = false;
  showPost: boolean;
  selectedLanguage: string;
  lineError: number = -1;
  error: boolean;
  totalAfterDiscount: number;
  discount: number;
  vatAmount: number;
  totalAfterVat: number;

  changeCode: boolean = false;
  customerList: customerDto[] = [];
  salesInvoiceList: SalesInvoiceLookup[] = [];
  rowDuplicate: number = -1;
  duplicateLine: boolean;

  ngOnInit(): void {
    this.initializeForm();
    this.initLookups();
    this.subscribe();
    this.salesReturnFormArray.valueChanges.subscribe(() => {
      this.calculate();
    });
  }

  // form section##########
  initializeForm() {
    this.salesReturnForm = this.fb.group({
      id: new FormControl(''),
      code: new FormControl(''),
      warehouseId: new FormControl('', [customValidators.required]),
      warehouseName: new FormControl(''),
      salesManName: new FormControl(''),
      relatedJournal: new FormControl(''),
      description: new FormControl(''),
      createdStockIn: new FormControl(''),
      returnDate: new FormControl(new Date(), [customValidators.required]),
      customerId: new FormControl('', [customValidators.required]),
      customerName: new FormControl(''),
      currencyName: new FormControl(''),
      rate: new FormControl('', [customValidators.required]),
      salesInvoiceId: new FormControl('', [customValidators.required]),

      numberOfItems: 0,
      total: 0,
      discount: 0,
      totalOfQuantity: 0,
      vatAmount: 0,
      totalAfterVat: 0,

      salesReturnDetails: this.fb.array([]),
    });

    this.customerIdChange();
    this.salesInvoiceControleChange();
  }
  // from array
  initFromArray() {
    return this.fb.group({
      id: [],
      uomOptions: [],
      itemName: '', // description
      itemId: [null, customValidators.required],
      itemCodeName: '',
      itemVariantId: '',
      discount: 0,
      discountAmount: '',
      uomName: '',
      uomId: ['', customValidators.required],
      taxRatio: '',
      remainQTY: [null],
      toReturnQTY: [
        ,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      originalQTY: [null],
      cost: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],

      expiryDate: [, customValidators.required],
      notes: '',
      hasExpiryDate: '',
      stockInEntryMode: 'Manual',
      trackingType: '',
      discountPercentage: '',
      vatPercentage: '',
      taxId: null,
    });
  }

  // getter
  get salesReturnFormArray() {
    return this.salesReturnForm.get('salesReturnDetails') as FormArray;
  }
  // custumer id on change
  customerIdChange() {
    this.salesReturnForm.get('customerId')?.valueChanges.subscribe((res) => {
      if (!res) return;
      if (!this.changeCode) {
        this.salesReturnFormArray.clear();
        this.resetAfterChangeCustomerId();
        let customerName = this.customerList.find((x) => x.id == res)?.name;
        this.salesReturnForm.get('customerName')?.setValue(customerName);
        this._transactionService.getSalesInvoiceLookup(undefined, res, undefined);
        this._transactionService.salesInvoiceLookup.pipe(skip(1), take(1)).subscribe({
          next: (res: SalesInvoiceLookup[]) => {
            this.salesInvoiceList = res;
          },
          error: (err: any) => {
            return EMPTY;
          },
        });
      }
    });
  }
  // sales invoice id on change

  salesInvoiceControleChange() {
    this.salesReturnForm.get('salesInvoiceId')?.valueChanges.subscribe((res) => {
      if (!res) return;
      this._transactionService.GetSalesInvoiceToReturnById(res);
      this._transactionService.salesInvoiceToReturnById.subscribe((res) => {
        this.changeCode = true;
        this.patchFormValues(res);
      });
    });
  }
  // form section##########

  // Patch the response to the form
  patchFormValues(response: any) {
    this.salesReturnForm.patchValue({
      id: response.id,
      code: response.code,
      warehouseId: response.warehouseId,
      warehouseName: response.warehouseName,
      description: response.description,
      customerId: +response.customerId,
      customerName: response.customerName,
      createdStockIn: response.stockInCode,
      currencyName: response.currencyName,
      salesManName: response.salesManName ,
      relatedJournal: response.journalCode,

      rate: response.currencyRate,
    });

    this.changeCode = false;
    const salesReturnDetailsArray = this.salesReturnForm.get('salesReturnDetails') as FormArray;
    salesReturnDetailsArray.clear();
    if (Array.isArray(response.salesInvoiceDetails)) {
      response.salesInvoiceDetails.forEach((detail: any) => {
        salesReturnDetailsArray.push(
          this.fb.group({
            id: detail.id,
            itemName: detail.itemName,
            itemId: detail.itemId,
            itemCodeName: detail.itemCode,
            itemVariantId: detail.itemVariantId,
            discount: detail.discountPercentage,
            discountAmount: detail.discountAmount,
            uomName: detail.uomNameAr || detail.uomNameEn,
            uomId: detail.uomId,
            taxRatio: detail.vatPercentage,
            remainQTY: detail.availableQuantity,
            originalQTY: detail.quantity,
            toReturnQTY: null,
            cost: detail.cost,
            expiryDate: detail.salesInvoiceTracking?.expireDate || null,
            notes: detail.notes,
            hasExpiryDate: detail.hasExpiryDate,
            stockInEntryMode: detail.invoiceEntryMode,
            trackingType: this.getTrackingType(detail),
            discountPercentage: detail.discountPercentage,
            vatPercentage: detail.vatPercentage,
            taxId: detail.taxId,
          })
        );
      });
    }
  }

  subscribe() {
    // customer lookup
    this._transactionService.CustomerList.pipe(skip(1), take(1)).subscribe({
      next: (res: customerDto[]) => {
        this.customerList = res;
      },
      error: (err: any) => {
        return EMPTY;
      },
    });

    // Sales Invoice Lookup
    this._transactionService.salesInvoiceLookup.pipe(skip(1), take(1)).subscribe({
      next: (res: SalesInvoiceLookup[]) => {
        this.salesInvoiceList = res;
      },
      error: (err: any) => {
        return EMPTY;
      },
    });
    // warhouse lookup
    this._transactionService.warehouseLookup.pipe(skip(1), take(1)).subscribe({
      next: (res) => {
        this.warhouseLookupData = res;
      },
    });
  }

  getTrackingType(detail: any): string {
    if (detail.trackingType === this.sharedFinanceEnums.trackingType.NoTracking) {
      if (detail.hasExpiryDate) {
        return 'No Tracking';
      } else {
        return 'No Tracking';
      }
    } else if (detail.trackingType === this.sharedFinanceEnums.trackingType.Serial) {
      if (detail.hasExpiryDate) {
        return detail.salesInvoiceTracking?.serialId;
      } else {
        return detail.salesInvoiceTracking?.serialId;
      }
    } else if (detail.trackingType === this.sharedFinanceEnums.trackingType.Batch) {
      if (detail.hasExpiryDate) {
        return detail.salesInvoiceTracking?.batchNo;
      } else {
        return detail.salesInvoiceTracking?.batchNo;
      }
    } else {
      return '';
    }
  }

  initLookups() {
    this._transactionService.getCustomerList('');
    this._transactionService.getSharedWarehousesLookup(this.wearhouseSearch);
    this._transactionService.getSalesInvoiceLookup();
  }

  resetAfterChangeCustomerId() {
    this.salesReturnForm.get('id')?.reset();
    this.salesReturnForm.get('code')?.reset();
    this.salesReturnForm.get('warehouseId')?.reset();
    this.salesReturnForm.get('warehouseName')?.reset();
    this.salesReturnForm.get('description')?.reset();
    this.salesReturnForm.get('currencyName')?.reset();
    this.salesReturnForm.get('rate')?.reset();
    this.salesReturnForm.get('salesInvoiceId')?.reset();
  }

  // calculations
  calculate() {
    this.totalQuantity = this.salesReturnFormArray.controls.reduce((acc, control) => {
      const remainQTY = parseFloat(control.get('remainQTY')?.value) || 0;
      return acc + remainQTY;
    }, 0);

    this.totalReturnQuantity = this.salesReturnFormArray.controls.reduce((acc, control) => {
      const toReturnQTY = parseFloat(control.get('toReturnQTY')?.value) || 0;
      return acc + toReturnQTY;
    }, 0);

    this.totalOriginalQuantity = this.salesReturnFormArray.controls.reduce((acc, control) => {
      const originalQTY = parseFloat(control.get('originalQTY')?.value) || 0;
      return acc + originalQTY;
    }, 0);
    this.totalDiscountAmount = this.salesReturnFormArray.controls.reduce((acc, control) => {
      const totalDiscount = parseFloat(control.get('discountAmount')?.value) || 0;
      return acc + totalDiscount;
    }, 0);

    this.totalPrice = this.salesReturnFormArray.controls.reduce((acc, control) => {
      const totalPrice = parseFloat(control.get('cost')?.value) || 0;
      return acc + totalPrice;
    }, 0);

    this.vatAmount = this.salesReturnFormArray.controls.reduce((acc, control) => {
      const allvat = parseFloat(control.get('cost')?.value) || 0;
      return acc + allvat;
    }, 0);
    let totalAfterDiscount = this.totalQuantity * this.totalPrice - this.totalDiscountAmount;

    this.salesReturnForm.get('totalOfQuantity')?.setValue(this.totalQuantity);
    this.salesReturnForm.get('discount')?.setValue(this.totalDiscountAmount);
    this.salesReturnForm.get('total')?.setValue(this.totalQuantity * this.totalPrice);
    this.salesReturnForm.get('totalAfterVat')?.setValue(totalAfterDiscount);
    this.salesReturnForm.get('vatAmount')?.setValue(this.vatAmount);
    this.salesReturnForm.get('numberOfItems')?.setValue(this.salesReturnFormArray.length);
  }

  onCancel() {
    this.router.navigateTo('/transaction/sales-return-invoice');
  }

  onSave() {
    if (!this.beforeSave()) {
      return;
    }
    if (!this.formsService.validForm(this.salesReturnForm, false)) return;
    if (!this.formsService.validForm(this.salesReturnFormArray, false)) return;
    if (this.duplicateLine == true) return;
    let formVal = this.salesReturnForm.value;

    const returnSalesInvoiceDetails: any[] = this.salesReturnFormArray.controls.map((control) => {
      return {
        toReturnQuantity: Number(control.value.toReturnQTY),
        salesInvoiceDetailId: control.value.id,
      };
    });
    const obj: AddSalesReturnDto = {
      returnInvoiceDate: formVal.returnDate,
      description: formVal.description,
      warehouseId: formVal.warehouseId,
      warehouseName: this.warhouseLookupData.find((x) => x.id == formVal.warehouseId).name,
      salesInvoiceHeaderId: formVal.salesInvoiceId,
      returnSalesInvoiceDetails: returnSalesInvoiceDetails,
    };

    this._transactionService.addSalesReturnInvoice(obj);
    this._transactionService.sendSalesReturnInvoice.subscribe((res: number | any) => {
      if (typeof res == 'number') {
        this.savedDataId = res;
        this.dataToReadOnly = true;
        this.showPost = true;
      } else {
        this.dataToReadOnly = false;
        this.showPost = false;
      }
    });
  }

  setReturnQuantity(indexLine: number) {
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;
    if (rowForm.get('toReturnQTY')?.value > rowForm.get('remainQTY')?.value) {
      this.rowDuplicate = indexLine;
      this.duplicateLine = true;
    } else {
      this.rowDuplicate = -1;
      this.duplicateLine = false;
    }
    this.calculate();
  }

  beforeSave(): boolean {
    let isValid = true;

    for (let index = 0; index < this.salesReturnFormArray.controls.length; index++) {
      const control = this.salesReturnFormArray.controls[index] as FormGroup;
      const returnQuantity = control.get('toReturnQTY')?.value;
      const remainQuantity = control.get('remainQTY')?.value;

      if (returnQuantity > remainQuantity) {
        this.duplicateLine = true;
        this.rowDuplicate = index;
        isValid = false;

        this.toasterService.showError(
          this.languageService.transalte('salesReturnInvoice.error'),
          this.languageService.transalte('salesReturnInvoice.errorReturnQuantity')
        );

        break;
      }
      if (returnQuantity == null) {
        this.duplicateLine = true;
        this.rowDuplicate = index;
        isValid = false;

        this.toasterService.showError(
          this.languageService.transalte('salesReturnInvoice.error'),
          this.languageService.transalte('salesReturnInvoice.errorReturnQuantityRequired')
        );

        break;
      }
    }

    return isValid;
  }

  async deleteRow(index: number, id: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.salesReturnFormArray.removeAt(index);
    }
  }

  addToPost() {
    this._transactionService.postSalesReturnInvoice(this.savedDataId);
  }
  constructor(
    public authService: AuthService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    private router: RouterService,
    public formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    private formsService: FormsService,
    private toasterService: ToasterService,
    private _transactionService: TransactionService
  ) {
    this.currentLang = this.languageService.getLang();
    this.selectedLanguage = this.languageService.getLang();
  }
}