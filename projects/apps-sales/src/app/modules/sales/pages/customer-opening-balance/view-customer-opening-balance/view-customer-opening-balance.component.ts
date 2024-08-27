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

  ngOnInit() {
    this.loadCustomerView();
  }

  loadCustomerView() {
    this.salesService.getCustomerOpeningBalanceView(this.routerService.currentId);
    this.salesService.CustomerOpeningBalanceViewObservable.subscribe((res) => {
      this.customerView = res;
      this.totalBalance = res?.customerOpeningDetails?.reduce((acc, item) => {
        const balanceString = item?.balance.toString() || '0'; // Default to '0' if balance is undefined
        const balance = parseFloat(balanceString); // Parse as float
        return acc + (isNaN(balance) ? 0 : balance); // Add balance if it's a number, otherwise add 0
      }, 0) || 0; // Default to 0 if no details or reduce function returns undefined
    });
  }

  // openCostPopup(data : any , text : string) {
  //   if(!data.creditAmount && !data.debitAmount){
  //     return null
  //   }else {
  //     const dialogRef =  this.dialog.open(CostCenterAllocationPopupComponent,{
  //       width: '900px',
  //       height: '600px',
  //       header : 'View Cost Center Allocation',
  //       data : {...data , text}
  //     });
  //     dialogRef.onClose.subscribe((res) => {
  //       if(res)data.costCenters = res

  //     });
  //   }

  // }

  openDistribute(data: any) {
    console.log("data from click",data);
    
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

  constructor(
    private salesService: SalesService,
    private routerService: RouterService,
    private langService: LanguageService,
    private title: Title,
    private dialog: DialogService,
    public enums: SharedSalesEnums
  ) {
    this.langService
      .getTranslation('openeingBalance.CustomerOpeningBalance')
      .subscribe((res) => this.title.setTitle(res));
  }
}
