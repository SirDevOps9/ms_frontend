import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { format, isValid } from 'date-fns';
import { DialogService } from 'primeng/dynamicdialog';
import { OperationalStockIn, GetWarehouseList } from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { CurrentUserService, customValidators, FormsService, LanguageService, LoaderService, lookupDto, LookupEnum, LookupsService, MenuModule, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { VendorAavancedSearchComponent } from '../../../components/vendor-aavanced-search/vendor-aavanced-search.component';
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
  totalVatAmount : number;
  vatAfter : number;
 
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
    // this.loadLookups();

    // this.initWareHouseLookupData()
    this.initializeForm();
    this.latestVendor()
    this.latestWarehouses()
    this.initItemsData()
    this.subscribe();
    this.calculate();
    this.getStockOutyId(2)

  }
  calculate(){
    this.totalQuantity = 0;
    this.totalCost = 0;
    this.totalSubTotal = 0;
    this.totalQuantity = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('quantity')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalCost = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('cost')?.value) || 0;
      return acc + debitValue;
    }, 0);
    this.totalSubTotal = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
      // Ensure that debitAmount is treated as a number
      const debitValue = parseFloat(control.get('subCost')?.value) || 0;
      return acc + debitValue;
    }, 0);
        this.totalItemsCount=this.stockOutDetailsFormArray.value.length



      ////////////////////////afterdis
      this.totalAfterDiscount = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
        // Ensure that debitAmount is treated as a number
        const debitValue = parseFloat(control.get('totalAfter')?.value) || 0;
        return acc + debitValue;
      }, 0);
      ////////////////// vat amount 
      this.totalVatAmount = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
        // Ensure that debitAmount is treated as a number
        const debitValue = parseFloat(control.get('VatAmount')?.value) || 0;
        return acc + debitValue;
      }, 0);
      this.vatAfter= this.totalVatAmount+this.totalAfterDiscount
      ////////////////// Discount 
      this.totalDiscount = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
        // Ensure that debitAmount is treated as a number
        const debitValue = parseFloat(control.get('discountAmt')?.value) || 0;
        return acc + debitValue;
      }, 0);
      ////////////////// Discount 
      // this.totalDiscount = this.stockOutDetailsFormArray.controls.reduce((acc, control) => {
      //   // Ensure that debitAmount is treated as a number
      //   const debitValue = parseFloat(control.get('cost')?.value) || 0;
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
  latestVendor(){
    
    this.PurchaseService.latestVendor(undefined).subscribe((res:any)=>{
      this.vendorItems=res
      
    })
  }
  latestWarehouses(){
    
    this.PurchaseService.LatestWarehouses(undefined).subscribe((res:any)=>{
       this.warehouses=res
      console.log(res ,"kkkkk");
      
      
    })
  }
    
  onFilterVendor(SearchTerm: string) {
    this.PurchaseService.latestVendor(SearchTerm).subscribe((res:any)=>{
      this.vendorItems=res
      
    })
  }
  test(){
    const ref = this.dialog.open(VendorAavancedSearchComponent, {
      width: 'auto',
      height: '500px',
      data: this.addForm.get('warehouseId')?.value
    });
    ref.onClose.subscribe((selectedItems: any) => {

      if (selectedItems) {
        console.log(selectedItems ,"55555555555");
        
        // this.setRowDataFromPopup(indexLine, selectedItems)
      }
    });
  }
  setVendorData(vendorId:number){
this.vendorItems.find((item) => {
  if (item.id === vendorId) {
    this.addForm.get('vendorName')?.setValue(item?.name)
    this.addForm.get('vendorCurrency')?.setValue(item?.vendorFinancialCurrencyName)
    this.addForm.get('paymentTermName')?.setValue(item?.paymentTermName)
this.getAccountCurrencyRate(item.vendorFinancialCurrencyId)
  }
});
  }
  onFilterItems(SearchTerm: string) {
    this.PurchaseService.getLatestItems(SearchTerm)

  }
  onFilter(SearchTerm: string) {
    const warehouseId: number = this.addForm.get('warehouseId')?.value
    this.itemsService.getItemsStockOutByWarehouse('', SearchTerm, warehouseId, new PageInfo());
    this.itemsService.itemsListByWarehouse.subscribe((res: any) => {
      if (res.length > 0) {
        if (this.selectedLanguage === 'ar') {
          this.filteredItems = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,

            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
          }));
        } else {

          this.filteredItems = res.map((elem: any, index: number) => ({
            ...elem,
            itemNumber: index + 1,

            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameEn}`,
          }));
        }
      } else {

        this.getLatestItemsList(warehouseId)
      }
    })
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
      id: 0,
      invoiceStatus: data.invoiceStatus,
      invoiceCode: data.code,
      invoiceDate: data.invoiceDate,
      invoiceDescription: data.description,
      warehouseId: data.warehouseId,
      vendorCode: new FormControl(''),
      currency: new FormControl(''),
      rate: new FormControl(''),
      paymentTerms: new FormControl(''),
      invoiceJournal: new FormControl(''),
      stockOut: new FormControl(''),
      vendorId: data.vendorId,
      vendorName: new FormControl(''),
      vendorCurrency: new FormControl(''),
      vendorRate: new FormControl(''),
      paymentTermId: data.paymentTermId,
      paymentTermName: new FormControl(''),
      reference: data.reference,
    });
    this.setVendorData(1)
    // if(      data?.warehouseId
    // ){
    //   this.getLatestItemsList(data?.warehouseId)

    // }

    // Clear existing form array
    const stockOutDetailsFormArray = this.addForm.get('stockOutDetails') as FormArray;
    stockOutDetailsFormArray.clear();
console.log("4444444444444444444444444");

    // Patch stockOutDetails array
    data?.invoiceDetails?.forEach((detail: any, index: number) => {
      console.log(detail ,index ,"5555");
      
      this.addNewRowWithOutItem()
      this.setRowDataById(index, detail)
    });
    this.dataLoaded = true
    this.originalFormData = this.addForm.value
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
      vendorCode: new FormControl(''),
      currency: new FormControl(''),
      rate: new FormControl(''),
      paymentTerms: new FormControl(''),
      invoiceJournal: new FormControl(''),
      stockOut: new FormControl(''),
      vendorId: new FormControl(''),
      vendorName: new FormControl(''),
      vendorCurrency: new FormControl(''),
      vendorRate: new FormControl(''),
      paymentTermId: new FormControl(''),
      paymentTermName: new FormControl(''),
      reference: new FormControl(''),
      stockOutDetails: this.fb.array([]),

    });

  }
  get stockOutDetailsFormArray() {
    return this.addForm.get('stockOutDetails') as FormArray;
  }
  getLatestItemsList(id: number) {

    this.itemsService.getLatestItemsListByWarehouse("", id)
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
    this.PurchaseService.accountCurrencyRateDataSource.subscribe((res:CurrencyRateDto)=>{
      console.log(res.rate ,"p");
      this.addForm.get('vendorRate')?.setValue(res.rate)
      
    })
    // this.lookupservice.lookups.subscribe((l) => {
    //   this.lookups = l;
    // });
    // this.addForm.get('sourceDocumentType')?.valueChanges.subscribe(res => {
    //   let data = this.lookups[LookupEnum.StockInOutSourceDocumentType]
    //   let sourceDocumentTypeData = data?.find(elem => elem.name == res)
    //   if (sourceDocumentTypeData?.name == 'OperationalTag') {

    //     this.itemsService.operationTagStockOutDropdown()
    //     this.itemsService.perationalTagStockOutDropDown$.subscribe((res: any) => {
    //       this.oprationalLookup = res.map((elem: any) => ({
    //         ...elem,
    //         displayName: `${elem.name} (${elem.code})`,
    //       }));
    //     })
    //   }
    // }
    // )
    // this.addForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
    //   let data = this.oprationalLookup.find(elem => elem.id == res)

    //   this.addForm.get('warehouseId')?.setValue(data?.warehouseId)
    //   this.addForm.get('warehouseName')?.setValue(data?.warehouseName)

    // });
    // this.itemsService.latestItemsListByWarehouse$.subscribe((res: any) => {
    //   this.filteredItems = res
    //   if (res.length) {
    //     if (this.selectedLanguage === 'ar') {
    //       this.filteredItems = res.map((elem: any, index: number) => ({
    //         ...elem,
    //         itemNumber: index + 1,

    //         displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
    //       }));
    //     } else {

    //       this.filteredItems = res.map((elem: any, index: number) => ({
    //         ...elem,
    //         itemNumber: index + 1,

    //         displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameEn}`,
    //       }));
    //     }
    //   }
    // })
    // this.addForm.valueChanges.subscribe((res: any) => {

    //   const x = this.mapStockOutData(this.originalFormData)
    //   const y = this.mapStockOutData(res)
    //   if (JSON.stringify(x) == JSON.stringify(y)) {
    //     this.showPost = true
    //   } else {
    //     this.showPost = false

    //   }
    //   // return JSON.stringify(this.originalFormData) !== JSON.stringify(res);

    // })
  }
  loadLookups() {
    // this.lookupservice.loadLookups([
    //   LookupEnum.StockInOutSourceDocumentType
    // ]);
  }



  setRowData(indexLine: number, selectedItemId: any, list: any) {    
    const selectedItem = list.find((item: any) => item.itemNumber === selectedItemId);
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;

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
        id:selectedItem.id||0,
        barCode: '',
        bardCodeId: null,
        itemId: selectedItem.itemId,
        itemName: selectedItem.itemName,
        itemVariantId: selectedItem.itemVariantId,
        uomId: selectedItem.uomId,
        uomOptions: selectedItem.itemsUOM,
        description: selectedItem.itemName + "-" + selectedItem.itemVariantNameEn,
        cost:(1),
        vat: selectedItem.taxRatio||0,
        trackingType: selectedItem.trackingType,
        hasExpiryDate: selectedItem.hasExpiryDate,
      
      });

      // Handle the nested form group
      const invoiceTrackingGroup = rowForm.get('invoiceTracking') as FormGroup;
      if (invoiceTrackingGroup) {
        invoiceTrackingGroup.patchValue({
          invoiceDetailId: selectedItem?.invoiceTrackingGroup?.invoiceDetailId||0,
          vendorBatchNo: selectedItem.invoiceTrackingGroup?.vendorBatchNo||'',
          quantity: selectedItem.quantity,
          hasExpiryDate: selectedItem.hasExpiryDate,
          expireDate: selectedItem.expireDate,
          systemPatchNo: selectedItem.invoiceTrackingGroup?.systemPatchNo||'',
          serialId: selectedItem.invoiceTrackingGroup?.serialId||null,
          trackingType: selectedItem.trackingType,
        });
      }
    }
    rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameEn)
    this.setUomName(indexLine , rowForm.get('uomOptions')?.value )
console.log(rowForm.value,"5555555555555555555555");

  }
  isDuplicate(rowIndex: number) {
    const rowForm = this.stockOutDetailsFormArray.at(rowIndex) as FormGroup;

    this.stockOutDetailsFormArray.controls.some((element: any, index: number) => {
      if (rowForm.get('showSerial')?.value == true) {

        const quantity = rowForm.get('quantity')?.value;
        if (quantity > 1) {

          this.toasterService.showError(
            this.languageService.transalte('messages.error'),
            this.languageService.transalte('messages.serialError')
          );
          this.rowDuplicate = rowIndex;
          this.serialError = true;
          this.duplicateLine = true;

          return true; // Stop checking on first match
        } else {
          this.serialError = false;
          this.rowDuplicate = -1;


        }
      }
      if (index !== rowIndex) {
        if (rowForm.get('showSerial')?.value == true && this.serialError == false) {

          const { uomId, itemId, trackingNo } = element.value;

          const rowUomId = rowForm.get('uomId')?.value;
          const rowItemId = rowForm.get('itemId')?.value;
          const rowItemtrackingNo = rowForm.get('trackingNo')?.value;


          if (uomId === rowUomId && itemId === rowItemId && trackingNo === rowItemtrackingNo) {
            this.toasterService.showError(
              this.languageService.transalte('messages.error'),
              this.languageService.transalte('messages.duplicateItem')
            );
            this.rowDuplicate = rowIndex;
            this.duplicateLine = true;
            return true; // Stop checking on first match
          }

          this.rowDuplicate = -1;

          this.duplicateLine = false;

          return false;
        }
        this.rowDuplicate = -1;

        this.duplicateLine = false;

        return false;
      }
    }
    )
  }
  setRowDataFromPopup(indexLine: number, selectedItem: any) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;





    // Ensure row form controls are present before updating
    if (rowForm) {
      rowForm.patchValue({
        barCode: selectedItem.barCode,
        bardCodeId: selectedItem.bardCodeId,
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
    this.setExpiryDate(indexLine, selectedItem.batches, selectedItem.serialOptions)
    this.isDuplicate(indexLine)
  }
  setRowDataById(indexLine: number, selectedItem: any) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
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
              invoiceDetailId: selectedItem?.invoiceTrackingGroup?.invoiceDetailId||0,
              vendorBatchNo: selectedItem.invoiceTrackingGroup?.vendorBatchNo||'',
              quantity: selectedItem.quantity,
              hasExpiryDate: selectedItem.hasExpiryDate,
              expireDate: selectedItem.expireDate,
              systemPatchNo: selectedItem.invoiceTrackingGroup?.systemPatchNo||'',
              serialId: selectedItem.invoiceTrackingGroup?.serialId||null,
              trackingType: selectedItem.trackingType,
            });
          }
        }
        // rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" + selectedItem.itemVariantNameEn)
        rowForm.get('itemName')?.setValue(selectedItem.itemCode )
         this.setUomName(indexLine , rowForm.get('uomOptions')?.value )
    console.log(rowForm.value,"5555555555555555555555");
    this.calculate()
  }

  addNewRow() {
    // if (!this.duplicateLine) {
      // if (!this.formsService.validForm(this.addForm, false)) return;
      // this.getLatestItemsList(this.addForm.get('warehouseId')?.value)


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
      this.stockOutDetailsFormArray.push(newLine);
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
    this.stockOutDetailsFormArray.push(newLine);
     this.calculate();
    // }
  }

  setUomName(indexLine: number, list: any) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
    console.log(rowForm.value ,"999999999999");
    
    const selectedItem = list.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
    console.log(selectedItem ,"66666666666666");

    if (this.selectedLanguage === 'ar') {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
    } else {
      rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
    }
  }

  onCancel() {
    this.routerService.navigateTo('transactions/stock-out');

  }

  onSave() {
    // if (!this.formsService.validForm(this.addForm, false)) return;
    // if (this.stockOutDetailsFormArray.value.length == 0) {
    //   this.toasterService.showError(
    //     this.languageService.transalte('messages.error'),
    //     this.languageService.transalte('messages.noItemsToAdd')
    //   );
    // } else {
    //   const data: any = this.mapStockOutData(this.addForm.value)
    //   this.itemsService.editStockOut(data);


    // }

this.PurchaseService.editInvoice(this.addForm)

  }

  mapStockOutData(data: any) {

    return {
      id: data?.id,
      // receiptDate:  format(new Date(data?.receiptDate), 'yyyy-MM-dd'),
      receiptDate: data?.receiptDate && isValid(new Date(data.receiptDate))
        ? format(new Date(data.receiptDate), 'yyyy-MM-dd')
        : null,
      sourceDocumentType: data?.sourceDocumentType,
      sourceDocumentId: data?.sourceDocumentId,
      warehouseId: data?.warehouseId,
      notes: data?.notes,
      stockOutStatus: data?.stockOutStatus,
      stockOutDetails: data?.stockOutDetails?.map((detail: any) => ({

        id: detail.id,
        barCode: detail.barCode,
        bardCodeId: detail.bardCodeId || null,
        itemId: detail.itemId,
        itemVariantId: detail.itemVariantId,
        uomId: detail.uomId,
        description: detail.description,
        quantity: Number(detail.quantity),
        cost: Number(detail.cost),
        notes: detail.notes,
        hasExpiryDate: detail.hasExpiryDate,
        stockOutEntryMode: detail.stockOutEntryMode || "Manual",
        trackingType: detail.trackingType,
        stockOutTracking: {
          id: detail.id,
          quantity: Number(detail.quantity),
          trackingNo: detail.trackingNo,
          hasExpiryDate: detail.hasExpiryDate,
          expireDate: detail.expiryDate || null,
          trackingType: detail.trackingType,
        }
      }))
    }
  }
  initWareHouseLookupData() {
    // this.itemsService.getWareHousesDropDown()
    // this.itemsService.wareHousesDropDownLookup$.subscribe((res: any) => {
    //   this.warhouseLookupData = res
    // })
  }
  setTrackingNo(indexLine: number, event: string) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
    rowForm.get('trackingNo')?.setValue(event)
  }
  setExpiryDate(indexLine: number, batchesOptions: any, serialsOptions: any) {

    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
    const selectedItem = batchesOptions?.find((item: any) => item.trackingNo == rowForm.get('trackingNo')?.value);

    if (selectedItem != undefined) {
      rowForm.get('expiryDate')?.setValue(selectedItem.expiryDate)
      rowForm.get('totalQuantity')?.setValue(selectedItem.totalQuantity)
    } else {
      const serialOption = rowForm.get('stockOutTracking')?.get('serialOptions')?.value
      const selectedItem = serialOption?.find((item: any) => item.trackingNo == rowForm.get('trackingNo')?.value);
      if (selectedItem != undefined) {
        rowForm.get('expiryDate')?.setValue(selectedItem.expiryDate)
        rowForm.get('totalQuantity')?.setValue(selectedItem.totalQuantity)
      } else {
        rowForm.get('expiryDate')?.setValue('')
        rowForm.get('totalQuantity')?.setValue(rowForm.get('AllTotalQuantity')?.value)

      }


    }


  }
  setCostTotal(indexLine: number) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;

    rowForm.get('subCost')?.setValue(Number(rowForm.get('quantity')?.value) * Number(rowForm.get('cost')?.value))
    rowForm.get('netCost')?.setValue( rowForm.get('cost')?.value - rowForm.get('discountAmt')?.value)
    rowForm.get('totalAfter')?.setValue( rowForm.get('quantity')?.value * rowForm.get('netCost')?.value)
    this.calculate()
    this.setDiscount(indexLine)
  }
  
  setDiscount(indexLine: number) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
    const  discount = (rowForm.get('discountAmt')?.value / ( rowForm.get('cost')?.value /100))
    rowForm.get('discount')?.setValue(discount)
    rowForm.get('netCost')?.setValue( rowForm.get('cost')?.value - rowForm.get('discountAmt')?.value)
    rowForm.get('totalAfter')?.setValue( rowForm.get('quantity')?.value * rowForm.get('netCost')?.value)
    this.calculate()

 
  }
  setDiscountAmt(indexLine: number) {
  
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
    // const  discount = (rowForm.get('discount')?.value * ( rowForm.get('subCost')?.value))/100
const discountValue = Number(rowForm.get('discount')?.value) || 0;
const subCostValue = rowForm.get('cost')?.value;
const discount:any = (discountValue * subCostValue) / 100;
    rowForm.get('discountAmt')?.setValue(Math.round(discount))
    rowForm.get('netCost')?.setValue( rowForm.get('cost')?.value - rowForm.get('discountAmt')?.value)
    rowForm.get('totalAfter')?.setValue( rowForm.get('quantity')?.value * rowForm.get('netCost')?.value)
    this.calculate()

  }

  async deleteRow(index: number, id: number) {



    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      if (id == 0) {
        this.stockOutDetailsFormArray.removeAt(index);
        this.isDuplicate(index - 1)
      }
      else {
        this.itemsService.deleteRowStockOut(id).subscribe({
          next: (res: any) => {
            this.toasterService.showSuccess(
              this.languageService.transalte('transactions.success'),
              this.languageService.transalte('transactions.deleteStockOut')
            );
            this.stockOutDetailsFormArray.removeAt(index);
            this.isDuplicate(index - 1)
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
       
      }

    });
  }
  barcodeCanged(e: any, index: number) {
    this.loaderService.show();

    this.itemsService.getItemByBarcodeStockOutQuery(e.target.value, this.addForm.get('warehouseId')?.value).subscribe({
      next: (res: any) => {
        this.loaderService.hide();

        this.setRowDataFromBarCode(index, res)


      },
      error: (err: any) => {
        this.loaderService.hide();

        const rowForm = this.stockOutDetailsFormArray.at(index) as FormGroup;
        rowForm.reset();
        this.toasterService.showError(
          this.languageService.transalte('messages.Error'),
          this.languageService.transalte('messages.noBarcode')
        );
      },
    })

  }
  setRowDataFromBarCode(indexLine: number, selectedItem: any) {
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
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
    this.setExpiryDate(indexLine, selectedItem.batches, selectedItem.serialOptions)
    this.isDuplicate(indexLine)
  }
  addToPost() {
    this.itemsService.postStockOut(this.stockOutId)

  }
  setTracking(setTracking: FormGroup) {
console.log(setTracking.value.invoiceTracking ,"ddddd");

    let patchedValue = setTracking.value.invoiceTracking;
    // if (this.showPost) {
      const dialogRef = this.dialog.open(TrackingEditComponent, {
        width: '60%',
        height: '450px',
        data: {
          id: patchedValue?.invoiceDetailId||0,
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
        console.log(res ,"55555");
        console.log(setTracking.value.invoiceTracking ,"55555");
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
  setStockInTracking(indexLine: number) {
    console.log("rrrrrrrrrrrrrrrrrrr");
    
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
       this.setTracking(rowForm)
  }
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private itemsService: TransactionsService,
    private fb: FormBuilder,
    private lookupservice: LookupsService,
    private formsService: FormsService,
    public sharedFinanceEnums: SharedStock,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private loaderService: LoaderService,
    private PurchaseService: PurchaseTransactionsService,
    private currentUserService: CurrentUserService,


  ) {
  }
}
