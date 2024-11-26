import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TransactionsService } from 'projects/apps-inventory/src/app/modules/transactions/transactions.service';
import { PageInfo, PageInfoResult, customValidators, LanguageService } from 'shared-lib';
import { ItemDto, SharedSalesEnums } from '../../../sales/models';

@Component({
  selector: 'app-view-men-in-team',
  templateUrl: './view-men-in-team.component.html',
  styleUrl: './view-men-in-team.component.scss',
})
export class ViewMenInTeamComponent implements OnInit {
  pageInfo = new PageInfo();
  items: ItemDto[] = [];
  currentPageInfo: PageInfoResult;
  searchTerm: string = '';
  selectedRows: ItemDto[] = [];
  selectAll: boolean = false;
  currentLang: string;
  selectedLanguage: string;

  filterForm: FormGroup = this.fb.group({
    teamId: [, customValidators.required],
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
    this.itemsService.itemsList$.subscribe({
      next: (res: any) => {
        this.items = res;
      },
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  initItemsData() {
    this.itemsService.getItemsForAdvancedSearch('', '', new PageInfo());
  }

  onPageChange(pageInfo: PageInfo) {
    this.itemsService.getItemsForAdvancedSearch('', '', pageInfo);
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

  onFilterChange() {}
  onSearchChange(event: any) {
    this.itemsService.getItemsForAdvancedSearch('', event, new PageInfo());
  }
}
