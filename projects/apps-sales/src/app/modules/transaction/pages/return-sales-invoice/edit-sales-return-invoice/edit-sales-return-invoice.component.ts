import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  OperationalStockIn,
  GetWarehouseList,
  StockInDetail,
} from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { LatestItem } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models';
import { AddPurchaseInvoiceDto } from 'projects/apps-purchase/src/app/modules/purchase-transactions/models/addPurchaseInvoice';
import { PurchaseTransactionsService } from 'projects/apps-purchase/src/app/modules/purchase-transactions/purchase-transactions.service';
import { skip, take } from 'rxjs';
import {
  LookupEnum,
  lookupDto,
  PageInfoResult,
  MenuModule,
  customValidators,
  PageInfo,
  RouterService,
  LanguageService,
  FormsService,
  ToasterService,
  CurrentUserService,
} from 'shared-lib';
import { ItemAdvancedSearchSalesInvoiceComponentComponent } from '../../../components/item-advanced-search-sales-invoice-component/item-advanced-search-sales-invoice-component.component';
import { SalesInvoiceTrackingComponentComponent } from '../../../components/sales-invoice-tracking-component/sales-invoice-tracking-component.component';

@Component({
  selector: 'app-edit-sales-return-invoice',
  templateUrl: './edit-sales-return-invoice.component.html',
  styleUrl: './edit-sales-return-invoice.component.scss'
})
export class EditSalesReturnInvoiceComponent implements OnInit {
  salesReturnForm: FormGroup = new FormGroup({});
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
  warhouseLookupData: any[] = [];
  paymentLookupData: { id: number; name: string }[] = [];
  vendorItems: any[];
  uomLookup: any = [];
  currentLang: string;
  showError: boolean = false;
  showPost: boolean;
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


  change(val : any){
    console.log(val);
    
  }
  ngOnInit(): void {
    this.initializeForm();
    this.initLookups();

    this.salesReturnForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
      let data = this.oprationalLookup.find((elem) => elem.id == res);
      this.salesReturnForm.get('warehouseId')?.setValue(data?.warehouseId);
      this.salesReturnForm.get('warehouseName')?.setValue(data?.warehouseName);
    });

    this.salesReturnFormArray.valueChanges.subscribe((res: any[]) => {
      // Ensure `res` is an array
      if (Array.isArray(res)) {
        this.salesReturnForm.get('numberOfItems')?.setValue(res.length);

        // Calculate totalAfterDiscount for all items using reduce
        this.salesReturnForm.get('totalAfterDiscount')?.setValue(
          res.reduce((acc, item) => {
            const itemTotal = item.quantity * (item.cost - item.discountAmount);
            return acc + itemTotal;
          }, 0)
        );
        this.salesReturnForm.get('totalQuantity')?.setValue(
          res?.reduce((accumulator, item) => {
            let data = +accumulator + +item.quantity;
            return data;
          }, 0)
        );

        this.salesReturnForm.get('vatAmountTotal')?.setValue(
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

        this.salesReturnForm.get('discount')?.setValue(
          res?.reduce((accumulator, item) => {
            let data = +accumulator + +item.discountPercentage;
            return data;
          }, 0)
        );
        this.salesReturnForm.get('totalAfterVat')?.setValue(
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

    // this.addLineStockIn();

    this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((res) => {
      this.barcodeData = res;
    });

    this.purchasetransactionsService.sendPurchaseInvoice.subscribe((res: any) => {
      this.itemPostId = res;
    });

    this.salesReturnForm.get('vendorId')?.valueChanges.subscribe((res) => {
      let data = this.vendorItems.find((elem) => elem.id == res);
      this.salesReturnForm.get('vendorName')?.setValue(data?.name);
      this.salesReturnForm.get('currency')?.setValue(data?.vendorFinancialCurrencyName);
      this.salesReturnForm.get('currencyName')?.setValue(data?.vendorFinancialCurrencyName);
      this.salesReturnForm.get('currencyId')?.setValue(data?.vendorFinancialCurrencyId);
      this.salesReturnForm.get('paymentTermId')?.setValue(data?.paymentTermId);
      this.salesReturnForm.get('paymentTermName')?.setValue(data?.paymentTermName);
      this.salesReturnForm.get('name')?.setValue(data?.name);

      this.purchasetransactionsService.getCurrencyRate(
        data.vendorFinancialCurrencyId ?? this.currentUserService.getCurrency(),
        this.currentUserService.getCurrency()
      );
      this.purchasetransactionsService.sendcurrency
        .pipe(skip(1), take(1))
        .subscribe((dataCurrency) => {
          this.salesReturnForm.get('currencyRate')?.setValue(dataCurrency.rate);

          if (!data.vendorFinancialCurrencyId) {
            this.salesReturnForm.get('currencyId')?.setValue(this.currentUserService.getCurrency());
            this.salesReturnForm.get('currencyName')?.setValue('Egyptian Pound');
            this.salesReturnForm.get('currency')?.setValue('Egyptian Pound');
          }
        });
    });
  }
  isValidData() {
    this.lineError = -1;
    this.salesReturnFormArray.value.forEach((element: any, index: number) => {
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

  // form section########## 
  initializeForm() {
    this.salesReturnForm = this.fb.group({
      id: new FormControl(''),
      code: new FormControl(''),
      warehouseId: new FormControl('', [customValidators.required]),
      warehouseName: new FormControl(''),
      salesmanId: new FormControl(''),
      relatedJournal: new FormControl(''),
      description: new FormControl(''),
      createdStockIn: new FormControl(''),
      returnDate: new FormControl(new Date(), [customValidators.required]),

      customerCode: new FormControl('', [customValidators.required]),
      customerName: new FormControl(''),
      currencyId: new FormControl(''),
      rate: new FormControl('', [customValidators.required]),
      paymentTermId: new FormControl(''),
      creditLimit: new FormControl(''),
      salesInvoiceId: new FormControl('', [customValidators.required]),

      numberOfItems: 0,
      total: 0,
      discount: 0,
      totalOfQuantity: 0,
      vatAmount: 0,
      totalAfterVat: 0,

      salesReturnDetails: this.fb.array([]),
    });
  }
  initFromArray() {
    return this.fb.group({
      uomOptions: [],
      barCode: '',
      bardCodeId: null,
      itemName: '', // description
      itemId: [null, customValidators.required],
      itemCodeName: '',
      itemVariantId: '',
      discount: 0,
      discountAmount: '',
      uomName: '',
      uomId: ['', customValidators.required],
      taxRatio: '',
      remainQTY: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      toReturnQTY: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      originalQTY: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
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

  get salesReturnFormArray() {
    return this.salesReturnForm.get('salesReturnDetails') as FormArray;
  }
  // form section##########

  setRowdataByItemCode(indexLine: number, selectedItemId: any, list: any) {
    debugger
    const selectedItem = list.find((item: any) => item.itemNumber === selectedItemId);
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;

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
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;
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
        this.warhouseLookupData = res
        
        
      },
    });

    this.purchasetransactionsService.latestVendor(undefined).subscribe((res: any) => {
      this.vendorItems = res;
    });

    this.purchasetransactionsService.getLatestItemsList();
    this.purchasetransactionsService.lastestItem.subscribe((res) => {
      debugger
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

  openAdvancedSearch() {}

  changeUomName(indexLine: number, list: any) {
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;
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

  onEdit(data: any) {}

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
  discountChange(purchaseForm: FormGroup) {}

  discountAmountChange(purchaseForm: FormGroup) {
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

  addLine() {
    this.isValidData();
    if (!this.formService.validForm(this.salesReturnFormArray, false)) return;

    if (this.salesReturnFormArray.valid) {
      this.formSubmited = false;
    } else {
      this.formSubmited = true;
    }
    if (!this.formService.validForm(this.salesReturnFormArray, false)) return;
    this.salesReturnFormArray.push(this.initFromArray());
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

  openDialogFromItemCode(indexline: number, stockInFormGroup: FormGroup) {
    const ref = this.dialog.open(ItemAdvancedSearchSalesInvoiceComponentComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        stockInFormGroup.get('itemId')?.setValue(selectedItems.itemId);
        stockInFormGroup.get('vatPercentage')?.setValue(selectedItems.taxRatio);
        this.setRowDataFromBarCode(indexline, selectedItems, '');
        this.setRowDataFromPopup(indexline, selectedItems);
      }

      console.log(this.salesReturnFormArray.value);
    });
  }

  setRowDataFromPopup(indexLine: number, selectedItem: any) {
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;
debugger
    if (rowForm) {
      rowForm.patchValue({
        itemNumber: selectedItem.itemNumber,
        id: selectedItem.id || 0,
        barCode: '',
        bardCodeId: null,
        itemId: selectedItem.itemId,
        itemName: selectedItem.itemName,
        itemVariantId: selectedItem.itemVariantId,
        uomId: selectedItem.uomId,
        uomOptions: selectedItem.itemsUOM,
        description: selectedItem.itemName + '-' + selectedItem.itemVariantNameEn,
        cost: 1,
        vat: selectedItem.taxRatio || 0,
        trackingType: selectedItem.trackingType,
        hasExpiryDate: selectedItem.hasExpiryDate,
      });

      // Handle the nested form group
      const invoiceTrackingGroup = rowForm.get('invoiceTracking') as FormGroup;
      if (invoiceTrackingGroup) {
        invoiceTrackingGroup.patchValue({
          invoiceDetailId: selectedItem?.invoiceTrackingGroup?.invoiceDetailId || 0,
          vendorBatchNo: selectedItem.invoiceTrackingGroup?.vendorBatchNo || '',
          quantity: selectedItem.quantity,
          hasExpiryDate: selectedItem.hasExpiryDate,
          expireDate: selectedItem.expireDate,
          systemPatchNo: selectedItem.invoiceTrackingGroup?.systemPatchNo || '',
          serialId: selectedItem.invoiceTrackingGroup?.serialId || null,
          trackingType: selectedItem.trackingType,
        });
      }
    }
    rowForm
      .get('itemName')
      ?.setValue(
        selectedItem.itemCode + '-' + selectedItem.itemName + '-' + selectedItem.itemVariantNameEn
      );
    this.setUomName(indexLine, rowForm.get('uomOptions')?.value);
  }

  setRowDataFromBarCode(indexLine: number, selectedItem: any, barcode: string) {
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;

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
    const dialogRef = this.dialog.open(SalesInvoiceTrackingComponentComponent, {
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
    const salesReturnFormValues = this.salesReturnForm.value;
    const salesReturnDetails = this.salesReturnFormArray.value.map((detail: any) => {
      return detail;
    });

    const dto: any = {
      id: salesReturnFormValues.id,
      code: salesReturnFormValues.code,
      warehouseId: salesReturnFormValues.warehouseId,
      warehouseName: salesReturnFormValues.warehouseName,
      salesmanId: salesReturnFormValues.salesmanId,
      relatedJournal: salesReturnFormValues.relatedJournal,
      description: salesReturnFormValues.description,
      createdStockIn: salesReturnFormValues.createdStockIn,
      returnDate: salesReturnFormValues.returnDate,
      customerCode: salesReturnFormValues.customerCode,
      customerName: salesReturnFormValues.customerName,
      currencyId: salesReturnFormValues.currencyId,
      rate: salesReturnFormValues.rate,
      paymentTermId: salesReturnFormValues.paymentTermId,
      creditLimit: salesReturnFormValues.creditLimit,
      salesInvoiceId: salesReturnFormValues.salesInvoiceId,
      numberOfItems: salesReturnFormValues.numberOfItems,
      total: salesReturnFormValues.total,
      discount: salesReturnFormValues.discount,
      totalOfQuantity: salesReturnFormValues.totalOfQuantity,
      vatAmount: salesReturnFormValues.vatAmount,
      totalAfterVat: salesReturnFormValues.totalAfterVat,
      salesReturnDetails: salesReturnDetails,
    };

    console.log(dto);

    // return dto;
    // this.isValidData();
    // if (!this.formService.validForm(this.salesReturnForm, false)) return;
    // if (!this.formService.validForm(this.salesReturnFormArray, false)) return;

    // const mappedInvoice: AddPurchaseInvoiceDto = {
    //   invoiceDate: this.salesReturnForm.value.invoiceDate || null,
    //   description: this.salesReturnForm.value.description || null,
    //   warehouseId: this.salesReturnForm.value.warehouseId || 0,
    //   warehouseName: this.salesReturnForm.value.warehouseName || '',
    //   vendorId: this.salesReturnForm.value.vendorId || null,
    //   currencyId: this.salesReturnForm.value.currencyId || null,
    //   currencyName: this.salesReturnForm.value.currencyName,
    //   vendorName: this.salesReturnForm.value.vendorName || '',
    //   currencyRate: +this.salesReturnForm.value.currencyRate || 0, // Ensure it's a number
    //   paymentTermId: this.salesReturnForm.value.paymentTermId ?? null,
    //   reference: this.salesReturnForm.value.reference || null,
    //   salesReturnDetails: this.salesReturnForm.value.salesReturnDetails.map((detail: any) => ({
    //     barCode: detail.barCode || null,
    //     barCodeId: detail.barCodeId || null,
    //     itemId: detail.itemId || 0,
    //     itemCode: detail.itemCode || '',
    //     itemVariantId: detail.itemVariantId || 0,
    //     description: detail.description || null,
    //     uomId: detail.uomId || '',
    //     uomName: detail.uomName || '',
    //     quantity: +detail.quantity || 0, // Ensure it's a number
    //     cost: +detail.cost || 0, // Ensure it's a number
    //     discountPercentage: +detail.discountPercentage || 0, // Ensure it's a number
    //     discountAmount: +detail.discountAmount || 0, // Ensure it's a number
    //     vatPercentage: detail.vatPercentage || null,
    //     taxId: detail.taxId || null,
    //     notes: detail.notes || null,
    //     invoiceEntryMode: detail.invoiceEntryMode,
    //     trackingType: detail.trackingType,
    //     hasExpiryDate: detail.hasExpiryDate || false,
    //     invoiceTracking: {
    //       vendorBatchNo: detail.invoiceTracking.vendorBatchNo || null,
    //       quantity: detail.invoiceTracking.quantity || 0,
    //       hasExpiryDate: detail.invoiceTracking.hasExpiryDate || false,
    //       expireDate: detail.invoiceTracking.expireDate || null,
    //       systemPatchNo: detail.invoiceTracking.systemPatchNo || null,
    //       serialId: detail.invoiceTracking.serialId || null,
    //       trackingType: detail.invoiceTracking.trackingType,
    //     },
    //   })),
    // };
    // console.log(this.form);

    // if (this.save) {
    //   this.purchasetransactionsService.addPurchaseInvoice(mappedInvoice);
    //   this.purchasetransactionsService.sendPurchaseInvoice.subscribe((res: number | any) => {
    //     if (typeof res == 'number') {
    //       this.savedDataId = res;
    //       this.dataToReadOnly = true;
    //       this.showPost = true;
    //     } else {
    //       this.dataToReadOnly = false;
    //       this.showPost = false;
    //     }
    //   });
    // }
  }

  OnDelete(i: number) {
    this.salesReturnFormArray.removeAt(i);
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
