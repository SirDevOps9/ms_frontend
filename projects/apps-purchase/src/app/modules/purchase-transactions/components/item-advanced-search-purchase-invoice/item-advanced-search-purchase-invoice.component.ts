import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDto, SharedSalesEnums } from 'projects/apps-sales/src/app/modules/sales/models';
import { PageInfo, PageInfoResult, LanguageService } from 'shared-lib';
import { PurchaseTransactionsService } from '../../purchase-transactions.service';

@Component({
  selector: 'app-item-advanced-search-purchase-invoice',
  templateUrl: './item-advanced-search-purchase-invoice.component.html',
  styleUrl: './item-advanced-search-purchase-invoice.component.scss'
})
export class ItemAdvancedSearchPurchaseInvoiceComponent implements OnInit {
  pageInfo = new PageInfo();
  items: ItemDto[] = [];
  currentPageInfo: PageInfoResult;
  searchTerm: string = '';
  selectedRows: ItemDto[] = [];
  selectAll: boolean = false;
  currentLang: string;
  selectedLanguage: string;

  filterForm: FormGroup = this.fb.group({
    categoryType: new FormControl(),
    hasExpiryDate: new FormControl(false),
  });

  constructor(
    public sharedEnums: SharedSalesEnums,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private purchaseTransaction: PurchaseTransactionsService,
    private langService: LanguageService
  ) {
    this.currentLang = this.langService.getLang();
    this.selectedLanguage = this.langService.getLang();
  }

  ngOnInit(): void {
    this.subscribes();
    this.initItemsData();
    this.filterForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });
  }

  subscribes() {
    this.purchaseTransaction.itemsDataSourceForAdvanced.subscribe({
      next: (res: any) => {
        this.items = res;
      },
    });

    this.purchaseTransaction.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initItemsData() {
    this.purchaseTransaction.getItemsForAdvancedSearch('', '', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.purchaseTransaction.getItemsForAdvancedSearch('', '', pageInfo);
  }

  onSubmit() {
    this.ref.close(this.selectedRows);
  }


  selectedRow(selectedRow: any) {
    this.ref.close(selectedRow);
  }
  onCancel() {
    this.ref.close(false);
  }

  onFilterChange() {
    const query = this.buildQuery();
    this.purchaseTransaction.getItemsForAdvancedSearch(query, '', new PageInfo());
  }
  onSearchChange(event: any) {
    this.purchaseTransaction.getItemsForAdvancedSearch('', event, new PageInfo());
  }

  buildQuery(): string {
    const isStorable = this.filterForm.get('categoryType')?.value!;
    const hasExpiryDate = this.filterForm.get('hasExpiryDate')?.value;

    const query: string[] = [];

    isStorable.forEach((checkbox: any) => {
      query.push(`${checkbox}=${checkbox}`);
    });

    if (hasExpiryDate.length > 0) query.push(`HasExpiryDate=${hasExpiryDate}`);

    const result = query.join('&');

    return result;
  }
}
