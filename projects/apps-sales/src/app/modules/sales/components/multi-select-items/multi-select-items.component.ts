import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { ItemDto, SharedSalesEnums } from '../../models';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-multi-select-items',
  templateUrl: './multi-select-items.component.html',
  styleUrls: ['./multi-select-items.component.scss'],
})
export class MultiSelectItemsComponent implements OnInit {
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
    private salesService: SalesService,
    public sharedEnums: SharedSalesEnums,
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.subscribes();
    this.initItemsData();
    this.filterForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });
  }

  subscribes() {
    this.salesService.itemsList.subscribe({
      next: (res:any) => {
        this.items = res;
      },
    });

    this.salesService.itemsPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initItemsData() {
    this.salesService.getItems('', '', new PageInfo());
  }
  

  onPageChange(pageInfo: PageInfo) {
    this.salesService.getItems('', '', pageInfo);
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
    this.salesService.getItems(query, '', new PageInfo());
  }
  onSearchChange(event: any) {
    this.salesService.getItems('', event, new PageInfo());
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
