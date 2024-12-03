import { Component, OnInit } from '@angular/core';
import { LanguageService, lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { AccountNature, AccountDto, ExportAccountsDto } from '../../../models';
import { Title } from '@angular/platform-browser';
import { ExportService } from 'libs/shared-lib/src/lib/services/export.service';
import { SortTableEXport } from 'projects/apps-inventory/src/app/modules/items/models/SortTable';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.scss'],
})
export class ChatOfAccountListComponent implements OnInit {
  tableData: AccountDto[];
  currentPageInfo: PageInfoResult;
  accountNature = AccountNature;
  searchTerm: string;
  mappedExportData: AccountDto[];
  SortByAll:SortTableEXport
  exportData: ExportAccountsDto[];
  filteredColumns: string[] = [];
  columns: { name: any; headerText: any }[] = [
    { name: 'accountCode', headerText: 'ChartOfAccount.AccountCode' },
    { name: 'name', headerText: 'ChartOfAccount.AccountName' },
    { name: 'levelNumber', headerText: 'ChartOfAccount.levelNumber' },
    { name: 'accountSectionName', headerText: 'ChartOfAccount.AccountSection' },
    { name: 'accountTypeName', headerText: 'ChartOfAccount.AccountType' },
    { name: 'natureId', headerText: 'ChartOfAccount.Nature' },
    { name: 'isActive', headerText: 'ChartOfAccount.Status' }
  ]
  constructor(private routerService: RouterService,
    private title: Title,
    private langService: LanguageService,
    private exportService:ExportService,
    private accountService: AccountService) {
    this.title.setTitle(this.langService.transalte('ChartOfAccount.ChartOfAccountList'));

  }

  exportColumns: lookupDto[] = [
    {
      id: 'id',
      name: 'Id',
    },

    {
      id: 'accountCode',
      name: 'Account Code',
    },
    {
      id: 'natureId',
      name: 'Nature',
    },
    {
      id: 'Account Type',
      name: 'accountTypeName',
    },
    {
      id: 'Account Section',
      name: 'accountSectionName',
    },
    // {
    //   id: 'Account Type',
    //   name: 'accountTypeName',
    // },
    // {
    //   id: 'Account Nature',
    //   name: 'natureId',
    // },
  ];

  ngOnInit() {
    this.initChartOfAccountData(this.searchTerm, new PageInfo());
  }

  searchTermChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    console.log(this.searchTerm);
    this.initChartOfAccountData(this.searchTerm, new PageInfo());
  }

  initChartOfAccountData(searchTerm: string, page: PageInfo) {
    this.accountService.initAccountList(searchTerm, page);
    this.accountService.initAccountList(searchTerm, page);

    this.accountService.accountsList.subscribe({
      next: (ChartOfAccountList) => {
        this.tableData = ChartOfAccountList;
        this.mappedExportData = this.tableData.map((elem) => {
          let { currencyId, ...args } = elem;
          return args;
        });
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo)
    this.initChartOfAccountData('', pageInfo);
    // this.accountService.getAllTaxes('', pageInfo);

    // this.accountService.taxesDefintionList.subscribe({
    //   next: (res) => {
    //     this.tableData = res;
    //   },
    // });

  }
  routeToAdd() {
    this.routerService.navigateTo(`/journalentry/add`);
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }
  exportClick() {
    this.exportAccountsData(this.searchTerm, this.SortByAll?.SortBy, this.SortByAll?.SortColumn);
  }

  exportAccountsData(searchTerm: string, sortBy?: number, sortColumn?: string) {
    this.accountService.exportAccountsData(searchTerm ,sortBy ,sortColumn);
    const filteredColumns = this.columns.filter(col => this.filteredColumns.includes(col.name));
    this.accountService.exportsAccountsDataSourceObservable.subscribe((res) => {
      this.exportData = this.exportService.formatCiloma(res, filteredColumns);
    });
  }

  exportClickBySort(e: { SortBy: number; SortColumn: string }) {
    this.SortByAll = {
      SortBy: e.SortBy,
      SortColumn: e.SortColumn,
    };
  }

  onFilterColumn(e: string[]) {
    console.log('new new', e);
    this.filteredColumns = e;
    e.forEach(selectedColumn => {
      const columnExists = this.columns.some(column => column.name === selectedColumn);
      if (columnExists) {
      } else {
      }
    });
  }

}
