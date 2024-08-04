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
    this.financeService.('', new PageInfo());

    this.financeService.paymentTermDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getAllPaymentTerm('', pageInfo);

    this.financeService.paymentTermDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  exportClick(e?: Event) {
    this.financeService.exportsBankList(this.searchTerm);
    this.financeService.exportedPaymentTermDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
  this.routerService.navigateTo('/masterdata/add-payment-term')
  }

  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/edit-payment-term/${data.id}`);
  }

  onSearchChange() {
    this.financeService.getAllPaymentTerm(this.searchTerm, new PageInfo());
    this.financeService.paymentTermDataSourceObservable.subscribe({
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
