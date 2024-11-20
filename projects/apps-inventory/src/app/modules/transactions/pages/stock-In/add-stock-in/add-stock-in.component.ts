import { Component, OnInit } from '@angular/core';
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

import { skip } from 'rxjs';
import {
  OperationalStockIn,
  LatestItems,
  GetWarehouseList,
  StockInDetail,
  AddStockIn,
} from '../../../../items/models';
import { ImportStockInComponent } from '../../../components/import-stock-in/import-stock-in.component';
import { MultiSelectItemStockInComponent } from '../../../components/multi-select-item-stock-in/multi-select-item-stock-in.component';
import { ScanParcodeStockInComponent } from '../../../components/scan-parcode-stock-in/scan-parcode-stock-in.component';
import { TrackingStockInComponent } from '../../../components/tracking-stock-in/tracking-stock-in.component';
import { SharedFinanceEnums } from '../../../../items/models/sharedEnumStockIn';
import { TransactionsService } from '../../../transactions.service';

@Component({
  selector: 'app-add-stock-in',
  templateUrl: './add-stock-in.component.html',
  styleUrl: './add-stock-in.component.scss',
})
export class AddStockInComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});
  formSubmited : boolean = false
  errorsArray : any = []
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  oprationalLookup: OperationalStockIn[] = [];
  selectedTraking: any = {};
  exportData: any[];
  savedDataId: number = 0;
  dataToReadOnly: boolean = false;
  exportSelectedCols: string[] = [];
  latestItemsList: LatestItems[] = [];
  itemNumber: any;
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  warhouseLookupData: GetWarehouseList[] = [];
  uomLookup: any = [];
  currentLang: string;
  showError: boolean = false;
  barcodeData: StockInDetail;
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private lookupservice: LookupsService,
    private router: RouterService,
    public formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums
  ) {
    this.currentLang = this.langService.getLang();
  }
  ngOnInit(): void {
    this.stockInForm = this.fb.group({
      receiptDate: [new Date(), customValidators.required],
      code: [''],
      sourceDocumentType: ['', customValidators.required],
      sourceDocumentId: ['', customValidators.required],
      warehouseId: ['', customValidators.required],
      warehouseName: [''],
      notes: '',
      stockInDetails: this.fb.array([]),
    });
    this.stockInForm.get('receiptDate')?.disabled;

    this.stockInForm.valueChanges.subscribe((res) => {});

    this.lookupservice.loadLookups([LookupEnum.StockInOutSourceDocumentType]);
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;
    });

    this.stockInForm.get('sourceDocumentType')?.valueChanges.subscribe((res) => {
      let data = this.lookups[LookupEnum.StockInOutSourceDocumentType];
      let sourceDocumentTypeData = data.find((elem) => elem.id == res);
      if (sourceDocumentTypeData?.name == 'OperationalTag') {
        this.transactionsService.OperationalTagDropDown();
        this.transactionsService.sendOperationalTagDropDown$.subscribe((res) => {
          if (res) {
            this.oprationalLookup = res;
            this.oprationalLookup = res.map((elem: any) => ({
              ...elem,
              displayName: `${elem.name} (${elem.code})`,
            }));
          }
        });
      }
    });
    this.stockInForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
      let data = this.oprationalLookup.find((elem) => elem.id == res);
      this.stockInForm.get('warehouseId')?.setValue(data?.warehouseId);
      this.stockInForm.get('warehouseName')?.setValue(data?.warehouseName);
    });

    this.initWareHouseLookupData();

    this.transactionsService.getLatestItemsList();
    this.transactionsService.sendlatestItemsList$.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any, index: number) => ({
          ...elem,
          itemNumber: index + 1,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantName}`,
        }));
      }
    });

    this.addLineStockIn();

    this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((res) => {
      this.barcodeData = res;
    });
  }

  hasError(formGroup: FormGroup, controlName: string, error: string) {
    const control = formGroup.get(controlName);
    return control?.hasError(error) && control?.touched;
  }

  initWareHouseLookupData() {
    this.transactionsService.getWareHousesDropDown();
    this.transactionsService.wareHousesDropDownLookup$.subscribe((res) => {
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

  onEdit(data: any) {}

  createStockIn() {
    return this.fb.group({
      itemNumber: '',
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
        vendorBatchNo: '',
        expireDate: null,
        systemPatchNo: '',
        serialId: '',
        trackingType: '',
        selectedValue: '',
      }),
    });
  }

  itemChanged(
    e: any,
    stockInFormGroup: FormGroup,
    clonedStockInFormGroup?: any,
    isBarcode?: boolean
  ) {
    let data = this.latestItemsList.find((item: any) => item.itemNumber == e);

    this.uomLookup = data?.itemsUOM ?? clonedStockInFormGroup.itemsUOM;
    if (clonedStockInFormGroup) {
      stockInFormGroup.get('itemCodeName')?.reset();
    }

    if (!isBarcode) {
      stockInFormGroup.get('bardCodeId')?.setValue(null);
      stockInFormGroup.get('barCode')?.setValue('');
    }

    stockInFormGroup
      .get('itemCodeName')
      ?.setValue(data?.itemCode ?? clonedStockInFormGroup?.itemCode);
    stockInFormGroup.get('itemId')?.setValue(data?.itemId ?? clonedStockInFormGroup?.itemId);
    stockInFormGroup
      .get('description')
      ?.setValue(
        ` ${clonedStockInFormGroup?.itemName ?? data?.itemName} - ${
          clonedStockInFormGroup?.itemVariantName ?? data?.itemVariantName
        }`
      );
    stockInFormGroup.get('trackingType')?.setValue(data?.trackingType);
    stockInFormGroup.get('stockInTracking')?.get('trackingType')?.setValue(data?.trackingType);
    stockInFormGroup
      .get('itemVariantId')
      ?.setValue(
        clonedStockInFormGroup?.itemVariantId
          ? clonedStockInFormGroup?.itemVariantId
          : data?.itemVariantId
      );
    stockInFormGroup.get('hasExpiryDate')?.setValue(data?.hasExpiryDate);
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
    if(this.stockIn.valid) {
      this.formSubmited = false
    }else{
      this.formSubmited = true

    }
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

  // manual Barcode Event
  barcodeCanged(e: any, stockInFormGroup: FormGroup) {
    this.transactionsService.getItemBarcodeForItem(e);
    this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((data) => {
      if (data) {
        stockInFormGroup.get('itemId')?.setValue(data.itemId);
        // this.sendBarcodeData(data.itemId)
        this.itemChanged(data.itemId, stockInFormGroup, true, true);
      }
    });
  }

  setTracking(setTracking: FormGroup) {
    const dialogRef = this.dialog.open(TrackingStockInComponent, {
      width: '60%',
      height: '450px',
      data: {
        trackingType: setTracking.get('trackingType')?.value,
        expiry: setTracking.get('hasExpiryDate')?.value,
        trackingValue: setTracking.get('stockInTracking')?.get('selectedValue')?.value,
      },
    });
    dialogRef.onClose.subscribe((res: any) => {
      if (res) {
        this.selectedTraking = res;

        setTracking.get('stockInTracking')?.patchValue({ ...res });
        setTracking.get('stockInTracking')?.get('selectedValue')?.setValue(res);
      }
    });
  }

  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
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
      if (
        control.get('hasExpiryDate')?.value &&
        stockInTracking.get('expireDate')?.invalid
      ) {
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
  
    // Proceed with saving if no errors
    if (this.stockInForm.valid) {
      const data: AddStockIn = {
        ...this.stockInForm.value,
        stockInDetails: this.stockIn.value,
      };
  
      this.transactionsService.addStockIn(data, this.stockInForm);
      this.transactionsService.addedStockInData$.subscribe({
        next: (res: any) => {
          if (res) {
            this.savedDataId = res;
            this.dataToReadOnly = true;
          }
        },
        error() {
          return;
        },
      });
    } else {
      console.error('Form is invalid.');
    }

    console.log(this.errorsArray)
  }

  // onSave() {

  //   console.log(this.stockIn)
   
  //   if (!this.formService.validForm(this.stockInForm, false)) return;
  //   if (!this.formService.validForm(this.stockIn, false)) return;

  //   let data: AddStockIn = {
  //     ...this.stockInForm.value,
  //     sourceDocumentType: +this.stockInForm.value.sourceDocumentType,
  //     stockInDetails: this.stockIn.value,
  //   };

  //   this.transactionsService.addStockIn(data, this.stockInForm);
  //   this.transactionsService.addedStockInData$.subscribe({
  //     next: (res: any) => {
  //       if (res) {
  //         this.savedDataId = res;
  //         this.dataToReadOnly = true;
  //       }
  //     },
  //     error() {
  //       return;
  //     },
  //   });

  
  // }
  OnDelete(i: number) {
    this.stockIn.removeAt(i);
  }
  onPost() {
    this.transactionsService.posteStockIn(this.savedDataId);
  }
}
