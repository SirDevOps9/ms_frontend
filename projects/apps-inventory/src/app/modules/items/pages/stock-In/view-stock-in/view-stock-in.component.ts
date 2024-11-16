import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import {  LanguageService, customValidators } from 'shared-lib';
import { ItemsService } from '../../../items.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-view-stock-in',
  templateUrl: './view-stock-in.component.html',
  styleUrl: './view-stock-in.component.scss'
})
export class ViewStockInComponent {
  stockInForm: FormGroup = new FormGroup({});
  stockInDataById: any;
  currentLang: string;
  _routeid:number
  globalFilterFields: string[] = ['barCode', 'description', 'uomId', 'quantity', 'cost', 'subTotal', 'trackingType', 'notes'];
  @ViewChild('dt') dt: Table | undefined;
  first: number = 0;
  rows: number = 10;
  currentPageData: any[] = [];
  constructor(
    public authService: AuthService,
    private item_services:ItemsService,
    private langService: LanguageService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,

  ) {
    this.currentLang = this.langService.getLang();
  }
  ngOnInit(): void {
    this._routeid = this._route.snapshot.params['id'];

    this.stockInForm = this.fb.group({
      receiptDate: '',
      code: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
      stockInDetails: this.fb.array([]),
    });

    this.getStockInViewById();
  }

  get stockOut(): FormArray {
    return this.stockInForm.get('stockInDetails') as FormArray;
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
      stockInTracking: this.fb.group({
        vendorBatchNo: [item.vendorBatchNo ||''],
        expireDate: [item.expireDate ||''],
        systemPatchNo: [item.systemPatchNo ||''],
        serialId: [item.serialId ||''],
        trackingType: [item.trackingType ||''],
      })
    });
  }
  getStockInViewById() {
    this.item_services.getViwStockInById(this._routeid);
    this.item_services.stockInDataViewSourceeObservable.subscribe((data: any) => {
      if (data && data.stockInDetails && Array.isArray(data.stockInDetails)) {
        this.stockInForm.patchValue({
          receiptDate: data.receiptDate,
          code: data.code,
          sourceDocumentType: data.sourceDocumentType,
          sourceDocumentId: data.sourceDocument,
          warehouseId: data.warehouseName,
          notes: data.notes,
        });

        this.stockInForm.updateValueAndValidity();

        this.stockOut.clear();
        data.stockInDetails.forEach((item: any) => {
          const formGroup = this.fb.group({
            barCode: [item.barCode],
            description: [item.description],
            uomId: [item.uomNameEn],
            quantity: [item.quantity],
            cost: [item.cost],
            trackingType: [item.trackingType],
            hasExpiryDate: [item.hasExpiryDate],
            systemPatchNo: [item.stockInTracking.systemPatchNo],
            vendorBatchNo: [item.stockInTracking.vendorBatchNo],
            serialId: [item.stockInTracking.serialId],
            expireDate: [item.stockInTracking.expireDate],
            notes: [item.notes],
          });
          this.stockOut.push(formGroup);
        });
        this.updateCurrentPageData();
      }
      this.stockInDataById = data;
    });
  }

  filterTable(value: any) {
    if (this.dt) {
      this.dt.filterGlobal(value.target.value, 'contains');
    }
  }
  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updateCurrentPageData();
  }
  updateCurrentPageData() {
    const startIndex = this.first;
    const endIndex = this.first + this.rows;
    this.currentPageData = [...this.stockOut.value];
    // this.currentPageData = this.stockOut.controls.slice(startIndex, endIndex);

  }
}
