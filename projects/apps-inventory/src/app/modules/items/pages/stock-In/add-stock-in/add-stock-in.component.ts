import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, lookupDto, LookupEnum, LookupsService, MenuModule, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddStockIn, GetWarehouseList, LatestItems } from '../../../models';
import { TrackingStockInComponent } from './tracking-stock-in/tracking-stock-in.component';
import { MultiSelectItemStockInComponent } from './multi-select-item-stock-in/multi-select-item-stock-in.component';
import { ImportStockInComponent } from '../import-stock-in/import-stock-in.component';
import { ScanParcodeStockInComponent } from '../scan-parcode-stock-in/scan-parcode-stock-in.component';

@Component({
  selector: 'app-add-stock-in',
  templateUrl: './add-stock-in.component.html',
  styleUrl: './add-stock-in.component.scss',
})
export class AddStockInComponent implements OnInit {
  stockInForm: FormGroup = new FormGroup({});
  LookupEnum=LookupEnum;
  lookups: { [key: string]: lookupDto[] };
oprationalLookup : { id: number; name: string }[] = []

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
  latestItemsList:LatestItems[] = [];
  itemData : any
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  warhouseLookupData :GetWarehouseList[] =[]
  uomLookup : any = []
  currentLang : string
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private langService: LanguageService,
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private lookupservice : LookupsService,
    private router : RouterService

  ) {
    this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));
    this.currentLang = this.langService.getLang();

  }
  ngOnInit(): void {
    this.stockInForm = this.fb.group({
      receiptDate: '',
      code : '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.stockInForm.valueChanges.subscribe(res=>{
      console.log(res)
    })

    this.lookupservice.loadLookups([
      LookupEnum.StockInSourceDocumentType
    ]);
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;   
      console.log(l)   
    });

    this.stockInForm.get('sourceDocumentType')?.valueChanges.subscribe(res=>{
      console.log(res)
      let data = this.lookups[LookupEnum.StockInSourceDocumentType]
    let sourceDocumentTypeData =    data.find(elem=>elem.id == res)
      if(sourceDocumentTypeData?.name == 'OperationalTag') {
        this.itemsService.OperationalTagDropDown()
        this.itemsService.sendOperationalTagDropDown$.subscribe(res=>{
          this.oprationalLookup = res
        })
      }
    })

    this.initWareHouseLookupData()

    this.itemsService.getLatestItemsList()
    this.itemsService.sendlatestItemsList$.subscribe(res=>{
      this.latestItemsList = res
      console.log(res)
    })
  }


  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown()
    this.itemsService.wareHousesDropDownLookup$.subscribe(res=>{
      this.warhouseLookupData = res
    })
  }
  get stockIn() {
    return this.stockInForm.get('stockInDetails') as FormArray;
  }

  getExcel() {
    const ref = this.dialog.open(ImportStockInComponent, {
      width: '600px',
      height: '450px',
    });
    ref.onClose.subscribe((selectedItems: any[]) => {
      console.log(selectedItems)

    });
  }

  onEdit(data: any) {}

  createStockIn() {
    return this.fb.group({
      barCode: '',                
      bardCodeId: null,              
      description: '',            
      itemId: 0,      
      itemCodeName : '',    
      itemVariantId : '',        
      uomName : '',            
      uomId: '',  
      quantity: 0,                
      cost: 0,     
      subTotal : '',               
      notes: '',                  
      stockInEntryMode: 'Manual', 
      trackingType: '', 
      stockInTracking: this.fb.group({
        vendorBatchNo: '',         
        expireDate: '', 
        systemPatchNo: '',         
        serialId: '',              
        trackingType: '' 
      })
    });
  }

  itemChanged(e : any , stockInFormGroup : FormGroup) {
   let data = this.latestItemsList.find(item=>item.itemId == e)
   this.itemData = data
   this.uomLookup = data?.itemsUOM
   console.log(this.uomLookup)
   stockInFormGroup.get('itemCodeName')?.setValue(data?.itemCode)
   stockInFormGroup.get('description')?.setValue(data?.itemVariantName)
   stockInFormGroup.get('trackingType')?.setValue(data?.trackingType)
   stockInFormGroup.get('itemVariantId')?.setValue(data?.itemVariantId)

  }
  uomChanged(e : any , stockInFormGroup : FormGroup) {
   let data = this.uomLookup.find((item : any)=>item.uomId == e)

   stockInFormGroup.get('uomName')?.setValue(this.currentLang == 'en' ?  data.uomNameEn : data.uomNameAr)

  }

  addLineStockIn() {
    this.stockIn.push(this.createStockIn())
  }

  scan() {
    const ref = this.dialog.open(ScanParcodeStockInComponent, {
      width: '50%',
      height: '450px',
    });
  }

  openDialog(stockInFormGroup: FormGroup) {
    const ref = this.dialog.open(MultiSelectItemStockInComponent, {
      width: '1000px',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        console.log(selectedItems)
        // const uomOptions: any = selectedItems.itemsUOM
        // const rowForm = this.pricePolicyFormArray.at(index) as FormGroup;
        // rowForm.get('uomOptions')?.setValue(uomOptions); // Store options for template access
        // rowForm.get('uomId')?.reset(); // Reset the UOM value to avoid conflicts
        // rowForm.get('uomId')?.setValue(selectedItems.uomId); // Optionally set the first UOM
        // rowForm.get('uomName')?.setValue(selectedItems.uomNameAr); // Optionally set the first UOM
        // rowForm.get('itemName')?.setValue(selectedItems.itemName); // Optionally set the first UOM
        // rowForm.get('itemVariantId')?.setValue(selectedItems.itemVariantId); // Optionally set the first UOM
        // rowForm.get('itemVariantName')?.setValue(selectedItems.itemVariantName); // Optionally set the first UOM
        // rowForm.get('itemId')?.setValue(selectedItems.itemId)
        // rowForm.get('itemCode')?.setValue(selectedItems.itemCode)
        // rowForm.get('taxId')?.setValue(selectedItems.taxId)
        // rowForm.get('id')?.setValue(index+1)
      }

    });
  }

  setTracking(setTracking : FormGroup) {
    const dialogRef = this.dialog.open(TrackingStockInComponent, {
      width: '60%',
      height: '450px',
      data: this.itemData.trackingType,
    });
    dialogRef.onClose.subscribe((res: any) => {
      if(res) {
        console.log(res)
        setTracking.get('stockInTracking')?.patchValue({...res})
      }
    })
  }

  onCancel() {
    this.router.navigateTo('/masterdata/stock-in')

  }

  onSave() {
    let data : AddStockIn = {
      ...this.stockInForm.value,
      sourceDocumentType : +this.stockInForm.value.sourceDocumentType,
      stockInDetails : this.stockIn.value
    }
    this.itemsService.addStockIn(data)
  }
}
