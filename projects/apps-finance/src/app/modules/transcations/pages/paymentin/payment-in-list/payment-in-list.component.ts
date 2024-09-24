import { Component } from '@angular/core';
import { PageInfoResult, lookupDto, RouterService, PageInfo } from 'shared-lib';
import { GetAllPaymentInDto } from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { Router } from '@angular/router';
import { SharedFinanceEnums } from '../../../../finance/models';
@Component({
  selector: 'app-payment-in-list',
  templateUrl: './payment-in-list.component.html',
  styleUrl: './payment-in-list.component.scss',
})
export class PaymentInListComponent {
  tableData: GetAllPaymentInDto[];

  currentPageInfo: PageInfoResult = {};
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
    private router: Router,
    public financeSharedEnums:SharedFinanceEnums
  ) {}

  ngOnInit() {
    this.subscribes();
    this.initPaymentInData();
  }

  routeToAdd() {
    this.routerService.navigateTo(`/transcations/paymentin/add`);
  }

  routeToEdit(id: number) {
    this.routerService.navigateTo(`/transcations/paymentin/edit/${id}`);
  }

  initPaymentInData() {
    this.financeService.getAllPaymentIn('', new PageInfo());
  }
  subscribes() {
    this.financeService.paymentInDataSourceObservable.subscribe({
      next: (res) => {
        this.tableData = res;
      },
    });

    this.financeService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });

    this.financeService.exportedPaymentinDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }

  onPageChange(pageInfo: PageInfo) {
    this.financeService.getAllPaymentIn('', pageInfo);
  }

  onSearchChange(event: any) {
    this.financeService.getAllPaymentIn(event, new PageInfo());
  }

  exportClick() {
    this.financeService.exportsPaymentInList(this.searchTerm);
  }

  onDelete(id: number) {
    this.financeService.deletePaymentIn(id);
  }

  view(id: number) {
    this.routerService.navigateTo(`/transcations/paymentin/view/${id}`);
  }
  routeToJournalView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
    );
    window.open(url, '_blank');
  }
}
