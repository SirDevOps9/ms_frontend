import { Component, OnInit } from '@angular/core';
import { PageInfo, PageInfoResult, RouterService } from 'shared-lib';
import { AccountService } from '../../../account.service';
import { AccountNature, AccountDto } from '../../../models';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.scss'],
})
export class ChatOfAccountListComponent implements OnInit {
  tableData: AccountDto[];
  currentPageInfo: PageInfoResult;
  accountNature= AccountNature;
  searchTerm : string
  constructor(private routerService: RouterService, private accountService: AccountService) {}

  ngOnInit() {
    this.initChartOfAccountData(this.searchTerm, new PageInfo());
  }

  searchTermChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.searchTerm = inputElement.value;
    console.log( this.searchTerm)
    this.initChartOfAccountData(this.searchTerm, new PageInfo());
  }

  initChartOfAccountData(searchTerm: string, page: PageInfo) {
    this.accountService.initAccountList(searchTerm, new PageInfo());

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
    this.initChartOfAccountData('', pageInfo);
    
  }
  routeToAdd() {
    this.routerService.navigateTo(`/journalentry/add`);
  }
  routeToEdit(id: number) {
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }
}
