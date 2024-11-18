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

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  itemTransactionForm: FormGroup;
  moreInfoForm: FormGroup;
  warhouseLookupData: GetWarehouseList[] = [];

  tableData: any[] = [];
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
  ) {}
  ngOnInit() {
    this.tableData = [];
    this.initWareHouseLookupData();
    this.moreInfoFormInitiate();
    this.itemTransactionFormInitiate();
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
    });
  }

  itemTransactionSubmit() {}
  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup$.subscribe((res) => {
      this.warhouseLookupData = res;
    });
  }

  viewItemTransaction() {}

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
