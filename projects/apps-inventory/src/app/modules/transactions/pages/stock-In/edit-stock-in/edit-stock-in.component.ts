import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  customValidators,
  FormsService,
  LanguageService,
  lookupDto,
  LookupEnum,
  LookupsService,
  MenuModule,
  PageInfo,
  PageInfoResult,
  RouterService,
} from 'shared-lib';
import {
  AddStockIn,
  GetWarehouseList,
  LatestItems,
  OperationalStockIn,
  StockInDetail,
} from '../../../../items/models';

import { SharedFinanceEnums } from '../../../../items/models/sharedEnumStockIn';

import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../../transactions.service';
import { ImportStockInComponent } from '../../../components/import-stock-in/import-stock-in.component';
import { ScanParcodeStockInComponent } from '../../../components/scan-parcode-stock-in/scan-parcode-stock-in.component';
import { MultiSelectItemStockInComponent } from '../../../components/multi-select-item-stock-in/multi-select-item-stock-in.component';
import { TrackingStockInComponent } from '../../../components/tracking-stock-in/tracking-stock-in.component';
import { skip } from 'rxjs';

@Component({
  selector: 'app-edit-stock-in',
  templateUrl: './edit-stock-in.component.html',
  styleUrl: './edit-stock-in.component.scss',
})
export class EditStockInComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});
  LookupEnum = LookupEnum;
  id: number = 0;
  errorsArray: any = [];

  lookups: { [key: string]: lookupDto[] };
  oprationalLookup: OperationalStockIn[] = [];
  selectedTraking: any = {};
  exportData: any[];
  exportSelectedCols: string[] = [];
  latestItemsList: any[] = [];
  itemData: any;
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  warhouseLookupData: GetWarehouseList[] = [];
  uomLookup: any = [];
  currentLang: string;
  barcodeData: StockInDetail;
  savedDataId: number = 0;
  dataToReadOnly: boolean = false;
  selectedLanguage: string;
  postButton: boolean = true;
  saveButtonEnabled: boolean = true;

  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private langService: LanguageService,
    private transactionService: TransactionsService,
    private fb: FormBuilder,
    private lookupservice: LookupsService,
    private _route: ActivatedRoute,
    private router: RouterService,
    private formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    private cdr: ChangeDetectorRef
  ) {
    this.currentLang = this.langService.getLang();
    this.selectedLanguage = this.langService.getLang();
    this.id = Number(this._route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getListOfItems();
    this.stockInForm = this.fb.group({
      id: [this.id],
      receiptDate: ['', customValidators.required],
      code: [''],
      sourceDocumentType: ['', customValidators.required],
      sourceDocumentId: ['', customValidators.required],
      warehouseId: ['', customValidators.required],
      warehouseName: [''],
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.lookupservice.loadLookups([LookupEnum.StockInOutSourceDocumentType]);
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;
      this.cdr.detectChanges();
    });

    this.stockInForm.get('sourceDocumentType')?.valueChanges.subscribe((res) => {
      let data = this.lookups[LookupEnum.StockInOutSourceDocumentType];
      let sourceDocumentTypeData = data?.find((elem) => elem.id == res);
      if (sourceDocumentTypeData?.name == 'OperationalTag') {
        this.transactionService.OperationalTagDropDown();
        this.transactionService.sendOperationalTagDropDown$.subscribe((res) => {
          this.oprationalLookup = res;
          this.oprationalLookup = res.map((elem: any) => ({
            ...elem,
            displayName: `${elem.name} (${elem.code})`,
          }));
        });
      }
    });

    this.stockInForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
      let data = this.oprationalLookup.find((elem) => elem.id == res);
      this.stockInForm.get('warehouseId')?.setValue(data?.warehouseId);
      this.stockInForm.get('warehouseName')?.setValue(data?.warehouseName);
    });

    this.initWareHouseLookupData();

    this.addLineStockIn();
    this.transactionService.sendItemBarcode$.pipe(skip(1)).subscribe((res) => {
      this.barcodeData = res;
    });
    this.stockInForm.valueChanges.subscribe((res) => {
      if (!res) return;
      this.dataToReadOnly = false;
    });
    this.stockInForm.valueChanges.subscribe(() => {
      if (!this.saveButtonEnabled) {
        this.handleFormChanges();
      }
    });
    this.stockIn.valueChanges.subscribe(() => {
      if (!this.saveButtonEnabled) {
        this.handleFormChanges();
      }
    });

    if (this.id) {
      this.getStockInById(this.id);
    }
  }

  getListOfItems() {
    this.transactionService.getLatestItemsList();
    this.transactionService.sendlatestItemsList$.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any, index: number) => ({
          ...elem,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${
            this.currentLang == 'en' ? elem.itemVariantNameEn : elem.itemVariantNameAr
          }`,
        }));
      }
    });
  }

  postedStock: boolean = true;
  getStockInById(id: number) {
    this.transactionService.getStockInById(id);
    this.transactionService.stockInByIdData$.subscribe({
      next: (res: any) => {
        if (res) {
          if (res.stockInStatus == 'Posted') {
            this.postedStock = false;
          }

          this.stockInForm?.patchValue({
            id: res?.id,
            receiptDate: res?.receiptDate,
            code: res?.code,
            sourceDocumentType: res?.sourceDocumentType,
            sourceDocumentId: res?.sourceDocumentId,
            warehouseId: res?.warehouseId,
            warehouseName: this.oprationalLookup?.filter((x)=> x.warehouseId ==res?.warehouseId)[0]?.warehouseName,
            notes: res?.notes,
          });

          this.stockIn.clear();

          if (res.stockInDetails && Array.isArray(res.stockInDetails)) {
            res.stockInDetails?.forEach((detail: any) => {
              this.patchUom(detail.itemId);
              // let uomName = this.uomLookup?.find((item: any) => item.uomId == detail.uomId);

              let uomName = this.uomLookup?.find((item: any) => item.uomId == detail.uomId);
              const uomDisplayName = uomName
                ? this.currentLang == 'en'
                  ? uomName?.uomNameEn
                  : uomName?.uomNameAr
                : uomName?.uomNameEn;

              const stockInDetailGroup = this.createStockIn();
              stockInDetailGroup.patchValue({
                id: detail.id,
                barCode: detail.barCode,
                bardCodeId: detail.bardCodeId,
                description: detail.description,
                itemId: detail.itemId,
                itemCodeName: this.latestItemsList.find((item) => item.itemId == detail.itemId)
                  ?.itemCode,
                itemVariantId: detail.itemVariantId,
                uomName: uomDisplayName,
                uomId: detail.uomId,
                quantity: detail.quantity,
                cost: detail.cost,
                subTotal: detail.subTotal,
                notes: detail.notes,
                hasExpiryDate: detail.hasExpiryDate,
                stockInEntryMode: detail.stockInEntryMode,
                trackingType: detail.trackingType,
                stockInTracking: {
                  id: detail.stockInTracking.id ?? 0,
                  vendorBatchNo: detail.stockInTracking.vendorBatchNo,
                  expireDate: detail.stockInTracking.expireDate,
                  systemPatchNo: detail.stockInTracking.systemPatchNo,
                  serialId: detail.stockInTracking.serialId,
                  trackingType: detail.stockInTracking.trackingType,
                  selectedValue: detail.stockInTracking.selectedValue,
                },
              });
              this.patchUom(detail.itemId);
              // this.displayUomPatched(detail.uomId);
              this.stockIn.push(stockInDetailGroup);
            });
          } else {
            return;
          }
        }
      },
      error: (err) => {
        console.error('Error fetching stock-in data', err);
      },
    });
  }

  initWareHouseLookupData() {
    this.transactionService.getWareHousesDropDown();
    this.transactionService.wareHousesDropDownLookup$.subscribe((res) => {
      this.warhouseLookupData = res;
    });
  }

  get stockIn() {
    return this.stockInForm.get('stockInDetails') as FormArray;
  }

  getExcel() {
    const ref = this.dialog.open(ImportStockInComponent, {
      width: '600px',
      height: '450px',
    });
    ref.onClose.subscribe((selectedItems: any[]) => {});
  }

  createStockIn() {
    return this.fb.group({
      id: 0,
      barCode: '',
      bardCodeId: null,
      description: '',
      itemId: [null, customValidators.required],
      itemCodeName: '',
      itemVariantId: '',
      uomName: '',
      uomId: ['', customValidators.required],
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
      stockInTracking: this.fb.group({
        id: 0,
        vendorBatchNo: '',
        expireDate: null,
        systemPatchNo: '',
        serialId: '',
        trackingType: '',
        selectedValue: '',
      }),
    });
  }

  patchUom(e: any) {
    let data = this.latestItemsList.find((item) => item.itemId == e);
    this.itemData = data;
    this.uomLookup = data?.itemsUOM;
  }

  displayUomPatched(e: string) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);

    this.cdr.detectChanges();
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
      .get('stockInTracking')
      ?.get('trackingType')
      ?.setValue(clonedStockInFormGroup.trackingType ?? data?.trackingType);

    if (
      stockInFormGroup.get('stockInTracking')?.get('trackingType')?.value ==
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
    this.uomChanged(stockInFormGroup.get('uomId')?.value, stockInFormGroup);
    if (data?.hasExpiryDate) {
      stockInFormGroup
        .get('stockInTracking')
        ?.get('expireDate')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('stockInTracking')?.get('expireDate')?.updateValueAndValidity();
    }
    if (data?.trackingType == this.sharedFinanceEnums.trackingType.Batch) {
      stockInFormGroup
        .get('stockInTracking')
        ?.get('vendorBatchNo')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('stockInTracking')?.get('vendorBatchNo')?.updateValueAndValidity();
    }
    if (data?.trackingType == this.sharedFinanceEnums.trackingType.Serial) {
      stockInFormGroup
        .get('stockInTracking')
        ?.get('serialId')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('stockInTracking')?.get('serialId')?.updateValueAndValidity();
    }
    if (
      data?.trackingType == this.sharedFinanceEnums.trackingType.NoTracking &&
      stockInFormGroup.get('hasExpiryDate')?.value == false
    ) {
      stockInFormGroup.get('stockInTracking')?.get('expireDate')?.clearValidators();
      stockInFormGroup.get('stockInTracking')?.get('expireDate')?.updateValueAndValidity();
      stockInFormGroup.get('stockInTracking')?.get('vendorBatchNo')?.clearValidators();
      stockInFormGroup.get('stockInTracking')?.get('vendorBatchNo')?.updateValueAndValidity();
      stockInFormGroup.get('stockInTracking')?.get('serialId')?.clearValidators();
      stockInFormGroup.get('stockInTracking')?.get('serialId')?.updateValueAndValidity();
    }
  }

  uomChanged(e: any, stockInFormGroup: FormGroup) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);

    stockInFormGroup
      .get('uomName')
      ?.setValue(this.currentLang == 'en' ? data.uomNameEn : data.uomNameAr);
  }

  addLineStockIn() {
    if (!this.formService.validForm(this.stockIn, false)) return;
    this.stockIn.push(this.createStockIn());
  }

  scan() {
    const ref = this.dialog.open(ScanParcodeStockInComponent, {
      width: '50%',
      height: '450px',
    });
  }

  openDialog(stockInFormGroup: FormGroup) {
    const ref = this.dialog.open(MultiSelectItemStockInComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        stockInFormGroup.get('itemId')?.setValue(selectedItems.itemId);

        this.itemChanged(selectedItems.itemId, stockInFormGroup, selectedItems);
      }
    });
  }

  setTracking(setTracking: FormGroup) {
    let patchedValue = setTracking.value.stockInTracking;
    if (this.postedStock) {
      const dialogRef = this.dialog.open(TrackingStockInComponent, {
        width: '60%',
        height: '450px',
        data: {
          id: patchedValue.id ?? 0,
          trackingType: patchedValue.trackingType,
          expiry: setTracking.value.hasExpiryDate,
          expireDate: patchedValue.expireDate,
          systemPatchNo: patchedValue.systemPatchNo,
          serialId: patchedValue.serialId,
          vendorBatchNo: patchedValue.vendorBatchNo,
          trackingValue: patchedValue.trackingValue,
        },
      });
      dialogRef.onClose.subscribe((res: any) => {
        if (res) {
          this.selectedTraking = res;

          setTracking.get('stockInTracking')?.patchValue({ ...res });
          setTracking.get('stockInTracking')?.get('selectedValue')?.setValue(res);
          this.cdr.detectChanges();
        }
      });
    } else {
      return;
    }
  }

  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
  }
  // manual Barcode Event
  barcodeCanged(e: any, stockInFormGroup: FormGroup) {
    this.transactionService.getItemBarcodeForItem(e);
    this.transactionService.sendItemBarcode$.pipe(skip(1)).subscribe((data) => {
      if (data) {
        stockInFormGroup.get('itemId')?.setValue(data.itemId);
        // this.sendBarcodeData(data.itemId)
        this.itemChanged(data.itemId, stockInFormGroup, data, true);
      }
    });
  }

  onSave() {
    const stockInDetails = this.stockIn as FormArray;
    this.errorsArray = []; // Array to collect errors for each line

    // Loop through each FormGroup in the FormArray
    stockInDetails.controls.forEach((control: any, index: number) => {
      const lineErrors: any = {}; // Object to store errors for this line
      const stockInTracking = control.get('stockInTracking') as FormGroup;

      // Validate `itemId`
      if (control.get('itemId')?.invalid) {
        lineErrors.itemId = 'Item ID is required';
      }

      // Validate `uomId`
      if (control.get('uomId')?.invalid) {
        lineErrors.uomId = 'UOM is required';
      }

      // Validate `quantity`
      if (control.get('quantity')?.invalid) {
        lineErrors.quantity = 'Quantity must be a positive number';
      }

      // Validate `cost`
      if (control.get('cost')?.invalid) {
        lineErrors.cost = 'Cost must be a positive number';
      }

      // Validate `vendorBatchNo` if tracking type is Batch
      if (
        control.get('trackingType')?.value === this.sharedFinanceEnums.trackingType.Batch &&
        stockInTracking.get('vendorBatchNo')?.invalid
      ) {
        lineErrors.vendorBatchNo = 'Vendor Batch Number is required';
      }

      // Validate `serialId` if tracking type is Serial
      if (
        control.get('trackingType')?.value === this.sharedFinanceEnums.trackingType.Serial &&
        stockInTracking.get('serialId')?.invalid
      ) {
        lineErrors.serialId = 'Serial ID is required';
      }

      // Validate `expireDate` if hasExpiryDate is true
      if (control.get('hasExpiryDate')?.value && stockInTracking.get('expireDate')?.invalid) {
        lineErrors.expireDate = 'Expiry Date is required';
      }

      // If there are any errors, add them to the errorsArray
      if (Object.keys(lineErrors).length > 0) {
        this.errorsArray.push({ line: index, errors: lineErrors });
      }
    });

    // If there are errors, log them or display them
    if (this.errorsArray.length > 0) {
      console.error('Form contains errors:', this.errorsArray);
      return; // Prevent form submission
    }

    if (!this.formService.validForm(this.stockInForm, false)) return;
    if (!this.formService.validForm(this.stockIn, false)) return;
    let data: AddStockIn = {
      ...this.stockInForm.value,
      sourceDocumentType: +this.stockInForm.value.sourceDocumentType,
      stockInDetails: this.stockIn.value,
    };

    this.transactionService.editStockIn(data, this.stockInForm);
    this.transactionService.updatedStockInData$.subscribe((res: any) => {
      if (res) {
        this.savedDataId = res;
        this.dataToReadOnly = true;
        this.postButton = true;
        this.saveButtonEnabled = false;
      }
    });
  }

  private handleFormChanges(): void {
    this.dataToReadOnly = false;
    this.postButton = false;
  }

  OnDelete(id: number) {
    this.transactionService.deleteStockInLine(id);
  }

  deleteIndex(i: number) {
    this.stockIn.removeAt(i);
  }

  onPost() {
    this.transactionService.posteStockIn(this.id);
  }

  onFilter(SearchTerm: string) {
    const warehouseId: number = this.stockInForm.get('warehouseId')?.value;
    this.transactionService.getItems('', SearchTerm, new PageInfo());
    this.transactionService.itemsList.subscribe((res: any) => {
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
      } else {
        this.getLatestItemsList(warehouseId);
      }
    });
  }
  getLatestItemsList(id: number) {
    this.transactionService.getLatestItemsListByWarehouse('', id);
  }
}
