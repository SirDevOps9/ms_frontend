import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageInfoResult, lookupDto, RouterService, LanguageService, PageInfo } from 'shared-lib';
import { FinanceService } from '../../../../finance/finance.service';
import { BankAccount, CurrencyDto, GetAllPaymentInDto, GetAllPaymentOutDto, PaymentFilterDto } from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { SharedFinanceEnums } from '../../../../finance/models';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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

  filterForm: FormGroup;
  filterStatus: lookupDto[] = [];
  filterPaymentHub: lookupDto[] = [];
  currencyListDto: CurrencyDto[] = [];
  bankAccounts: BankAccount[] = [];
  paymentHubDetailsList: lookupDto[] = [];
  bankAccountDisabled: boolean = true;

  constructor(
    private financeService: TranscationsService,
    private routerService: RouterService,
    public financeSharedEnums: SharedFinanceEnums,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscribes();
    this.initPaymentInData();
    this.initiateFilterForm();
    this.getLookup();
    this.lookupSubscriptions();
  }


  initiateFilterForm() {
    this.filterForm = new FormGroup({
      range: new FormControl([]),
      status: new FormControl([]),
      paymentHub: new FormControl(null),
      paymentHubDetails: new FormControl([]),
      bankAccounts: new FormControl([]),
      currency: new FormControl(null),
    });
    this.filterForm.get('paymentHub')?.valueChanges.subscribe((res) => {
      this.filterForm.get('paymentHubDetails')?.reset();
      this.filterForm.get('bankAccounts')?.reset();

      if (res == 2) {
        this.bankAccountDisabled = false;
        this.financeService.bankDropDown();
      } else {
        this.bankAccountDisabled = true;
        this.financeService.treasuryDropDown();
      }
    });
    this.filterForm.get('paymentHubDetails')?.valueChanges.subscribe((res) => {
      if (this.filterForm.get('paymentHub')?.value == 2 && res) {
        this.getBankACcounts(res);
      }
    });
  }

  lookupSubscriptions() {
    this.financeService.paymentOutStatus$.subscribe((res) => {
      this.filterStatus = res;
    });
    this.financeService.paymentHub$.subscribe((res) => {
      this.filterPaymentHub = res;
    });
    this.financeService.getTreasuryDropDownDataObservable.subscribe((res) => {
      this.paymentHubDetailsList = res;
    });
    this.financeService.getBankDropDownDataObservable.subscribe((res) => {
      this.paymentHubDetailsList = res;
    });
    this.financeService.bankAccountsDropDown$.subscribe((res) => {
      this.bankAccounts = res;
    });
    this.financeService.currencyDropdown$.subscribe((res) => {
      this.currencyListDto = res;
    });
  }

  getLookup() {
    this.getPaymentOutStatus();
    this.getPaymentHub();
    this.getCurrencyDropdown();
  }

  getPaymentOutStatus() {
    this.financeService.getPaymentOutStatus();
  }

  getCurrencyDropdown() {
    this.financeService.getCurrencyDropdown();
  }

  getPaymentHub() {
    this.financeService.getPaymentHub();
  }

  getBankACcounts(ids: number[]) {
    this.financeService.getBanAccounts(ids);
  }

  filter() {
    const filter: PaymentFilterDto = {
      FromDate: this.filterForm.get('range')!.value[0]
        ? new Date(this.filterForm.get('range')!.value[0]).toISOString().slice(0, 10)
        : '',
      ToDate: this.filterForm.get('range')!.value[1]
        ? new Date(this.filterForm.get('range')!.value[1]).toISOString().slice(0, 10)
        : '',
      Status: this.filterForm.get('status')!.value,
      PaymentHub: this.filterForm.get('paymentHub')!.value,
      PaymentHubDetailId: this.filterForm.get('paymentHubDetails')!.value,
      BankAccountId: this.filterForm.get('bankAccounts')!.value,
      CurrencyId: this.filterForm.get('currency')!.value,
    };
    this.financeService.getAllPaymentOut('', new PageInfo(), filter);
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
    this.searchTerm=event
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
    this.routerService.navigateTo(`/transcations/paymentout/view/${id}`);
  }
  routeToJournalView(id: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/accounting/transcations/journalentry/view/${id}`])
    );
    window.open(url, '_blank');
  }
}
