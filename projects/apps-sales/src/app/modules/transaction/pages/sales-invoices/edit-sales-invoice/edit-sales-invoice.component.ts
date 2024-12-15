import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {  OperationalStockIn, StockInDetail } from 'projects/apps-inventory/src/app/modules/items/models';
import { debounceTime, distinctUntilChanged, skip, take } from 'rxjs';
import { LookupEnum, lookupDto, PageInfoResult, MenuModule, customValidators, RouterService, LanguageService, FormsService, ToasterService, CurrentUserService, PageInfo } from 'shared-lib';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { ItemAdvancedSearchSalesInvoiceComponentComponent } from '../../../components/item-advanced-search-sales-invoice-component/item-advanced-search-sales-invoice-component.component';
import { SalesInvoiceTrackingComponentComponent } from '../../../components/sales-invoice-tracking-component/sales-invoice-tracking-component.component';
import { LatestItem, AddSalesInvoice } from '../../../models';
import { TransactionService } from '../../../transaction.service';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';

@Component({
  selector: 'app-edit-sales-invoice',
  templateUrl: './edit-sales-invoice.component.html',
  styleUrl: './edit-sales-invoice.component.scss'
})
export class EditSalesInvoiceComponent implements OnInit {
  salesReturnForm: FormGroup = new FormGroup({});
  formSubmited: boolean = false;
  errorsArray: any = [];
  pricePolicyLookup: any = [];
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  oprationalLookup: OperationalStockIn[] = [];
  selectedTraking: any = {};
  customerData: any = {};
  itemSelectedData: any = {};
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
  vendorItems: any[] = [];
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

    this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((res) => {
      this.barcodeData = res;
    });

    // this.salesTransactionService.sendPurchaseInvoice.subscribe((res: any) => {
    //   this.itemPostId = res;
    // });

    this.salesReturnForm.get('customerId')?.valueChanges.subscribe((res) => {
      let data = this.vendorItems.find((elem) => elem.id == res);

      this.customerData = data;
      this.salesReturnForm.get('customerName')?.setValue(data?.name);
      this.salesReturnForm.get('currency')?.setValue(data?.vendorFinancialCurrencyName);
      this.salesReturnForm.get('currencyName')?.setValue(data?.vendorFinancialCurrencyName);
      this.salesReturnForm.get('currencyId')?.setValue(data?.vendorFinancialCurrencyId);
      this.salesReturnForm.get('paymentTermId')?.setValue(data?.paymentTermId);
      this.salesReturnForm.get('paymentTermName')?.setValue(data?.paymentTermName);
      this.salesReturnForm.get('name')?.setValue(data?.name);
      this.salesReturnForm.get('customerCreditLimit')?.setValue(data?.creditLimit);

      this.salesTransactionService.getCurrencyRate(
        data.vendorFinancialCurrencyId ?? this.currentUserService.getCurrency(),
        this.currentUserService.getCurrency()
      );
      this.salesTransactionService.sendcurrency.pipe(skip(1), take(1)).subscribe((dataCurrency) => {
        this.salesReturnForm.get('currencyRate')?.setValue(dataCurrency.rate);

        if (!data.vendorFinancialCurrencyId) {
          this.salesReturnForm.get('currencyId')?.setValue(this.currentUserService.getCurrency());
          this.salesReturnForm.get('currencyName')?.setValue('Egyptian Pound');
          this.salesReturnForm.get('currency')?.setValue('Egyptian Pound');
        }
      });
    });

    this.salesReturnForm.get('warehouseId')?.valueChanges.subscribe((res) => {
      this.getLatestItemByWarehouseId(res);
    });
  }
  // isValidData() {
  //   this.lineError = -1;
  //   this.salesReturnFormArray.value.forEach((element: any, index: number) => {
  //     let lineNumber = index + 1;
  //     if (element.salesInvoiceDetails.trackingType == this.sharedStock.StockOutTracking.Batch) {
  //       if (
  //         element.salesInvoiceDetails.vendorBatchNo == null ||
  //         element.salesInvoiceDetails.vendorBatchNo == ''
  //       ) {
  //         this.lineError = index;
  //         this.error = true;
  //         this.save = false;

  //         this.toasterService.showError(
  //           this.languageService.transalte('messages.error'),
  //           this.languageService.transalte('messages.setTracking') + lineNumber
  //         );
  //       }
  //     } else if (element.salesInvoiceDetails.trackingType == this.sharedStock.StockOutTracking.Serial) {
  //       if (element.salesInvoiceDetails.serialId == null || element.salesInvoiceDetails.serialId == '') {
  //         this.lineError = index;
  //         this.error = true;
  //         this.save = false;

  //         this.toasterService.showError(
  //           this.languageService.transalte('messages.error'),
  //           this.languageService.transalte('messages.setTracking') + lineNumber
  //         );
  //       }
  //     } else {
  //       this.error = false;
  //       this.save = true;

  //       this.lineError = -1;
  //     }
  //   }, (this.save = true));
  // }

  // form section##########
  initializeForm() {
    this.salesReturnForm = this.fb.group({
      id: new FormControl(''),
      code: new FormControl(''),
      warehouseId: new FormControl('', [customValidators.required]),
      warehouseName: new FormControl(''),
      customerId: new FormControl('', [customValidators.required]),
      salesmanId: new FormControl(''),
      relatedJournal: new FormControl(''),
      description: new FormControl(''),
      createdStockIn: new FormControl(''),
      invoiceDate: new FormControl(new Date(), [customValidators.required]),
      customerCode: new FormControl(''),
      customerName: new FormControl(''),
      currencyId: new FormControl(''),
      rate: new FormControl(''),
      paymentTermId: new FormControl(''),
      customerCreditLimit: new FormControl(''),
      pricePolicyId: new FormControl('', [customValidators.required]),
      currency: new FormControl(''),
      vendorId: new FormControl(''),
      vendorName: new FormControl(''),
      currencyRate: new FormControl('', [customValidators.required]),
      reference: new FormControl(''),
      currencyName: new FormControl(''),
      paymentTermName: new FormControl(''),
      numberOfItems: 0,
      total: 0,
      discount: 0,
      totalOfQuantity: 0,
      totalAfterDiscount: 0,
      vatAmount: 0,
      totalAfterVat: 0,

      invoiceDetails: this.fb.array([]),
    });
  }
  initFromArray() {
    return this.fb.group({
      uomOptions: [],
      trackingOptions: [],
      barCode: '',
      bardCodeId: null,
      description: '',
      itemId: [null, customValidators.required],
      itemCodeName: '',
      itemVariantId: '',
      barCodeId: null,
      discount: 0,
      discountAmount: '',
      uomName: '',
      itemName: '',
      itemVariantCode: '',
      itemVariantNameAr: '',
      itemVariantNameEn: '',
      itemStockBatchHeaderId: 0,
      pricePolicyDetailId: 0,
      categoryType: '',
      categoryId: '',
      itemCategoryNameAr: '',
      itemCategoryNameEn: '',
      trackingTypeNo: new FormControl(''),

      itemCode: '',
      uomId: ['', customValidators.required],
      taxRatio: '',
      uomCode: null,
      uomNameAr: '',
      uomNameEn: '',
      quantity: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],
      cost: [
        null,
        [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers],
      ],

      expiryDate: [''],
      notes: '',
      hasExpiryDate: '',
      stockInEntryMode: 'Manual',
      trackingType: '',
      discountPercentage: '',
      vatPercentage: '',
      taxId: null,

      salesInvoiceTracking: this.fb.group({
        batchNo: '',
        expireDate: null,
        quantity: 0,
        hasExpiryDate: '',
        serialId: '',
        trackingType: '',
      }),
    });
  }

  get salesReturnFormArray() {
    return this.salesReturnForm.get('invoiceDetails') as FormArray;
  }
  // form section##########

  onTrackingChanged(e: any, formTracking: FormGroup, i: number) {
    let salesInvoiceTracking = formTracking.get('salesInvoiceTracking');
    let trackingOptions = formTracking.controls['trackingOptions'].value;

    let trackingOptionsData = trackingOptions.find((elem: any) => elem.id == e);
    formTracking.get('trackingType')?.setValue(trackingOptionsData?.trackingNo);

    salesInvoiceTracking?.patchValue({
      batchNo:
        trackingOptionsData.trackingType == this.sharedFinanceEnums.trackingType.Batch
          ? trackingOptionsData?.trackingNo
          : null,
      quantity: trackingOptionsData?.totalQuantity,
      hasExpiryDate: true,
      expireDate: trackingOptionsData?.expiryDate ?? null,
      serialId:
        trackingOptionsData.trackingType == this.sharedFinanceEnums.trackingType.Serial
          ? trackingOptionsData?.trackingNo
          : null,
      trackingType: trackingOptionsData.trackingType,
    });

    formTracking.get('quantity')?.setValue(trackingOptionsData?.totalQuantity);
    formTracking.get('trackingTypeNo')?.setValue(trackingOptionsData?.trackingNo);

    if (trackingOptionsData?.expiryDate) {
      formTracking.get('expiryDate')?.setValue(trackingOptionsData?.expiryDate);
    }
  }

  setRowdataByItemCode(indexLine: number, selectedItemId: any, list: any) {
    const selectedItem = list.find((item: any) => item.itemNumber === selectedItemId);
    this.itemSelectedData = selectedItem;
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
          itemStockBatchHeaderId: selectedItem?.batchHeaderId,
          barCodeId: selectedItem?.barCodeId,
          categoryId: selectedItem.categoryId,
          categoryType: selectedItem.categoryType,
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
          quantity: selectedItem?.quantity,
          taxId: selectedItem.taxId,
          cost: selectedItem?.price,
          subTotal: selectedItem?.subCost,
          notes: selectedItem?.notes,
          hasExpiryDate: selectedItem?.hasExpiryDate,
          invoiceEntryMode: selectedItem?.invoiceEntryMode || 'Manual',
          trackingType: selectedItem?.trackingType,
          uomOptions: selectedItem.itemsUOM,
          trackingOptions: selectedItem.trackingList.map((elem: any, i: number) => {
            elem.id = i;
            return elem;
          }),
        });
        if (selectedItem?.trackingType == this.sharedFinanceEnums.trackingType.Serial) {
          rowForm.get('quantity')?.setValue(1);
        }
      }
      rowForm
        .get('itemName')
        ?.setValue(
          selectedItem.itemCode + '-' + selectedItem.itemName + '-' + selectedItem.itemVariantNameAr
        );
      this.setUomName(indexLine, rowForm.get('uomOptions')?.value);
    }

    this.getItemPricePolicy(
      this.salesReturnForm.get('pricePolicyId')?.value,
      selectedItem?.itemId,
      selectedItem?.uomId,
      selectedItem?.itemVariantId,
      rowForm
    );
  }

  getItemPricePolicy(
    pricePolicyId: number,
    itemId: number,
    uomId: string,
    itemVariantId: number,
    rowForm: FormGroup
  ) {
    this.salesTransactionService.getItemPricePolicy(pricePolicyId, itemId, uomId, itemVariantId);

    this.salesTransactionService.sendPricePolicy.pipe(skip(1), take(1)).subscribe((priceData) => {
      rowForm.get('pricePolicyDetailId')?.setValue(priceData?.pricePolicyDetailId);
      rowForm.get('cost')?.setValue(priceData?.price);
    });
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
    this.salesTransactionService.getSharedWarehousesLookup(this.wearhouseSearch);
    this.salesTransactionService.warehouseLookup.subscribe({
      next: (res) => {
        this.warhouseLookupData = res;
      },
    });

    this.salesTransactionService.latestVendor(undefined).subscribe((res: any) => {
      this.vendorItems = res;
    });

    this.salesTransactionService.getPricePolicyLookup();
    this.salesTransactionService.sendPricePolicyLookup.subscribe((data) => {
      this.pricePolicyLookup = data;
    });
  }

  getLatestItemByWarehouseId(id: number) {
    this.salesTransactionService.getLatestItemsList(id);
    this.salesTransactionService.lastestItem.subscribe((res) => {
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

  changeUomName(indexLine: number, list: any, uomId: number, FormGroup: FormGroup) {
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;
    const selectedItem = list?.find((item: any) => item.uomId === FormGroup.get('uomId')?.value);
    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }
    rowForm.get('barCode')?.setValue('');

    this.getItemPricePolicy(
      this.salesReturnForm.get('pricePolicyId')?.value,
      this.itemSelectedData?.itemId,
      selectedItem?.uomId,
      this.itemSelectedData?.itemVariantId,
      FormGroup
    );
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
      .get('salesInvoiceTracking')
      ?.get('trackingType')
      ?.setValue(clonedStockInFormGroup.trackingType ?? data?.trackingType);

    if (
      stockInFormGroup.get('salesInvoiceTracking')?.get('trackingType')?.value ==
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
    if (!this.formService.validForm(this.salesReturnForm, false)) return;
    if (!this.formService.validForm(this.salesReturnFormArray, false)) return;

    if (this.salesReturnFormArray.valid) {
      this.formSubmited = false;
    } else {
      this.formSubmited = true;
    }
    this.salesReturnFormArray.push(this.initFromArray());
  }

  onFilter(SearchTerm: string) {
    this.salesTransactionService.getLatestItemsList(
      this.salesReturnForm.get('warehouseId')?.value,
      SearchTerm
    );
    this.salesTransactionService.getItemsForAdvancedSearch(
      this.salesReturnForm.get('warehouseId')?.value,
      '',
      SearchTerm,
      new PageInfo()
    );
    this.salesTransactionService.lastestItem.subscribe((res: any) => {
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
      width: '1200px',
      height: '600px',
      data: { warehouseId: this.salesReturnForm.get('warehouseId')?.value },
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        stockInFormGroup.get('itemId')?.setValue(selectedItems.itemId);
        stockInFormGroup.get('vatPercentage')?.setValue(selectedItems.taxRatio);
        this.setRowDataFromBarCode(indexline, selectedItems, '');
        this.setRowDataFromPopup(indexline, selectedItems);
      }
    });
  }

  setRowDataFromPopup(indexLine: number, selectedItem: any) {
    const rowForm = this.salesReturnFormArray.at(indexLine) as FormGroup;

    if (rowForm) {
      rowForm.patchValue({
        itemNumber: selectedItem.itemNumber,
        id: selectedItem.id || 0,
        barCode: '',
        bardCodeId: null,
        itemId: selectedItem.itemId,
        itemStockBatchHeaderId: selectedItem?.batchHeaderId,
        barCodeId: selectedItem?.barCodeId,
        categoryId: selectedItem.categoryId,
        categoryType: selectedItem.categoryType,

        itemName: selectedItem.itemName,
        itemVariantId: selectedItem.itemVariantId,
        uomId: selectedItem.uomId,
        uomOptions: selectedItem.itemsUOM,
        trackingOptions: selectedItem.trackingList.map((elem: any, i: number) => {
          elem.id = i;
          return elem;
        }),
        description: selectedItem.itemName + '-' + selectedItem.itemVariantNameEn,
        cost: 1,
        vat: selectedItem.taxRatio || 0,
        trackingType: selectedItem.trackingType,
        hasExpiryDate: selectedItem.hasExpiryDate,
      });

      // Handle the nested form group
      // const invoiceTrackingGroup = rowForm.get('salesInvoiceTracking') as FormGroup;
      // if (invoiceTrackingGroup) {
      //   invoiceTrackingGroup.patchValue({
      //     invoiceDetailId: selectedItem?.invoiceTrackingGroup?.invoiceDetailId || 0,
      //     vendorBatchNo: selectedItem.invoiceTrackingGroup?.vendorBatchNo || '',
      //     quantity: selectedItem.quantity,
      //     hasExpiryDate: selectedItem.hasExpiryDate,
      //     expireDate: selectedItem.expireDate,
      //     systemPatchNo: selectedItem.invoiceTrackingGroup?.systemPatchNo || '',
      //     serialId: selectedItem.invoiceTrackingGroup?.serialId || null,
      //     trackingType: selectedItem.trackingType,

      //   });
      // }
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
          itemStockBatchHeaderId: selectedItem?.batchHeaderId,
          barCodeId: selectedItem?.barCodeId,
          categoryId: selectedItem.categoryId,
          categoryType: selectedItem.categoryType,

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
          trackingOptions: selectedItem.trackingList.map((elem: any, i: number) => {
            elem.id = i;
            return elem;
          }),
        });

        // const invoiceEntryMode = rowForm.get('invoiceEntryMode') as FormGroup;
        // if (invoiceEntryMode) {
        //   invoiceEntryMode.patchValue({
        //     id: selectedItem.invoiceEntryMode?.id || 0,
        //     vendorBatchNo: selectedItem.invoiceEntryMode?.vendorBatchNo,
        //     expireDate: selectedItem.invoiceEntryMode?.expireDate,
        //     systemPatchNo: selectedItem.invoiceEntryMode?.systemPatchNo,
        //     serialId: selectedItem.invoiceEntryMode?.serialId,
        //     trackingType: selectedItem.trackingType,
        //     selectedValue: selectedItem.invoiceEntryMode?.quantity,
        //   });
        // }
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
        trackingValue: setTracking.get('salesInvoiceTracking')?.get('selectedValue')?.value,
      },
    });
    dialogRef.onClose.subscribe((res: any) => {
      if (res) {
        this.selectedTraking = res;
        setTracking.get('salesInvoiceTracking')?.patchValue({ ...res });
        setTracking.get('salesInvoiceTracking')?.get('selectedValue')?.setValue(res);
        // this.isValidData();
      }
      // this.isValidData();
    });
  }

  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
  }

  onSave() {
    if (!this.formService.validForm(this.salesReturnForm, false)) return;
    if (!this.formService.validForm(this.salesReturnFormArray, false)) return;

    let mappedInvoice: AddSalesInvoice = {
      invoiceDate: this.salesReturnForm.value.invoiceDate || null,
      description: this.salesReturnForm.value.description || null,
      warehouseId: this.salesReturnForm.value.warehouseId || 0,
      warehouseName: this.salesReturnForm.value.warehouseName || '',
      customerId: this.salesReturnForm.value.customerId || 0,
      salesManId: this.salesReturnForm.value.salesManId || 0,
      customerName: this.salesReturnForm.value.customerName || '',
      customerCreditLimit: this.salesReturnForm.value.customerCreditLimit || 0,
      pricePolicyId: this.salesReturnForm.value.pricePolicyId || 0,
      currencyId: this.salesReturnForm.value.currencyId || 0,
      currencyName: this.salesReturnForm.value.currencyName || '',
      currencyRate: +this.salesReturnForm.value.currencyRate || 0,
      paymentTermId: this.salesReturnForm.value.paymentTermId || 0,
      reference: this.salesReturnForm.value.reference || '',
      salesInvoiceDetails: this.salesReturnForm.value.invoiceDetails.map((detail: any) => ({
        barCode: detail.barCode || '',
        barCodeId: detail.barCodeId || null,
        itemId: detail.itemId || null,
        itemCode: detail.itemCode || '',
        itemName: detail.itemName || '',
        itemVariantId: detail.itemVariantId || null,
        itemVariantCode: detail.itemVariantCode || '',
        itemVariantNameEn: detail.itemVariantNameEn || '',
        itemVariantNameAr: detail.itemVariantNameAr || '',
        categoryId: detail.categoryId || null,

        itemCategoryNameAr: detail.itemCategoryNameAr || '',
        itemCategoryNameEn: detail.itemCategoryNameEn || '',
        categoryType: detail.categoryType,
        description: detail.description || '',
        uomId: detail.uomId || '',
        uomCode: detail.uomCode || '',
        uomNameAr: detail.uomNameAr || '',
        uomNameEn: detail.uomNameEn || '',
        quantity: +detail.quantity || 0,
        cost: +detail.cost || 0,
        discountPercentage: +detail.discountPercentage || 0,
        discountAmount: +detail.discountAmount || 0,
        vatPercentage: +detail.vatPercentage || 0,
        taxId: detail.taxId || null,
        notes: detail.notes || '',
        itemStockBatchHeaderId: detail.itemStockBatchHeaderId || null,
        pricePolicyDetailId: detail.pricePolicyDetailId || null,
        invoiceEntryMode: detail.invoiceEntryMode || 'Manual',
        trackingType: detail.trackingType,
        hasExpiryDate: detail.hasExpiryDate || false,
        salesInvoiceTracking: {
          batchNo: detail.salesInvoiceTracking?.batchNo || '',
          quantity: +detail.salesInvoiceTracking?.quantity || 0,
          hasExpiryDate: detail.salesInvoiceTracking?.hasExpiryDate || false,
          expireDate: detail.salesInvoiceTracking?.expireDate || null,
          serialId: detail.salesInvoiceTracking?.serialId || null,
          trackingType: detail.salesInvoiceTracking?.trackingType,
        },
      })),
    };

    if (this.save) {
      this.salesTransactionService.addSalesInvoice(mappedInvoice);
      this.salesTransactionService.sendSalesInvoice.subscribe((res: number | any) => {
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
    this.salesReturnFormArray.removeAt(i);
  }
  addToPost() {
    this.salesTransactionService.postInvoice(this.savedDataId);
  }
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,

    private salesTransactionService: TransactionService,
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
