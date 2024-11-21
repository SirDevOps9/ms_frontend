import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { ItemsService } from '../../../items.service';
import {
  customValidators,
  FormsService,
  LanguageService,
  PageInfo,
  PageInfoResult,
  RouterService,
} from 'shared-lib';
import { OperationType } from '../../../models/enums';
import { GetWarehouseList } from '../../../models';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-operation-tag-add',
  templateUrl: './operation-tag-add.component.html',
  styleUrl: './operation-tag-add.component.scss',
})
export class OperationTagAddComponent implements OnInit {
  formGroup: FormGroup;
  warhouseLookupData: GetWarehouseList[] = [];
  AccountsDropDownLookup: { id: number; name: string }[] = [];

  currentPageInfo: PageInfoResult = { totalItems: 0 };

  get operationType(): OperationType {
    return this.operationType;
  }
  operationTypeList = [
    { id: OperationType.StockIn, name: OperationType.StockIn },
    { id: OperationType.StockOut, name: OperationType.StockOut },
  ];
  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private itemsService: ItemsService,
    private routerService: RouterService,
    private formService: FormsService,
    private title: Title,
    private langService: LanguageService,
  ) {
    this.title.setTitle(this.langService.transalte('OperationalTag.OperationalTagAdd'));

  }

  ngOnInit() {
    this.initForm();
    this.initWareHouseLookupData();
    this.getAccount();
  }

  initWareHouseLookupData() {
    this.itemsService.getWareHousesDropDown();
    this.itemsService.wareHousesDropDownLookup$.subscribe((res) => {
      this.warhouseLookupData = res;
    });
  }

  getAccount() {
    this.itemsService.AccountsDropDown();
    this.itemsService.AccountsDropDownLookupObs.subscribe((res) => {
      this.AccountsDropDownLookup = res;
      console.log(res);
    });
  }

  initForm() {
      this.formGroup = this.fb.group({
        code: new FormControl(''),
        name: new FormControl('', customValidators.required),
        operationType: new FormControl('', customValidators.required),
        warehouseId: new FormControl('', customValidators.required),
        glAccountId: new FormControl(null),
      });
  }

  discard() {
    this.routerService.navigateTo('/masterdata/operational-tag');
  }

  initOperationalTagData() {
    this.itemsService.getOperationalTagList('', new PageInfo());

    this.itemsService.listOfOperationalTag$.subscribe({
      next: (res) => {},
    });

    this.itemsService.currentPageInfo.subscribe((currentPageInfo: any) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onSave() {
    if (!this.formService.validForm(this.formGroup, false)) return;

    let val = this.formGroup.value;

    this.itemsService.addOperationTag(val);
    this.itemsService.sendOperationTag$.subscribe((res: any) => {
      if (res == true) {
        this.routerService.navigateTo('/masterdata/operational-tag');
      } else {
        return;
      }
    });
  }
}
