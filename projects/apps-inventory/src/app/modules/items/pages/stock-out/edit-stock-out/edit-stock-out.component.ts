import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import { PageInfoResult, MenuModule, RouterService, LanguageService, FormsService, LookupEnum, lookupDto, LookupsService, customValidators, ToasterService } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';
import { LatestItems } from '../../../models';
import { MultiSelectItemStockInComponent } from '../../stock-In/add-stock-in/multi-select-item-stock-in/multi-select-item-stock-in.component';

@Component({
  selector: 'app-edit-stock-out',
  templateUrl: './edit-stock-out.component.html',
  styleUrl: './edit-stock-out.component.scss',
})
export class EditStockOutComponent {
  stockOutForm: FormGroup = new FormGroup({});
  LookupEnum = LookupEnum;
  lookups: { [key: string]: lookupDto[] };
  stockOutDataById: any[];
  dataHousesDropDown :any[]=[];
  oprationalLookup: { id: number; name: string }[] = [];
  exportData: any[];
  itemData:any
  currentLang: string;
  uomLookup: any = [];
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
  _routeid:number
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;
  latestItemsList: LatestItems[] = [];
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private form_services:FormsService,
    private item_services:ItemsService,
    private langService: LanguageService,
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private lookupservice: LookupsService,
    private toasterService: ToasterService,

  ) {
    // this.title.setTitle(this.langService.transalte('itemCategory.itemDefinition'));
    this.currentLang = this.langService.getLang();
  }
  ngOnInit(): void {
    this._routeid = this._route.snapshot.params['id'];

    this.stockOutForm = this.fb.group({
      receiptDate: '',
      code : '',
      stockInStatus: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.lookupservice.loadLookups([LookupEnum.StockInOutSourceDocumentType]);
    this.lookupservice.lookups.subscribe((l) => {
      this.lookups = l;


    });

    this.stockOutForm.get('sourceDocumentType')?.valueChanges.subscribe((res) => {
      let data = this.lookups[LookupEnum.StockInOutSourceDocumentType];
      let sourceDocumentTypeData = data.find((elem) => elem.id == res);
      if (sourceDocumentTypeData?.name == 'OperationalTag') {
        this.itemsService.OperationalTagDropDown();
        this.itemsService.sendOperationalTagDropDown$.subscribe((res) => {
          this.oprationalLookup = res;
        });
      }
    });
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
    this.getStockOutyId()
    this.getWareHousesDropDown()
    this.addLineStockIn();
  }

  get stockOut() {
    return this.stockOutForm.get('stockInDetails') as FormArray;
  }


  createStockOut() {
    return this.fb.group({
      barCode: '' ,
      bardCodeId: 0,
      description: '',
      itemId: [null, customValidators.required],
      itemCodeName: '',
      hasExpiryDate: '',
      uomName: '',
      uomId: ['', customValidators.required],
      quantity: [ null, [customValidators.required, customValidators.nonZero]],
      cost: [ null, [customValidators.required, customValidators.nonZero]],
      notes: '',
      subTotal:'',
      itemVariantId: '',
      stockInEntryMode: 'Manual',
      trackingType: '',
      stockInTracking: this.fb.group({
        vendorBatchNo: '',
        expireDate: null,
        systemPatchNo: '',
        serialId: '',
        trackingType: '',
        selectedValue: ''
      })
    });
  }
  itemChanged(e: any, stockOutForm: FormGroup) {
    let data = this.latestItemsList.find((item) => item.itemId == e);
    this.itemData = data;
    this.uomLookup = data?.itemsUOM;
    stockOutForm.get('stockInTracking')?.reset();
    stockOutForm.get('itemCodeName')?.setValue(data?.itemCode);
    stockOutForm.get('description')?.setValue(data?.itemVariantName);
    stockOutForm.get('trackingType')?.setValue(data?.trackingType);
    stockOutForm.get('stockInTracking')?.get('trackingType')?.setValue(data?.trackingType);
    stockOutForm.get('itemVariantId')?.setValue(data?.itemVariantId);
    stockOutForm.get('hasExpiryDate')?.setValue(data?.hasExpiryDate);
  }


  addLineStockIn() {
    // if(!this.form_services.validForm(this.stockIn, true)){
    //   return;
    // }
    this.stockOut.push(this.createStockOut());

  }

  uomChanged(e: any, stockOutForm: FormGroup) {
    let data = this.uomLookup.find((item: any) => item.uomId == e);

    stockOutForm
      .get('uomName')
      ?.setValue(this.currentLang == 'en' ? data.uomNameEn : data.uomNameAr);
  }
  onCancel() {}
  onEdit(data:any){

  }

  getStockOutyId(){
    this.item_services.getStockOutById(this._routeid)
    this.item_services.stockOutByIdDataSourceeObservable.subscribe((data:any)=>{
      this.stockOutForm.patchValue({
        receiptDate:data.receiptDate,
        code:data.id,
        sourceDocumentType:data.sourceDocumentType,
        sourceDocumentId:data.sourceDocumentId,
        warehouseId:data.warehouseId,
        notes:data.notes
      })
this.stockOutDataById=data
console.log("new data ",data);

    })
  }
  openDialog(stockInFormGroup: FormGroup) {
    const ref = this.dialog.open(MultiSelectItemStockInComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
      console.log(selectedItems)
      }
    });
  }
  getWareHousesDropDown() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup.subscribe((data: any) => {
      this.dataHousesDropDown = data;
    });
  }


  onSave() {
    const payload = this.stockOutForm.value;
    this.item_services.editStockOut(payload)
this.item_services.editstockInDataSourceeObservable.subscribe((data:any)=>{
  console.log("mydatanew" ,data);

})

  }

  async OnDelete(i: number) {
    const confirmed = await this.toasterService.showConfirm(
      this.langService.transalte('ConfirmButtonTexttodelete')
    );
    if (confirmed) {

          this.toasterService.showSuccess(
            this.langService.transalte('transactions.success'),
            this.langService.transalte('transactions.deleteStockOutLine')
        )

    }
    this.stockOut.removeAt(i);
  }
}
