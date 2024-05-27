import { Component, OnInit } from '@angular/core';
import { PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { AccountService } from '../../account.service';
import { AccountNature, AccountDto } from '../../models';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.scss'],
})
export class ChatOfAccountListComponent implements OnInit {
  tableData: AccountDto[];
  currentPageInfo: PageInfoResult;
  accountNature= AccountNature;

  constructor(private routerService: RouterService, private accountService: AccountService) {}

  ngOnInit() {
    this.initChartOfAccountData();
  }

  initChartOfAccountData() {
    this.accountService.initAccountList('', new PageInfo());

    this.accountService.accountsList.subscribe({
      next: (ChartOfAccountList) => {
        this.tableData = ChartOfAccountList;
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
}
