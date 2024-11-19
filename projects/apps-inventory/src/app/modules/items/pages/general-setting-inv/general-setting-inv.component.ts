import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import {
  PageInfoResult,
  RouterService,
  FormsService,
  customValidators,
  PageInfo,
} from 'shared-lib';
import { ItemsService } from '../../items.service';
import { GetWarehouseList } from '../../models';
import { OperationType } from '../../models/enums';

@Component({
  selector: 'app-general-setting-inv',
  templateUrl: './general-setting-inv.component.html',
  styleUrl: './general-setting-inv.component.scss',
})
export class GeneralSettingInvComponent implements OnInit {
  formGroup: FormGroup;
  warhouseLookupData: GetWarehouseList[] = [];
  AccountsDropDownLookup: { id: number; name: string }[] = [];
  scopeOptions: any[] = [];
  costingMethods: any[] = [];
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
    private formService: FormsService
  ) {}

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
      selectedOption: [false],
      costingMethod: [],
      currentScope: [],
      nextScope: [],
      lastScope: [],
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
