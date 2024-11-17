import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  PageInfoResult,
  MenuModule,
  RouterService,
  LanguageService,
  FormsService,
} from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-stock-out',
  templateUrl: './edit-stock-out.component.html',
  styleUrl: './edit-stock-out.component.scss',
})
export class EditStockOutComponent {
  stockInForm: FormGroup = new FormGroup({});

  stockOutDataById: any[];
  dataHousesDropDown: any[] = [];

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
  _routeid: number;
  currentPageInfo: PageInfoResult = {};
  modulelist: MenuModule[];
  searchTerm: string;

  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private dialog: DialogService,
    private title: Title,
    private form_services: FormsService,
    private item_services: ItemsService,
    private langService: LanguageService,
    private itemsService: ItemsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._routeid = this._route.snapshot.params['id'];

    this.stockInForm = this.fb.group({
      receiptDate: '',
      code: '',
      stockInStatus: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.getStockOutyId();
    this.getWareHousesDropDown();
  }

  get stockIn() {
    return this.stockInForm.get('stockInDetails') as FormArray;
  }

  createStockIn() {
    return this.fb.group({
      barCode: '',
      bardCodeId: 0,
      description: ['', Validators.required],
      itemId: 0,
      uomId: '',
      quantity: 0,
      cost: 0,
      notes: '',
      stockInEntryMode: '',
      trackingType: '',
      stockInTracking: this.fb.group({
        vendorBatchNo: '',
        expireDate: '',
        systemPatchNo: '',
        serialId: '',
        trackingType: '',
      }),
    });
  }

  addLineStockIn() {
    if (!this.form_services.validForm(this.stockIn, true)) {
      return;
    }
    this.stockIn.push(this.createStockIn());
  }

  onCancel() {}
  onEdit(data: any) {}

  getStockOutyId() {
    this.item_services.getStockOutById(this._routeid);
    this.item_services.stockOutByIdDataSourceeObservable.subscribe((data: any) => {
      this.stockInForm.patchValue({
        receiptDate: data.receiptDate,
        code: data.id,
        sourceDocumentType: data.sourceDocumentType,
        sourceDocumentId: data.sourceDocumentId,
        warehouseId: data.warehouseId,
        notes: data.notes,
      });
      this.stockOutDataById = data;
      console.log('new data ', data);
    });
  }

  getWareHousesDropDown() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup.subscribe((data: any) => {
      this.dataHousesDropDown = data;
    });
  }

  onSave() {
    const payload = this.stockInForm.value;
    this.item_services.editStockOut(payload);
    console.log(payload);
  }
}
