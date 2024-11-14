import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDto, SharedSalesEnums } from 'projects/apps-sales/src/app/modules/sales/models';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { ItemsService } from '../../../../items.service';

@Component({
  selector: 'app-multi-select-item-stock-in',
  templateUrl: './multi-select-item-stock-in.component.html',
  styleUrl: './multi-select-item-stock-in.component.scss'
})
export class MultiSelectItemStockInComponent implements OnInit {
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

  constructor(
    public sharedEnums: SharedSalesEnums,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.subscribes();
    this.initItemsData();
    this.filterForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });
  }

  subscribes() {
    this.itemsService.itemsList.subscribe({
      next: (res:any) => {
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
      console.log('Item', checkbox);
      query.push(`${checkbox}=${checkbox}`);
    });
    
    if (hasExpiryDate.length > 0) query.push(`HasExpiryDate=${hasExpiryDate}`);

    const result = query.join('&');

    return result;
  }
}
