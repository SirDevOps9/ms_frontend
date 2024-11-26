import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { OperationalStockIn, LatestItems, GetWarehouseList, StockInDetail, AddStockIn } from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { skip } from 'rxjs';
import { LookupEnum, lookupDto, PageInfoResult, MenuModule, customValidators, PageInfo, LanguageService, LookupsService, RouterService, FormsService, ToasterService } from 'shared-lib';
// import { VendorAdvancedSearchComponent } from '../../../components/vendor-advanced-search/vendor-advanced-search.component';

@Component({
  selector: 'app-add-purchase-invoice',
  templateUrl: './add-purchase-invoice.component.html',
  styleUrl: './add-purchase-invoice.component.scss'
})
export class AddPurchaseInvoiceComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});
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
  latestItemsList: LatestItems[] = [];
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  warhouseLookupData: GetWarehouseList[] = [];
  uomLookup: any = [];
  currentLang: string;
  showError: boolean = false;
  barcodeData: StockInDetail;
  selectedLanguage: string;
  lineError:number=-1
  error:boolean
  save:boolean=true;
  
  numberOfItems : number
  total : number
  totalAfterDiscount : number
  totalQuantity : number
  discount : number
  vatAmount : number
  totalAfterVat : number
 
  ngOnInit(): void {
    this.initializeForm();

 
    this.stockInForm.get('receiptDate')?.disabled;

    this.stockInForm.valueChanges.subscribe((res) => {
    });

    // this.lookupservice.loadLookups([LookupEnum.StockInOutSourceDocumentType]);
    // this.lookupservice.lookups.subscribe((l) => {
    //   this.lookups = l;
    // }); 

    // this.stockInForm.get('sourceDocumentType')?.valueChanges.subscribe((res) => {
    //   let data = this.lookups[LookupEnum.StockInOutSourceDocumentType];
    //   let sourceDocumentTypeData = data.find((elem) => elem.id == res);
    //   if (sourceDocumentTypeData?.name == 'OperationalTag') {
    //     this.transactionsService.OperationalTagDropDown();
    //     this.transactionsService.sendOperationalTagDropDown$.subscribe((res) => {
    //       if (res) {
    //         this.oprationalLookup = res;
    //         this.oprationalLookup = res.map((elem: any) => ({
    //           ...elem,
    //           displayName: `${elem.name} (${elem.code})`,
    //         }));
    //       }
    //     });
    //   }
    // });
    this.stockInForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
      let data = this.oprationalLookup.find((elem) => elem.id == res);
      this.stockInForm.get('warehouseId')?.setValue(data?.warehouseId);
      this.stockInForm.get('warehouseName')?.setValue(data?.warehouseName);
    });

    this.stockIn.valueChanges.subscribe((res: any[]) => {
      // Ensure `res` is an array
      if (Array.isArray(res)) {
        this.numberOfItems = res.length;
    
        // Calculate totalAfterDiscount for all items using reduce
        this.totalAfterDiscount = res.reduce((acc, item) => {
          const itemTotal = item.quantity * (item.cost - item.disAmount);
          return acc + itemTotal;
        }, 0);

        this.totalQuantity = res?.reduce((accumulator, item) => {
          let data =  +accumulator + +item.quantity;
          return data
        },0); // Start with 0 explicitly
        this.discount = res?.reduce((accumulator, item) => {
          let data =  +accumulator + +item.discount;
          return data
        },0); // Start with 0 explicitly
        this.discount = res?.reduce((accumulator, item) => {
          let data =  +accumulator + +item.discount;
          return data
        },0); // Start with 0 explicitly
        this.vatAmount = res?.reduce((accumulator, item) => {
          let data =  +accumulator + +item.discount;
          return data
        },0); // Start with 0 explicitly
      }
    });

    this.initWareHouseLookupData();

    this.transactionsService.getLatestItemsList();
    this.transactionsService.sendlatestItemsList$.subscribe((res) => {
      this.latestItemsList = res;
      if (res.length) {
        this.latestItemsList = res.map((elem: any, index: number) => ({
          ...elem,
          itemNumber:index+1,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${
            this.currentLang == 'en' ? elem.itemVariantNameEn : elem.itemVariantNameAr
          }`,
        }));
      }
    });

    this.addLineStockIn();

    this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((res) => {
      this.barcodeData = res;
    });
  }
  isValidData(){
    this.lineError=-1
    this.stockInDetailsFormArray.value.forEach((element:any , index:number) => {
      let lineNumber =index+1
      if(element.stockInTracking.trackingType == this.sharedStock.StockOutTracking.Batch){
        if(element.stockInTracking.vendorBatchNo == null ||element.stockInTracking.vendorBatchNo ==''){
          this.lineError=index
          this.error=true
          this.save=false
  
          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.setTracking' )+lineNumber
          );
        }
      }else if(element.stockInTracking.trackingType == this.sharedStock.StockOutTracking.Serial ){
  
        if(element.stockInTracking.serialId == null || element.stockInTracking.serialId == ''){
          this.lineError=index
          this.error=true
          this.save=false
  
  
          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.setTracking' )+lineNumber
          );
          
        }
      }else{
        this.error=false
        this.save=true
  
        this.lineError=-1
  
  
      }
    },
    this.save=true
  );
  }
  initializeForm(){
    this.stockInForm = this.fb.group({
    id: new FormControl(''),
    code: new FormControl(''),
    receiptDate: new FormControl(new Date(), [customValidators.required]),
    sourceDocumentId: new FormControl('' ,[customValidators.required] ),
    warehouseId: new FormControl('', [customValidators.required]),
    rate: new FormControl('', [customValidators.required]),
    warehouseName: new FormControl(''),
    notes: new FormControl(''),
    description: new FormControl(''),
    sourceDocumentType: new FormControl(''),
    date: new FormControl(new Date() , [customValidators.required]),
    numberOfItems : 0,
    total : 0,
    totalAfterDiscount : 0,
    totalQuantity : 0,
    discount : 0,
    vatAmount : 0,
    totalAfterVat : 0,
   

    stockInStatus: new FormControl(''),
    stockInDetails: this.fb.array([]),
    });
  }
  get stockInDetailsFormArray() {
    return this.stockInForm.get('stockInDetails') as FormArray;
  }
  setRowdata(indexLine: number, selectedItemId: any, list: any){
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
          id:selectedItem?.id ,
          barCode: selectedItem?.barCode ,
          bardCodeId: selectedItem?.bardCodeId ,
          description: selectedItem?.displayName ,
          itemId:  selectedItem?.itemId ,
          itemCode:selectedItem?.itemCode ,
          itemName: selectedItem?.itemName ,
          itemCodeName: selectedItem?.itemCode ,
          itemVariantId: selectedItem?.itemVariantId ,
          itemVariantCode: selectedItem?.itemVariantCode ,
          itemVariantNameAr: selectedItem?.itemVariantNameAr ,
          itemVariantNameEn: selectedItem?.itemVariantNameEn ,
          uomNameAr: selectedItem?.uomNameAr ,
          uomNameEn: selectedItem?.uomNameEn ,
          uomId: selectedItem?.uomId ,
          quantity:  selectedItem?.quantity||1 ,
          cost: selectedItem?.price , 
          subTotal: selectedItem?.subCost ,
          notes:selectedItem?.notes ,
          hasExpiryDate:selectedItem?.hasExpiryDate ,
          stockInEntryMode: selectedItem?.stockInEntryMode||'Manual' ,
          trackingType: selectedItem?.trackingType ,
          uomOptions:selectedItem.itemsUOM,

        });
  
        const stockInTracking = rowForm.get('stockInTracking') as FormGroup;
        if (stockInTracking) {
          stockInTracking.patchValue({
            id:selectedItem.stockInTracking?.id || 0  ,
            vendorBatchNo:selectedItem.stockInTracking?.vendorBatchNo  ,
            expireDate:  selectedItem.stockInTracking?.expireDate  ,
            systemPatchNo:selectedItem.stockInTracking?.systemPatchNo  ,
            serialId: selectedItem.stockInTracking?.serialId ,
            trackingType: selectedItem.trackingType  ,
            selectedValue:selectedItem.stockInTracking?.quantity  ,
          });
        }
      }
      rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameAr)
       this.setUomName(indexLine, rowForm.get('uomOptions')?.value)
 
      }
  }



  setUomName(indexLine: number, list: any) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;
    const selectedItem = list?.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }

  
  }  
  
  
  openAdvancedSearch() {
    // const ref = this.dialog.open(VendorAdvancedSearchComponent, {
    //   width: '650px',
    //   height: '600px',
    // });
    // ref.onClose.subscribe((selectedItems: any[]) => {

    // });
  }


  changeUomName(indexLine: number, list: any) {
    const rowForm = this.stockInDetailsFormArray.at(indexLine) as FormGroup;
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
    // const ref = this.dialog.open(ImportStockInComponent, {
    //   width: '600px',
    //   height: '450px',
    // });
    // ref.onClose.subscribe((selectedItems: any[]) => {});
  }

  onEdit(data: any) {}

  createStockIn() {
    return this.fb.group({
      uomOptions:[],
      barCode: '',
      bardCodeId: null,
      description: '',
      itemId: [null, customValidators.required],
      itemCodeName: '',
      itemVariantId: '',
      discount : '',
      disAmount : '',
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

  disAmountChange(purchaseForm : FormGroup) {
    if(purchaseForm.controls['cost']?.value && purchaseForm.controls['discount']?.value) {
      let amountAndDiscount;

      amountAndDiscount = purchaseForm.controls['discount']?.value / purchaseForm.controls['cost']?.value * 100
      purchaseForm.get('disAmount')?.setValue(amountAndDiscount)
    }
  }

  amountChange(purchaseForm : FormGroup) {
     if(purchaseForm.controls['cost']?.value  && purchaseForm.get('disAmount')?.value ){
      let amountAndDiscount;

      amountAndDiscount = purchaseForm.controls['cost']?.value * purchaseForm.controls['disAmount']?.value /  100
      purchaseForm.get('discount')?.setValue(amountAndDiscount)
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
    this.uomChanged(stockInFormGroup.get('uomId')?.value, stockInFormGroup, false);
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
  uomChanged(e: any, stockInFormGroup: FormGroup, isBarcode: boolean) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);
    if (isBarcode) stockInFormGroup.get('barCode')?.setValue(null);
    stockInFormGroup
      .get('uomName')
      ?.setValue(this.currentLang == 'en' ? data.uomNameEn : data.uomNameAr);
  }

  addLineStockIn() {
    this.isValidData()
    if (!this.formService.validForm(this.stockInDetailsFormArray, false)) return;

    if (this.stockIn.valid) {
      this.formSubmited = false;
    } else {
      this.formSubmited = true;
    }
    if (!this.formService.validForm(this.stockIn, false)) return;
  this.stockIn.push(this.createStockIn());


  }
  onFilter(SearchTerm: string) {
    const warehouseId: number = this.stockInForm.get('warehouseId')?.value;
    this.transactionsService.getItems('', SearchTerm, new PageInfo());
    this.transactionsService.itemsList.subscribe((res: any) => {
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
    this.transactionsService.getLatestItemsListByWarehouse('', id);
  }

  scan() {
    // const ref = this.dialog.open(ScanParcodeStockInComponent, {
    //   width: '50%',
    //   height: '450px',
    // });
  }

  openDialog( indexline:number ,stockInFormGroup: FormGroup) {
    // const ref = this.dialog.open(MultiSelectItemStockInComponent, {
    //   width: 'auto',
    //   height: '600px',
    // });
    // ref.onClose.subscribe((selectedItems: any) => {
    //   if (selectedItems) {
    //     stockInFormGroup.get('itemId')?.setValue(selectedItems.itemId);
    //     this.setRowDataFromBarCode(indexline, selectedItems,'')

    //   }
    // });
  }

  barcodeCanged(e: any, stockInFormGroup: FormGroup ,index:number) {
    if (e) {
      this.transactionsService.getItemBarcodeForItem(e);
      this.transactionsService.sendItemBarcode$.pipe(skip(1)).subscribe((data) => {
        if (data) {
          stockInFormGroup.get('itemId')?.setValue(data.itemId);
      
          this.setRowDataFromBarCode(index, data ,e)

        }
      });
    }
  }
  setRowDataFromBarCode(indexLine: number, selectedItem: any , barcode:string){
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
          id:selectedItem?.id ||0,
          barCode: barcode ,
          bardCodeId: selectedItem?.bardCodeId ,
          description : selectedItem?.itemName + '-' + 
              (this.selectedLanguage === 'en' 
                 ? selectedItem?.itemVariantNameEn 
                 : selectedItem?.itemVariantNameAr),
          itemId:  selectedItem?.itemId ,
          itemCode:selectedItem?.itemCode ,
          itemName: selectedItem?.itemName ,
          itemCodeName: selectedItem?.itemCode ,
          itemVariantId: selectedItem?.itemVariantId ,
          itemVariantCode: selectedItem?.itemVariantCode ,
          itemVariantNameAr: selectedItem?.itemVariantNameAr ,
          itemVariantNameEn: selectedItem?.itemVariantNameEn ,
          uomNameAr: selectedItem?.uomNameAr ,
          uomNameEn: selectedItem?.uomNameEn ,
          uomId: selectedItem?.uomId ,
          quantity:  selectedItem?.quantity|| 1 ,
          cost: selectedItem?.price , 
          subTotal: selectedItem?.subCost ,
          notes:selectedItem?.notes ,
          hasExpiryDate:selectedItem?.hasExpiryDate ,
          stockInEntryMode: selectedItem?.stockInEntryMode||'Manual' ,
          trackingType: selectedItem?.trackingType ,
          uomOptions:selectedItem?.itemsUOM,
            
        });
  
        const stockInTracking = rowForm.get('stockInTracking') as FormGroup;
        if (stockInTracking) {
          stockInTracking.patchValue({
            id:selectedItem.stockInTracking?.id || 0  ,
            vendorBatchNo:selectedItem.stockInTracking?.vendorBatchNo  ,
            expireDate:  selectedItem.stockInTracking?.expireDate  ,
            systemPatchNo:selectedItem.stockInTracking?.systemPatchNo  ,
            serialId: selectedItem.stockInTracking?.serialId ,
            trackingType: selectedItem.trackingType  ,
            selectedValue:selectedItem.stockInTracking?.quantity  ,
          });
        }
      }
       rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameAr)
       this.setUomName(indexLine, rowForm.get('uomOptions')?.value)
  
      
  
      }
  }
  setTracking(setTracking: FormGroup) {
    // const dialogRef = this.dialog.open(TrackingStockInComponent, {
    //   width: '60%',
    //   height: '450px',
    //   data: {
    //     trackingType: setTracking.get('trackingType')?.value,
    //     expiry: setTracking.get('hasExpiryDate')?.value,
    //     trackingValue: setTracking.get('stockInTracking')?.get('selectedValue')?.value,
    //   },
    // });
    // dialogRef.onClose.subscribe((res: any) => {
    //   if (res) {
    //     this.selectedTraking = res;

    //     setTracking.get('stockInTracking')?.patchValue({ ...res });
    //     setTracking.get('stockInTracking')?.get('selectedValue')?.setValue(res);
    //     this.isValidData()

    //   }
    //   this.isValidData()

    // });
  }

  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
  }

  onSave() {
    this.isValidData()
    if (!this.formService.validForm(this.stockInForm, false)) return;
      
if(this.save){

    let data: AddStockIn = {
      ...this.stockInForm.value,
      sourceDocumentType: +this.stockInForm.value.sourceDocumentType,
      stockInDetails: this.stockInDetailsFormArray.value,
    };

      this.transactionsService.addStockIn(data, this.stockInForm);
      this.transactionsService.addedStockInData$.subscribe((res: number | any) => {
        if (typeof res == 'number') {
          this.savedDataId = res;
          this.dataToReadOnly = true;
        } else {
          this.dataToReadOnly = false;
        }
      });
    }
    
  }

  OnDelete(i: number) {
    this.stockIn.removeAt(i);
  }
  onPost() {
    this.transactionsService.posteStockIn(this.savedDataId);
  }
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private lookupservice: LookupsService,
    private router: RouterService,
    public formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    public sharedStock: SharedStock,
    private toasterService: ToasterService,

  ) {
    this.currentLang = this.languageService.getLang();
    this.selectedLanguage = this.languageService.getLang();
  }
}
