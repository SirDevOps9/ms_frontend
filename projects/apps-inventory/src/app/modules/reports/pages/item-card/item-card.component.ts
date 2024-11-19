import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { LanguageService, PageInfo, PrintService } from 'shared-lib';
import { GetWarehouseList } from '../../../items/models';
import { ItemsService } from '../../../items/items.service';
import { SearchItemPopUpComponent } from '../../../items/components/stock-out/search-item-pop-up/search-item-pop-up.component';
import { WarehousesTables } from '../../models';
import { ItemDto } from 'projects/apps-sales/src/app/modules/sales/models';

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
    private itemsService: ItemsService
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
      warehouseId: this.fb.control(''),
      itemName: this.fb.control(''),
      itemId: this.fb.control(null),
      itemVariantName: this.fb.control(''),
    });
  }

  itemTransactionSubmit() {}
  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup$.subscribe((res) => {
      this.warehouseLookupData = res;
    });
  }

  viewItemTransaction() {}

  onFilter(SearchTerm: string) {
    this.itemsService.getLatestItemsList(SearchTerm);
  }
  getLatestItemsList(id: number) {
    this.itemsService.getLatestItemsListByWarehouse('', id);
  }

  getItems() {
    this.itemsService.getLatestItemsList();
    this.itemsService.sendlatestItemsList$.subscribe((items) => {
      this.filteredItems = items;
    });
  }

  setRowData(selectedItemId: any) {
    const selectedItem: ItemDto = this.filteredItems.find((item) => item.itemId == selectedItemId);

    if (selectedItem) {
      this.moreInfoForm.patchValue({
        itemName: selectedItem.itemName,
        itemId: selectedItem.itemId,
        itemVariantName: selectedItem.itemVariantName,
      });
    }
  }

  openDialog() {
    console.log(this.moreInfoForm.get('warehouseId')?.value);
    const ref = this.dialog.open(SearchItemPopUpComponent, {
      width: 'auto',
      height: '600px',
    });
    ref.onClose.subscribe((selectedItem: any) => {
      if (selectedItem) {
        this.setRowData(selectedItem.itemId);
      }
    });
  }
}
