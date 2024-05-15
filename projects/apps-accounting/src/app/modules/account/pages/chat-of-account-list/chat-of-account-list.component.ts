import { Component, OnInit } from '@angular/core';
import { LanguageService, PageInfo, RouterService } from 'shared-lib';
import { JournalEntryService } from '../../../journal-entry/journal-entry.service';
import { AccountService } from '../../account.service';
import { AccountDto } from '../../models/accountDto';
import { AccountNature } from '../../models/accountNature';

@Component({
  selector: 'app-chat-of-account-list',
  templateUrl: './chat-of-account-list.component.html',
  styleUrls: ['./chat-of-account-list.component.scss']
})
export class ChatOfAccountListComponent implements OnInit {

  tableData: AccountDto[];
  currentPageInfo: PageInfo = new PageInfo();
  accountNature: AccountNature;


  constructor(private routerService: RouterService,
    private languageService: LanguageService,
    private accountService: AccountService) { }

  ngOnInit() {
    this.initChartOfAccountData(this.currentPageInfo);
  }

  initChartOfAccountData(page:PageInfo) {

    this.accountService.getAllChartOfAccountPaginated('',page).subscribe({
      next: (ChartOfAccountList: any) => {
        this.tableData = ChartOfAccountList.result;
        console.log('this.tableData', this.tableData);
      },
    });
  }
  onPageChange(pageInfo: PageInfo) {
    console.log(pageInfo);
    this.initChartOfAccountData(pageInfo)
  }
  routeToAdd(){
    this.routerService.navigateTo(`/journalentry/add`);
  }
  routeToEdit(id:number){
    this.routerService.navigateTo(`/journalentry/edit/${id}`);
  }
 
}
