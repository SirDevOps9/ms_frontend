import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageInfoResult, lookupDto, RouterService, LanguageService, PageInfo } from 'shared-lib';
import { FinanceService } from '../../../../finance/finance.service';
import { GetAllPaymentInDto, GetAllPaymentOutDto } from '../../../models';
import { TranscationsService } from '../../../transcations.service';

@Component({
  selector: 'app-payment-out-list',
  templateUrl: './payment-out-list.component.html',
  styleUrls: ['./payment-out-list.component.scss'],
})
export class PaymentOutListComponent implements OnInit {
  tableData: GetAllPaymentOutDto[];

  paymentOutCurrentPageInfo: PageInfoResult = {};
  searchTerm: string;

  exportColumns: lookupDto[] = [
    {
      id: 'id',
      name: 'Id',
    },
    {
      id: 'code',
      name: 'code',
    },
    {
      id: 'date',
      name: 'date',
    },
    {
      id: 'paymentHub',
      name: 'paymentHub',
    },
    {
      id: 'paymentHubDetailId',
      name: 'paymentHubDetailId',
    },
    {
      id: 'branch',
      name: 'branch',
    },
    {
      id: 'bankAccount',
      name: 'bankAccount',
    },
    {
      id: 'sourceDocument',
      name: 'sourceDocument',
    },
    {
      id: 'relatedSourceJournal',
      name: 'relatedSourceJournal',
    },
  ];
  exportData: GetAllPaymentInDto[];

  constructor(
    private financeService: TranscationsService,
    private routerService: RouterService,
    private title: Title,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.subscribes();
    this.initPaymentInData();
    this.title.setTitle(this.langService.transalte('PaymentOut.Title'));
  }

  routeToAdd() {
    this.routerService.navigateTo(`/transcations/paymentout/add`);
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(`/transcations/paymentout/edit/${id}`);
  }

  initPaymentInData() {
    this.financeService.getAllPaymentOut('', new PageInfo());
  }
  subscribes() {
    this.financeService.paymentOutDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.paymentOutCurrentPageInfo.subscribe((paymentOutCurrentPageInfo) => {
      this.paymentOutCurrentPageInfo = paymentOutCurrentPageInfo;
    });

    this.financeService.exportedPaymentOutDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getAllPaymentOut('', pageInfo);
  }

  onSearchChange(event: any) {
    this.financeService.getAllPaymentOut(event, new PageInfo());
  }

  exportClick() {
    this.financeService.exportsPaymentOutList(this.searchTerm);
  }

  onDelete(id: number) {
    this.financeService.deletePaymentOut(id);
  }

  view(id: number) {
    //todo
    this.routerService.navigateTo(`/view/${id}`);
  }
}
