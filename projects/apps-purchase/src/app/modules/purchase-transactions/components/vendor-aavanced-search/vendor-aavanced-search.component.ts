import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LanguageService, PageInfo, PageInfoResult } from 'shared-lib';
import { PurchaseTransactionsService } from '../../purchase-transactions.service';

@Component({
  selector: 'app-vendor-aavanced-search',
  templateUrl: './vendor-aavanced-search.component.html',
  styleUrl: './vendor-aavanced-search.component.scss'
})
export class VendorAavancedSearchComponent {
  pageInfo = new PageInfo();
  items: any[] = [];
  currentPageInfo: PageInfoResult;
  searchTerm: string = '';
  selectedRows: any[] = [];
  selectAll: boolean = false;
  warehouseId:number
  filterForm: FormGroup = this.fb.group({
    categoryType: new FormControl(),
    hasExpiryDate: new FormControl(false),
  });
  selectedLanguage: string

  constructor(
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
    public config: DynamicDialogConfig,
    private languageService:LanguageService,
    private PurchaseService: PurchaseTransactionsService,



  ) {}

  ngOnInit(): void {
    if (this.config.data) {
    this.warehouseId = this.config.data
    }
    // this.filterForm.valueChanges.subscribe(() => {
    //   this.onFilterChange();
    // });
    this.subscribes();
    this.getAllVendor()
  }
  getAllVendor(){
  this.PurchaseService.getAllVendor('', new PageInfo());
}
  subscribes() {
    this.languageService.language$.subscribe((lang)=>[
      this.selectedLanguage=lang
     ])
     

    this.PurchaseService.vendorDataSource.subscribe((allVendor) => {
        this.items = allVendor  
    });
    this.PurchaseService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
      
    });
  }

  // initItemsData() {
  //   this.PurchaseService.getItemsStockOutByWarehouse('', '',  new PageInfo());
  // }
  

  onPageChange(pageInfo: PageInfo) {
    // this.PurchaseService.getItemsStockOutByWarehouse('', '', pageInfo);
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

  // onFilterChange() {
  //   const query = this.buildQuery();
  //   this.PurchaseService.getItemsStockOutByWarehouse(query, '',this.warehouseId, new PageInfo());
  // }
  onSearchChange(event: any) {
    // this.PurchaseService.getItemsStockOutByWarehouse('', event,this.warehouseId, new PageInfo());
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

