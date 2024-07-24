import { Component, OnInit } from '@angular/core';
import { lookupDto, PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { AccountNature, AccountDto, ExportAccountsDto } from '../../../models';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.scss'],
})
export class ChatOfAccountListComponent implements OnInit {
  tableData: AccountDto[];
  currentPageInfo: PageInfoResult;
  accountNature= AccountNature;

  mappedExportData: AccountDto[];

  exportColumns: lookupDto[];
  exportData: ExportAccountsDto[];

  constructor(private routerService: RouterService, private accountService: AccountService) {}

  cols: any[] = [
   
    {
      field: 'Id',
      header: 'id',
    },

    {
      field: 'Account Code',
      header: 'accountCode',
    },
    {
      field: 'Nature',
      header: 'natureId',
    },
    {
      field: 'accountTypeName',
      header: 'Account Type',
    },
    {
      field: 'accountSectionName',
      header: 'Account Section',
    }
  ];


  ngOnInit() {
    this.initChartOfAccountData();
    this.exportColumns = this.cols.map((col) => ({
      id: col.header,
      name: col.field,
    }));
  }

  initChartOfAccountData() {
    this.accountService.initAccountList('', new PageInfo());

    this.accountService.accountsList.subscribe({
      next: (ChartOfAccountList) => {
        this.tableData = ChartOfAccountList;
        this.mappedExportData = this.tableData.map(elem=>{
          let {currencyId, ...args} = elem
          return args
          
        })
      },
    });

    this.accountService.currentPageInfo.subscribe((currentPageInfo) => {
      this.currentPageInfo = currentPageInfo;
    });
  }
  onPageChange(pageInfo: PageInfo) {
    this.accountService.initAccountList('', pageInfo);
  }
  routeToAdd() {
    this.routerService.navigateTo(`/journalentry/add`);
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }

  exportAccountsData(searchTerm: string) {
    this.accountService.exportAccountsData(searchTerm);
    this.accountService.exportsAccountsDataSourceObservable.subscribe((res) => {
      this.exportData = res;
    });
  }
}
