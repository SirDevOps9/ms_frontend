import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ItemDto, SharedSalesEnums } from 'projects/apps-sales/src/app/modules/sales/models';
import { LanguageService, PageInfo, PageInfoResult } from 'shared-lib';
import { ItemsService } from '../../../items/items.service';

@Component({
  selector: 'app-search-item-pop-up',
  templateUrl: './search-item-pop-up.component.html',
  styleUrl: './search-item-pop-up.component.scss',
})
export class SearchItemAdvancedPopUpComponent {
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
  selectedLanguage: string;

  constructor(
    public sharedEnums: SharedSalesEnums,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    private itemsService: ItemsService,
    public config: DynamicDialogConfig,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.getLang();

    this.getAllItems();

    this.filterForm.valueChanges.subscribe(() => {
      this.onFilterChange();
    });
  }

  getAllItems() {
    this.itemsService.getItems('', '', new PageInfo());
    this.itemsService.itemsList.subscribe({
      next: (res: any) => {
        this.items = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  getLang() {
    this.languageService.language$.subscribe((lang) => [(this.selectedLanguage = lang)]);
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItems('', '', pageInfo);
  }

  onSubmit() {
    this.ref.close(this.selectedRows);
  }

  onSelectedRowsChange(selectedRows: any[]) {
    this.selectedRows = selectedRows;
  }
  selectedRow(selectedRow: any[]) {
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
      query.push(`${checkbox}=${checkbox}`);
    });

    if (hasExpiryDate.length > 0) query.push(`HasExpiryDate=${hasExpiryDate}`);

    const result = query.join('&');

    return result;
  }
}
