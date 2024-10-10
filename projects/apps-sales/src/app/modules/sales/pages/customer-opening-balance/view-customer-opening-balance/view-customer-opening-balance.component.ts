import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { RouterService, LanguageService } from 'shared-lib';
import { SharedSalesEnums, GetCustomerOpeningBalanceViewDto } from '../../../models';
import { SalesService } from '../../../sales.service';
import { CustomerObViewDistributionComponent } from '../../../components/customer-ob-view-distribution/customer-ob-view-distribution.component';
import { Title } from '@angular/platform-browser';
import { AccountNature } from 'projects/apps-accounting/src/app/modules/account/models';

@Component({
  selector: 'app-view-customer-opening-balance',
  templateUrl: './view-customer-opening-balance.component.html',
  styleUrls: ['./view-customer-opening-balance.component.scss'],
  providers: [RouterService],
})
export class ViewCustomerOpeningBalanceComponent implements OnInit {
  data: any = {};
  customerView?: GetCustomerOpeningBalanceViewDto;
  amount: number;
  amountNature: AccountNature;
  totalCreditAmountLocal: number;
  totalCreditAmount: number;
  totalBalance: number | undefined;
  
  constructor(
    private salesService: SalesService,
    private routerService: RouterService,
    private dialog: DialogService,
    public enums: SharedSalesEnums
  ) {
   
  }

  ngOnInit() {
    this.loadCustomerView();
  }

  loadCustomerView() {
    this.salesService.getCustomerOpeningBalanceView(this.routerService.currentId);
    this.salesService.CustomerOpeningBalanceViewObservable.subscribe((res) => {
      this.customerView = res;
      
      this.totalBalance =
        res?.customerOpeningDetails?.reduce((acc, item) => {
          const balanceString = item?.balance.toString() || '0';
          const balance = parseFloat(balanceString);
          return acc + (isNaN(balance) ? 0 : balance);
        }, 0) || 0;
    });
  }

  openDistribute(data: any) {
    console.log('data from click', data);

    if (data.balanceType != this.enums.BalanceType.Debit) {
      return;
    } else {
      const ref = this.dialog.open(CustomerObViewDistributionComponent, {
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
