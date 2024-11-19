import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { customValidators, LanguageService, PrintService } from 'shared-lib';
import { GetWarehouseList } from '../../../items/models';
import { ItemsService } from '../../../items/items.service';
import { CardReportQuery, WarehousesTables } from '../../models';
import { ItemDto } from 'projects/apps-sales/src/app/modules/sales/models';
import { SearchItemAdvancedPopUpComponent } from '../../components/search-item-pop-up/search-item-pop-up.component';
import { ReportService } from '../../report.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  itemTransactionForm: FormGroup;
  moreInfoForm: FormGroup;
  warehouseLookupData: GetWarehouseList[] = [];
  filteredItems: any[] = [];
  selectedLanguage: string;
  warehousesTransactionsTables: WarehousesTables[] = [];
  selectedItem: ItemDto;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private PrintService: PrintService,
    private dialog: DialogService,
    private itemsService: ItemsService,
    private reportService: ReportService
  ) {
    this.languageService.language$.subscribe((lang) => [(this.selectedLanguage = lang)]);
  }
  ngOnInit() {
    this.warehousesTransactionsTables = [];
    this.initWareHouseLookupData();
    this.moreInfoFormInitiate();
    this.itemTransactionFormInitiate();
    this.getItems();
  }

  getDisplayName(item: any): string {
    return `${item.itemName} (${item.itemCode}) ${item.itemVariantName}`;
  }

  printTable(id: string) {
    this.PrintService.print(id);
  }

  itemTransactionFormInitiate() {
    this.itemTransactionForm = this.fb.group({
      search: [''],
    });
  }

  moreInfoFormInitiate() {
    this.moreInfoForm = this.fb.group({
      warehouseId: this.fb.control('', [customValidators.required]),
      itemDetail: this.fb.control(''),
      itemId: this.fb.control(null),
      itemUom: this.fb.control(''),
    });
  }

  itemTransactionSubmit() {}
  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup$.subscribe((res) => {
      this.warehouseLookupData = res;
    });
  }

  viewItemTransaction() {
    let query: CardReportQuery = {
      itemVariantId: this.selectedItem.itemVariantId,
      warehouseId: this.moreInfoForm.get('warehouseId')!.value || [],
    };
    this.reportService.getWarehousesReport(query);
    this.reportService.cardWarehousesReportList.subscribe((res) => {
      this.warehousesTransactionsTables = res;
    });
  }

  onFilter(SearchTerm: string) {
    this.itemsService.getLatestItemsList(SearchTerm);
  }


  getItems() {
    this.itemsService.getLatestItemsList();
    this.itemsService.sendlatestItemsList$.subscribe((items) => {
      this.filteredItems = items;
      this.filteredItems.map(
        (item) =>
          (item.displayName =
            item.itemName + ' (' + item.itemCode + ')' + '    ' + item.itemVariantName)
      );
    });
  }

  setRowData(selectedItemId: any, advanced: boolean = false) {
    if (!advanced) {
      this.selectedItem = this.filteredItems.find((item) => item.itemVariantId == selectedItemId);
    } else {
      this.selectedItem = selectedItemId;
    }
    if (this.selectedItem) {
      this.moreInfoForm.patchValue({
        itemDetail: ` ${this.selectedItem.itemName} - ${this.selectedItem.itemVariantName}`,
        itemId: this.selectedItem.itemId,
        itemUom:
          this.selectedLanguage == 'en' ? this.selectedItem.uomNameEn : this.selectedItem.uomNameAr,
      });
    }
  }

  openDialog() {
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
