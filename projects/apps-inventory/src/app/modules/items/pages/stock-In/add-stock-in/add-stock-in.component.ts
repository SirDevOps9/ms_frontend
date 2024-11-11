import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, lookupDto, LookupEnum, LookupsService, MenuModule, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { AddStockIn, GetWarehouseList, LatestItems } from '../../../models';
import { TrackingStockInComponent } from './tracking-stock-in/tracking-stock-in.component';

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
      stockInStatus: '',
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
