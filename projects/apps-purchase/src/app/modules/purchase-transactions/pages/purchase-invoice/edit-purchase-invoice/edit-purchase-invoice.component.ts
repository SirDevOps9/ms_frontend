import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { OperationalStockIn, GetWarehouseList } from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { CurrentUserService, customValidators, FormsService, LanguageService, LoaderService, lookupDto, LookupEnum, LookupsService, MenuModule, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { ItemDto } from 'projects/apps-sales/src/app/modules/sales/models';
import { ItemAdvancedSearchEditComponent } from '../../../components/item-advanced-search-edit/item-advanced-search-edit.component';
import { CurrencyRateDto } from 'projects/apps-finance/src/app/modules/finance/models';
import { TrackingEditComponent } from '../../../components/tracking-edit/tracking-edit.component';

@Component({
  selector: 'app-edit-purchase-invoice',
  templateUrl: './edit-purchase-invoice.component.html',
  styleUrl: './edit-purchase-invoice.component.scss'
})
export class EditPurchaseInvoiceComponent implements OnInit {
  items: ItemDto[] = [];
  totalQuantity: number;
  totalCost: number;
  totalSubTotal: number;
  totalItemsCount: number;
  totalInvoiceBefor: number;
  totalDiscount: number;
  totalAfterDiscount: number;
  totalVatAmount: number;
  vatAmount: number;
  vatAfter: number;
  vendorId: number;

  stockInForm: FormGroup = new FormGroup({});
  LookupEnum = LookupEnum;
  selectedLanguage: string
  rowDuplicate: number = -1;
  duplicateLine: boolean;
  serialError: boolean;

  tableData: any[];
  lookups: { [key: string]: lookupDto[] };

  oprationalLookup: OperationalStockIn[] = [];
  warhouseLookupData: GetWarehouseList[] = []

  filteredItems: any[];
  vendorItems: any[];
  warehouses: any[];
  exportData: any[];

  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  addForm: FormGroup = new FormGroup({});
  itemId: number
  stockOutId: number;
  originalFormData: any
  dataLoaded: boolean
  showPost: boolean
  ngOnInit(): void {

    this.itemId = this.route.snapshot.params['id'];
    this.initializeForm();
    this.latestVendor()
    this.latestWarehouses()
    this.initItemsData()
    this.subscribe();
    this.calculate();
    this.getStockOutyId(this.itemId)

  }
  calculate() {
    this.totalQuantity = 0;
    this.totalCost = 0;
    this.totalSubTotal = 0;
    this.vatAmount = 0;
    this.totalQuantity = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('quantity')?.value) || 0;
      return acc + debitValue;
    }, 0);

    this.totalCost = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('cost')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalSubTotal = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('subCost')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalItemsCount = this.invoiceDetailsFormArray.value.length



    ////////////////////////afterdis
    this.totalAfterDiscount = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('totalAfter')?.value) || 0;
      return acc + debitValue;
    }, 0);
    ////////////////// vat amount 
    this.totalVatAmount = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('VatAmount')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.vatAfter = this.totalVatAmount + this.totalAfterDiscount
    ////////////////// Discount 
    this.totalDiscount = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = control.get('discountAmt')?.value || null;
      return acc + debitValue;
    }, 0);
    ////////////////// Discount 
    // this.totalDiscount = this.invoiceDetailsFormArray.controls.reduce((acc, control) => {
    //   // Ensure that debitAmount is treated as a number
    //   const debitValue = parseFloat(control.get('cost')?.value) || null;
    //   return acc + debitValue;
    // }, 0);
  }
  getAccountCurrencyRate(accountCurrency: number) {
    this.PurchaseService.getAccountCurrencyRate(
      accountCurrency,
      this.currentUserService.getCurrency()
    );
  }
  initItemsData() {
    this.PurchaseService.getLatestItems('');
  }
  latestVendor() {
    this.PurchaseService.latestVendor(undefined).subscribe((res: any) => {
      this.vendorItems = res
      // Call setVendorData only after vendorItems is loaded
      if (this.addForm.get('vendorId')?.value) {
        this.setVendorData(this.addForm.get('vendorId')?.value);
      }
    })
  }
  latestWarehouses() {

    this.PurchaseService.LatestWarehouses(undefined).subscribe((res: any) => {
      this.warehouses = res
    })
  }

  onFilterVendor(SearchTerm: string) {
    this.PurchaseService.latestVendor(SearchTerm).subscribe((res: any) => {
      this.vendorItems = res


    })
  }
 
  setVendorData(vendorId: number) {
    this.vendorItems?.find((item) => {
      if (item.id === vendorId) {
        this.addForm.get('vendorName')?.setValue(item?.name)
        this.addForm.get('currencyRate')?.setValue(item?.vendorFinancialCurrencyName)
        this.addForm.get('paymentTermName')?.setValue(item?.paymentTermName)
        this.addForm.get('paymentTermId')?.setValue(item?.paymentTermId)
        this.getAccountCurrencyRate(item.vendorFinancialCurrencyId)
      }
    });

  }
  onFilterItems(SearchTerm: string) {
    this.PurchaseService.getLatestItems(SearchTerm)

  }

  getStockOutyId(id: number) {
    this.PurchaseService.getInvoiceById(id);
    this.PurchaseService.InvoiceByIdDataSource.subscribe((data: any) => {

      this.patchForm(data)
      this.stockOutId = data.id


    })
  }
  patchForm(data: any): void {
    // Patch main form fields

    this.addForm.patchValue({
      id: data.id,
      invoiceStatus: data.invoiceStatus,
      invoiceCode: data.code,
      invoiceDate: data.invoiceDate,
      invoiceDescription: data.description,
      warehouseId: data.warehouseId,
      warehouseName: data.warehouseName,
      vendorId: data.vendorId,
      paymentTermId: data.paymentTermId,
      paymentTermName: data.paymentTermName,
      reference: data.reference,
    });
    // if(      data?.warehouseId
    // ){
    //   this.getLatestItemsList(data?.warehouseId)

    // }

    // Clear existing form array
    const invoiceDetailsFormArray = this.addForm.get('invoiceDetails') as FormArray;
    invoiceDetailsFormArray.clear();
    // Patch invoiceDetails array
    data?.invoiceDetails?.forEach((detail: any, index: number) => {
      this.addNewRowWithOutItem()
      this.setRowDataById(index, detail)

    });
    this.dataLoaded = true
    this.originalFormData = this.addForm.value
    this.setVendorData(data.vendorId)

  }

  initializeForm() {
    this.addForm = this.fb.group({
      id: new FormControl(''),
      invoiceStatus: new FormControl(''),
      code: new FormControl(''),
      invoiceCode: new FormControl(''),
      invoiceDate: new FormControl(new Date(), [customValidators.required]),
      invoiceDescription: new FormControl('', [customValidators.required]),
      warehouseId: new FormControl('', [customValidators.required]),
      warehouseName: new FormControl('', [customValidators.required]),
      vendorCode: new FormControl(''),
      currency: new FormControl(''),
      rate: new FormControl(''),
      paymentTerms: new FormControl(''),
      invoiceJournal: new FormControl(''),
      stockOut: new FormControl(''),
      vendorId: new FormControl(''),
      vendorName: new FormControl(''),
      currencyRate: new FormControl(''),
      vendorRate: new FormControl(''),
      paymentTermId: new FormControl(''),
      paymentTermName: new FormControl(''),
      reference: new FormControl(''),
      invoiceDetails: this.fb.array([]),

    });

  }
  get invoiceDetailsFormArray() {
    return this.addForm.get('invoiceDetails') as FormArray;
  }


  subscribe() {
    this.languageService.language$.subscribe((lang) => [
      this.selectedLanguage = lang
    ])
    this.PurchaseService.latestItemsDataSource.subscribe({
      next: (res) => {
        if (this.selectedLanguage === 'ar') {
          this.items = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,

            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
          }));
        } else {

          this.items = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,

            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameEn}`,
          }));
        }
      },
    });
    this.PurchaseService.accountCurrencyRateDataSource.subscribe((res: CurrencyRateDto) => {
      this.addForm.get('vendorRate')?.setValue(res.rate)

    })

  }




  setRowData(indexLine: number, selectedItemId: any, list: any) {
    const selectedItem = list.find((item: any) => item.itemNumber === selectedItemId);
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;

    if (!selectedItem) {
      return;
    }

    if (!rowForm) {
      return;
    }


    // Ensure row form controls are present before updating
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
        description: selectedItem.itemName + "-" + selectedItem.itemVariantNameEn,
        cost: (1),
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
    rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameEn)
    this.setUomName(indexLine, rowForm.get('uomOptions')?.value)

  }

  setRowDataFromPopup(indexLine: number, selectedItem: any) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;

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
        description: selectedItem.itemName + "-" + selectedItem.itemVariantNameEn,
        cost: (1),
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
    rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameEn)
    this.setUomName(indexLine, rowForm.get('uomOptions')?.value)
  }
  setRowDataById(indexLine: number, selectedItem: any) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    // Ensure row form controls are present before updating
    if (rowForm) {
      rowForm.patchValue({
        itemNumber: '',

        id: selectedItem.id,
        barCode: selectedItem.barCode,
        bardCodeId: selectedItem.barCodeId,
        itemId: selectedItem.itemId,
        itemName: selectedItem.id,
        itemVariantId: selectedItem.itemVariantId,
        uomId: selectedItem.uomId,
        uomOptions: selectedItem.itemsUOM,
        uomName: selectedItem.uomName,
        description: selectedItem.description,
        quantity: selectedItem.quantity,
        cost: selectedItem.cost,
        subCost: selectedItem.subCost,
        discount: selectedItem.discountPercentage,
        discountAmt: selectedItem.discountAmount,
        netCost: selectedItem.netAmount,
        totalAfter: selectedItem.totalAfterDiscount,
        vat: selectedItem.vatPercentage,
        grandTotal: selectedItem.localGrandTotal,
        trackingType: selectedItem.trackingType,
        hasExpiryDate: selectedItem.hasExpiryDate,
        taxId: selectedItem.taxId,

      });

      // Handle the nested form group
      const invoiceTrackingGroup = rowForm.get('invoiceTracking') as FormGroup;
      if (invoiceTrackingGroup) {
        invoiceTrackingGroup.patchValue({
          invoiceDetailId: selectedItem?.invoiceTracking?.invoiceDetailId || 0,
          vendorBatchNo: selectedItem.invoiceTracking?.vendorBatchNo || '',
          quantity: selectedItem.quantity,
          hasExpiryDate: selectedItem.hasExpiryDate,
          expireDate: selectedItem.invoiceTracking?.expireDate,
          systemPatchNo: selectedItem.invoiceTracking?.systemPatchNo || '',
          serialId: selectedItem.invoiceTracking?.serialId || null,
          trackingType: selectedItem.trackingType,
        });
      }
    }
    // rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameEn)
    rowForm.get('itemName')?.setValue(selectedItem.itemCode)
    this.setUomName(indexLine, rowForm.get('uomOptions')?.value)
    this.calculate()
  }

  addNewRow() {
    if (!this.formsService.validForm(this.invoiceDetailsFormArray, false)) return;


    let newLine = this.fb.group(
      {
        itemNumber: new FormControl(''),

        id: new FormControl(0),
        barCode: new FormControl(''),
        bardCodeId: new FormControl(''),
        itemId: new FormControl('', [customValidators.required]),
        itemName: new FormControl(''),
        itemVariantId: new FormControl('', [customValidators.required]),
        uomId: new FormControl('', [customValidators.required]),
        uomOptions: new FormControl(),
        uomName: new FormControl(''),
        description: new FormControl(''),
        quantity: new FormControl('', [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers]),
        cost: new FormControl('', [customValidators.required]),
        subCost: new FormControl(''),
        discount: new FormControl(''),
        discountAmt: new FormControl(''),
        netCost: new FormControl(''),
        totalAfter: new FormControl(''),
        vat: new FormControl(''),
        VatAmount: new FormControl(''),
        grandTotal: new FormControl(''),
        trackingType: new FormControl(''),
        hasExpiryDate: new FormControl(''),
        taxId: new FormControl(''),
        invoiceTracking: this.fb.group({
          invoiceDetailId: new FormControl(''),
          vendorBatchNo: new FormControl(''),
          quantity: new FormControl(''),
          hasExpiryDate: new FormControl(''),
          expireDate: new FormControl(''),
          systemPatchNo: new FormControl(''),
          serialId: new FormControl(''),
          trackingType: new FormControl(''),
        })

      }
    );
    this.invoiceDetailsFormArray.push(newLine);
    this.calculate();

    // }
  }
  addNewRowWithOutItem() {

    let newLine = this.fb.group(
      {
        itemNumber: new FormControl(''),

        id: new FormControl(0),
        barCode: new FormControl(''),
        bardCodeId: new FormControl(''),
        itemId: new FormControl('', [customValidators.required]),
        itemName: new FormControl(''),
        itemVariantId: new FormControl('', [customValidators.required]),
        uomId: new FormControl('', [customValidators.required]),
        uomOptions: new FormControl(),
        uomName: new FormControl(''),
        description: new FormControl(''),
        quantity: new FormControl('', [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers]),
        cost: new FormControl('', [customValidators.required]),
        subCost: new FormControl(''),
        discount: new FormControl(''),
        discountAmt: new FormControl(''),
        netCost: new FormControl(''),
        totalAfter: new FormControl(''),
        vat: new FormControl(''),
        VatAmount: new FormControl(''),
        grandTotal: new FormControl(''),
        trackingType: new FormControl(''),
        hasExpiryDate: new FormControl(''),
        invoiceTracking: this.fb.group({
          invoiceDetailId: new FormControl(''),
          vendorBatchNo: new FormControl(''),
          quantity: new FormControl(''),
          hasExpiryDate: new FormControl(''),
          expireDate: new FormControl(''),
          systemPatchNo: new FormControl(''),
          serialId: new FormControl(''),
          trackingType: new FormControl(''),
        })

      }
    );
    this.invoiceDetailsFormArray.push(newLine);
    this.calculate();
    // }
  }

  setUomName(indexLine: number, list: any) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    const selectedItem = list.find((item: any) => item.uomId === rowForm.get('uomId')?.value);

    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }
  }

  onCancel() {
    this.routerService.navigateTo('transactions/purchase-invoice');

  }

  onSave() {

    if (!this.formsService.validForm(this.invoiceDetailsFormArray, false)) return;

    this.PurchaseService.editInvoice(this.refactoredData(this.addForm.value))

  }


  setCostTotal(indexLine: number) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;

    rowForm.get('subCost')?.setValue(Number(rowForm.get('quantity')?.value) * Number(rowForm.get('cost')?.value))
    rowForm.get('netCost')?.setValue(rowForm.get('cost')?.value - rowForm.get('discountAmt')?.value)
    rowForm.get('totalAfter')?.setValue(rowForm.get('quantity')?.value * rowForm.get('netCost')?.value)

    this.calculate()
    this.setDiscount(indexLine)
  }

  setDiscount(indexLine: number) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    const discount = (rowForm.get('discountAmt')?.value / (rowForm.get('cost')?.value / 100))
    rowForm.get('discount')?.setValue(discount)
    rowForm.get('netCost')?.setValue(rowForm.get('cost')?.value - rowForm.get('discountAmt')?.value)
    rowForm.get('totalAfter')?.setValue(rowForm.get('quantity')?.value * rowForm.get('netCost')?.value)

    this.calculate()


  }
  setDiscountAmt(indexLine: number) {

    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    // const  discount = (rowForm.get('discount')?.value * ( rowForm.get('subCost')?.value))/100
    const discountValue = Number(rowForm.get('discount')?.value) || 0;
    const subCostValue = rowForm.get('cost')?.value;
    const discount: any = (discountValue * subCostValue) / 100;
    rowForm.get('discountAmt')?.setValue(discount)
    rowForm.get('netCost')?.setValue(rowForm.get('cost')?.value - rowForm.get('discountAmt')?.value)
    rowForm.get('totalAfter')?.setValue(rowForm.get('quantity')?.value * rowForm.get('netCost')?.value)
    this.calculate()

  }

  async deleteRow(index: number, id: number) {



    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      if (id == 0) {
        this.invoiceDetailsFormArray.removeAt(index);
      }
      else {
        this.PurchaseService.deleteRowInvoice(id).subscribe({
          next: (res: any) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('transactions.success'),
              this.languageService.transalte('transactions.deleteStockOut')
            );
            this.invoiceDetailsFormArray.removeAt(index);
          },
          error: (err: any) => {
            console.error('Error occurred while deleting:', err);
            this.toasterService.showError(
              this.languageService.transalte('transactions.error'),
              this.languageService.transalte('transactions.deleteFailed')
            );
          },
        });
      }

    }

  }
  openDialog(indexLine: number) {
    const ref = this.dialog.open(ItemAdvancedSearchEditComponent, {
      width: '1000px',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: ItemDto) => {
      if (selectedItems) {
        this.setRowDataFromPopup(indexLine, selectedItems)
      }

    });
  }

  setRowDataFromBarCode(indexLine: number, selectedItem: any) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    if (rowForm) {
      rowForm.patchValue({
        id: 0,
        barCode: selectedItem.barcode,
        bardCodeId: selectedItem.barcodeId,
        itemId: selectedItem.itemId,
        itemVariantId: selectedItem.itemVariantId,
        uomId: selectedItem.uomId,
        uomOptions: selectedItem.itemsUOM,
        description: selectedItem.itemName + "-" + selectedItem.itemVariantNameEn,
        AllTotalQuantity: selectedItem.totalQuantity,
        cost: selectedItem.cost,
        subCost: selectedItem.subCost,
        notes: selectedItem.notes,
        stockOutEntryMode: selectedItem.stockOutEntryMode,
        trackingType: selectedItem.trackingType,
        trackingNo: selectedItem.trackingNo || '',
        hasExpiryDate: selectedItem.hasExpiryDate,
        expireDate: selectedItem.expireDate,
        availability: selectedItem.availability
      });

      // Handle the nested form group
      const stockOutTrackingGroup = rowForm.get('stockOutTracking') as FormGroup;
      if (stockOutTrackingGroup) {
        stockOutTrackingGroup.patchValue({
          batchNo: selectedItem.stockOutTracking?.batchNo || '',
          expireDate: selectedItem.stockOutTracking?.expireDate || null,
          quantity: selectedItem.stockOutTracking?.quantity || '',
          serialId: selectedItem.stockOutTracking?.serialId || '',
          trackingType: selectedItem.stockOutTracking?.trackingType || '',
          hasExpiryDate: selectedItem.hasExpiryDate,
          serialOptions: selectedItem.serials,
          batchesOptions: selectedItem.batches
        });
      }
    }
    if (selectedItem) {
      if (selectedItem.hasExpiryDate) {
        if (selectedItem.trackingType == this.sharedFinanceEnums.StockOutTracking.NoTracking) {
          rowForm.get('showSerial')?.setValue(false);
          rowForm.get('showBatch')?.setValue(true);
        }
        else if (selectedItem.trackingType == this.sharedFinanceEnums.StockOutTracking.Serial) {
          rowForm.get('showSerial')?.setValue(true);
          rowForm.get('showBatch')?.setValue(false);
        }
        else if (selectedItem.trackingType == this.sharedFinanceEnums.StockOutTracking.Batch) {
          rowForm.get('showSerial')?.setValue(false);
          rowForm.get('showBatch')?.setValue(true);
        }
      } else {
        if (selectedItem.trackingType == this.sharedFinanceEnums.StockOutTracking.NoTracking) {
          rowForm.get('showSerial')?.setValue(false);
          rowForm.get('showBatch')?.setValue(false);
        }
      }
    }
    rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameAr)
    this.setUomName(indexLine, rowForm.get('uomOptions')?.value)
  }
  addToPost() {

  }
  setTracking(setTracking: FormGroup) {
    let patchedValue = setTracking.value.invoiceTracking;
    // if (this.showPost) {
    const dialogRef = this.dialog.open(TrackingEditComponent, {
      width: '60%',
      height: '450px',
      data: {
        id: patchedValue?.invoiceDetailId || 0,
        vendorBatchNo: patchedValue?.vendorBatchNo,
        quantity: patchedValue?.quantity,
        hasExpiryDate: patchedValue?.hasExpiryDate,
        expireDate: patchedValue?.expireDate,
        systemPatchNo: patchedValue?.systemPatchNo,
        serialId: patchedValue?.serialId,
        trackingType: patchedValue?.trackingType,
      },
    });
    dialogRef.onClose.subscribe((res: any) => {
      if (res) {
        const invoiceTrackingGroup = setTracking.get('invoiceTracking') as FormGroup;
        if (invoiceTrackingGroup) {
          invoiceTrackingGroup.patchValue({
            invoiceDetailId: res.id,
            expireDate: res.expireDate,
            serialId: res.serialId,
            systemPatchNo: res.systemPatchNo,
            trackingType: res.trackingType,
            vendorBatchNo: res.vendorBatchNo,
          });
        }
      }
      // }

    });

    // } else {
    //   return;
    // }
  }
  setinvoiceTracking(indexLine: number) {
    const rowForm = this.invoiceDetailsFormArray.at(indexLine) as FormGroup;
    this.setTracking(rowForm)
  }

  refactoredData(data: any) {
    const refactoredData = {
      id: data.id,
      invoiceDate: new Date(data.invoiceDate).toISOString(),
      description: data.invoiceDescription,
      warehouseId: data.warehouseId,
      warehouseName: data.warehouseName,
      vendorId: data.vendorId,
      vendorName: data.vendorName,
      currencyRate: data.vendorRate,
      paymentTermId: data.paymentTermId,
      reference: data.reference || null,
      invoiceDetails: data.invoiceDetails.map((detail: any) => ({
        id: detail.id,
        barCode: detail.barCode || null,
        barCodeId: detail.bardCodeId || null,
        itemId: detail.itemId,
        itemCode: detail.itemName || null,
        itemVariantId: detail.itemVariantId,
        description: detail.description,
        uomId: detail.uomId,
        uomName: detail.uomName,
        quantity: detail.quantity,
        cost: detail.cost,
        discountPercentage: detail.discount,
        discountAmount: detail.discountAmt,
        vatPercentage: detail.vat || null,
        taxId: detail.taxId || null,
        notes: detail.notes || null,
        invoiceEntryMode: "Manual", // Assuming a default value
        trackingType: detail.trackingType || null,
        hasExpiryDate: detail.hasExpiryDate,
        invoiceTracking: {
          id: detail.invoiceTracking.invoiceDetailId || 0,
          vendorBatchNo: detail.invoiceTracking.vendorBatchNo || null,
          quantity: detail.invoiceTracking.quantity,
          hasExpiryDate: detail.invoiceTracking.hasExpiryDate,
          expireDate: detail.invoiceTracking.expireDate
            ? new Date(detail.invoiceTracking.expireDate).toISOString()
            : null,
          systemPatchNo: detail.invoiceTracking.systemPatchNo || null,
          serialId: detail.invoiceTracking.serialId || null,
          trackingType: detail.invoiceTracking.trackingType,
        },
      })),
    };
    return refactoredData
  }
  getTotalVatAmount(): number {
    const invoiceDetailsFormArray = this.addForm.get('invoiceDetails') as FormArray;
    let total = 0;

    invoiceDetailsFormArray.controls.forEach((group: any) => {
      const vat = group.get('vat')?.value || 0;
      const totalAfter = group.get('totalAfter')?.value || 0;
      total += (vat * totalAfter) / 100;
    });

    return total;
  }
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    private formsService: FormsService,
    public sharedFinanceEnums: SharedStock,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private PurchaseService: PurchaseTransactionsService,
    private currentUserService: CurrentUserService,


  ) {
  }
}
