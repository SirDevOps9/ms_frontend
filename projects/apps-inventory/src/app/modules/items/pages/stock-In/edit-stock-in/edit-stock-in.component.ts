import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { ItemsService } from '../../../items.service';
import { AddStockIn, GetWarehouseList, LatestItems } from '../../../models';
import { ImportStockInComponent } from '../import-stock-in/import-stock-in.component';
import { ScanParcodeStockInComponent } from '../scan-parcode-stock-in/scan-parcode-stock-in.component';
import { SharedFinanceEnums } from '../../../models/sharedEnumStockIn';
import { MultiSelectItemStockInComponent } from '../add-stock-in/multi-select-item-stock-in/multi-select-item-stock-in.component';
import { TrackingStockInComponent } from '../add-stock-in/tracking-stock-in/tracking-stock-in.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-stock-in',
  templateUrl: './edit-stock-in.component.html',
  styleUrl: './edit-stock-in.component.scss',
})
export class EditStockInComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});
  LookupEnum = LookupEnum;
  id: number = 0;
  lookups: { [key: string]: lookupDto[] };
  oprationalLookup: { id: number; name: string }[] = [];
  selectedTraking: any = {};
  exportData: any[];
  cols = [
    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    },
    {
      field: 'Short Name',
      header: 'shortName',
    },
  ];
  exportSelectedCols: string[] = [];
  latestItemsList: any[] = [];
  itemData: any;
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  warhouseLookupData: GetWarehouseList[] = [];
  uomLookup: any = [];
  currentLang: string;
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private lookupservice: LookupsService,
    private _route: ActivatedRoute,
    private router: RouterService,
    private formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    private cdr: ChangeDetectorRef
  ) {
    this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));
    this.currentLang = this.langService.getLang();
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
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.stockInForm.valueChanges.subscribe((res) => {});

    this.lookupservice.loadLookups([LookupEnum.StockInOutSourceDocumentType]);
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;
      this.cdr.detectChanges();
    });

    this.stockInForm.get('sourceDocumentType')?.valueChanges.subscribe((res) => {
      let data = this.lookups[LookupEnum.StockInOutSourceDocumentType];
      let sourceDocumentTypeData = data?.find((elem) => elem.id == res);
      if (sourceDocumentTypeData?.name == 'OperationalTag') {
        this.itemsService.OperationalTagDropDown();
        this.itemsService.sendOperationalTagDropDown$.subscribe((res) => {
          this.oprationalLookup = res;
        });
      }
    });

    this.initWareHouseLookupData();

    if (this.id) {
      this.getStockInById(this.id);
    }
    this.addLineStockIn();
  }
  getListOfItems() {
    this.itemsService.getLatestItemsList();
    this.itemsService.sendlatestItemsList$.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any) => ({
          ...elem,
          displayName: `${elem.itemName} (${elem.itemCode})`,
        }));
      }
    });
  }

  getStockInById(id: number) {
    this.itemsService.getStockInById(id);
    this.itemsService.stockInByIdData$.subscribe({
      next: (res: any) => {
        if (res) {
          // Patch main form values
          this.stockInForm.patchValue({
            id: res.id,
            receiptDate: res.receiptDate,
            code: res.code,
            sourceDocumentType: res.sourceDocumentType,
            sourceDocumentId: res.sourceDocumentId,
            warehouseId: res.warehouseId,
            notes: res.notes,
          });

          this.stockIn.clear();

          if (res.stockInDetails && Array.isArray(res.stockInDetails)) {
            res.stockInDetails.forEach((detail: any) => {
              this.patchUom(detail.itemId);
              let uomName = this.uomLookup?.find((item: any) => item.uomId == detail.uomId);

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
                uomName: this.currentLang == 'en' ? uomName.uomNameEn : uomName.uomNameAr,
                uomId: detail.uomId,
                quantity: detail.quantity,
                cost: detail.cost,
                subTotal: detail.subTotal,
                notes: detail.notes,
                hasExpiryDate: detail.hasExpiryDate,
                stockInEntryMode: detail.stockInEntryMode,
                trackingType: detail.trackingType,
                stockInTracking: {
                  id: detail?.stockInTracking?.id,
                  vendorBatchNo: detail?.stockInTracking?.vendorBatchNo,
                  expireDate: detail?.stockInTracking?.expireDate,
                  systemPatchNo: detail?.stockInTracking?.systemPatchNo,
                  serialId: detail?.stockInTracking?.serialId,
                  trackingType: detail?.stockInTracking?.trackingType,
                  selectedValue: detail?.stockInTracking?.selectedValue,
                },
              });
              this.patchUom(detail.itemId);
              // this.displayUomPatched(detail.uomId);
              this.stockIn.push(stockInDetailGroup);
            });
          } else {
            console.warn('stockInDetails is undefined or not an array.');
          }
        }
      },
      error: (err) => {
        console.error('Error fetching stock-in data', err);
      },
    });
  }

  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup$.subscribe((res) => {
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
      id: 0,
      barCode: '',
      bardCodeId: null,
      description: '',
      itemId: [null, customValidators.required],
      itemCodeName: '',
      itemVariantId: '',
      uomName: '',
      uomId: ['', customValidators.required],
      quantity: [null, [customValidators.required, customValidators.nonZero]],
      cost: [null, [customValidators.required, customValidators.nonZero]],
      subTotal: '',
      notes: '',
      hasExpiryDate: '',
      stockInEntryMode: 'Manual',
      trackingType: '',
      stockInTracking: this.fb.group({
        id: null,
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

  itemChanged(e: any, stockInFormGroup: FormGroup) {
    let data = this.latestItemsList.find((item) => item.itemId == e);
    this.itemData = data;
    this.uomLookup = data?.itemsUOM;
    stockInFormGroup.get('stockInTracking')?.reset();
    stockInFormGroup.get('itemCodeName')?.setValue(data?.itemCode);
    stockInFormGroup.get('description')?.setValue(data?.itemVariantName);
    stockInFormGroup.get('trackingType')?.setValue(data?.trackingType);
    stockInFormGroup.get('stockInTracking')?.get('trackingType')?.setValue(data?.trackingType);
    stockInFormGroup.get('itemVariantId')?.setValue(data?.itemVariantId);
    stockInFormGroup.get('hasExpiryDate')?.setValue(data?.hasExpiryDate);
    this.cdr.detectChanges();
  }
  uomChanged(e: any, stockInFormGroup: FormGroup) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);

    stockInFormGroup
      .get('uomName')
      ?.setValue(this.currentLang == 'en' ? data.uomNameEn : data.uomNameAr);
    this.cdr.detectChanges();
  }

  addLineStockIn() {
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
        this.cdr.detectChanges();
      }
    });
  }

  setTracking(setTracking: FormGroup) {
    let patchedValue = setTracking.value.stockInTracking;

    const dialogRef = this.dialog.open(TrackingStockInComponent, {
      width: '60%',
      height: '450px',
      data: {
        id: patchedValue.id,
        trackingType:
          patchedValue.id != 0 || null ? patchedValue.trackingType : patchedValue.trackingType,
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
  }

  onCancel() {
    this.router.navigateTo('/masterdata/stock-in');
  }

  onSave() {
    if (!this.formService.validForm(this.stockInForm, false)) return;
    if (!this.formService.validForm(this.stockIn, false)) return;

    let data: AddStockIn = {
      ...this.stockInForm.value,
      sourceDocumentType: +this.stockInForm.value.sourceDocumentType,
      stockInDetails: this.stockIn.value,
    };
    data.stockInDetails.forEach((item: any) => {
      if (item.stockInTracking) {
        delete item.stockInTracking.selectedValue;
      }
    });
    this.itemsService.editStockIn(data, this.stockInForm);
  }
  OnDelete(id: number) {
    this.itemsService.deleteStockInLine(id);
  }
  deleteIndex(i: number) {
    this.stockIn.removeAt(i);
  }
}
