import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from 'microtec-auth-lib';
import { DialogService } from 'primeng/dynamicdialog';
import {
  OperationalStockIn,
  GetWarehouseList,
  StockInDetail,
} from 'projects/apps-inventory/src/app/modules/items/models';
import { SharedStock } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedStockOutEnums';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { skip } from 'rxjs';
import {
  LookupEnum,
  lookupDto,
  PageInfoResult,
  MenuModule,
  customValidators,
  PageInfo,
  LanguageService,
  LookupsService,
  RouterService,
  FormsService,
  ToasterService,
} from 'shared-lib';
import { PurchaseService } from '../../../../purchase/purchase.service';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';
import { ActivatedRoute } from '@angular/router';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/items/models/sharedEnumStockIn';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.scss',
})
export class ViewInvoiceComponent implements OnInit {
  purchaseInvoiceForm: FormGroup = new FormGroup({});
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;

  currentLang: string;
  selectedLanguage: string;
  tableData: any[];
  filteredData: any[];

  ngOnInit(): void {
    this.initializeForm();
    const id = this._route.snapshot.params['id'];

    this.getViewInvoice(id);
  }

  initializeForm() {
    this.purchaseInvoiceForm = this.fb.group({
      id: new FormControl(''),
      code: new FormControl(''),
      warehouseId: new FormControl(''),
      warehouseName: new FormControl(''),
      notes: new FormControl(''),
      description: new FormControl(''),
      sourceDocumentType: new FormControl(''),
      payementTerm: new FormControl(''),
      numberOfItems: 0,
      total: 0,
      totalAfterDiscount: 0,
      totalQuantity: 0,
      discount: 0,
      vatAmount: 0,
      vatAmountTotal: 0,
      totalAfterVat: 0,
      stockInStatus: new FormControl(''),
      invoiceJournal: new FormControl(''),
      totalNetAmount: new FormControl(''),
      stockIn: new FormControl(''),
      paymentTermName: new FormControl(''),
      invoiceDate: new FormControl(new Date()),
      currency: new FormControl(''),
      vendorId: new FormControl(''),
      vendorName: new FormControl(''),
      currencyRate: new FormControl(''),
      paymentTermId: new FormControl(''),
      reference: new FormControl(''),
    });
  }

  getViewInvoice(id: number) {
    this.purchasetransactionsService.GetInvoiceViewById(id);
    this.purchasetransactionsService.viewInvoiceDataByID.subscribe({
      next: (res) => {
        if (res) {
          this.purchaseInvoiceForm.patchValue({
            code: res.code,
            warehouseId: res.warehouseName,
            warehouseName: res.warehouseName,
            description: res.description,
            stockInStatus: res.stockInCode,
            paymentTermName: res.paymentTermName,
            invoiceDate: res.invoiceDate,
            currency: res?.currencyRate,
            vendorName: res.vendorName,
            vendorId: res.vendorCode,
            currencyRate: res.currencyRate,
            reference: res.reference,
            invoiceJournal: res.invoiceJournalCode,
            stockIn: res.stockInCode,
            numberOfItems: res.numberOfItems,
            totalAfterDiscount: res.totalAfterDiscount,
            totalQuantity: res.totalOfQuantity,
            discount: res.totalDiscount,
            vatAmountTotal: res.vatAmount,
            totalAfterVat: res.grandTotal,
            totalNetAmount: res.totalNetAmount,
          });

          this.populateInvoiceDetails(res.invoiceDetails);
        }
      },
      error: (err) => {
        console.error('Error fetching invoice details:', err);
      },
    });
  }
  populateInvoiceDetails(details: any[]) {
    this.tableData = details;
    this.filteredData = [...this.tableData];
  }

  onSearchTermChange(search: any): void {
    const term = search.target.value?.toLowerCase() || '';

    this.filteredData = this.tableData.filter((item) => {
      return ['barCode', 'uomName', 'itemCode', 'description'].some((key) => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  }
  onCancel() {
    this.router.navigateTo('/transaction/purchase-invoice');
  }

  constructor(
    public authService: AuthService,
    private dialog: DialogService,
    private languageService: LanguageService,
    private transactionsService: TransactionsService,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private purchasetransactionsService: PurchaseTransactionsService,
    private router: RouterService,
    public formService: FormsService,
    public sharedFinanceEnums: SharedFinanceEnums,
    public sharedStock: SharedStock,
    private toasterService: ToasterService
  ) {
    this.currentLang = this.languageService.getLang();
    this.selectedLanguage = this.languageService.getLang();
  }
}
