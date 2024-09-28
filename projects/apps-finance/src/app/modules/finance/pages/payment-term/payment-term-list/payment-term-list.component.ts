import { Component, OnInit } from '@angular/core';
import { FinanceService } from '../../../finance.service';
import { PaymentTermDto } from '../../../models';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-term-list',
  templateUrl: './payment-term-list.component.html',
  styleUrls: ['./payment-term-list.component.scss']
})
export class PaymentTermListComponent implements OnInit {

  tableData: PaymentTermDto[];
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  exportData: PaymentTermDto[];
  exportColumns: lookupDto[]= [
   
    {
      id: 'id',
      name: 'Id',
    },

    {
      id: 'code',
      name: 'code',
    },

    {
      id: 'name',
      name: 'name',
    },

    {
      id: 'shortName',
      name: 'shortName',
    }
  ];

  constructor(
    private financeService: FinanceService,
    private routerService: RouterService

  ) {

  }

  ngOnInit() {
    this.initPaymentTermData();
  }

  initPaymentTermData() {
    this.financeService.getAllPaymentTerm('', new PageInfo());

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
    this.financeService.exportsPaymentTermList(this.searchTerm);
    this.financeService.exportedPaymentTermDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onAdd() {
  this.routerService.navigateTo('/masterdata/paymentterm/add-payment-term')
  }

  onEdit(data: any) {
    this.routerService.navigateTo(`/masterdata/paymentterm/edit-payment-term/${data.id}`);
  }
  view(id: any) {
    this.routerService.navigateTo(`/masterdata/paymentterm/view-payment-term/${id}`);
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
