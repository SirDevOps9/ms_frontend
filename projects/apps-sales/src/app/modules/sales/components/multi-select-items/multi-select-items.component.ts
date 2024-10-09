import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchFunc } from 'libs/shared-lib/src/lib/models/sendQueries';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { debounceTime } from 'rxjs';
import { PageInfo, PageInfoResult } from 'shared-lib';
import { ItemDto } from '../../models';
import { SalesService } from '../../sales.service';

@Component({
  selector: 'app-multi-select-items',
  templateUrl: './multi-select-items.component.html',
  styleUrls: ['./multi-select-items.component.scss'],
})
export class MultiSelectItemsComponent implements OnInit {
  pageInfo = new PageInfo();
  items: ItemDto[] = [];
  paging: PageInfoResult;
  searchTerm: string = '';
  selectedRows: ItemDto[] = [];
  selectAll: boolean = false;
  searchForm: FormGroup = this.fb.group({
    SearchTerm: [''],
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
    private ref: DynamicDialogRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getItems(this.searchForm.get('SearchTerm')?.value);

    this.searchForm.valueChanges.pipe(debounceTime(1000)).subscribe((res) => {
      this.getItems(SearchFunc(this.searchForm.value));
    });

    this.salesService.itemsList.subscribe((res) => {
      this.items = res;
    });

    this.salesService.itemsPageInfo.subscribe((res) => {
      this.paging = res;
    });
  }

  getItems(searchTerm: string) {
    this.salesService.getItems(searchTerm, this.pageInfo);
  }

  onPageChange(pageInfo: PageInfo) {
    this.pageInfo = pageInfo;
    this.getItems(SearchFunc(this.searchForm.value));
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
}
