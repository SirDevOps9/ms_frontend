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
    searchTerm: [''],
    isStorable: new FormControl(false),
    isService: new FormControl(false),
    hasExpiryDate: new FormControl(false),
  });

  itemsData: ItemDto[] = [
    {
      id: 1,
      code: 'A001',
      name: 'Item One',
      itemUOM: 'KG',
      itemVairant: 'Variant A',
      itemCategory: 'Category 1',
    },
    {
      id: 2,
      code: 'A002',
      name: 'Item Two',
      itemUOM: 'Litre',
      itemVairant: 'Variant B',
      itemCategory: 'Category 2',
    },
    {
      id: 3,
      code: 'A003',
      name: 'Item Three',
      itemUOM: 'Piece',
      itemVairant: 'Variant C',
      itemCategory: 'Category 1',
    },
    {
      id: 4,
      code: 'A004',
      name: 'Item Four',
      itemUOM: 'Meter',
      itemVairant: 'Variant D',
      itemCategory: 'Category 3',
    },
    {
      id: 5,
      code: 'A005',
      name: 'Item Five',
      itemUOM: 'Box',
      itemVairant: 'Variant E',
      itemCategory: 'Category 2',
    },
  ];
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
      next: (res) => {
        this.items = res;
      },
    });

    this.salesService.itemsPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initItemsData() {
    this.salesService.getItems('', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.salesService.getItems('', pageInfo);
  }

  onSubmit() {
    this.ref.close(this.selectedRows);
  }

  onSelectedRowsChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }

  onCancel() {
    this.ref.close();
  }

  onFilterChange() {
    const query = this.buildQuery();
    this.salesService.getItems(query, new PageInfo());
  }

  buildQuery(): string {
    const searchTerm = this.filterForm.get('searchTerm')?.value;
    const isStorable = this.filterForm.get('isStorable')?.value;
    const isService = this.filterForm.get('isService')?.value;
    const hasExpiryDate = this.filterForm.get('hasExpiryDate')?.value;
    
    const query = [];

    if (searchTerm) query.push(`${this.sharedEnums.ItemsQueryEnum.SearchText}=${searchTerm}`);
    if (isStorable) query.push(`${this.sharedEnums.ItemsQueryEnum.IsStorable}=${isStorable}`);
    if (isService) query.push(`${this.sharedEnums.ItemsQueryEnum.IsService}=${isService}`);
    if (hasExpiryDate)
      query.push(`${this.sharedEnums.ItemsQueryEnum.HasExpiryDate}=${hasExpiryDate}`);

    return query.join('&');
  }
}
