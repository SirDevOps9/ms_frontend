import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { customValidators, LanguageService, PrintService } from 'shared-lib';
import { CardReportQuery, GetWarehouseList, WarehousesTables } from '../../models';
import { SearchItemAdvancedPopUpComponent } from '../../components/search-item-pop-up/search-item-pop-up.component';
import { ReportService } from '../../report.service';
import { ReportProxyService } from '../../report-proxy.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent implements OnInit, OnDestroy {
  moreInfoForm: FormGroup;
  warehouseLookupData: GetWarehouseList[] = [];
  filteredItems: any[] = [];
  selectedLanguage: string;
  warehousesTransactionsMap: Map<number | string, WarehousesTables> = new Map();
  warehousesTransactionsTables: WarehousesTables[] = [];
  fetchedDataCache: { [key: string]: any } = {};
  loadingStates: { [key: string]: boolean } = {};
  selectedItem: any;

  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private PrintService: PrintService,
    private dialog: DialogService,
    private reportService: ReportService,
    private proxy: ReportProxyService
  ) {
    this.languageService.language$.subscribe((lang) => (this.selectedLanguage = lang));
  }

  ngOnInit(): void {
    this.initializeState();
    this.setupForm();
    this.getItems();
    this.loadWarehousesLookupData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe()); // Cleanup subscriptions
  }

  private initializeState(): void {
    this.warehousesTransactionsMap = new Map();
  }

  private setupForm(): void {
    this.moreInfoForm = this.fb.group({
      warehouseId: this.fb.control('', [customValidators.required]),
      itemDetail: this.fb.control(''),
      itemId: this.fb.control(null, [customValidators.required]),
      itemUom: this.fb.control(''),
    });
  }

  private loadWarehousesLookupData(): void {
    const warehouseLookupSubscription = this.reportService.wareHousesDropDownLookup$.subscribe(
      (res) => {
        this.warehouseLookupData = res;
      }
    );
    this.subscriptions.push(warehouseLookupSubscription);
    this.reportService.getWareHousesDropDown();
  }

  printTable(id: string): void {
    this.PrintService.print(id);
  }

  viewItemTransaction(): void {
    if (this.moreInfoForm.valid) {
      const selectedIds: any = this.moreInfoForm.get('warehouseId')!.value || [];
      const newIds = selectedIds.filter((id: number) => !this.fetchedDataCache[id]);

      // Ensure to set loading state for new warehouse IDs.
      newIds.forEach((id: number) => {
        if (!this.warehousesTransactionsMap.has(id)) {
          this.loadingStates[id] = true;
        }
        const query: CardReportQuery = {
          itemVariantId: this.selectedItem.itemVariantId,
          warehouseId: id,
        };
        this.loadWarehouseTransactions(query, id);
      });
    }
  }

  private loadWarehouseTransactions(query: CardReportQuery, warehouseId: number): void {
    this.reportService.getWarehousesReport(query).subscribe(
      (res) => {
        if (res.itemVariantId && !this.warehousesTransactionsMap.has(res.warehouseId)) {
          this.warehousesTransactionsMap.set(res.warehouseId, res);
          this.warehousesTransactionsTables.push(res);
          this.fetchedDataCache[res.warehouseId] = res;
          this.loadingStates[res.warehouseId] = false;
        } else if (res.itemVariantId === 0) {
          this.loadingStates[res.warehouseId] = false;
          res.warehouseName = this.warehouseLookupData.find(
            (warehouse) => warehouse.id === res.warehouseId
          )!.name;
          res.itemName = this.selectedItem.itemName;
          res.itemCode = this.selectedItem.itemCode;
          this.warehousesTransactionsMap.set(res.warehouseId, res);

          if (
            !this.warehousesTransactionsTables.find((item) => item.warehouseId === res.warehouseId)
          ) {
            this.warehousesTransactionsTables.push(res);
          }
        }
      },
      (error) => {
        console.error('Error fetching warehouse transactions:', error);
        this.loadingStates[warehouseId] = false;
      }
    );
  }

  isExist(warehouseId: any): boolean {
    return this.warehousesTransactionsMap.has(warehouseId);
  }

  onFilter(SearchTerm: string): void {
    this.reportService.getLatestItemsList(SearchTerm);
  }

  getItems(): void {
    const itemsSubscription = this.reportService.sendlatestItemsList$.subscribe((items) => {
      this.filteredItems = items;
      this.filteredItems.forEach((item) => {
        item.displayName = `${item.itemName} (${item.itemCode})    ${item.itemVariantName}`;
      });
    });
    this.subscriptions.push(itemsSubscription);
    this.reportService.getLatestItemsList();
  }

  resetState() {
    this.warehousesTransactionsMap.clear();
    this.warehousesTransactionsTables = [];
    this.moreInfoForm.reset();
    this.fetchedDataCache = {};
    this.loadingStates = {};
  }

  setRowData(selectedItemId: any, advanced: boolean = false): void {
    this.resetState();
    if (!advanced) {
      this.selectedItem = this.filteredItems.find((item) => item.itemVariantId === selectedItemId);
    } else {
      this.selectedItem = selectedItemId;
      this.selectedItem.displayName = `${this.selectedItem.itemName} (${this.selectedItem.itemCode})    ${this.selectedItem.itemVariantName}`;
      this.filteredItems = [...this.filteredItems, this.selectedItem];
    }
    if (this.selectedItem) {
      this.moreInfoForm.patchValue({
        itemDetail: `${this.selectedItem.itemName} - ${this.selectedItem.itemVariantName}`,
        itemId: this.selectedItem.itemVariantId,
        itemUom:
          this.selectedLanguage === 'en'
            ? this.selectedItem.uomNameEn
            : this.selectedItem.uomNameAr,
      });
    }
  }

  openDialog(): void {
    const ref = this.dialog.open(SearchItemAdvancedPopUpComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItem: any) => {
      if (selectedItem) {
        this.setRowData(selectedItem, true);
      }
    });
  }
}
