import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'microtec-auth-lib';
import { RouterService, PageInfoResult } from 'shared-lib';
import { PurchaseTransactionsService } from '../../../purchase-transactions.service';

import { SharedEnum } from '../../../models/sharedEnums';
import { SharedFinanceEnums } from 'projects/apps-inventory/src/app/modules/transactions/models/sharedEnumStockIn';
import { ReturnInvoiceDetail } from '../../../models';

@Component({
  selector: 'app-purchase-return-view',
  templateUrl: './purchase-return-view.component.html',
  styleUrl: './purchase-return-view.component.scss',
})
export class PurchaseReturnViewComponent {
  addForm: FormGroup = new FormGroup({});
  tableData: ReturnInvoiceDetail[] = [];

  currentPageInfo: PageInfoResult = {};

  filteredData: ReturnInvoiceDetail[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.initializeForm();
    this.getViewInvoice(id);
  }

  initializeForm() {
    this.addForm = this.fb.group({
      id: [''],
      invoiceStatus: [''],
      code: [''],
      invoiceCode: [''],
      invoiceDate: new FormControl(new Date()),
      invoiceDescription: [''],
      invoicejournal: [''],
      warehouseId: [''],
      warehouseName: [''],
      vendorCode: [''],
      currency: [''],
      rate: [''],
      invoiceJournal: [''],
      stockOut: [''],
      vendorId: [''],
      vendorName: [''],
      currencyRate: [''],
      vendorRate: [''],
      paymentTermId: [''],
      paymentTermName: [''],
      purchaseInvoiceCode: [''],
      numberOfItems: [''],
      totalOfQuantity: [''],
      total: [''],
      vatAmount: [''],
      totalAfterVat: [''],
    });
  }

  getViewInvoice(id: number) {
    this.purchasetransactionsService.GetInvoiceReturnViewById(id);
    this.purchasetransactionsService.viewInvoiceReturnDataByID.subscribe({
      next: (res: any) => {
        if (res) {
          this.addForm.patchValue({
            code: res.code,
            invoiceCode: res.code,
            invoiceDate: res.returnInvoiceDate,
            invoiceDescription: res.description,
            warehouseId: res.warehouseName,
            warehouseName: res.warehouseName,
            vendorName: res.vendorName,
            currency: res.currencyName,
            invoiceJournal: res.invoiceJournalCode,
            stockOut: res.stockOutCode,
            vendorId: res.vendorCode,
            currencyRate: res.currencyRate,

            purchaseInvoiceCode: res.purchaseInvoiceCode,
            numberOfItems: res.numberOfItems,
            totalOfQuantity: res.totalOfQuantity,
            total: res.totalNetAmount,
            vatAmount: res.vatAmount,
            totalAfterVat: res.grandTotal,
          });

          this.populateInvoiceDetails(res?.returnInvoiceDetails);
        }
      },
      error: (err) => {},
    });
  }

  populateInvoiceDetails(details: any[]) {
    this.tableData = details;
    this.filteredData = [...this.tableData];
  }
  onCancel() {
    this.routerService.navigateTo('/transaction/return-purchase');
  }

  onSearchTermChange(search: any): void {
    debugger;
    const term = search.target.value?.toLowerCase() || '';

    this.filteredData = this.tableData.filter((item: any) => {
      return ['uomName', 'itemCode', 'description'].some((key) => {
        const value = item[key];
        return value && value.toString().toLowerCase().includes(term);
      });
    });
  }
  constructor(
    private routerService: RouterService,
    public authService: AuthService,
    private fb: FormBuilder,
    public sharedEnums: SharedEnum,
    public sharedFinanceEnums: SharedFinanceEnums,
    private route: ActivatedRoute,
    private purchasetransactionsService: PurchaseTransactionsService
  ) {}
}
