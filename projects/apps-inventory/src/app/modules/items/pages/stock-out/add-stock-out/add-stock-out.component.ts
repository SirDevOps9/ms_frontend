import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, FormsService, LanguageService, lookupDto, LookupEnum, LookupsService, MenuModule, PageInfo, PageInfoResult, RouterService, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddStockOutDto, GetWarehouseList, OperationalStockIn } from '../../../models';
import { SharedStock } from '../../../models/sharedStockOutEnums';
import { SearchItemPopUpComponent } from '../../../components/stock-out/search-item-pop-up/search-item-pop-up.component';

@Component({
  selector: 'app-add-stock-out',
  templateUrl: './add-stock-out.component.html',
  styleUrl: './add-stock-out.component.scss'
})
export class AddStockOutComponent implements OnInit{
  stockInForm: FormGroup = new FormGroup({});
  LookupEnum=LookupEnum;
  selectedLanguage: string
 rowDuplicate :number=-1;
duplicateLine :boolean;
  tableData: any[];
  lookups: { [key: string]: lookupDto[] };

  oprationalLookup: OperationalStockIn[] = [];
  warhouseLookupData :GetWarehouseList[] =[]

  filteredItems: any[];
  exportData: any[];

  exportSelectedCols: string[] = [];

  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  addForm: FormGroup=new FormGroup({});

 
  ngOnInit(): void {
    this.loadLookups();

    this.initWareHouseLookupData()
    this.initializeForm();
    this.subscribe();
  }
  initializeForm() {
    this.addForm = this.fb.group({

      code: new FormControl(''),
      receiptDate: new FormControl(new Date(),[customValidators.required]),
      sourceDocumentType: new FormControl('',[customValidators.required]),
      sourceDocumentId: new FormControl(''),
      warehouseId: new FormControl('',[customValidators.required]),
      warehouseName: new FormControl(''),
      notes: new FormControl(''),
      stockOutDetails: this.fb.array([]),

    });

  }
  get stockOutDetailsFormArray() {
    return this.addForm.get('stockOutDetails') as FormArray;
  }
  getLatestItemsList(id:number){
    
    this.itemsService.getLatestItemsListByWarehouse( "",id)
  }
  onFilter(SearchTerm:string,id:number){
    this.itemsService.getLatestItemsListByWarehouse( "",id)

  }
  subscribe(){
    this.languageService.language$.subscribe((lang)=>[
      this.selectedLanguage=lang
     ])
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;   
      console.log(l)   
    });
    this.addForm.get('sourceDocumentType')?.valueChanges.subscribe(res=>{
      let data = this.lookups[LookupEnum.StockInOutSourceDocumentType]
    let sourceDocumentTypeData = data.find(elem=>elem.id == res)
      if(sourceDocumentTypeData?.name == 'OperationalTag') {
        console.log("444444444");
        
        this.itemsService.OperationalTagDropDown()
        this.itemsService.sendOperationalTagDropDown$.subscribe(res=>{
          this.oprationalLookup = res.map((elem: any) => ({
            ...elem,
            displayName: `${elem.name} (${elem.code})`,
          }));
        })
      }
    }
  )
  this.addForm.get('sourceDocumentId')?.valueChanges.subscribe((res) => {
    let data = this.oprationalLookup.find(elem=>elem.id == res)
    this.addForm.get('warehouseId')?.setValue(data?.warehouseId)
    this.addForm.get('warehouseName')?.setValue(data?.warehouseName)

  });
  this.itemsService.latestItemsListByWarehouse$.subscribe((res:any)=>{
    this.filteredItems=res
    if (res.length) {
      if (this.selectedLanguage === 'ar') {
        this.filteredItems = res.map((elem: any) => ({
          ...elem,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
        }));
      }else{

        this.filteredItems = res.map((elem: any) => ({
          ...elem,
          displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameEn}`,
        }));
      }
    }
  })
}
loadLookups(){
  this.lookupservice.loadLookups([
    LookupEnum.StockInOutSourceDocumentType
  ]);
}

 

    setRowData(indexLine: number, selectedItemId: any, list: any) {
      const selectedItem = list.find((item: any) => item.itemId === selectedItemId);
      const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;

      if (!selectedItem) {
        console.error(`Item with ID ${selectedItemId} not found`);
        return;
      }

      if (!rowForm) {
        console.error(`Row form at index ${indexLine} is not found`);
        return;
      }

      console.log('Selected Item:', selectedItem);

      // Ensure row form controls are present before updating
      if (rowForm) {
        rowForm.patchValue({
          barCode: selectedItem.barCode ,
          bardCodeId: selectedItem.bardCodeId ,
          itemId: selectedItem.itemId,
          itemVariantId: selectedItem.itemVariantId ,
          uomId: selectedItem.uomId ,
          uomOptions: selectedItem.itemsUOM ,
          description: selectedItem.itemName+"-" +selectedItem.itemVariantNameEn ,
          AllTotalQuantity: selectedItem.totalQuantity ,
          cost: selectedItem.cost ,
          subCost: selectedItem.subCost ,
          notes: selectedItem.notes ,
          stockOutEntryMode: selectedItem.stockOutEntryMode ,
          trackingType: selectedItem.trackingType ,
          trackingNo: selectedItem.trackingNo || '',
          hasExpiryDate: selectedItem.hasExpiryDate ,
          expireDate: selectedItem.expireDate ,
          availability: selectedItem.availability 
        });

        // Handle the nested form group
        const stockOutTrackingGroup = rowForm.get('stockOutTracking') as FormGroup;
        if (stockOutTrackingGroup) {
          stockOutTrackingGroup.patchValue({
            batchNo: selectedItem.stockOutTracking?.batchNo || '',
            expireDate: selectedItem.stockOutTracking?.expireDate ||null,
            quantity: selectedItem.stockOutTracking?.quantity || '',
            serialId: selectedItem.stockOutTracking?.serialId || '',
            trackingType: selectedItem.stockOutTracking?.trackingType || '',
            hasExpiryDate: selectedItem.hasExpiryDate ,
            serialOptions: selectedItem.serials,
            batchesOptions: selectedItem.batches
          });
        } else {
          console.error('StockOutTracking form group is missing');
        }
      }
      if(selectedItem){
        if(selectedItem.hasExpiryDate){
          if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.NoTracking){
            rowForm.get('showSerial')?.setValue(false);
            rowForm.get('showBatch')?.setValue(true);
          }
          else if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.Serial){
            rowForm.get('showSerial')?.setValue(true);
            rowForm.get('showBatch')?.setValue(false);
          }
          else if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.Batch){
            rowForm.get('showSerial')?.setValue(false);
            rowForm.get('showBatch')?.setValue(true);
          }
        }else{
          if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.NoTracking){
            rowForm.get('showSerial')?.setValue(false);
            rowForm.get('showBatch')?.setValue(false);
          }
        }
      }
      rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" +selectedItem.itemVariantNameAr )
      this.setUomName(indexLine , rowForm.get('uomOptions')?.value )
      this.setExpiryDate(indexLine , selectedItem.batches , selectedItem.serialOptions )
      // Log the updated form value for debugging
      console.log(selectedItem ,"selectedItem.stockOutTracking?.batches");
      
      console.log('Updated row form:', rowForm.value);
      this.isDuplicate(indexLine)
    }
    isDuplicate(rowIndex:number){
      const rowForm = this.stockOutDetailsFormArray.at(rowIndex) as FormGroup;

      this.stockOutDetailsFormArray.controls.some((element: any, index: number) => {
        if (index !== rowIndex) {
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
    )
    }
    setRowDataFromPopup(indexLine: number, selectedItem: any) {
      const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;

     

    

      // Ensure row form controls are present before updating
      if (rowForm) {
        rowForm.patchValue({
          barCode: selectedItem.barCode ,
          bardCodeId: selectedItem.bardCodeId ,
          itemId: selectedItem.itemId,
          itemVariantId: selectedItem.itemVariantId ,
          uomId: selectedItem.uomId ,
          uomOptions: selectedItem.itemsUOM ,
          description: selectedItem.itemName+"-" +selectedItem.itemVariantNameEn ,
          AllTotalQuantity: selectedItem.totalQuantity ,
          cost: selectedItem.cost ,
          subCost: selectedItem.subCost ,
          notes: selectedItem.notes ,
          stockOutEntryMode: selectedItem.stockOutEntryMode ,
          trackingType: selectedItem.trackingType ,
          trackingNo: selectedItem.trackingNo || '',
          hasExpiryDate: selectedItem.hasExpiryDate ,
          expireDate: selectedItem.expireDate ,
          availability: selectedItem.availability 
        });

        // Handle the nested form group
        const stockOutTrackingGroup = rowForm.get('stockOutTracking') as FormGroup;
        if (stockOutTrackingGroup) {
          stockOutTrackingGroup.patchValue({
            batchNo: selectedItem.stockOutTracking?.batchNo || '',
            expireDate: selectedItem.stockOutTracking?.expireDate ||null,
            quantity: selectedItem.stockOutTracking?.quantity || '',
            serialId: selectedItem.stockOutTracking?.serialId || '',
            trackingType: selectedItem.stockOutTracking?.trackingType || '',
            hasExpiryDate: selectedItem.hasExpiryDate ,
            serialOptions: selectedItem.serials,
            batchesOptions: selectedItem.batches
          });
        } else {
          console.error('StockOutTracking form group is missing');
        }
      }
      if(selectedItem){
        if(selectedItem.hasExpiryDate){
          if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.NoTracking){
            rowForm.get('showSerial')?.setValue(false);
            rowForm.get('showBatch')?.setValue(true);
          }
          else if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.Serial){
            rowForm.get('showSerial')?.setValue(true);
            rowForm.get('showBatch')?.setValue(false);
          }
          else if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.Batch){
            rowForm.get('showSerial')?.setValue(false);
            rowForm.get('showBatch')?.setValue(true);
          }
        }else{
          if(selectedItem.trackingType==this.sharedFinanceEnums.StockOutTracking.NoTracking){
            rowForm.get('showSerial')?.setValue(false);
            rowForm.get('showBatch')?.setValue(false);
          }
        }
      }
      rowForm.get('itemName')?.setValue(selectedItem.itemCode + "-" + selectedItem.itemName + "-" +selectedItem.itemVariantNameAr )
      this.setUomName(indexLine , rowForm.get('uomOptions')?.value )
      this.setExpiryDate(indexLine , selectedItem.batches , selectedItem.serialOptions )
      // Log the updated form value for debugging
      console.log(selectedItem ,"selectedItem.stockOutTracking?.batches");
      
      console.log('Updated row form:', rowForm.value);
      this.isDuplicate(indexLine)
    }

  addNewRow() {
    if(!this.duplicateLine){
       if (!this.formsService.validForm(this.addForm, false)) return;
       this.getLatestItemsList(this.addForm.get('warehouseId')?.value)


      let newLine = this.fb.group(
        {
          barCode: new FormControl(''),
          bardCodeId: new FormControl(''),
          itemId: new FormControl('',[customValidators.required]),
          itemName: new FormControl(''),
          itemVariantId: new FormControl('',[customValidators.required]),
          uomId: new FormControl('',[customValidators.required]),
          uomOptions: new FormControl(),
          uomName: new FormControl(''),
          description: new FormControl(''),
          quantity: new FormControl('',[customValidators.required]),
          cost: new FormControl('',[customValidators.required]),
          subCost: new FormControl(''),
          notes: new FormControl(''),
          stockOutEntryMode: new FormControl("Manual"),
          trackingType: new FormControl(''),
          availability: new FormControl(''),
          trackingNo: new FormControl(''),
          expiryDate: new FormControl(''),
          hasExpiryDate: new FormControl(''),
          totalQuantity: new FormControl(0),
          AllTotalQuantity: new FormControl(0),
          showSerial: new FormControl(false),
          showBatch: new FormControl(false),
          stockOutTracking: this.fb.group({
            batchNo: new FormControl(''),         
            expireDate: new FormControl(''), 
            quantity: new FormControl(''),         
            serialId: new FormControl(''),            
            trackingType: new FormControl(''),
            hasExpiryDate: new FormControl(''),
            serialOptions: new FormControl(''),
            batchesOptions: new FormControl(''),
          })

        }
      );
      this.stockOutDetailsFormArray.push(newLine);
    }
    } 
  
    setUomName(indexLine:number , list:any){
      const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
      const selectedItem = list.find((item: any) => item.uomId === rowForm.get('uomId')?.value);
      if (this.selectedLanguage === 'ar') {
        rowForm.get('uomName')?.setValue(selectedItem.uomNameAr);
      } else {
        rowForm.get('uomName')?.setValue(selectedItem.uomNameEn);
      }    }

  onCancel() {
    this.routerService.navigateTo('transactions/stock-out');

  }

  onSave() {
    if (!this.formsService.validForm(this.addForm, false)) return;
    if(this.stockOutDetailsFormArray.value.length==0){
      this.toasterService.showError(
        this.languageService.transalte('messages.error'),
        this.languageService.transalte('messages.noItemsToAdd')
      );
    }else{
      const data:AddStockOutDto =this.mapStockOutData(this.addForm.value)
      this.itemsService.addStockOut(data, this.addForm);
    }

   

  }
  mapStockOutData(data:any){
    console.log(data.stockOutDetails,"lllll");
    
      return {
        receiptDate: data.receiptDate,
        sourceDocumentType: data.sourceDocumentType,
        sourceDocumentId: data.sourceDocumentId ,
        warehouseId: data.warehouseId ,
        notes: data.notes,
        
        stockOutDetails: data.stockOutDetails?.map((detail: any) => ({
         
          barCode: detail.barCode ,
          bardCodeId: detail.bardCodeId|| null ,
          itemId: detail.itemId ,
          itemVariantId: detail.itemVariantId ,
          uomId: detail.uomId ,
          description: detail.description ,
          quantity: Number(detail.quantity) ,
          cost: Number(detail.cost) ,
          notes: detail.notes ,
          hasExpiryDate: detail.hasExpiryDate,
          stockOutEntryMode: detail.stockOutEntryMode || "Manual",
          trackingType: detail.trackingType,
          stockOutTracking: {
            trackingNo: detail.trackingNo,
            hasExpiryDate: detail.hasExpiryDate,
            expireDate: detail.expiryDate || null,
            trackingType: detail.trackingType ,
          }
        }))
  }
}
  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown()
    this.itemsService.wareHousesDropDownLookup$.subscribe(res=>{
      this.warhouseLookupData = res
    })
  }
  setTrackingNo(indexLine:number ,event:string){
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
      rowForm.get('trackingNo')?.setValue(event)
  }
  setExpiryDate(indexLine:number ,batchesOptions:any , serialsOptions:any){
   console.log(indexLine,batchesOptions,serialsOptions,"kkkkkkkkkkkkkkkk" );
   
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
    const selectedItem = batchesOptions?.find((item: any) => item.trackingNo == rowForm.get('trackingNo')?.value);
   console.log(selectedItem ,"selectedItemselectedItemselectedItem");
   
    if( selectedItem!=undefined ){
      console.log("trackingNotrackingNotrackingNo" ,selectedItem);
      rowForm.get('expiryDate')?.setValue(selectedItem.expiryDate)
      rowForm.get('totalQuantity')?.setValue(selectedItem.totalQuantity)
    }else{
      const serialOption   = rowForm.get('stockOutTracking')?.get('serialOptions')?.value
      const selectedItem = serialOption?.find((item: any) => item.trackingNo == rowForm.get('trackingNo')?.value);
      if( selectedItem!=undefined ){
        console.log("trackingNotrackingNotrackingNo" ,selectedItem);
        rowForm.get('expiryDate')?.setValue(selectedItem.expiryDate)
        rowForm.get('totalQuantity')?.setValue(selectedItem.totalQuantity)
      }else{
        rowForm.get('expiryDate')?.setValue('')
        rowForm.get('totalQuantity')?.setValue(rowForm.get('AllTotalQuantity')?.value)

      }
      
    
    }
   

  }
  setCostTotal(indexLine:number , e:any){
    const rowForm = this.stockOutDetailsFormArray.at(indexLine) as FormGroup;
      console.log(rowForm.get('quantity')?.value, indexLine ,e);
    
      rowForm.get('subCost')?.setValue(Number(rowForm.get('quantity')?.value)*Number(rowForm.get('cost')?.value))

  }
  async deleteRow(index: number) {
    const confirmed = await this.toasterService.showConfirm('Delete');
    if (confirmed) {
      this.stockOutDetailsFormArray.removeAt(index);
      this.isDuplicate(index-1)

    }
  }
  openDialog(indexLine:number ) {
    const ref = this.dialog.open(SearchItemPopUpComponent, {
      width: 'auto',
      height: '600px',
      data:this.addForm.get('warehouseId')?.value
    });
    ref.onClose.subscribe((selectedItems: any) => {
      console.log(selectedItems ,"llllllllll");
      
      if (selectedItems) {
  this.setRowDataFromPopup(indexLine ,selectedItems)
      }
    });
  }
  barcodeCanged(e: any , index:number) {
    console.log(e,"kkkkkk");
    
    this.itemsService.getItemBarcodeForItem(e );
    this.itemsService.sendItemBarcode$.subscribe((data) => {
      if (data) {
        console.log(data ,"555555");
       this.setRowDataFromPopup(index ,data ) 
      }
    });
  }
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private languageService:LanguageService,
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private lookupservice : LookupsService,
    private formsService: FormsService,
    public sharedFinanceEnums: SharedStock,
    private toasterService: ToasterService,




  ) {
    // this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));
  }
}
