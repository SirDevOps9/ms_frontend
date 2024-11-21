import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemsService } from 'projects/apps-inventory/src/app/modules/items/items.service';
import { ItemDto, SharedSalesEnums } from 'projects/apps-sales/src/app/modules/sales/models';
import { LanguageService, PageInfo, PageInfoResult } from 'shared-lib';
import { TransactionsService } from '../../transactions.service';

@Component({
  selector: 'app-multi-select-item-stock-in',
  templateUrl: './multi-select-item-stock-in.component.html',
  styleUrl: './multi-select-item-stock-in.component.scss',
})
export class MultiSelectItemStockInComponent implements OnInit {
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
    private itemsService: TransactionsService,
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
    this.itemsService.itemsList.subscribe({
      next: (res: any) => {
        this.items = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initItemsData() {
    this.itemsService.getItems('', '', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItems('', '', pageInfo);
  }

  onSubmit() {
    this.ref.close(this.selectedRows);
  }

  // onSelectedRowsChange(selectedRows: any[]) {
  //   this.selectedRows = selectedRows;
  // }
  selectedRow(selectedRow: any) {
    this.ref.close(selectedRow);
  }
  onCancel() {
    this.ref.close(false);
  }

  onFilterChange() {
    const query = this.buildQuery();
    this.itemsService.getItems(query, '', new PageInfo());
  }
  onSearchChange(event: any) {
    this.itemsService.getItems('', event, new PageInfo());
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
