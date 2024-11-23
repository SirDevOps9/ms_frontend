import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  ToasterService,
} from 'shared-lib';
import {
  AddStockIn,
  GetWarehouseList,
  OperationalStockIn,
  StockInDetail,
} from '../../../../items/models';


import { ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../../transactions.service';
import { ImportStockInComponent } from '../../../components/import-stock-in/import-stock-in.component';
import { ScanParcodeStockInComponent } from '../../../components/scan-parcode-stock-in/scan-parcode-stock-in.component';
import { MultiSelectItemStockInComponent } from '../../../components/multi-select-item-stock-in/multi-select-item-stock-in.component';
import { TrackingStockInComponent } from '../../../components/tracking-stock-in/tracking-stock-in.component';
import { skip } from 'rxjs';
import { SharedStock } from '../../../models/sharedStockOutEnums';

@Component({
  selector: 'app-edit-stock-in',
  templateUrl: './edit-stock-in.component.html',
  styleUrl: './edit-stock-in.component.scss',
})
export class EditStockInComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});
  LookupEnum = LookupEnum;
  itemId: number;
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
  postedStock: boolean = true;
  duplicateLine: boolean;
  lineError: number = -1
  error: boolean
  save: boolean = true


  ngOnInit(): void {
    this.itemId = this._route.snapshot.params['id'];

    this.getListOfItems();
    this.initializeForm();
    this.loadLookups();
    this.initWareHouseLookupData();
    this.subscribe();
    this.getStockInById(this.itemId);

  }
  subscribe() {
    this.languageService.language$.subscribe((lang) => [
      this.selectedLanguage = lang,

    ])

    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;
    });

    this.stockInForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
      let data = this.oprationalLookup.find((elem) => elem.id == res);
      this.stockInForm.get('warehouseId')?.setValue(data?.warehouseId);
      this.stockInForm.get('warehouseName')?.setValue(data?.warehouseName);
    });

    this.transactionService.wareHousesDropDownLookup$.subscribe((res) => {
      this.warhouseLookupData = res;
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
    this.transactionService.latestItemsListByWarehouse$.subscribe((res: any) => {
      if (res.length > 0) {
        if (this.selectedLanguage === 'ar') {
          this.latestItemsList = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,
            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
          }));
        }
      }
    })
    ////////////////////////////////
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
    this.stockInDetailsFormArray.valueChanges.subscribe(() => {
      if (!this.saveButtonEnabled) {
        this.handleFormChanges();
      }
    });
    //////////////////////////////
  }
  loadLookups() {
    this.lookupservice.loadLookups([
      LookupEnum.StockInOutSourceDocumentType
    ]);
  }
  initializeForm() {
    this.stockInForm = this.fb.group({

      id: new FormControl(''),
      code: new FormControl(''),
      receiptDate: new FormControl(new Date(), [customValidators.required]),
      sourceDocumentType: new FormControl('', [customValidators.required]),
      sourceDocumentId: new FormControl(''),
      warehouseId: new FormControl('', [customValidators.required]),
      warehouseName: new FormControl(''),
      notes: new FormControl(''),
      stockInStatus: new FormControl(''),
      stockInDetails: this.fb.array([]),
    });
  }

  getListOfItems() {
    this.transactionService.getLatestItemsList();
    this.transactionService.sendlatestItemsList$.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any, index: number) => ({
          ...elem,
          itemNumber: index + 1,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${this.currentLang == 'en' ? elem.itemVariantNameEn : elem.itemVariantNameAr
            }`,
        }));
      }
    });
  }
  getStockInById(id: number) {
    this.transactionService.getStockInById(id);
    this.transactionService.stockInByIdData$.subscribe((data: any) => {

      this.patchForm(data)
    })

  }
  patchForm(data: any): void {

    this.stockInForm.patchValue({
      id: data.id,
      code: data.code,
      receiptDate: data.receiptDate,
      sourceDocumentType: data.sourceDocumentType,
      sourceDocumentId: data.sourceDocumentId,
      warehouseId: data.warehouseId,
      stockOutStatus: data.stockOutStatus,
      notes: data.notes
    });
    if (data?.warehouseId
    ) {
      this.getLatestItemsList(data?.warehouseId)

    }

    const stockInDetailsFormArray = this.stockInForm.get('stockInDetails') as FormArray;
    stockInDetailsFormArray.clear();

    data?.stockInDetails?.forEach((detail: any, index: number) => {
      this.addNewRowWithOutItem()
      this.setRowDataById(index, detail)
    });

  }
  addNewRowWithOutItem() {
    if (!this.duplicateLine) {
      if (!this.formsService.validForm(this.stockInForm, false)) return;


      let newLine = this.fb.group(
        {
          itemNumber: new FormControl(''),
          id: new FormControl(0),
          barCode: new FormControl(''),
          itemCode: new FormControl(''),
          itemName: new FormControl(''),
          bardCodeId: new FormControl(null),
          description: new FormControl(''),
          itemId: new FormControl(null, [customValidators.required]),
          itemCodeName: new FormControl(''),
          itemVariantId: new FormControl(''),
          itemVariantCode: new FormControl(''),
          itemVariantNameAr: new FormControl(''),
          itemVariantNameEn: new FormControl(''),
          uomName: new FormControl(''),
          uomNameAr: new FormControl(''),
          uomNameEn: new FormControl(''),
          uomId: new FormControl('', [customValidators.required]),
          quantity: new FormControl(1, [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers]),
          cost: new FormControl('', [customValidators.required, customValidators.nonZero, customValidators.nonNegativeNumbers]),
          subTotal: new FormControl(''),
          notes: new FormControl(''),
          hasExpiryDate: new FormControl(''),
          stockInEntryMode: 'Manual',
          trackingType: new FormControl(''),
          uomOptions: new FormControl([]),
          stockInTracking: this.fb.group({
            id: new FormControl(0),
            vendorBatchNo: new FormControl(''),
            expireDate: new FormControl(null),
            systemPatchNo: new FormControl(''),
            serialId: new FormControl(''),
            trackingType: new FormControl(''),
            selectedValue: new FormControl(''),


          })



        }
      );
      this.stockInDetailsFormArray.push(newLine);
    }
  }
  setRowDataById(indexLine: number, selectedItem: any) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;





    // Ensure row form controls are present before updating
    if (rowForm) {
      rowForm.patchValue({
        id: selectedItem.id,
        barCode: selectedItem.barCode,
        bardCodeId: selectedItem.bardCodeId,
        description: selectedItem.description,
        itemId: selectedItem.itemId,
        itemCode: selectedItem.itemCode,
        itemName: selectedItem.itemName,
        itemCodeName: selectedItem.itemCode,
        itemVariantId: selectedItem.itemVariantId,
        itemVariantCode: selectedItem.itemVariantCode,
        itemVariantNameAr: selectedItem.itemVariantNameAr,
        itemVariantNameEn: selectedItem.itemVariantNameEn,
        uomNameAr: selectedItem.uomNameAr,
        uomNameEn: selectedItem.uomNameEn,
        uomId: selectedItem.uomId,
        quantity: selectedItem.quantity,
        cost: selectedItem.cost,
        subTotal: selectedItem.subCost,
        notes: selectedItem.notes,
        hasExpiryDate: selectedItem.hasExpiryDate,
        stockInEntryMode: selectedItem.stockInEntryMode || 'Manual',
        trackingType: selectedItem.trackingType,
        uomOptions: selectedItem.itemsUOM,

      });

      // Handle the nested form group
      const stockInTracking = rowForm.get('stockInTracking') as FormGroup;
      if (stockInTracking) {
        stockInTracking.patchValue({
          id: selectedItem.stockInTracking.id,
          vendorBatchNo: selectedItem.stockInTracking.vendorBatchNo,
          expireDate: selectedItem.stockInTracking.expireDate,
          systemPatchNo: selectedItem.stockInTracking.systemPatchNo,
          serialId: selectedItem.stockInTracking.serialId,
          trackingType: selectedItem.stockInTracking.trackingType,
          selectedValue: selectedItem.stockInTracking.quantity,
        });
      }
    }

    rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameAr)
    this.setUomName(indexLine, rowForm.get('uomOptions')?.value)

  }
  setUomName(indexLine: number, list: any) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;
    const selectedItem = list.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }

  }
  changeUomName(indexLine: number, list: any) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;
    const selectedItem = list.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }

    rowForm.get('barCode')?.setValue('');

  }


  initWareHouseLookupData() {
    this.transactionService.getWareHousesDropDown();
  }

  get stockInDetailsFormArray() {
    return this.stockInForm.get('stockInDetails') as FormArray;
  }

  getExcel() {
    const ref = this.dialog.open(ImportStockInComponent, {
      width: '600px',
      height: '450px',
    });
    ref.onClose.subscribe((selectedItems: any[]) => { });
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
      uomOptions: [],
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
  setRowdata(indexLine: number, selectedItemId: any, list: any) {
    const selectedItem = list.find((item: any) => item.itemNumber === selectedItemId);
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;


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

        // Handle the nested form group
        const stockInTracking = rowForm.get('stockInTracking') as FormGroup;
        if (stockInTracking) {
          stockInTracking.patchValue({
            id: selectedItem.stockInTracking?.id || 0,
            vendorBatchNo: selectedItem.stockInTracking?.vendorBatchNo,
            expireDate: selectedItem.stockInTracking?.expireDate,
            systemPatchNo: selectedItem.stockInTracking?.systemPatchNo,
            serialId: selectedItem.stockInTracking?.serialId,
            trackingType: selectedItem.trackingType,
            selectedValue: selectedItem.stockInTracking?.quantity,
          });
        }
      }
      this.setUomName(indexLine, rowForm.get('uomOptions')?.value)


    }
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
        ` ${clonedStockInFormGroup?.itemName ?? data?.itemName} - ${this.currentLang == 'en'
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
      this.sharedStock.StockOutTracking.Serial
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
        .get('stockInTracking')
        ?.get('expireDate')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('stockInTracking')?.get('expireDate')?.updateValueAndValidity();
    }
    if (data?.trackingType == this.sharedStock.StockOutTracking.Batch) {
      stockInFormGroup
        .get('stockInTracking')
        ?.get('vendorBatchNo')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('stockInTracking')?.get('vendorBatchNo')?.updateValueAndValidity();
    }
    if (data?.trackingType == this.sharedStock.StockOutTracking.Serial) {
      stockInFormGroup
        .get('stockInTracking')
        ?.get('serialId')
        ?.setValidators(customValidators.required);
      stockInFormGroup.get('stockInTracking')?.get('serialId')?.updateValueAndValidity();
    }
    if (
      data?.trackingType == this.sharedStock.StockOutTracking.NoTracking &&
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

  uomChanged(e: any, stockInFormGroup: FormGroup, isBarcode: boolean) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);
    if (isBarcode) stockInFormGroup.get('barCode')?.setValue(null);
    stockInFormGroup
      .get('uomName')
      ?.setValue(this.currentLang == 'en' ? data.uomNameEn : data.uomNameAr);
  }
  isValidData() {
    this.lineError = -1
    this.stockInDetailsFormArray.value.forEach((element: any, index: number) => {
      let lineNumber = index + 1
      if (element.stockInTracking.trackingType == this.sharedStock.StockOutTracking.Batch) {
        if (element.stockInTracking.vendorBatchNo == null || element.stockInTracking.vendorBatchNo == '') {
          this.lineError = index
          this.error = true
          this.save = false

          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.setTracking') + lineNumber
          );
        }
      } else if (element.stockInTracking.trackingType == this.sharedStock.StockOutTracking.Serial) {

        if (element.stockInTracking.serialId == null || element.stockInTracking.serialId == '') {
          this.lineError = index
          this.error = true
          this.save = false


          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.setTracking') + lineNumber
          );

        }
      } else {
        this.error = false
        this.save = true

        this.lineError = -1


      }
    });
  }
  addLineStockIn() {
    this.isValidData()
    if (!this.formsService.validForm(this.stockInDetailsFormArray, false)) return;
    this.stockInDetailsFormArray.push(this.createStockIn());
    this.getLatestItemsList(this.stockInForm.get('warehouseId')?.value)
  }

  scan() {
    const ref = this.dialog.open(ScanParcodeStockInComponent, {
      width: '50%',
      height: '450px',
    });
  }

  openDialog(indexLine: number, stockInFormGroup: FormGroup) {
    const ref = this.dialog.open(MultiSelectItemStockInComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        stockInFormGroup.get('itemId')?.setValue(selectedItems.itemId);

        // this.itemChanged(selectedItems.itemId, stockInFormGroup, selectedItems);
        this.setRowDataFromBarCode(indexLine, selectedItems, '')
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
          id: patchedValue?.id || 0,
          trackingType: patchedValue?.trackingType || '',
          expiry: setTracking.value.hasExpiryDate || '',
          expireDate: patchedValue?.expireDate || '',
          systemPatchNo: patchedValue?.systemPatchNo || '',
          serialId: patchedValue?.serialId || '',
          vendorBatchNo: patchedValue?.vendorBatchNo || '',
          trackingValue: patchedValue?.trackingValue || '',
        },
      });
      dialogRef.onClose.subscribe((res: any) => {
        if (res) {
          this.selectedTraking = res;

          setTracking.get('stockInTracking')?.patchValue({ ...res });
          setTracking.get('stockInTracking')?.get('selectedValue')?.setValue(res);
          this.cdr.detectChanges();
        }
        this.isValidData()

      });

    } else {
      return;
    }
  }
  setStockInTracking(indexLine: number) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;
       this.setTracking(rowForm)
  }
  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
  }
  // manual Barcode Event
  barcodeCanged(e: any, stockInFormGroup: FormGroup, index: number) {
    this.transactionService.getItemBarcodeForItem(e);
    this.transactionService.sendItemBarcode$.pipe(skip(1)).subscribe((data) => {
      if (data) {
        stockInFormGroup.get('itemId')?.setValue(data.itemId);
        this.setRowDataFromBarCode(index, data, e)
      }
    });
  }
  setRowDataFromBarCode(indexLine: number, selectedItem: any, barcode: string) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;

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
          description: selectedItem?.itemName + '-' +
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

        // Handle the nested form group
        const stockInTracking = rowForm.get('stockInTracking') as FormGroup;
        if (stockInTracking) {
          stockInTracking.patchValue({
            id: selectedItem.stockInTracking?.id || 0,
            vendorBatchNo: selectedItem.stockInTracking?.vendorBatchNo,
            expireDate: selectedItem.stockInTracking?.expireDate,
            systemPatchNo: selectedItem.stockInTracking?.systemPatchNo,
            serialId: selectedItem.stockInTracking?.serialId,
            trackingType: selectedItem.trackingType,
            selectedValue: selectedItem.stockInTracking?.quantity,
          });
        }
      }
      rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameAr)
      this.setUomName(indexLine, rowForm.get('uomOptions')?.value)



    }
  }

  onSave() {
    this.isValidData()
    if (!this.formsService.validForm(this.stockInDetailsFormArray, false)) return;
    if (this.save) {

      const stockInDetails = this.stockInDetailsFormArray as FormArray;
      this.errorsArray = []; // Array to collect errors for each line



      if (!this.formsService.validForm(this.stockInForm, false)) return;
      if (!this.formsService.validForm(this.stockInDetailsFormArray, false)) return;
      let data: AddStockIn = {
        ...this.stockInForm.value,
        sourceDocumentType: +this.stockInForm.value.sourceDocumentType,
        stockInDetails: this.stockInDetailsFormArray.value,
      };

      this.transactionService.editStockIn(data, this.stockInForm);
      this.transactionService.updatedStockInData$.subscribe((res: any) => {
        if (res === true) {
          this.savedDataId = res;
          this.dataToReadOnly = true;
          this.postButton = true;
          this.saveButtonEnabled = false;
        } else {
          this.dataToReadOnly = false;
          this.postButton = false;
          this.saveButtonEnabled = true;
        }
      });
    }


  }

  private handleFormChanges(): void {
    this.dataToReadOnly = false;
    this.postButton = false;
  }

  OnDelete(id: number) {
    this.transactionService.deleteStockInLine(id);
  }

  deleteIndex(i: number) {
    this.stockInDetailsFormArray.removeAt(i);
  }

  onPost() {
    this.transactionService.posteStockIn(this.itemId);
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
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private transactionService: TransactionsService,
    private fb: FormBuilder,
    private lookupservice: LookupsService,
    private _route: ActivatedRoute,
    private router: RouterService,
    private formsService: FormsService,
    public sharedStock: SharedStock,
    private cdr: ChangeDetectorRef,
    private toasterService: ToasterService,

  ) {
  }
}
