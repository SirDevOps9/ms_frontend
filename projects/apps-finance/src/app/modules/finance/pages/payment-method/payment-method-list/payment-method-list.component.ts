import { Component, OnInit } from '@angular/core';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { FinanceService } from '../../../finance.service';
import { PaymentMethodDto } from '../../../models';
import { Title } from '@angular/platform-browser';

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
  exportColumns: lookupDto[]=[
   
    {
      id: 'id',
      name: 'Id',
    },
    {
      id: 'code',
      name: 'Code',
    },
    {
      id: 'name',
      name: 'Name',
    },
    {
      id: 'paymentPlace',
      name: 'paymentPlace',
    },
    {
      id: 'paymentMethodType',
      name: 'paymentMethodType',
    }
  ];

  constructor(
    private financeService: FinanceService,
    private routerService: RouterService,
    private title: Title,
      private languageService: LanguageService,

  ) {}

  ngOnInit() {
    this.title.setTitle(this.languageService.transalte('paymentmethod.payment-method-list'));

    this.initPaymentMethodData();
    
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
  this.routerService.navigateTo('/masterdata/payment-method/add')
  }

  onEdit(id: number) {
    this.routerService.navigateTo(`/masterdata/payment-method/edit/${id}`);
  }
  view(id: number){
    this.routerService.navigateTo(`/masterdata/payment-method/view/${id}`);
  }
  onSearchChange() {
    this.financeService.getAllPaymentMethod(this.searchTerm, new PageInfo());
    this.financeService.paymentMethodDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });
  }

  onDelete(id: number) {
    this.financeService.deletePaymentMethod(id);
  }

  

}
