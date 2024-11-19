import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LayoutService } from 'apps-shared-lib';
import { RouterService } from 'shared-lib';
import { ItemsService } from '../../items.service';
import { GetWarehouseList } from '../../models';
import { IinvGeneralSeting } from '../../models/enums';

@Component({
  selector: 'app-general-setting-inv',
  templateUrl: './general-setting-inv.component.html',
  styleUrl: './general-setting-inv.component.scss',
})
export class GeneralSettingInvComponent implements OnInit {
  formGroup: FormGroup;
  warhouseLookupData: GetWarehouseList[] = [];
  AccountsDropDownLookup: { id: number; name: string }[] = [];

  get InvGeneralEnum(): typeof IinvGeneralSeting {
    return IinvGeneralSeting;
  }

  constructor(
    private fb: FormBuilder,
    public layoutService: LayoutService,
    private itemsService: ItemsService,
    private routerService: RouterService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getAccount();
    this.getInventoryGeneralSetting();
  }

  getInventoryGeneralSetting() {
    this.itemsService.getInventoryGeneralSetting();
    this.itemsService.inventoryGeneralSetting$.subscribe((res) => {
      if (res) {
        this.formGroup.patchValue(res);
      }
    });
  }

  getAccount() {
    this.itemsService.AccountsDropDown();
    this.itemsService.AccountsDropDownLookupObs.subscribe((res) => {
      if (res) {
        this.AccountsDropDownLookup = res;
      }
    });
  }

  initForm() {
    this.formGroup = this.fb.group({
      costingEvaluationMethod: [],
      costOfGoodsSoldAccountId: [],
      generalPurchaseAccountId: [],
      goodsInTransitAccountId: [],
      adjustmentAccountId: [],
      reEvaluationAccountId: [],
    });
  }

  discard() {
    this.routerService.navigateTo('');
  }

  onSave() {
    let val = this.formGroup.value;
    this.itemsService.editInventoryGeneralSetting(val);
  }
}
