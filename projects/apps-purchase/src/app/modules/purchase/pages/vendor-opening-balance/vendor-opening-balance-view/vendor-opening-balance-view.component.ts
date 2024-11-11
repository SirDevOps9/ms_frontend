import { Component, OnInit } from '@angular/core';
import { AccountNature } from '../../../models/account-nature';
import { PurchaseService } from '../../../purchase.service';
import { LanguageService, RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedPurchaseEnums } from '../../../models/sharedenums';
import { AddVendorOpeningBalanceDto, GetVendorOpeningBalanceViewDto } from '../../../models';
import { VendorOpeningBalanceDistributeComponent } from '../../../components/vendor-opening-balance-distribute/vendor-opening-balance-distribute.component';
import { VendorOpeningBalanceDistributeViewComponent } from '../../../components/vendor-opening-balance-distribute-view/vendor-opening-balance-distribute-view.component';

@Component({
  selector: 'app-vendor-opening-balance-view',
  templateUrl: './vendor-opening-balance-view.component.html',
  styleUrls: ['./vendor-opening-balance-view.component.scss'],
  providers: [RouterService]
})
export class VendorOpeningBalanceViewComponent implements OnInit {
  data: any = {};
  vendorView?: GetVendorOpeningBalanceViewDto;
  amount: number;
  amountNature: AccountNature;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  totalBalance: number | undefined;
  
  constructor(
    private PurchaseService: PurchaseService,
    private routerService: RouterService,
    private langService: LanguageService,
    private title: Title,
    private dialog: DialogService,
    public enums: SharedPurchaseEnums
  ) {
    this.langService
      .getTranslation('openeingBalance.CustomerOpeningBalance')
      .subscribe((res) => this.title.setTitle(res));
  }

  ngOnInit() {
    this.loadCustomerView();
  }

  loadCustomerView() {
    this.PurchaseService.getVendorOpeningBalanceView(this.routerService.currentId);
    this.PurchaseService.VendorOpeningBalanceViewObservable.subscribe((res) => {
      this.vendorView = res;
      
      this.totalBalance =
        res?.vendorOpeningDetails?.reduce((acc, item) => {
          const balanceString = item?.balance.toString() || '0';
          const balance = parseFloat(balanceString);
          return acc + (isNaN(balance) ? 0 : balance);
        }, 0) || 0;
    });
  }

  openDistribute(data: any) {
    console.log('data from click', data);

    if (data.balanceType != this.enums.BalanceType.Credit) {
      return;
    } else {
      const ref = this.dialog.open(VendorOpeningBalanceDistributeViewComponent, {
        width: '750px',
        height: '600px',
        data: data,
      });
      ref.onClose.subscribe((res) => {
        if (res) {
          data.dueDates = res;
        } else {
          data.dueDates = [];
        }
      });
    }
  }

}
