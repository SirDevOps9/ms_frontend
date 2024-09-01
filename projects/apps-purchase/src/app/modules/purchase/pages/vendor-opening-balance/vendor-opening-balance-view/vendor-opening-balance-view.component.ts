import { Component, OnInit } from '@angular/core';
import { AccountNature } from '../../../models/account-nature';
import { PurchaseService } from '../../../purchase.service';
import { LanguageService, RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedPurchaseEnums } from '../../../models/sharedenums';

@Component({
  selector: 'app-vendor-opening-balance-view',
  templateUrl: './vendor-opening-balance-view.component.html',
  styleUrls: ['./vendor-opening-balance-view.component.scss']
})
export class VendorOpeningBalanceViewComponent implements OnInit {
  data: any = {};
  //vendorView?: GetCustomerOpeningBalanceViewDto;
  amount: number;
  amountNature: AccountNature;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  totalBalance: number | undefined;
  constructor( private purchaseService: PurchaseService,
    private routerService: RouterService,
    private langService: LanguageService,
    private title: Title,
    private dialog: DialogService,
    public enums: SharedPurchaseEnums) {
      this.langService
      .getTranslation('openeingBalance.CustomerOpeningBalance')
      .subscribe((res) => this.title.setTitle(res));
     }

  ngOnInit() {
    //this.loadvendorView();
  }

  // loadvendorView() {
  //   this.purchaseService.getCustomerOpeningBalanceView(this.routerService.currentId);
  //   this.purchaseService.CustomerOpeningBalanceViewObservable.subscribe((res) => {
  //     this.vendorView = res;
  //     this.totalBalance =
  //       res?.customerOpeningDetails?.reduce((acc, item) => {
  //         const balanceString = item?.balance.toString() || '0';
  //         const balance = parseFloat(balanceString);
  //         return acc + (isNaN(balance) ? 0 : balance);
  //       }, 0) || 0;
  //   });
  // }

}
