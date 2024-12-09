import { Component } from '@angular/core';
import { PageInfoResult, lookupDto, RouterService, PageInfo, SortBy } from 'shared-lib';
import { BankAccount, CurrencyDto, GetAllPaymentInDto, PaymentFilterDto } from '../../../models';
import { TranscationsService } from '../../../transcations.service';
import { Router } from '@angular/router';
import { SharedFinanceEnums } from '../../../../finance/models';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-payment-in-list',
  templateUrl: './payment-in-list.component.html',
  styleUrl: './payment-in-list.component.scss',
})
export class PaymentInListComponent {
  tableData: GetAllPaymentInDto[];
  SortBy?: number;
  currentPageInfo: PageInfoResult = {};
  searchTerm: string;
  SortColumn?: string;
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
    private router: Router,
    public financeSharedEnums: SharedFinanceEnums
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
    this.financeService.paymentInStatus$.subscribe((res) => {
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
    this.getPaymentInStatus();
    this.getPaymentHub();
    this.getCurrencyDropdown();
  }

  getPaymentInStatus() {
    this.financeService.getPaymentInStatus();
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
    this.financeService.getAllPaymentIn('', new PageInfo(), filter);
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
    this.searchTerm = event;
    this.financeService.getAllPaymentIn(event, new PageInfo());
  }

  exportedColumns(obj: { SortBy: number; SortColumn: string }) {
    this.SortBy = obj.SortBy;
    this.SortColumn = obj.SortColumn;
  }
  // exportClick() {
  //   this.financeService.exportsPaymentInList(this.searchTerm,this.SortBy ,this.SortColumn);
  // }

  exportClick() {
    this.financeService.exportsPaymentInList(this.searchTerm, this.SortBy, this.SortColumn);
    this.financeService.exportedPaymentinDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
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
