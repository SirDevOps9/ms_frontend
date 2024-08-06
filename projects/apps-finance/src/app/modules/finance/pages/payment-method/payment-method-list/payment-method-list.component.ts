import { Component, OnInit } from '@angular/core';
import { lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { PaymentMethodDto } from '../../../models';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss']
})
export class PaymentMethodListComponent implements OnInit {

  tableData: PaymentMethodDto[];
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  exportData: PaymentMethodDto[];
  cols = [
   
    {
      field: 'Code',
      header: 'code',
    },

    {
      field: 'Name',
      header: 'name',
    }
  ];
  exportColumns: lookupDto[];

  constructor(
    private financeService: FinanceService,
    private routerService: RouterService

  ) {}

  ngOnInit() {
    this.initPaymentMethodData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initPaymentMethodData() {
    this.financeService.getAllPaymentMethod('', new PageInfo());

    this.financeService.paymentMethodDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getAllPaymentMethod('', pageInfo);

    this.financeService.paymentMethodDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    this.financeService.exportsPaymentMethodList(this.searchTerm);
    this.financeService.exportedPaymentMethodDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
  this.routerService.navigateTo('/masterdata/add-payment-method')
  }

  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/edit-payment-term/${data.id}`);
  }

  onSearchChange() {
    this.financeService.getAllPaymentMethod(this.searchTerm, new PageInfo());
    this.financeService.paymentMethodDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
        console.log(res);
      },
    });
  }

  onDelete(id: number) {
    this.financeService.deletePaymentTerm(id);
  }

}
