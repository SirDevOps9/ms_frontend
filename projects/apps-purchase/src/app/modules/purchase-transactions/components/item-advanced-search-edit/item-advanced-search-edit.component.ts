import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDto, SharedSalesEnums } from 'projects/apps-sales/src/app/modules/sales/models';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { PurchaseTransactionsService } from '../../purchase-transactions.service';

@Component({
  selector: 'app-item-advanced-search-edit',
  templateUrl: './item-advanced-search-edit.component.html',
  styleUrl: './item-advanced-search-edit.component.scss'
})
export class ItemAdvancedSearchEditComponent {

  pageInfo = new PageInfo();
  items: ItemDto[] = [];
  currentPageInfo: PageInfoResult;
  searchTerm: string = '';
  selectedRows: ItemDto[] = [];
  selectAll: boolean = false;

  filterForm: FormGroup = this.fb.group({
    categoryType: new FormControl(),
    hasExpiryDate: new FormControl(false),
  });

  

  ngOnInit(): void {
    this.subscribes();
    this.initItemsData();
    this.filterForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });
  }

  subscribes() {
    this.PurchaseService.itemsDataSource.subscribe({
      next: (res:any) => {
        this.items = res;
      },
    });

    this.PurchaseService.itemsPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initItemsData() {
    this.PurchaseService.getItems('', '', new PageInfo());
  }
  

  onPageChange(pageInfo: PageInfo) {
    this.PurchaseService.getItems('', '', pageInfo);
  }

  onSubmit() {
    this.ref.close(this.selectedRows);
  }

  
  onSelectedRowsChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
    console.log(selectedRows ,"00000000");
    
  }
  selectedRow(selectedRow: any[]) {
    console.log(selectedRow ,"00000000");
    this.ref.close(selectedRow);

    
  }
  onCancel() {
    this.ref.close();
  }

  onFilterChange() {
    const query = this.buildQuery();
    this.PurchaseService.getItems(query, '', new PageInfo());
  }
  onSearchChange(event: any) {
    this.PurchaseService.getItems('', event, new PageInfo());
  }

  buildQuery(): string {
    const isStorable = this.filterForm.get('categoryType')?.value!;
    const hasExpiryDate = this.filterForm.get('hasExpiryDate')?.value;

    const query: string[] = [];

    isStorable.forEach((checkbox: any) => {
      console.log('Item', checkbox);
      query.push(`${checkbox}=${checkbox}`);
    });
    
    if (hasExpiryDate.length > 0) query.push(`HasExpiryDate=${hasExpiryDate}`);

    const result = query.join('&');

    return result;
  }
  constructor(
    private PurchaseService: PurchaseTransactionsService,
    public sharedEnums: SharedSalesEnums,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {}
}
