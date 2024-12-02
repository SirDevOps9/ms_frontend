import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { PageInfoResult, RouterService } from 'shared-lib';
import { TransactionsService } from '../../../transactions.service';
import { SharedFinanceEnums } from '../../../models/sharedEnumStockIn';

@Component({
  selector: 'app-view-stock-out',
  templateUrl: './view-stock-out.component.html',
  styleUrl: './view-stock-out.component.scss',
})
export class ViewStockOutComponent {
  stockOutForm: FormGroup;
  stockOutDataById: any;
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
    this.getStockOutViewById(id);
  }
  initForm() {
    this.stockOutForm = this.fb.group({
      receiptDate: '',
      code: '',
      sourceDocumentType: '',
      sourceDocumentId: 0,
      warehouseId: 0,
      notes: '',
    });
  }

  getStockOutViewById(id: number) {
    this.item_services.getByIdViewStockOut(id);
    this.item_services.stockOutDataViewSourceeObservable.subscribe((data: any) => {
      if (data) {
        this.stockOutForm.patchValue({
          receiptDate: data.receiptDate,
          code: data.code,
          sourceDocumentType: data.sourceDocumentType,
          sourceDocumentId: data.sourceDocument,
          warehouseId: data.warehouseName,
          notes: data.notes,
        });

        this.populateInvoiceDetails(data.stockOutDetails);
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
    private item_services: TransactionsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    public router: RouterService,
    private fb: FormBuilder,
    private _route: ActivatedRoute
  ) {}
}
