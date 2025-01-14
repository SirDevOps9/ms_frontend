
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {  LanguageService, PageInfoResult, customValidators } from 'shared-lib';
import { Table } from 'primeng/table';
import { TransactionsService } from '../../../transactions.service';


@Component({
  selector: 'app-view-stock-out',
  templateUrl: './view-stock-out.component.html',
  styleUrl: './view-stock-out.component.scss'
})
export class ViewStockOutComponent {
  stockOutForm: FormGroup = new FormGroup({});
  stockOutDataById: any;
  currentLang: string;
  _routeid:number
  globalFilterFields: string[] = ['barCode', 'description', 'uomId', 'quantity', 'cost', 'subTotal', 'trackingType', 'notes'];
  @ViewChild('dt') dt: Table | undefined;
  first: number = 0;
  rows: number = 10;
  currentPageData: any[] = [];
  currentPageInfo: PageInfoResult = {};
  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private transactions_services: TransactionsService,
    private langService: LanguageService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,

  ) {
    this.currentLang = this.langService.getLang();
  }
  ngOnInit(): void {
    this._routeid = this._route.snapshot.params['id'];

    this.stockOutForm = this.fb.group({
      receiptDate: '',
      code: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.getStockOutViewById();
  }

  get stockOut(): FormArray {
    return this.stockOutForm.get('stockInDetails') as FormArray;
  }

  createStockOut(item: any): FormGroup {
    return this.fb.group({
      barCode: [item.barCode || ''],
      description: [item.description || ''],
      hasExpiryDate: '',
      uomId: [item.uomNameEn || ''],
      quantity: [item.quantity || null, [customValidators.required, customValidators.nonZero]],
      cost: [item.cost || null, [customValidators.required, customValidators.nonZero]],
      notes: [item.notes || ''],
      subTotal: [{ value: item.quantity * item.cost, disabled: true }],
      trackingType: '',
      stockOutTracking: this.fb.group({
        vendorBatchNo: [item.vendorBatchNo ||''],
        expireDate: [item.expireDate ||''],
        systemPatchNo: [item.systemPatchNo ||''],
        serialId: [item.serialId ||''],
        trackingType: [item.trackingType ||''],
      })
    });
  }
  getStockOutViewById() {
    this.transactions_services.getByIdViewStockOut(this._routeid);
    this.transactions_services.stockOutDataViewSourceeObservable.subscribe((data: any) => {
      if (data && data.stockOutDetails && Array.isArray(data.stockOutDetails)) {
        this.stockOutForm.patchValue({
          receiptDate: data.receiptDate,
          code: data.code,
          sourceDocumentType: data.sourceDocumentType,
          sourceDocumentId: data.sourceDocument,
          warehouseId: data.warehouseName,
          notes: data.notes,
        });

        this.stockOutForm.updateValueAndValidity();

        this.stockOut.clear();
        data.stockOutDetails.forEach((item: any) => {
          const formGroup = this.fb.group({
            barCode: [item.barCode],
            description: [item.description],
            uomId: [item.uomNameEn],
            quantity: [item.quantity],
            cost: [item.cost],
            trackingType: [item.trackingType],
            hasExpiryDate: [item.hasExpiryDate],
            batchNo: [item.stockOutTracking?.batchNo],
            serialId: [item.stockOutTracking?.serialId],
            expireDate: [item.stockOutTracking?.expireDate],
            notes: [item.notes],
          });
          this.stockOut.push(formGroup);
        });
        this.updateCurrentPageData();
      }
      this.stockOutDataById = data;
    });
  }

  filterTable(value: any) {
    // if (this.dt) {
    //   this.dt.filterGlobal(value.target.value, 'contains');
    // }
    const filterValue = value.target.value?.trim().toLowerCase();
    if (filterValue) {
      this.currentPageData = this.stockOut.value.filter((row: any) =>
        this.globalFilterFields.some((field) =>
          row[field]?.toString().toLowerCase().includes(filterValue)
        )
      );
    } else {
      this.updateCurrentPageData();
    }
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateCurrentPageData();
  }


  updateCurrentPageData(): void {
    const startIndex = this.first;
    const endIndex = this.first + this.rows;
    this.currentPageData = this.stockOut.value.slice(startIndex, endIndex);
  }
}
