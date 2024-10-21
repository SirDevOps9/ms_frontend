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
    //searchTerm: [''],
    // isStorable:  new FormControl<string | null>(null),
    // isService: new FormControl<string | null>(null),
    // hasExpiryDate:  new FormControl<string | null>(null)
     isStorable:  new FormControl([]),

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
  onSearchChange(event: any) {
    this.salesService.getItems(event, new PageInfo());
  }

  buildQuery(): string {
    const isStorable = this.filterForm.get('isStorable')?.value!;

    console.log("isStorable",isStorable);

    const query: string[] = [];

    isStorable.forEach((x:any) => {
console.log("Item",x);

    });

    // buildQuery(): string {
    //   // Get the current values from the filter form
    //   const isStorable = this.filterForm.get('isStorable')?.value;
    //   const isService = this.filterForm.get('isService')?.value;
    //   const hasExpiryDate = this.filterForm.get('hasExpiryDate')?.value;
    
    //   // Initialize an array to hold the query parameters
    //   const query: string[] = [];
    
    //   // Add query parameters based on checkbox values
    //   if (isStorable) {
    //     query.push(`${this.sharedEnums.GetItemsQueryEnum.IsStorable}=${this.sharedEnums.GetItemsQueryEnum.IsStorable}`);
    //   }
    //   if (isService) {
    //     query.push(`${this.sharedEnums.GetItemsQueryEnum.IsService}=${this.sharedEnums.GetItemsQueryEnum.IsService}`);
    //   }
    //   if (hasExpiryDate) {
    //     query.push(`${this.sharedEnums.GetItemsQueryEnum.HasExpiryDate}=true`); // Adjust based on how your API expects this
    //   }
    
    //   // Join the query parameters into a single string
    //   const result = query.join('&');
    //   console.log('Generated Query:', result);
    
    //   return result;
    // }

    const result  = query.join('&')
    console.log('result', result)


    return result ;
  }
}
