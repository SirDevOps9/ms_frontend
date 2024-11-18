import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import {
  customValidators,
  DateTimeService,
  LanguageService,
  PrintService,
  ToasterService,
} from 'shared-lib';
import { GetWarehouseList } from '../../../items/models';
import { ItemsService } from '../../../items/items.service';
import { SearchItemPopUpComponent } from '../../../items/components/stock-out/search-item-pop-up/search-item-pop-up.component';
import { WarehousesTables, WarehouseTransactionsDto } from '../../models';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  itemTransactionForm: FormGroup;
  moreInfoForm: FormGroup;
  warehouseLookupData: GetWarehouseList[] = [];
  filteredItems: any[];
  selectedLanguage: string;
  warehousesTransactionsTables: WarehousesTables[] = [];

  // reportsService = inject(ReportsService);
  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private ToasterService: ToasterService,
    private PrintService: PrintService,
    private dateTimeService: DateTimeService,
    private router: Router,
    private dialog: DialogService,
    private itemsService: ItemsService
  ) {
    this.languageService.language$.subscribe((lang) => [(this.selectedLanguage = lang)]);
  }
  ngOnInit() {
    this.warehousesTransactionsTables =  [
      {
        warehouseName: 'Warehouse A',
        itemId: 'ITEM001',
        transactions: [
          {
            id: '1',
            transactionName: 'Transaction 1',
            transactionCode: 'TXN001',
            serial: 'SERIAL001',
            batchNumber: 'BATCH001',
            expiryDate: new Date('2024-03-15'),
            in: {
              qty: 100,
              cost: 10.99,
              total: 1099.00,
            },
            out: {
              qty: 20,
              cost: 10.99,
              total: 219.80,
            },
            qtyBalance: 80,
            itemCost: 10.99,
            totalBalanceAmount: 879.20,
          },
          {
            id: '2',
            transactionName: 'Transaction 2',
            transactionCode: 'TXN002',
            serial: 'SERIAL002',
            batchNumber: 'BATCH002',
            expiryDate: new Date('2024-06-20'),
            in: {
              qty: 50,
              cost: 5.99,
              total: 299.50,
            },
            out: {
              qty: 10,
              cost: 5.99,
              total: 59.90,
            },
            qtyBalance: 40,
            itemCost: 5.99,
            totalBalanceAmount: 239.60,
          },
        ],
      },
      {
        warehouseName: 'Warehouse B',
        itemId: 'ITEM002',
        transactions: [
          {
            id: '3',
            transactionName: 'Transaction 3',
            transactionCode: 'TXN003',
            serial: 'SERIAL003',
            batchNumber: 'BATCH003',
            expiryDate: new Date('2024-09-01'),
            in: {
              qty: 200,
              cost: 7.99,
              total: 1598.00,
            },
            out: {
              qty: 50,
              cost: 7.99,
              total: 399.50,
            },
            qtyBalance: 150,
            itemCost: 7.99,
            totalBalanceAmount: 1198.50,
          },
          {
            id: '4',
            transactionName: 'Transaction 4',
            transactionCode: 'TXN004',
            serial: 'SERIAL004',
            batchNumber: 'BATCH004',
            expiryDate: new Date('2024-12-01'),
            in: {
              qty: 150,
              cost: 8.99,
              total: 1348.50,
            },
            out: {
              qty: 30,
              cost: 8.99,
              total: 269.70,
            },
            qtyBalance: 120,
            itemCost: 8.99,
            totalBalanceAmount: 1078.80,
          },
        ],
      },
    ];
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
      itemId: this.fb.control(''),
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

  onFilter(SearchTerm: string, id: any) {
    this.itemsService.getLatestItemsListByWarehouse('', id);
  }
  getLatestItemsList(id: number) {
    this.itemsService.getLatestItemsListByWarehouse('', id);
  }

  getItems() {
    this.itemsService.latestItemsListByWarehouse$.subscribe((res: any) => {
      this.filteredItems = res;
      if (res.length) {
        if (this.selectedLanguage === 'ar') {
          this.filteredItems = res.map((elem: any) => ({
            ...elem,
            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameAr}`,
          }));
        } else {
          this.filteredItems = res.map((elem: any) => ({
            ...elem,
            displayName: `(${elem.itemCode}) ${elem.itemName}-${elem.itemVariantNameEn}`,
          }));
        }
      }
    });
  }

  setRowData(selectedItemId: any, list: any) {
    const selectedItem = list.find((item: any) => item.itemId === selectedItemId);

    if (!selectedItem) {
      console.error(`Item with ID ${selectedItemId} not found`);
      return;
    }
  }

  openDialog(indexLine?: number) {
    const ref = this.dialog.open(SearchItemPopUpComponent, {
      width: 'auto',
      height: '600px',
      // data: this.addForm.get('warehouseId')?.value,
    });
    ref.onClose.subscribe((selectedItems: any) => {
      if (selectedItems) {
        console.log(selectedItems);
        // this.setRowDataFromPopup(indexLine ,selectedItems)
      }
    });
  }
}
