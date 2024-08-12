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
    private routerService: RouterService,
    private title: Title,
    private langService: LanguageService,

  ) {
    this.title.setTitle(this.langService.transalte('paymentterm.payment-term-list'));

  }

  ngOnInit() {
    this.initPaymentTermData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
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
    this.financeService.exportsBankList(this.searchTerm);
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
