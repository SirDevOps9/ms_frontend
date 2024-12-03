import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  OperationalStockIn,
  LatestItems,
  GetWarehouseList,
  StockInDetail,
  AddStockIn,
} from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { skip, take } from 'rxjs';
import {
  LookupEnum,
  lookupDto,
  PageInfoResult,
  MenuModule,
  customValidators,
  PageInfo,
  LanguageService,
  LookupsService,
  RouterService,
  FormsService,
  ToasterService,
  CurrentUserService,
} from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { PurchaseService } from '../../../../purchase/purchase.service';
import { LatestItem } from '../../../models';
import { PurchaseInvoiceTrackingComponent } from '../../../components/purchase-invoice-tracking/purchase-invoice-tracking.component';
import { AddPurchaseInvoiceDto } from '../../../models/addPurchaseInvoice';
import { ItemAdvancedSearchPurchaseInvoiceComponent } from '../../../components/item-advanced-search-purchase-invoice/item-advanced-search-purchase-invoice.component';

@Component({
  selector: 'app-add-purchase-invoice',
  templateUrl: './add-purchase-invoice.component.html',
  styleUrl: './add-purchase-invoice.component.scss',
})
export class AddPurchaseInvoiceComponent implements OnInit {
  purchaseInvoiceForm: FormGroup = new FormGroup({});
  formSubmited: boolean = false;
  errorsArray: any = [];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  oprationalLookup: OperationalStockIn[] = [];
  selectedTraking: any = {};
  exportData: any[];
  savedDataId: number = 0;
  dataToReadOnly: boolean = false;
  exportSelectedCols: string[] = [];
  latestItemsList: LatestItem[] = [];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  wearhouseSearch: string;
  warhouseLookupData: GetWarehouseList[] = [];
  paymentLookupData: { id: number; name: string }[] = [];
  vendorItems: any[];

  uomLookup: any = [];
  currentLang: string;
  showError: boolean = false;
  showPost: boolean ;
  barcodeData: StockInDetail;
  selectedLanguage: string;
  lineError: number = -1;
  error: boolean;
  save: boolean = true;

  numberOfItems: number;
  total: number;
  totalAfterDiscount: number;
  totalQuantity: number;
  discount: number;
  vatAmount: number;
  totalAfterVat: number;
  itemPostId: number;

  ngOnInit(): void {
    this.initializeForm();
    this.initLookups();

    this.purchaseInvoiceForm.valueChanges.subscribe((res) => {});

    this.purchaseInvoiceForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
      let data = this.oprationalLookup.find((elem) => elem.id == res);
      this.purchaseInvoiceForm.get('warehouseId')?.setValue(data?.warehouseId);
      this.purchaseInvoiceForm.get('warehouseName')?.setValue(data?.warehouseName);
    });

    this.stockIn.valueChanges.subscribe((res: any[]) => {
      // Ensure `res` is an array
      if (Array.isArray(res)) {
        this.purchaseInvoiceForm.get('numberOfItems')?.setValue(res.length);

        // Calculate totalAfterDiscount for all items using reduce
        this.purchaseInvoiceForm.get('totalAfterDiscount')?.setValue(
          res.reduce((acc, item) => {
            const itemTotal = item.quantity * (item.cost - item.discountAmount);
            return acc + itemTotal;
          }, 0)
        );
        this.purchaseInvoiceForm.get('totalQuantity')?.setValue(
          res?.reduce((accumulator, item) => {
            let data = +accumulator + +item.quantity;
            return data;
          }, 0)
        );

        this.purchaseInvoiceForm.get('vatAmountTotal')?.setValue(
          res.reduce((accumulator, item) => {
            const quantity = +item.quantity || 0; // Fallback to 0 if undefined or null
            const cost = +item.cost || 0;
            const discountAmount = +item.discountAmount || 0;
            const vatPercentage = +item.vatPercentage || 0;

            // Calculate VAT amount for this item
            const vatAmount = quantity * (cost - discountAmount) * (vatPercentage / 100);

            // Accumulate the VAT amounts
            return accumulator + vatAmount;
          }, 0)
        );

        this.purchaseInvoiceForm.get('discount')?.setValue(
          res?.reduce((accumulator, item) => {
            let data = +accumulator + +item.discountPercentage;
            return data;
          }, 0)
        );
        this.purchaseInvoiceForm.get('totalAfterVat')?.setValue(
          res.reduce((accumulator, item) => {
            const quantity = +item.quantity || 0; // Fallback to 0 if undefined or null
            const cost = +item.cost || 0;
            const discountAmount = +item.discountAmount || 0;
            const vatPercentage = +item.vatPercentage || 0;

            // Calculate the total for this item
            const baseAmount = quantity * (cost - discountAmount); // Base amount without VAT
            const vatAmount = baseAmount * (vatPercentage / 100); // VAT amount
            const totalAmount = baseAmount + vatAmount; // Total with VAT

            // Accumulate the total amounts
            return accumulator + totalAmount;
          }, 0)
        );
      }
    });

    // this.initWareHouseLookupData();

    this.addLineStockIn();

    this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((res) => {
      this.barcodeData = res;
    });

    this.purchasetransactionsService.sendPurchaseInvoice.subscribe((res:any) => {
      this.itemPostId = res;
    });

    this.purchaseInvoiceForm.get('vendorId')?.valueChanges.subscribe((res) => {
      let data = this.vendorItems.find((elem) => elem.id == res);
      this.purchaseInvoiceForm.get('vendorName')?.setValue(data?.name);
      this.purchaseInvoiceForm.get('currency')?.setValue(data?.vendorFinancialCurrencyName);
      this.purchaseInvoiceForm.get('currencyName')?.setValue(data?.vendorFinancialCurrencyName);
      this.purchaseInvoiceForm.get('currencyId')?.setValue(data?.vendorFinancialCurrencyId);
      this.purchaseInvoiceForm.get('paymentTermId')?.setValue(data?.paymentTermId);
      this.purchaseInvoiceForm.get('paymentTermName')?.setValue(data?.paymentTermName);
      this.purchaseInvoiceForm.get('name')?.setValue(data?.name);
      
      this.purchasetransactionsService.getCurrencyRate(
        data.vendorFinancialCurrencyId ?? this.currentUserService.getCurrency(),
        this.currentUserService.getCurrency()
      );
      this.purchasetransactionsService.sendcurrency.pipe(skip(1), take(1)).subscribe((dataCurrency) => {
        this.purchaseInvoiceForm.get('currencyRate')?.setValue(dataCurrency.rate);
        if(!data.vendorFinancialCurrencyId) {
          this.purchaseInvoiceForm.get('currencyId')?.setValue(this.currentUserService.getCurrency());
          this.purchaseInvoiceForm.get('currencyName')?.setValue('Egyptian Pound');
        }
      

      });
      console.log(this.purchaseInvoiceForm.value)

    });

  }
  isValidData() {
    this.lineError = -1;
    this.purchaseInvoiceFormArray.value.forEach((element: any, index: number) => {
      let lineNumber = index + 1;
      if (element.invoiceTracking.trackingType == this.sharedStock.StockOutTracking.Batch) {
        if (
          element.invoiceTracking.vendorBatchNo == null ||
          element.invoiceTracking.vendorBatchNo == ''
        ) {
          this.lineError = index;
          this.error = true;
          this.save = false;

          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.setTracking') + lineNumber
          );
        }
      } else if (element.invoiceTracking.trackingType == this.sharedStock.StockOutTracking.Serial) {
        if (element.invoiceTracking.serialId == null || element.invoiceTracking.serialId == '') {
          this.lineError = index;
          this.error = true;
          this.save = false;

          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.setTracking') + lineNumber
          );
        }
      } else {
        this.error = false;
        this.save = true;

        this.lineError = -1;
      }
    }, (this.save = true));
  }
  initializeForm() {
    this.purchaseInvoiceForm = this.fb.group({
      id: new FormControl(''),
      code: new FormControl(''),
      warehouseId: new FormControl('', [customValidators.required]),
      warehouseName: new FormControl(''),
      notes: new FormControl(''),
      description: new FormControl(''),
      sourceDocumentType: new FormControl(''),
      payementTerm: new FormControl(''),
      numberOfItems: 0,
      total: 0,
      totalAfterDiscount: 0,
      totalQuantity: 0,
      discount: 0,
      vatAmount: 0,
      vatAmountTotal: 0,
      totalAfterVat: 0,
      stockInStatus: new FormControl(''),
      paymentTermName: new FormControl(''),
      invoiceDate: new FormControl(new Date(), [customValidators.required]),
      currency: new FormControl(''),
      vendorId: new FormControl('', [customValidators.required]),
      vendorName: new FormControl(''),
      currencyRate: new FormControl('', [customValidators.required]),
      paymentTermId: new FormControl(''),
      reference: new FormControl(''),
      currencyId: new FormControl(''),
      currencyName: new FormControl(''),
      invoiceDetails: this.fb.array([]),

    });
  }
  get purchaseInvoiceFormArray() {
    return this.purchaseInvoiceForm.get('invoiceDetails') as FormArray;
  }
  setRowdata(indexLine: number, selectedItemId: any, list: any) {
    const selectedItem = list.find((item: any) => item.itemNumber === selectedItemId);
    const rowForm = this.purchaseInvoiceFormArray.at(indexLine) as FormGroup;

    if (!selectedItem) {
      return;
    }

    if (!rowForm) {
      return;
    }
    if (rowForm) {
      if (rowForm) {
        rowForm.patchValue({
          id: selectedItem?.id,
          barCode: selectedItem?.barCode,
          bardCodeId: selectedItem?.bardCodeId,
          description: selectedItem?.displayName,
          itemId: selectedItem?.itemId,
          itemCode: selectedItem?.itemCode,
          itemName: selectedItem?.itemName,
          itemCodeName: selectedItem?.itemCode,
          itemVariantId: selectedItem?.itemVariantId,
          itemVariantCode: selectedItem?.itemVariantCode,
          itemVariantNameAr: selectedItem?.itemVariantNameAr,
          itemVariantNameEn: selectedItem?.itemVariantNameEn,
          vatPercentage: selectedItem?.taxRatio,
          uomNameAr: selectedItem?.uomNameAr,
          uomNameEn: selectedItem?.uomNameEn,
          uomId: selectedItem?.uomId,
          quantity: selectedItem?.quantity || 1,
          taxId: selectedItem.taxId,
          cost: selectedItem?.price,
          subTotal: selectedItem?.subCost,
          notes: selectedItem?.notes,
          hasExpiryDate: selectedItem?.hasExpiryDate,
          invoiceEntryMode: selectedItem?.invoiceEntryMode || 'Manual',
          trackingType: selectedItem?.trackingType,
          uomOptions: selectedItem.itemsUOM,
        });

        const invoiceEntryMode = rowForm.get('invoiceTracking') as FormGroup;
        if (invoiceEntryMode) {
          invoiceEntryMode.patchValue({
            id: selectedItem.invoiceEntryMode?.id || 0,
            vendorBatchNo: selectedItem.invoiceEntryMode?.vendorBatchNo ?? '',
            expireDate: selectedItem.invoiceEntryMode?.expireDate ?? null,
            systemPatchNo: selectedItem.invoiceEntryMode?.systemPatchNo ?? '',
            serialId: selectedItem.invoiceEntryMode?.serialId ?? '',
            trackingType: selectedItem.trackingType ?? '',
            selectedValue: selectedItem.invoiceEntryMode?.quantity ?? 0,
          });
        }
      }
      rowForm
        .get('itemName')
        ?.setValue(
          selectedItem.itemCode + '-' + selectedItem.itemName + '-' + selectedItem.itemVariantNameAr
        );
      this.setUomName(indexLine, rowForm.get('uomOptions')?.value);
    }
  }

  setUomName(indexLine: number, list: any) {
    const rowForm = this.purchaseInvoiceFormArray.at(indexLine) as FormGroup;
    const selectedItem = list?.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }
  }
  initLookups() {
    this.purchasetransactionsService.getSharedWarehousesLookup(this.wearhouseSearch);
    this.purchasetransactionsService.warehouseLookup.subscribe({
      next: (res) => {
        this.warhouseLookupData = res;
        console.log(res);
      },
    });
  
    this.purchasetransactionsService.latestVendor(undefined).subscribe((res: any) => {
      this.vendorItems = res;
    });

    this.purchasetransactionsService.getLatestItemsList();
    this.purchasetransactionsService.lastestItem.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any, index: number) => ({
          ...elem,
          itemNumber: index + 1,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${
            this.currentLang == 'en' ? elem.itemVariantNameEn : elem.itemVariantNameAr
          }`,
        }));
      }
    });
  }


  openAdvancedSearch() { }

  changeUomName(indexLine: number, list: any) {
    const rowForm = this.purchaseInvoiceFormArray.at(indexLine) as FormGroup;
    const selectedItem = list?.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }
    rowForm.get('barCode')?.setValue('');
  }
  hasError(formGroup: FormGroup, controlName: string, error: string) {
    const control = formGroup.get(controlName);
    return control?.hasError(error) && control?.touched;
  }

  get stockIn() {
    return this.purchaseInvoiceForm.get('invoiceDetails') as FormArray;
  }



  onEdit(data: any) {}

  createStockIn() {
    return this.fb.group({
      uomOptions: [],
      barCode: '',
      bardCodeId: null,
      description: '',
      itemId: [null, customValidators.required],
      itemCode: '',
      itemCodeName: '',
      itemVariantId: '',
      discount: 0,
      discountAmount: '',
      uomName: '',
      uomId: ['', customValidators.required],
      taxRatio: '',
      quantity: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      cost: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      subTotal: '',

      notes: '',
      hasExpiryDate: '',
      stockInEntryMode: 'Manual',
      trackingType: '',
      discountPercentage: '',
      vatPercentage: '',
      taxId: null,

      invoiceTracking: this.fb.group({
        vendorBatchNo: '',
        expireDate: null,
        systemPatchNo: '',
        serialId: '',
        trackingType: '',
        selectedValue: '',
      }),
    });
  }

  disAmountChange(purchaseForm: FormGroup) {
    if (
      purchaseForm.controls['cost']?.value &&
      purchaseForm.controls['discountPercentage']?.value
    ) {
      let amountAndDiscount;

      amountAndDiscount =
        (purchaseForm.controls['discountPercentage']?.value *
          purchaseForm.controls['cost']?.value) /
        100;
      purchaseForm.get('discountAmount')?.setValue(Number(amountAndDiscount));
    } else {
      purchaseForm.get('discountAmount')?.setValue(0);
    }
  }

  amountChange(purchaseForm: FormGroup) {
    if (purchaseForm.controls['cost']?.value && purchaseForm.get('discountAmount')?.value) {
      let amountAndDiscount;

      amountAndDiscount =
        (purchaseForm.controls['discountAmount']?.value / purchaseForm.controls['cost']?.value) *
        100;
      purchaseForm.get('discountPercentage')?.setValue(Number(amountAndDiscount));
    } else {
      purchaseForm.get('discountPercentage')?.setValue(0);
    }
  }

  quantityCostChange(purchaseForm: FormGroup) {
    purchaseForm.get('discountPercentage')?.setValue(0);
    purchaseForm.get('discountAmount')?.setValue(0);
  }

  itemChanged(
    e: any,
    stockInFormGroup: FormGroup,
    clonedStockInFormGroup?: any,
    isBarcode: boolean = false
  ) {
    let data: any = this.latestItemsList.find((item: any) => item.itemId == e);

    this.uomLookup = data?.itemsUOM ?? clonedStockInFormGroup.itemsUOM;
    if (clonedStockInFormGroup) {
      stockInFormGroup.get('itemCodeName')?.reset();
    }

    if (!isBarcode) stockInFormGroup.get('barCode')?.setValue(null);

    stockInFormGroup
      .get('itemCodeName')
      ?.setValue(data?.itemCode ?? clonedStockInFormGroup?.itemCode);
    stockInFormGroup.get('itemId')?.setValue(data?.itemId ?? clonedStockInFormGroup?.itemId);
    stockInFormGroup
      .get('description')
      ?.setValue(
        ` ${clonedStockInFormGroup?.itemName ?? data?.itemName} - ${
          this.currentLang == 'en'
            ? clonedStockInFormGroup?.itemVariantNameEn ?? data?.itemVariantNameEn
            : clonedStockInFormGroup?.itemVariantNameAr ?? data?.itemVariantNameAr
        }`
      );

    stockInFormGroup
      .get('trackingType')
      ?.setValue(clonedStockInFormGroup.trackingType ?? data?.trackingType);
    stockInFormGroup
      .get('invoiceTracking')
      ?.get('trackingType')
      ?.setValue(clonedStockInFormGroup.trackingType ?? data?.trackingType);

    if (
      stockInFormGroup.get('invoiceTracking')?.get('trackingType')?.value ==
      this.sharedFinanceEnums.trackingType.Serial
    ) {
      stockInFormGroup.get('quantity')?.setValue(1);
    }

    stockInFormGroup
      .get('itemVariantId')
      ?.setValue(
        clonedStockInFormGroup?.itemVariantId
          ? clonedStockInFormGroup?.itemVariantId
          : data?.itemVariantId
      );
    stockInFormGroup
      .get('hasExpiryDate')
      ?.setValue(clonedStockInFormGroup.hasExpiryDate ?? data?.hasExpiryDate);
    stockInFormGroup.get('uomId')?.setValue(data?.uomId ?? clonedStockInFormGroup?.uomId);
    this.uomChanged(stockInFormGroup.get('uomId')?.value, stockInFormGroup, false);
    if (data?.hasExpiryDate) {
      stockInFormGroup
        .get('invoiceEntryMode')
        ?.get('expireDate')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('invoiceEntryMode')?.get('expireDate')?.updateValueAndValidity();
    }
    if (data?.trackingType == this.sharedFinanceEnums.trackingType.Batch) {
      stockInFormGroup
        .get('invoiceEntryMode')
        ?.get('vendorBatchNo')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('invoiceEntryMode')?.get('vendorBatchNo')?.updateValueAndValidity();
    }
    if (data?.trackingType == this.sharedFinanceEnums.trackingType.Serial) {
      stockInFormGroup
        .get('invoiceEntryMode')
        ?.get('serialId')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('invoiceEntryMode')?.get('serialId')?.updateValueAndValidity();
    }
    if (
      data?.trackingType == this.sharedFinanceEnums.trackingType.NoTracking &&
      stockInFormGroup.get('hasExpiryDate')?.value == false
    ) {
      stockInFormGroup.get('invoiceEntryMode')?.get('expireDate')?.clearValidators();
      stockInFormGroup.get('invoiceEntryMode')?.get('expireDate')?.updateValueAndValidity();
      stockInFormGroup.get('invoiceEntryMode')?.get('vendorBatchNo')?.clearValidators();
      stockInFormGroup.get('invoiceEntryMode')?.get('vendorBatchNo')?.updateValueAndValidity();
      stockInFormGroup.get('invoiceEntryMode')?.get('serialId')?.clearValidators();
      stockInFormGroup.get('invoiceEntryMode')?.get('serialId')?.updateValueAndValidity();
    }
  }
  uomChanged(e: any, stockInFormGroup: FormGroup, isBarcode: boolean) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);
    if (isBarcode) stockInFormGroup.get('barCode')?.setValue(null);
    stockInFormGroup
      .get('uomName')
      ?.setValue(this.currentLang == 'en' ? data.uomNameEn : data.uomNameAr);
  }

  addLineStockIn() {
    this.isValidData();
    if (!this.formService.validForm(this.purchaseInvoiceFormArray, false)) return;

    if (this.stockIn.valid) {
      this.formSubmited = false;
    } else {
      this.formSubmited = true;
    }
    if (!this.formService.validForm(this.stockIn, false)) return;
    this.stockIn.push(this.createStockIn());
  }
  onFilter(SearchTerm: string) {
    this.purchasetransactionsService.getLatestItemsList(SearchTerm);
    this.purchasetransactionsService.getItemsForAdvancedSearch('', SearchTerm, new PageInfo());
    this.purchasetransactionsService.lastestItem.subscribe((res: any) => {
      if (res.length > 0) {
        if (this.selectedLanguage === 'ar') {
          this.latestItemsList = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,
            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
          }));
        } else {
          this.latestItemsList = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,

            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameEn}`,
          }));
        }

      }
    });
  }


  getLatestItemsList(id: number) {
    this.transactionsService.getLatestItemsListByWarehouse('', id);
  }


  openDialog(indexline: number, stockInFormGroup: FormGroup) {
    const ref = this.dialog.open(ItemAdvancedSearchPurchaseInvoiceComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        console.log(selectedItems)
        stockInFormGroup.get('itemId')?.setValue(selectedItems.itemId);
        stockInFormGroup.get('vatPercentage')?.setValue(selectedItems.taxRatio);
        this.setRowDataFromBarCode(indexline, selectedItems, '');
      }
    });
  }


  setRowDataFromBarCode(indexLine: number, selectedItem: any, barcode: string) {
    const rowForm = this.purchaseInvoiceFormArray.at(indexLine) as FormGroup;

    if (!selectedItem) {
      return;
    }

    if (!rowForm) {
      return;
    }
    if (rowForm) {
      if (rowForm) {
        rowForm.patchValue({
          id: selectedItem?.id || 0,
          barCode: barcode,
          bardCodeId: selectedItem?.bardCodeId,
          description:
            selectedItem?.itemName +
            '-' +
            (this.selectedLanguage === 'en'
              ? selectedItem?.itemVariantNameEn
              : selectedItem?.itemVariantNameAr),
          itemId: selectedItem?.itemId,
          itemCode: selectedItem?.itemCode,
          itemName: selectedItem?.itemName,
          itemCodeName: selectedItem?.itemCode,
          itemVariantId: selectedItem?.itemVariantId,
          itemVariantCode: selectedItem?.itemVariantCode,
          itemVariantNameAr: selectedItem?.itemVariantNameAr,
          itemVariantNameEn: selectedItem?.itemVariantNameEn,
          uomNameAr: selectedItem?.uomNameAr,
          uomNameEn: selectedItem?.uomNameEn,
          uomId: selectedItem?.uomId,
          quantity: selectedItem?.quantity || 1,
          cost: selectedItem?.price,
          subTotal: selectedItem?.subCost,
          notes: selectedItem?.notes,
          hasExpiryDate: selectedItem?.hasExpiryDate,
          stockInEntryMode: selectedItem?.stockInEntryMode || 'Manual',
          trackingType: selectedItem?.trackingType,
          uomOptions: selectedItem?.itemsUOM,
        });

        const invoiceEntryMode = rowForm.get('invoiceEntryMode') as FormGroup;
        if (invoiceEntryMode) {
          invoiceEntryMode.patchValue({
            id: selectedItem.invoiceEntryMode?.id || 0,
            vendorBatchNo: selectedItem.invoiceEntryMode?.vendorBatchNo,
            expireDate: selectedItem.invoiceEntryMode?.expireDate,
            systemPatchNo: selectedItem.invoiceEntryMode?.systemPatchNo,
            serialId: selectedItem.invoiceEntryMode?.serialId,
            trackingType: selectedItem.trackingType,
            selectedValue: selectedItem.invoiceEntryMode?.quantity,
          });
        }
      }
      rowForm
        .get('itemName')
        ?.setValue(
          selectedItem.itemCode + '-' + selectedItem.itemName + '-' + selectedItem.itemVariantNameAr
        );
      this.setUomName(indexLine, rowForm.get('uomOptions')?.value);
    }
  }
  setTracking(setTracking: FormGroup) {
    console.log(setTracking.value);

    const dialogRef = this.dialog.open(PurchaseInvoiceTrackingComponent, {
      width: '60%',
      height: '450px',
      data: {
        trackingType: setTracking.get('trackingType')?.value,
        expiry: setTracking.get('hasExpiryDate')?.value,
        trackingValue: setTracking.get('invoiceTracking')?.get('selectedValue')?.value,
      },
    });
    dialogRef.onClose.subscribe((res: any) => {
      if (res) {
        this.selectedTraking = res;
        setTracking.get('invoiceTracking')?.patchValue({ ...res });
        setTracking.get('invoiceTracking')?.get('selectedValue')?.setValue(res);
        this.isValidData();
      }
      this.isValidData();
    });
  }

  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
  }

  onSave() {
    this.isValidData();
    if (!this.formService.validForm(this.purchaseInvoiceForm, false)) return;
    if (!this.formService.validForm(this.stockIn, false)) return;

    const mappedInvoice: AddPurchaseInvoiceDto = {
      invoiceDate: this.purchaseInvoiceForm.value.invoiceDate || null,
      description: this.purchaseInvoiceForm.value.description || null,
      warehouseId: this.purchaseInvoiceForm.value.warehouseId || 0,
      warehouseName: this.purchaseInvoiceForm.value.warehouseName || '',
      vendorId: this.purchaseInvoiceForm.value.vendorId || null,
      currencyId : this.purchaseInvoiceForm.value.currencyId || null,
      currencyName : this.purchaseInvoiceForm.value.currencyName ,
      vendorName: this.purchaseInvoiceForm.value.vendorName || '',
      currencyRate: +this.purchaseInvoiceForm.value.currencyRate || 0, // Ensure it's a number
      paymentTermId: this.purchaseInvoiceForm.value.paymentTermId ?? null,
      reference: this.purchaseInvoiceForm.value.reference || null,
      invoiceDetails: this.purchaseInvoiceForm.value.invoiceDetails.map((detail: any) => ({
        barCode: detail.barCode || null,
        barCodeId: detail.barCodeId || null,
        itemId: detail.itemId || 0,
        itemCode: detail.itemCode || '',
        itemVariantId: detail.itemVariantId || 0,
        description: detail.description || null,
        uomId: detail.uomId || '',
        uomName: detail.uomName || '',
        quantity: +detail.quantity || 0, // Ensure it's a number
        cost: +detail.cost || 0, // Ensure it's a number
        discountPercentage: +detail.discountPercentage || 0, // Ensure it's a number
        discountAmount: +detail.discountAmount || 0, // Ensure it's a number
        vatPercentage: detail.vatPercentage || null,
        taxId: detail.taxId || null,
        notes: detail.notes || null,
        invoiceEntryMode: detail.invoiceEntryMode,
        trackingType: detail.trackingType,
        hasExpiryDate: detail.hasExpiryDate || false,
        invoiceTracking: {
          vendorBatchNo: detail.invoiceTracking.vendorBatchNo || null,
          quantity: detail.invoiceTracking.quantity || 0,
          hasExpiryDate: detail.invoiceTracking.hasExpiryDate || false,
          expireDate: detail.invoiceTracking.expireDate || null,
          systemPatchNo: detail.invoiceTracking.systemPatchNo || null,
          serialId: detail.invoiceTracking.serialId || null,
          trackingType: detail.invoiceTracking.trackingType,
        },
      })),
    };

    if (this.save) {
      this.purchasetransactionsService.addPurchaseInvoice(mappedInvoice);
      this.purchasetransactionsService.sendPurchaseInvoice.subscribe((res: number | any) => {
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
  }

  OnDelete(i: number) {
    this.stockIn.removeAt(i);
  }
  addToPost() {
    this.purchasetransactionsService.postInvoice(this.savedDataId);

  }
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,

    private purchasetransactionsService: PurchaseTransactionsService,
    private router: RouterService,
    public formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    public sharedStock: SharedStock,
    private toasterService: ToasterService,
    private currentUserService: CurrentUserService
  ) {
    this.currentLang = this.languageService.getLang();
    this.selectedLanguage = this.languageService.getLang();
  }
}
