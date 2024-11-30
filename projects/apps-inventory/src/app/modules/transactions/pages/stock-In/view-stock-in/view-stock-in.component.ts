import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { LanguageService, PageInfoResult, RouterService, customValidators } from 'shared-lib';

import { Table } from 'primeng/table';
import { TransactionsService } from '../../../transactions.service';
import { SharedFinanceEnums } from '../../../models/sharedEnumStockIn';

@Component({
  selector: 'app-view-stock-in',
  templateUrl: './view-stock-in.component.html',
  styleUrl: './view-stock-in.component.scss',
})
export class ViewStockInComponent {
  stockInForm: FormGroup;
  globalFilterFields: string[] = [
    'barCode',
    'description',
    'uomId',
    'quantity',
    'cost',
    'subTotal',
    'trackingType',
    'notes',
  ];

  currentPageInfo: PageInfoResult = {};

  selectedLanguage: string;
  tableData: any[];
  filteredData: any[];

  ngOnInit(): void {
    const id = this._route.snapshot.params['id'];
    this.initForm();
    this.getStockInViewById(id);
  }
  initForm() {
    this.stockInForm = this.fb.group({
      receiptDate: '',
      code: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseName: 0,
      notes: '',
    });
  }

  getStockInViewById(id: number) {
    this.transactions_services.getViwStockInById(id);
    this.transactions_services.stockInDataViewSourceeObservable.subscribe((data: any) => {
      if (data) {
        debugger;
        this.stockInForm.patchValue({
          receiptDate: data.receiptDate,
          code: data.code,
          sourceDocumentType: data.sourceDocumentType,
          sourceDocumentId: data.sourceDocument,
          warehouseName: data.warehouseName,
          notes: data.notes,
        });
        this.populateInvoiceDetails(data.stockInDetails);
      }
    });
  }

  onCancel() {
    this.router.navigateTo('/transactions/stock-in');
  }

  populateInvoiceDetails(details: any[]) {
    this.tableData = details;
    this.filteredData = [...this.tableData];
  }

  onSearchTermChange(search: any): void {
    const term = search.target.value?.toLowerCase() || '';

    this.filteredData = this.tableData.filter((item) => {
      return this.globalFilterFields.some((key) => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  }

  constructor(
    public authService: AuthService,
    private transactions_services: TransactionsService,
    private langService: LanguageService,
    public sharedFinanceEnums: SharedFinanceEnums,
    public router: RouterService,

    private fb: FormBuilder,
    private _route: ActivatedRoute
  ) {}
}
